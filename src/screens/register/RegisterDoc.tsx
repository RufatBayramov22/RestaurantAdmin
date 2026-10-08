import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _styles from './styles';
import { RootStackParamList } from '../../navigation/stack';
import { useMainContext } from '../../context/MainContext';

const DEFAULT_DOCUMENT_NAME = 'No document selected';

const RegisterDoc = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = _styles;
  const {
    registerForm,
    setRegistrationDocument,
    submitRegisterForm,
    isSubmitting,
    submitError,
    clearSubmitError,
  } = useMainContext();
  const [validationMessage, setValidationMessage] = useState('');

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const selectedFile: DocumentPickerResponse = res[0];

      setRegistrationDocument({
        uri: selectedFile.uri,
        name: selectedFile.name ?? 'registration-document',
        type: selectedFile.type ?? 'application/octet-stream',
      });
      setValidationMessage('');
      clearSubmitError();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  const handleSubmit = async () => {
    if (!registerForm.registrationDocument?.uri?.trim()) {
      setValidationMessage('Please upload your registration document before submitting.');
      clearSubmitError();
      return;
    }

    setValidationMessage('');
    const isSuccess = await submitRegisterForm();

    if (isSuccess) {
      navigation.navigate('RegisterSumbit');
    }
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
            <Image source={require('../../assets/images/icon/storefront.png')} />
          </View>
          <Text style={styles.stepTextActive}>Restaurant Details</Text>
        </View>
        <View style={styles.dash} />
        <View style={styles.stepItem}>
          <View style={styles.stepActiveBox}>
            <Image source={require('../../assets/images/icon/person.png')} />
          </View>
          <Text style={styles.stepTextActive}>Account Details</Text>
        </View>
        <View style={styles.dash} />
        <View style={styles.stepItem}>
          <View style={styles.stepActiveBox}>
            <Image source={require('../../assets/images/icon/doc.png')} />
          </View>
          <Text style={styles.stepTextActive}>Registration Document</Text>
        </View>
      </View>

      {/* Upload Section */}
      <View style={styles.form}>
        <Text style={styles.label}>Upload Business Registration Document</Text>
        <Text style={styles.docInfo}>
          This information is required for verification of your business
        </Text>

        <View style={styles.uploadBox}>
          <Image
            style={styles.uploadIcon}
            source={require('../../assets/images/icon/upload.png')}
          />
          <TouchableOpacity style={styles.browseButton} onPress={handleFilePick}>
            <Text style={styles.browseText}>Browse files</Text>
          </TouchableOpacity>
        </View>

        {/* Selected File Info */}
        <View style={styles.selectedFileBox}>
          <Text style={styles.selectedFileName}>
            {registerForm.registrationDocument?.name || DEFAULT_DOCUMENT_NAME}
          </Text>
        </View>

        {validationMessage ? (
          <Text style={styles.errorText}>{validationMessage}</Text>
        ) : null}

        {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          disabled={isSubmitting}
          onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterDoc;
