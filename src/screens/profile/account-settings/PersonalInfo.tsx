import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import { getProfile, RestaurantProfile } from '../../../services/profile';

const PersonalInfo: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [profile, setProfile] = useState<RestaurantProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
    } catch {
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal info</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator color="#2E78F2" size="large" />
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.avatarWrap}>
            {profile?.logoUrl ? (
              <Image source={{ uri: profile.logoUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Image source={require('../../../assets/images/icon/person-filled.png')} style={styles.avatarPlaceholderIcon} />
              </View>
            )}
            <TouchableOpacity style={styles.plusButton} activeOpacity={0.8}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.infoRow, styles.rowBorder]}>
            <View style={styles.leftRow}>
              <Image source={require('../../../assets/images/icon/person.png')} style={styles.rowIcon} />
              <Text style={styles.rowText}>{profile?.name || '-'}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, styles.rowBorder]}>
            <View style={styles.leftRow}>
              <Image source={require('../../../assets/images/icon/scan.png')} style={styles.rowIcon} />
              <Text style={styles.rowText}>{profile?.phone || '-'}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.leftRow}>
              <Image source={require('../../../assets/images/icon/chatt.png')} style={styles.rowIcon} />
              <Text style={styles.rowText}>{profile?.email || '-'}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    paddingBottom: 12,
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
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  avatarWrap: {
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 34,
    position: 'relative',
  },
  avatarImage: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: '#D8DBDF',
  },
  avatarPlaceholder: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: '#D8DBDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderIcon: {
    width: 66,
    height: 66,
    tintColor: '#6E7378',
  },
  plusButton: {
    position: 'absolute',
    right: 2,
    bottom: 4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2E78F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E3EA',
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 28,
    marginTop: -3,
    fontWeight: '400',
  },
  infoRow: {
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E222A',
  },
  rowIcon: {
    width: 23,
    height: 23,
    tintColor: '#2E78F2',
    marginRight: 14,
  },
  rowText: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '500',
    flexShrink: 1,
  },
  editText: {
    color: '#2E78F2',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PersonalInfo;
