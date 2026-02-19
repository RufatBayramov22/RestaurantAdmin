import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import DotIndicator from './Dot';


type Props = {
  onContinue: () => void;
  currentStep: number;
  totalSteps: number;
  onSkip?: () => void;
};

const Step1: React.FC<Props> = ({currentStep , totalSteps}) => {
  return (
    <View style={styles.step1}>
      <View style={styles.step1Component}>
        <Image source={require('../../assets/images/step1.png')} />
        <View>
          <Text style={styles.step1Title}>Manage Reservations Easily</Text>
          <Text style={styles.step1Subtitle}>
            Manage reservations, announcements, and customers - all in one place
          </Text>
        </View>
      </View>
      <DotIndicator currentStep={currentStep} stepsCount={totalSteps} />
    </View>
  );
};

export default Step1;
