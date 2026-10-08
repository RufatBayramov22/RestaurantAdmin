import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import _styles from './styles';
import { RootStackParamList } from '../../navigation/stack';
import { useMainContext } from '../../context/MainContext';
import { CuisineOption, fetchCuisineTypes } from '../../services/cuisineTypes';

const RegisterStep1 = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = _styles;
  const { registerForm, updateRegisterForm, clearSubmitError } = useMainContext();
  const [validationMessage, setValidationMessage] = useState('');
  const [isCuisineDropdownVisible, setIsCuisineDropdownVisible] = useState(false);
  const [cuisineOptions, setCuisineOptions] = useState<CuisineOption[]>([]);
  const [isCuisineLoading, setIsCuisineLoading] = useState(false);
  const [cuisineError, setCuisineError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCuisineTypes = async () => {
      setIsCuisineLoading(true);
      setCuisineError('');

      try {
        const options = await fetchCuisineTypes();

        if (!isMounted) {
          return;
        }

        setCuisineOptions(options);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCuisineOptions([]);
        setCuisineError('Unable to load cuisine types. Please try again later.');
      } finally {
        if (isMounted) {
          setIsCuisineLoading(false);
        }
      }
    };

    loadCuisineTypes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinue = () => {
    if (
      !registerForm.name.trim() ||
      !registerForm.cuisineTypeId.trim() ||
      !registerForm.address.trim() ||
      !registerForm.latitude.trim() ||
      !registerForm.longitude.trim()
    ) {
      setValidationMessage('Please fill in the required restaurant details.');
      return;
    }

    clearSubmitError();
    setValidationMessage('');
    navigation.navigate('RegisterDetails');
  };

  const handleCuisineSelect = (id: string, name: string) => {
    updateRegisterForm({
      cuisineTypeId: id,
      cuisineTypeName: name,
    });
    setValidationMessage('');
    setIsCuisineDropdownVisible(false);
  };

  const locationText = `${registerForm.latitude}, ${registerForm.longitude}`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/images/icon/left.png')}/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.headerLogin}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create Account</Text>

      {/* Step Icons */}
      <View style={styles.stepContainer}>
        <View style={styles.stepItem}>
          <View style={styles.stepActiveBox}>
          <Image source={require('../../assets/images/icon/storefront.png')}/>
          </View>
          <Text style={styles.stepTextActive}>Restaurant Details</Text>
        </View>
        <View style={styles.dash} />
        <View style={styles.stepItem}>
          <View style={styles.stepInactiveBox}>
          <Image source={require('../../assets/images/icon/person.png')}/>
          </View>
          <Text style={styles.stepTextInactive}>Account Details</Text>
        </View>
        <View style={styles.dash} />
        <View style={styles.stepItem}>
           <View style={styles.stepInactiveBox}>
          <Image source={require('../../assets/images/icon/doc.png')}/>
          </View>
          <Text style={styles.stepTextInactive}>Registration Document</Text>
        </View>
      </View>

      {/* Form Fields */}
      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter restaurant name"
          placeholderTextColor="#7A7A7A"
          value={registerForm.name}
          onChangeText={text => updateRegisterForm({ name: text })}
        />

        <Text style={styles.label}>Cuisine Type</Text>
        <TouchableOpacity
          style={styles.selectInput}
          activeOpacity={0.9}
          onPress={() => setIsCuisineDropdownVisible(currentValue => !currentValue)}>
          <Text
            style={
              registerForm.cuisineTypeName
                ? styles.selectValueText
                : styles.placeholderText
            }>
            {registerForm.cuisineTypeName || 'Select cuisine type'}
          </Text>
          <Text style={styles.selectArrow}>⌄</Text>
        </TouchableOpacity>

        {isCuisineDropdownVisible ? (
          <View style={styles.dropdownContainer}>
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              style={styles.dropdownScroll}>
              {isCuisineLoading ? (
                <View style={styles.dropdownOption}>
                  <Text style={styles.dropdownOptionText}>Loading cuisine types...</Text>
                </View>
              ) : null}

              {!isCuisineLoading && cuisineError ? (
                <View style={styles.dropdownOption}>
                  <Text style={styles.dropdownOptionText}>{cuisineError}</Text>
                </View>
              ) : null}

              {!isCuisineLoading && !cuisineError && cuisineOptions.length === 0 ? (
                <View style={styles.dropdownOption}>
                  <Text style={styles.dropdownOptionText}>No cuisine types found.</Text>
                </View>
              ) : null}

              {!isCuisineLoading && !cuisineError
                ? cuisineOptions.map(option => {
                    const isSelected = registerForm.cuisineTypeId === option.id;

                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.dropdownOption,
                          isSelected && styles.dropdownOptionSelected,
                        ]}
                        onPress={() => handleCuisineSelect(option.id, option.name)}>
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            isSelected && styles.dropdownOptionTextSelected,
                          ]}>
                          {option.name}
                        </Text>
                        <Text style={styles.dropdownOptionId}>#{option.id}</Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </ScrollView>
          </View>
        ) : null}

        <Text style={styles.label}>Add Restaurant Location</Text>
        <View style={styles.selectInput}>
          <Image
            style={styles.locationIcon}
            source={require('../../assets/images/icon/location.png')}
          />
          <Text numberOfLines={1} style={styles.selectValueText}>
            {locationText}
          </Text>
        </View>

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter restaurant address"
          placeholderTextColor="#7A7A7A"
          value={registerForm.address}
          onChangeText={text => updateRegisterForm({ address: text })}
        />

        <View style={styles.coordinateRow}>
          <View style={styles.coordinateCard}>
            <Text style={styles.coordinateLabel}>Latitude</Text>
            <Text style={styles.coordinateValue}>
              {registerForm.latitude || 'Not selected'}
            </Text>
          </View>
          <View style={styles.coordinateCard}>
            <Text style={styles.coordinateLabel}>Longitude</Text>
            <Text style={styles.coordinateValue}>
              {registerForm.longitude || 'Not selected'}
            </Text>
          </View>
        </View>


        {validationMessage ? (
          <Text style={styles.errorText}>{validationMessage}</Text>
        ) : null}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default RegisterStep1;
