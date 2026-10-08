import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import _styles from './styles';
import {
  AnnouncementItem,
  AnnouncementStatus,
  getAnnouncements,
} from '../../../services/announcements';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';

const Announcements: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = _styles;
  const [selectedTab, setSelectedTab] = useState<AnnouncementStatus>('active');
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadAnnouncements = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setErrorMessage('');
      const response = await getAnnouncements();
      setAnnouncements(response);
    } catch (error: any) {
      console.log('[Announcements] fetch error:', error);
      setErrorMessage(error?.response?.data?.Message ?? 'Failed to load announcements');
    } finally {
      if (showLoader) setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements(true);
  }, [loadAnnouncements]);

  const filteredAnnouncements = useMemo(
    () => announcements.filter(item => item.status === selectedTab),
    [announcements, selectedTab],
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadAnnouncements(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcements</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.segmentedWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedTab('active')}
          style={[styles.segmentItem, selectedTab === 'active' && styles.segmentItemActive]}>
          <Text style={[styles.segmentText, selectedTab === 'active' && styles.segmentTextActive]}>Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedTab('expired')}
          style={[styles.segmentItem, selectedTab === 'expired' && styles.segmentItemActive]}>
          <Text style={[styles.segmentText, selectedTab === 'expired' && styles.segmentTextActive]}>Expired</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#2E78F2" />
        </View>
      ) : errorMessage ? (
        <View style={styles.centerState}>
          <Text style={styles.stateText}>{errorMessage}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadAnnouncements(true)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.listContent,
            filteredAnnouncements.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2E78F2"
            />
          }>
          {filteredAnnouncements.length === 0 ? (
            <View style={styles.centerState}>
              <Text style={styles.stateText}>No announcements in this tab</Text>
            </View>
          ) : (
            filteredAnnouncements.map(item => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image || FALLBACK_IMAGE }} style={styles.cardImage} />

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>◷</Text>
                    <Text style={styles.metaText}>{item.date || '-'}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Image source={require('../../../assets/images/icon/time.png')} style={styles.timeIcon} />
                    <Text style={styles.metaText}>{item.time || '-'}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View
                    style={[styles.notificationBadge, item.notificationSent && styles.notificationBadgeActive]}>
                    <Image source={require('../../../assets/images/icon/bell.png')} style={styles.notificationIcon} />
                    <Text
                      style={[
                        styles.notificationText,
                        item.notificationSent && styles.notificationTextActive,
                      ]}>
                      {item.notificationSent ? 'Notification sent' : 'Send notification'}
                    </Text>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.iconButton}
                      onPress={() => navigation.navigate('EditAnnouncement', { announcement: item })}>
                      <Text style={styles.editIcon}>✎</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
                      <Text style={styles.deleteIcon}>🗑</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.bottomActionWrap}>
        <TouchableOpacity activeOpacity={0.9} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Announcements;
