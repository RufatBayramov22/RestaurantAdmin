import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SoundPlayer from 'react-native-sound-player';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stack';
import { getConversation, markMessageAsRead, sendMessageToUser } from '../../services/messages';
import styles from './chatDetailStyles.ts';

const seenIcon = require('../../assets/images/icon/seen.png');
const fallbackAvatar = require('../../assets/images/icon/avatar.png');

type Message =
  | { id: string; type: 'date'; label: string }
  | { id: string; type: 'text'; text: string; fromMe: boolean; time: string; isRead?: boolean; avatarSource?: ImageSourcePropType }
  | { id: string; type: 'voice'; audioUrl: string; fromMe: boolean; time: string; isRead?: boolean; avatarSource?: ImageSourcePropType; durationSeconds?: number };

const formatTime = (value?: string) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const formatDateLabel = (value?: string) => {
  if (!value) return 'Today';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Today';

  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();
  if (isYesterday) return 'Yesterday';

  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

const formatDuration = (seconds: number) => {
  const safe = Math.max(0, Math.floor(seconds));
  const mm = Math.floor(safe / 60);
  const ss = safe % 60;
  return `${mm}:${String(ss).padStart(2, '0')}`;
};

const ChatDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatDetail'>>();
  const { guestName, avatarUrl, partnerUserId, partnerRestaurantId } = route.params ?? {
    guestName: 'Guest Name',
    avatarUrl: undefined,
    partnerUserId: undefined,
    partnerRestaurantId: undefined,
  };

  const avatarSource = useMemo<ImageSourcePropType>(
    () => (avatarUrl ? { uri: avatarUrl } : fallbackAvatar),
    [avatarUrl],
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const [playingSeconds, setPlayingSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), []);

  const loadConversation = useCallback(async () => {
    if (!partnerUserId && !partnerRestaurantId) {
      setMessages([]);
      return;
    }

    setLoading(true);
    try {
      const conversation = await getConversation({
        PartnerUserId: partnerUserId,
        PartnerRestaurantId: partnerRestaurantId,
        PageNumber: 1,
        PageSize: 200,
      });

      const sorted = [...conversation].sort((a, b) => {
        const at = new Date(a.createdAt ?? 0).getTime();
        const bt = new Date(b.createdAt ?? 0).getTime();
        return at - bt;
      });

      const rows: Message[] = [];
      let lastDateKey = '';

      for (const m of sorted) {
        const date = new Date(m.createdAt ?? 0);
        const dateKey = Number.isNaN(date.getTime())
          ? 'today'
          : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (dateKey !== lastDateKey) {
          rows.push({
            id: `date-${dateKey}`,
            type: 'date',
            label: formatDateLabel(m.createdAt),
          });
          lastDateKey = dateKey;
        }

        rows.push({
          ...(m.audioUrl
            ? {
                id: `msg-${m.id}`,
                type: 'voice' as const,
                audioUrl: m.audioUrl,
                fromMe: m.fromMe,
                time: formatTime(m.createdAt),
                isRead: m.isRead,
                avatarSource,
                durationSeconds: m.audioDurationSeconds,
              }
            : {
                id: `msg-${m.id}`,
                type: 'text' as const,
                text: m.content,
                fromMe: m.fromMe,
                time: formatTime(m.createdAt),
                isRead: m.isRead,
                avatarSource,
              }),
        });

        if (!m.fromMe && !m.isRead && m.id) {
          markMessageAsRead(m.id).catch(() => undefined);
        }
      }

      setMessages(rows);
    } catch (error) {
      console.log('[ChatDetail] load conversation error:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [avatarSource, partnerRestaurantId, partnerUserId]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  useEffect(() => {
    const sub = SoundPlayer.addEventListener('FinishedPlaying', () => {
      setPlayingAudioUrl(null);
      setPlayingSeconds(0);
    });

    return () => {
      sub.remove();
      try {
        SoundPlayer.stop();
      } catch {
        // ignore
      }
      try {
        audioRecorderPlayer.stopRecorder();
      } catch {
        // ignore
      }
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, [audioRecorderPlayer]);

  useEffect(() => {
    if (!playingAudioUrl) return;
    const t = setInterval(() => {
      setPlayingSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [playingAudioUrl]);

  const sendMessage = async () => {
    const text = inputText.trim();
    if (!text || sending) return;

    if (!partnerUserId && !partnerRestaurantId) {
      return;
    }

    setSending(true);
    try {
      await sendMessageToUser({
        ReceiverUserId: partnerUserId,
        ReceiverRestaurantId: partnerRestaurantId,
        Content: text,
      });
    } catch (error) {
      console.log('[ChatDetail] send message error:', error);
    } finally {
      setSending(false);
    }

    setInputText('');
    loadConversation();
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const startVoiceRecording = async () => {
    if (sending || isRecording) return;
    if (!partnerUserId && !partnerRestaurantId) return;

    const allowed = await requestMicrophonePermission();
    if (!allowed) {
      console.log('[ChatDetail] microphone permission denied');
      return;
    }

    try {
      setRecordingSeconds(0);
      const uri = await audioRecorderPlayer.startRecorder();
      setRecordingUri(uri ?? null);
      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener((e: any) => {
        setRecordingSeconds(Math.floor((e.currentPosition ?? 0) / 1000));
      });
    } catch (error) {
      console.log('[ChatDetail] start voice record error:', error);
      setIsRecording(false);
      setRecordingSeconds(0);
      audioRecorderPlayer.removeRecordBackListener();
    }
  };

  const stopVoiceRecordingAndSend = async () => {
    if (!isRecording) return;

    try {
      const stoppedUri = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);

      const finalUri = stoppedUri || recordingUri;
      if (!finalUri) {
        setRecordingSeconds(0);
        return;
      }

      setSending(true);
      await sendMessageToUser({
        ReceiverUserId: partnerUserId,
        ReceiverRestaurantId: partnerRestaurantId,
        Content: '',
        AudioFile: {
          uri: finalUri,
          name: `voice-${Date.now()}.m4a`,
          type: 'audio/m4a',
        },
      });
      await loadConversation();
    } catch (error) {
      console.log('[ChatDetail] stop/send voice record error:', error);
    } finally {
      setSending(false);
      setRecordingSeconds(0);
      setRecordingUri(null);
    }
  };

  const openVoiceMessage = async (audioUrl: string) => {
    if (!audioUrl) return;
    try {
      if (playingAudioUrl === audioUrl) {
        SoundPlayer.pause();
        setPlayingAudioUrl(null);
        setPlayingSeconds(0);
      } else {
        SoundPlayer.playUrl(audioUrl);
        setPlayingAudioUrl(audioUrl);
        setPlayingSeconds(0);
      }
    } catch (error) {
      console.log('[ChatDetail] open voice message error:', error);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    if (item.type === 'date') {
      return (
        <View style={styles.dateLabelWrap}>
          <Text style={styles.dateLabel}>{item.label}</Text>
        </View>
      );
    }

    // text/voice message
    return (
      <View style={[styles.msgRow, item.fromMe && styles.msgRowMe]}>
        {!item.fromMe && (
          <Image source={item.avatarSource} style={styles.msgAvatar} />
        )}
        <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
          {item.type === 'voice' ? (
            <View style={styles.voiceWrap}>
              <TouchableOpacity
                onPress={() => openVoiceMessage(item.audioUrl)}
                style={styles.voicePlayButton}
                activeOpacity={0.7}
              >
                <Text style={styles.voicePlayIcon}>
                  {playingAudioUrl === item.audioUrl ? '❚❚' : '▶'}
                </Text>
              </TouchableOpacity>

              <View style={styles.voiceWaveformWrap}>
                <View style={styles.voiceBarsRow}>
                  {[8, 14, 22, 12, 18, 10, 20, 16, 9, 15, 21, 11, 19, 13, 17, 8].map((h, idx) => (
                    <View
                      key={`${item.id}-bar-${idx}`}
                      style={[
                        styles.voiceBar,
                        { height: h },
                        playingAudioUrl === item.audioUrl && idx % 3 !== 0 ? styles.voiceBarActive : null,
                      ]}
                    />
                  ))}
                </View>
                <View style={styles.voiceProgressLine} />
              </View>

              <Text style={styles.voiceDurationText}>
                {playingAudioUrl === item.audioUrl
                  ? formatDuration(playingSeconds)
                  : formatDuration(item.durationSeconds ?? 0)}
              </Text>
            </View>
          ) : (
            <Text style={styles.bubbleText}>{item.text}</Text>
          )}
          <View style={styles.bubbleFooter}>
            <Text style={styles.bubbleTime}>{item.time}</Text>
            {item.fromMe && item.isRead ? (
              <Image
                source={seenIcon}
                style={styles.readIcon}
                resizeMode="contain"
                fadeDuration={0}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Image source={avatarSource} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{guestName}</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callBtnIcon}>📞</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color="#2E78F2" style={{ marginTop: 40 }} />
          ) : (
            <Text style={{ color: '#8A8D94', textAlign: 'center', marginTop: 40 }}>No messages yet</Text>
          )
        }
        onRefresh={loadConversation}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity
            onPressIn={startVoiceRecording}
            onPressOut={stopVoiceRecordingAndSend}
            style={[styles.sendBtn, isRecording && styles.micRecordingBtn]}
            disabled={sending}
            activeOpacity={0.8}
          >
            <Text style={[styles.sendIcon, isRecording && styles.micRecordingIcon]}>🎤</Text>
          </TouchableOpacity>

          {isRecording ? (
            <Text style={styles.recordingText}>Recording... {formatDuration(recordingSeconds)}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder=""
              placeholderTextColor="#555"
              multiline
            />
          )}
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn} disabled={sending}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetail;
