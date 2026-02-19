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

const Step3: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.step1}>
      <View style={styles.step1Component}>
        <Image source={require('../../assets/images/step3.png')} />
        <View>
          <Text style={styles.step1Title}>Track Your Restaurant’s Growth</Text>
          <Text style={styles.step1Subtitle}>
            Access real-time stats to make smarter business decisions
          </Text>
        </View>
      </View>
      <DotIndicator currentStep={currentStep} stepsCount={totalSteps} />
    </View>
  );
};

export default Step3;
