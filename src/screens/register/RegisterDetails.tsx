import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _styles from './styles';
import { RootStackParamList } from '../../navigation/stack';
import { useMainContext } from '../../context/MainContext';

const RegisterDetails = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = _styles;
  const { registerForm, updateRegisterForm, clearSubmitError } = useMainContext();
  const [validationMessage, setValidationMessage] = useState('');

  const handleContinue = () => {
    if (
      !registerForm.email.trim() ||
      !registerForm.phone.trim() ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      setValidationMessage('Please complete your account details.');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setValidationMessage('Password and confirm password must match.');
      return;
    }

    clearSubmitError();
    setValidationMessage('');
    navigation.navigate('RegisterDoc');
  };

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
          keyboardType="email-address"
          autoCapitalize="none"
          value={registerForm.email}
          onChangeText={text => updateRegisterForm({ email: text })}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#7A7A7A"
          keyboardType="phone-pad"
          value={registerForm.phone}
          onChangeText={text => updateRegisterForm({ phone: text })}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#7A7A7A"
          secureTextEntry
          value={registerForm.password}
          onChangeText={text => updateRegisterForm({ password: text })}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#7A7A7A"
          secureTextEntry
          value={registerForm.confirmPassword}
          onChangeText={text => updateRegisterForm({ confirmPassword: text })}
        />

        {validationMessage ? (
          <Text style={styles.errorText}>{validationMessage}</Text>
        ) : null}
      </View>

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

export default RegisterDetails;
