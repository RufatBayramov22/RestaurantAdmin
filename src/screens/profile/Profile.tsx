import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import { logout } from '../../services/profile';
import _styles from './styles';

type MenuItem = { label: string; onPress?: () => void };
type Section = MenuItem[];

const Profile: React.FC = () => {
  const styles = _styles;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const openRestaurantDetails = () => {
    const parent = navigation.getParent<StackNavigationProp<RootStackParamList>>();
    if (parent) {
      parent.navigate('RestaurantDetails');
      return;
    }
    navigation.navigate('RestaurantDetails');
  };

  const openMediaSettings = () => {
    const parent = navigation.getParent<StackNavigationProp<RootStackParamList>>();
    if (parent) {
      parent.navigate('MediaSettings');
      return;
    }
    navigation.navigate('MediaSettings');
  };

  const openAnnouncements = () => {
    const parent = navigation.getParent<StackNavigationProp<RootStackParamList>>();
    if (parent) {
      parent.navigate('Announcements');
      return;
    }
    navigation.navigate('Announcements');
  };

  const openMenuSettings = () => {
    const parent = navigation.getParent<StackNavigationProp<RootStackParamList>>();
    if (parent) {
      parent.navigate('MenuSettings');
      return;
    }
    navigation.navigate('MenuSettings');
  };

  const openAccountSettings = () => {
    const parent = navigation.getParent<StackNavigationProp<RootStackParamList>>();
    if (parent) {
      parent.navigate('AccountSettings');
      return;
    }
    navigation.navigate('AccountSettings');
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  const sections: Section[] = [
    [
      { label: 'Restaurant Details', onPress: openRestaurantDetails },
      { label: 'Media Settings', onPress: openMediaSettings },
      { label: 'Announcements', onPress: openAnnouncements },
      { label: 'Menu Settings', onPress: openMenuSettings },
    ],
    [
      { label: 'Account Settings', onPress: openAccountSettings },
      { label: 'Language' },
      { label: 'Statistics' },
    ],
    [
      { label: 'Privacy Policy' },
      { label: 'Help & Support' },
    ],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {sections.map((section, sIdx) => (
          <View key={sIdx} style={styles.section}>
            {section.map((item, iIdx) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.row, iIdx > 0 && styles.rowBorder]}
                onPress={item.onPress}
                activeOpacity={0.6}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Image style={styles.rowIcon} source={require('../../assets/images/icon/right.png')} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Log Out */}
        <TouchableOpacity style={[styles.section, styles.row]} onPress={handleLogout} activeOpacity={0.6}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Image style={styles.rowIcon} source={require('../../assets/images/icon/log-out.png')} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
