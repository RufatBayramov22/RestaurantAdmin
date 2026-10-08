import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import { deactivateUser, logout } from '../../../services/profile';

const REASONS = [
  'I no longer use this app',
  "I couldn’t find restaurants I like",
  'The app is difficult to use',
  'I’m taking a break',
  'Other',
];

const DeactivateAccount: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedReason, setSelectedReason] = useState<string>(REASONS[0]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeactivate = () => {
    Alert.alert('Deactivate Account', 'Are you sure you want to deactivate your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Deactivate',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await deactivateUser({ reason: selectedReason, note });
            await logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          } catch (error: any) {
            Alert.alert('Error', error?.message || 'Failed to deactivate account');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deactivate Account</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarPlaceholder}>
            <Image source={require('../../../assets/images/icon/person-filled.png')} style={styles.avatarIcon} />
          </View>
        </View>

        <Text style={styles.question}>Please select the reason for cancellation:</Text>

        <View style={styles.reasonsWrap}>
          {REASONS.map(reason => {
            const selected = selectedReason === reason;
            return (
              <TouchableOpacity
                key={reason}
                activeOpacity={0.85}
                style={styles.reasonRow}
                onPress={() => setSelectedReason(reason)}>
                <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                  {selected ? <View style={styles.radioInner} /> : null}
                </View>
                <Text style={styles.reasonText}>{reason}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
          placeholder="Let us know why you're deactivating..."
          placeholderTextColor="#5D626D"
          style={styles.noteInput}
        />
      </ScrollView>

      <View style={styles.bottomWrap}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleDeactivate}
          disabled={loading}
          style={[styles.deactivateButton, loading && styles.deactivateButtonDisabled]}>
          <Text style={styles.deactivateButtonText}>Deactivate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#E8E8E8',
  },
  headerTitle: {
    color: '#EDEDED',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 120,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatarPlaceholder: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: '#DDE1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    width: 72,
    height: 72,
    tintColor: '#6D737A',
  },
  question: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  reasonsWrap: {
    gap: 12,
    marginBottom: 20,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2E78F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  radioOuterSelected: {
    borderColor: '#2E78F2',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E78F2',
  },
  reasonText: {
    color: '#D8DADF',
    fontSize: 15,
    fontWeight: '500',
  },
  noteInput: {
    minHeight: 160,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2B2E35',
    backgroundColor: '#1A1C20',
    color: '#EDEDED',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 22,
    backgroundColor: '#090A0D',
  },
  deactivateButton: {
    height: 54,
    borderRadius: 28,
    backgroundColor: '#2E78F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deactivateButtonDisabled: {
    opacity: 0.65,
  },
  deactivateButtonText: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DeactivateAccount;
