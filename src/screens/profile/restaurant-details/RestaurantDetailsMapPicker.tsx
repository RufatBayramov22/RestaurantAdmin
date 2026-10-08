import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import styles from './styles';

const DEFAULT_COORDINATE = {
  latitude: 40.409264,
  longitude: 49.867092,
};

const RestaurantDetailsMapPicker: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleConfirm = () => {
    navigation.navigate('RestaurantDetails', {
      selectedLatitude: DEFAULT_COORDINATE.latitude,
      selectedLongitude: DEFAULT_COORDINATE.longitude,
      selectedAddress: `${DEFAULT_COORDINATE.latitude.toFixed(6)}, ${DEFAULT_COORDINATE.longitude.toFixed(6)}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose from map</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.mapPickerCard}>
        <Text style={styles.mapPickerHint}>Map is disabled. Default location is used.</Text>
        <Text style={styles.mapPickerCoordinate}>
          Latitude: {DEFAULT_COORDINATE.latitude.toFixed(6)}
        </Text>
        <Text style={styles.mapPickerCoordinate}>
          Longitude: {DEFAULT_COORDINATE.longitude.toFixed(6)}
        </Text>

        <TouchableOpacity style={styles.saveButton} onPress={handleConfirm} activeOpacity={0.85}>
          <Text style={styles.saveButtonText}>Use this location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RestaurantDetailsMapPicker;
