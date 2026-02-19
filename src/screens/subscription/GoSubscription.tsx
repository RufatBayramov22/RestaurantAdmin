import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _styles from './styles';

const GoSubscription = () => {
  const navigation = useNavigation();
  const styles = _styles;

  return (
    <View style={styles.container}>
      <View style={styles.centerBox}>
        <Image
          source={require('../../assets/images/icon/lock.png')}
          style={styles.lockIcon}
          resizeMode="contain"
        />
        <Text style={styles.messageText}>
          Please activate a subscription plan before adding restaurant information
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterDetails' as never)}
      >
        <Text style={styles.buttonText}>Go to Subscription</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoSubscription;
