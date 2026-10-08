import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import styles from './styles';

interface QrScanPremiumProps {
  onBack: () => void;
  onRead: (code: string) => void;
}

const QrScanPremium: React.FC<QrScanPremiumProps> = ({ onBack, onRead }) => {
  const [flash, setFlash] = useState(false);
  const [scanLocked, setScanLocked] = useState(false);

  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleRead = useCallback((event: { nativeEvent: { codeStringValue: any; }; }) => {
    if (scanLocked) return;

    const code = event?.nativeEvent?.codeStringValue;
    if (!code) return;

    setScanLocked(true);
    onRead && onRead(code);

    setTimeout(() => {
      setScanLocked(false);
    }, 2000);
  }, [scanLocked]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* CAMERA */}
      <Camera
        style={styles.camera}
        cameraType={CameraType.Back}
        scanBarcode
        onReadCode={handleRead}
        flashMode={flash ? 'on' : 'off'}
      />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Scan QR</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* OVERLAY */}
      <View style={styles.overlay}>
        <View style={styles.frame}>
          {/* Corners */}
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          {/* Scan Line */}
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY: scanAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 230],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <Text style={styles.scanText}>Align QR code inside frame</Text>
      </View>

      {/* BOTTOM PANEL */}
      <View style={styles.bottomPanel}>
        <TouchableOpacity onPress={() => setFlash(!flash)}>
          <Text style={styles.actionText}>
            {flash ? 'Flash Off' : 'Flash On'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScanLocked(false)}>
          <Text style={styles.actionText}>Scan Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QrScanPremium;