import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import _styles from './styles';

const RegisterSumbit = () => {
  const navigation = useNavigation();
  const styles = _styles;


  return (
    <View style={styles.container}>
        <View style={styles.submitForm}>
        <Image source={require('../../assets/images/icon/submitCheck.png')}/>
        <Text style={styles.sumbitText}>Application Submitted</Text>
        <Text style={styles.sumbitSubText}>Your application has been submitted. We'll email you once your restaurant is verified and ready to use</Text>
        </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={()=> navigation.navigate('GoSubscription' as never)}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterSumbit;
