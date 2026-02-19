
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

type DotIndicatorProps = {
  currentStep: number;
  stepsCount: number;
};

const DotIndicator: React.FC<DotIndicatorProps> = ({ currentStep, stepsCount }) => {

  
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: stepsCount }, (_, i) => {
        const stepIndex = i + 1;
        return (
          <View
            key={stepIndex}
            style={[
              styles.dot,
              currentStep === stepIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

export default DotIndicator;
