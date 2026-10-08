import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';

const AccountSettings: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const openPersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const openChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const openDeactivateAccount = () => {
    navigation.navigate('DeactivateAccount');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={[styles.row, styles.rowBorder]} activeOpacity={0.8} onPress={openPersonalInfo}>
          <Text style={styles.rowText}>Personal Info</Text>
          <Image source={require('../../../assets/images/icon/right.png')} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, styles.rowBorder]} activeOpacity={0.8} onPress={openChangePassword}>
          <Text style={styles.rowText}>Change password</Text>
          <Image source={require('../../../assets/images/icon/right.png')} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={openDeactivateAccount}>
          <Text style={styles.rowText}>Deactivate account</Text>
          <Image source={require('../../../assets/images/icon/right.png')} style={styles.chevron} />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, styles.sectionTopSpacing]}>Preferences</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.switchBox, styles.rowBorder]}
          onPress={() => setNotificationsEnabled(prev => !prev)}>
          <Text style={styles.rowText}>Notifications</Text>
          <View style={styles.switchWrap} pointerEvents="none">
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#AEB7C2', true: '#2E78F2' }}
              thumbColor="#F1F4F8"
              ios_backgroundColor="#AEB7C2"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.switchBox}
          onPress={() => setDarkModeEnabled(prev => !prev)}>
          <Text style={styles.rowText}>Dark Mode</Text>
          <View style={styles.switchWrap} pointerEvents="none">
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#AEB7C2', true: '#2E78F2' }}
              thumbColor="#F1F4F8"
              ios_backgroundColor="#AEB7C2"
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 8,
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
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionTitle: {
    color: '#EDEDED',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 6,
  },
  sectionTopSpacing: {
    marginTop: 24,
  },
  row: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 14,
  },
  switchBox: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 14,
    maxWidth: 327,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#20242B',
  },
  rowText: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '500',
  },
  chevron: {
    width: 18,
    height: 18,
    tintColor: '#9BA4B2',
  },
  switchWrap: {
    marginRight: 0,
  },
});

export default AccountSettings;
