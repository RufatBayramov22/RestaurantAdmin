import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, Animated, ViewToken, TouchableOpacity, Text } from 'react-native';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Onboarding: React.FC = () => {
  const stepComponents = [Step1, Step2, Step3];
  const totalSteps = stepComponents.length;
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: Array<ViewToken> }) => {
      if (info.viewableItems.length > 0 && info.viewableItems[0].index != null) {
        setCurrentStep(info.viewableItems[0].index);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      flatListRef.current?.scrollToIndex({ index: currentStep + 1 });
    } else {
      console.log('Navigate to login/register screen');
      // burda navigation ilə login/register səhifəsinə keçə bilərsən
    }
  };

  const StepComponent = stepComponents[currentStep];

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'space-between' }}>
      <Animated.FlatList
        ref={flatListRef}
        data={stepComponents}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item: StepComponent, index }) => (
          <View style={{ width, flex: 1 }}>
            <StepComponent
              currentStep={index + 1}
              totalSteps={totalSteps}
            />
          </View>
        )}
      />

      <View style={{ padding: 24, }}>
        {currentStep === totalSteps - 1 ? (
          <View style={{ gap: 12 , marginBottom:30}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#2176FF',
                height: 48,
                borderRadius: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={()=>navigation.navigate('Register' as never)}
            >
              <Text style={{ color: '#EDEDED', fontSize: 16, fontWeight: '600' }}>Create account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: '#2176FF',
                borderWidth: 1,
                height: 48,
                borderRadius: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={()=>navigation.navigate('Login' as never)}

            >
              <Text style={{ color: '#2176FF', fontSize: 16, fontWeight: '600' }}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={goNext}
            style={{
              backgroundColor: '#2176FF',
              height: 48,
              borderRadius: 48,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <Text style={{ color: '#EDEDED', fontSize: 16, fontWeight: '600' }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Onboarding;
