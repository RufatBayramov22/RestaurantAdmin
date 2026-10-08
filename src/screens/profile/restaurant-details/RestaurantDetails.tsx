import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import { CuisineOption, fetchCuisineTypes } from '../../../services/cuisineTypes';
import { getProfile, updateRestaurantProfile } from '../../../services/profile';
import styles from './styles.ts';

const RestaurantDetails: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'RestaurantDetails'>>();

  const [restaurantName, setRestaurantName] = useState('');
  const [cuisineType, setCuisineType] = useState<CuisineOption | null>(null);
  const [cuisineOptions, setCuisineOptions] = useState<CuisineOption[]>([]);
  const [loadingCuisine, setLoadingCuisine] = useState(false);
  const [cuisineDropdownOpen, setCuisineDropdownOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [isPriceRangeVisible, setIsPriceRangeVisible] = useState<boolean>(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCuisine = async () => {
      setLoadingCuisine(true);
      try {
        const list = await fetchCuisineTypes();
        setCuisineOptions(list);
      } catch (error) {
        console.log('[RestaurantDetails] cuisine fetch error:', error);
      } finally {
        setLoadingCuisine(false);
      }
    };
    loadCuisine();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const p = await getProfile();
        setRestaurantName(p.name ?? '');
        setAddress(p.address ?? '');
        setDescription(p.about ?? '');
        setPhone(p.phone ?? '');
        setIsAvailable(p.isAvailable ?? true);
        setIsPriceRangeVisible(p.isPriceRangeVisible ?? true);
        setLatitude(typeof p.latitude === 'number' ? p.latitude : null);
        setLongitude(typeof p.longitude === 'number' ? p.longitude : null);

        if (p.cuisineTypeId) {
          setCuisineType({ id: String(p.cuisineTypeId), name: p.cuisineType || `Cuisine #${p.cuisineTypeId}` });
        } else if (p.cuisineType) {
          setCuisineType({ id: '', name: p.cuisineType });
        }
      } catch (error) {
        console.log('[RestaurantDetails] profile load error:', error);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (!cuisineType || cuisineType.id) return;
    const found = cuisineOptions.find(
      c => c.name.trim().toLowerCase() === cuisineType.name.trim().toLowerCase(),
    );
    if (found) setCuisineType(found);
  }, [cuisineOptions, cuisineType]);

  useEffect(() => {
    const p = route.params;
    if (!p) return;
    if (p.selectedAddress) setAddress(p.selectedAddress);
    if (typeof p.selectedLatitude === 'number') setLatitude(p.selectedLatitude);
    if (typeof p.selectedLongitude === 'number') setLongitude(p.selectedLongitude);
  }, [route.params]);

  const mapPreviewUrl = useMemo(() => {
    const lat = latitude ?? 40.409264;
    const lng = longitude ?? 49.867092;
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=14&size=600x300&markers=${lat},${lng},lightblue1`;
  }, [latitude, longitude]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateRestaurantProfile({
        phone,
        address,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
        about: description,
        isPriceRangeVisible,
        isAviable: isAvailable,
        cuisineTypeId: cuisineType?.id ? Number(cuisineType.id) : undefined,
      });

      Alert.alert('Saved', 'Restaurant details updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.log('[RestaurantDetails] save error:', error);
      Alert.alert('Error', 'Could not update restaurant details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          value={restaurantName || 'No restaurant name'}
          style={styles.input}
          placeholder="Enter restaurant name"
          placeholderTextColor="#6E7075"
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={styles.label}>Cuisine Type</Text>
        <TouchableOpacity
          style={styles.selectWrap}
          activeOpacity={0.8}
          onPress={() => setCuisineDropdownOpen(prev => !prev)}>
          <Text style={cuisineType ? styles.selectValueText : styles.selectPlaceholderText}>
            {cuisineType?.name ?? 'Select cuisine type'}
          </Text>
          {loadingCuisine ? (
            <ActivityIndicator color="#A1A4AA" size="small" />
          ) : (
            <Image source={require('../../../assets/images/icon/down-arrow.png')} style={styles.selectArrow} />
          )}
        </TouchableOpacity>

        {cuisineDropdownOpen ? (
          <View style={styles.cuisineDropdownCard}>
            <ScrollView style={styles.cuisineDropdownList} nestedScrollEnabled>
              {cuisineOptions.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.cuisineDropdownItem}
                  onPress={() => {
                    setCuisineType(item);
                    setCuisineDropdownOpen(false);
                  }}>
                  <Text style={styles.cuisineDropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}

              {!loadingCuisine && cuisineOptions.length === 0 ? (
                <Text style={styles.cuisineDropdownEmptyText}>Cuisine list not found</Text>
              ) : null}
            </ScrollView>
          </View>
        ) : null}

        <Text style={[styles.sectionTitle, styles.sectionTopSpace]}>Location</Text>

        <Text style={styles.label}>Address</Text>
        <TouchableOpacity
          style={styles.mapCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('RestaurantDetailsMapPicker')}>
          <Image source={{ uri: mapPreviewUrl }} style={styles.mapImage} />
          <View style={styles.mapOverlay} />
          <Text style={styles.mapText}>Tap to select on Map</Text>
        </TouchableOpacity>

        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholder="e.g., 123 Main St, city, country"
          placeholderTextColor="#6E7075"
        />

        <Text style={[styles.sectionTitle, styles.sectionTopSpace]}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textarea]}
          placeholder="Write a short description of your restaurant.."
          placeholderTextColor="#6E7075"
          multiline
        />

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantDetails;
