import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../../navigation/stack';

import _styles from './styles';
import { loginRestaurant } from '../../services/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = _styles;

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setSubmitError('Please enter email and password.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      await loginRestaurant({
        email: email.trim(),
        password,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        const responseErrors = Array.isArray(responseData?.Errors)
          ? responseData.Errors.join('\n')
          : Array.isArray(responseData?.errors)
            ? responseData.errors.join('\n')
            : null;

        const responseMessage =
          responseData?.message ||
          responseData?.Message ||
          responseData?.title ||
          responseErrors ||
          error.message;

        setSubmitError(
          typeof responseMessage === 'string'
            ? responseMessage
            : 'Login failed. Please try again.',
        );
      } else {
        setSubmitError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon/left.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.headerSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.loginInfo}>
        <Text style={styles.title}>Log in</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., name@example.com"
          placeholderTextColor="#7A7A7A"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (submitError) {
              setSubmitError('');
            }
          }}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#7A7A7A"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (submitError) {
              setSubmitError('');
            }
          }}
        />

        {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}>
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          disabled={isSubmitting}
          onPress={handleLogin}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
