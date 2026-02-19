import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import _styles from './styles';

const RegisterStep1 = () => {
  const navigation = useNavigation();
  const styles = _styles;

  const [restaurantName, setRestaurantName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');

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
      <View style={styles.form}>
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter restaurant name"
          placeholderTextColor="#7A7A7A"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />

        <Text style={styles.label}>Cuisine Type</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => console.log('Select cuisine')}>
          <Text style={styles.placeholderText}>
            {cuisineType || 'Select cuisine type'}
          </Text>
          {/* <Icon name="chevron-down" size={18} color="#888" /> */}
        </TouchableOpacity>

        <Text style={styles.label}>Add Restaurant Location</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => console.log('Choose from map')}>
          <Image style={styles.mapIcon} source={require('../../assets/images/icon/location.png')}/>
          <Text style={styles.placeholderText}>
            {location || 'Choose from map'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={()=> navigation.navigate('RegisterDetails' as never)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterStep1;
