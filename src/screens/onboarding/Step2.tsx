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

const Step2: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.step1}>
      <View style={styles.step1Component}>
        <Image source={require('../../assets/images/step2.png')} />
        <View>
          <Text style={styles.step1Title}>Keep Your Menu Up to Date</Text>
          <Text style={styles.step1Subtitle}>
            Add meals, update prices, and edit ingredients anytime{' '}
          </Text>
        </View>
      </View>
      <DotIndicator currentStep={currentStep} stepsCount={totalSteps} />
    </View>
  );
};

export default Step2;
