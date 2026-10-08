import React, { useMemo, useState } from 'react';
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

const ChangePassword: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const canSave = useMemo(() => {
    return (
      currentPassword.trim().length > 0 &&
      newPassword.trim().length >= 6 &&
      confirmPassword.trim().length >= 6 &&
      newPassword === confirmPassword
    );
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSave = () => {
    if (!canSave) {
      Alert.alert('Validation', 'Please fill all fields correctly.');
      return;
    }

    Alert.alert('Success', 'Password changed successfully.');
    navigation.goBack();
  };

  const renderPasswordField = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (v: string) => void,
    visible: boolean,
    onToggleVisible: () => void,
  ) => (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#5E636C"
          style={styles.input}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.eyeButton} onPress={onToggleVisible}>
          <Image source={require('../../../assets/images/icon/Hide.png')} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderPasswordField(
          'Current Password',
          'Enter password',
          currentPassword,
          setCurrentPassword,
          showCurrent,
          () => setShowCurrent(prev => !prev),
        )}

        {renderPasswordField(
          'New Password',
          'Enter new password',
          newPassword,
          setNewPassword,
          showNew,
          () => setShowNew(prev => !prev),
        )}

        {renderPasswordField(
          'Confirm New Password',
          'Re-enter new password',
          confirmPassword,
          setConfirmPassword,
          showConfirm,
          () => setShowConfirm(prev => !prev),
        )}
      </ScrollView>

      <View style={styles.bottomWrap}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!canSave}>
          <Text style={[styles.saveButtonText, !canSave && styles.saveButtonTextDisabled]}>Save</Text>
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
    paddingHorizontal: 14,
  },
  contentContainer: {
    paddingTop: 18,
    paddingBottom: 120,
    gap: 16,
  },
  fieldWrap: {
    gap: 8,
  },
  label: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '600',
  },
  inputWrap: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2B2E35',
    backgroundColor: '#1A1C20',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#2E78F2',
  },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 22,
    backgroundColor: '#090A0D',
  },
  saveButton: {
    height: 48,
    borderRadius: 33,
    backgroundColor: '#2E78F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#2A58A7',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  saveButtonTextDisabled: {
    color: '#A4A8B0',
  },
});

export default ChangePassword;
