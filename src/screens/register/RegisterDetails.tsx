import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _styles from './styles';
const RegisterDetails = () => {
  const navigation = useNavigation();
  const styles = _styles;

  const [restaurantName, setRestaurantName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerDetails}>
    
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
          <View style={styles.stepActiveBox}>
          <Image source={require('../../assets/images/icon/person.png')}/>
          </View>
          <Text style={styles.stepTextActive}>Account Details</Text>
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
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., name@example.com"
          placeholderTextColor="#7A7A7A"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <View
          style={styles.selectInput}>
          <Text style={styles.phonePlaceholderText}>
            +994
          </Text>
          <Text style={styles.placeholderText}>
            Phone Number
          </Text>
        </View>

        <Text style={styles.label}>Password</Text>
        <View
          style={styles.selectPhoneInput}>
          <Text style={styles.placeholderText}>
            Enter Password
          </Text>
          <Image style={styles.mapIcon} source={require('../../assets/images/icon/Hide.png')}/>

        </View>
           <Text style={styles.label}>Confirm Password</Text>
        <View
          style={styles.selectPhoneInput}>
          <Text style={styles.placeholderText}>
            Enter Password
          </Text>
          <Image style={styles.mapIcon} source={require('../../assets/images/icon/Hide.png')}/>

        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegisterDoc' as never)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterDetails;
