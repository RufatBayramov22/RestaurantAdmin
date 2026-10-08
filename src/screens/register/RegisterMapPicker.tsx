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

import { useMainContext } from '../../context/MainContext';
import { RootStackParamList } from '../../navigation/stack';
import _styles from './styles';

const DEFAULT_COORDINATE = {
  latitude: 40.409264,
  longitude: 49.867092,
};

const RegisterMapPicker = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = _styles;
  const { registerForm, updateRegisterForm } = useMainContext();

  const handleConfirm = () => {
    updateRegisterForm({
      latitude: DEFAULT_COORDINATE.latitude.toFixed(6),
      longitude: DEFAULT_COORDINATE.longitude.toFixed(6),
      address:
        registerForm.address.trim() ||
        `${DEFAULT_COORDINATE.latitude.toFixed(6)}, ${DEFAULT_COORDINATE.longitude.toFixed(6)}`,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.mapScreenContainer}>
      <View style={styles.mapHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')} />
        </TouchableOpacity>
        <Text style={styles.mapTitle}>Choose from map</Text>
        <View style={styles.mapHeaderSpacer} />
      </View>

      <View style={styles.mapCard}>
        <Text style={styles.mapHint}>Map is disabled. Default location is used.</Text>
        <View style={styles.mapFooter}>
          <Text style={styles.mapCoordinateText}>
            Latitude: {DEFAULT_COORDINATE.latitude.toFixed(6)}
          </Text>
          <Text style={styles.mapCoordinateText}>
            Longitude: {DEFAULT_COORDINATE.longitude.toFixed(6)}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Use default location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterMapPicker;