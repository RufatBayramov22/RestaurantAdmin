import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import _styles from './styles';

const RegisterDoc = () => {
  const navigation = useNavigation();
  const styles = _styles;
  const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Unknown error:', err);
      }
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
        {selectedFile && (
          <View style={styles.selectedFileBox}>
            <Text style={styles.selectedFileName}>{selectedFile.name}</Text>
          </View>
        )}
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegisterSumbit' as never)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterDoc;
