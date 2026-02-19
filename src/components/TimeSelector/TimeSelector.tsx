import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const generateTimeSlots = (startHour = 9, endHour = 24, interval = 30) => {
  const times: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const h = hour.toString().padStart(2, '0');
    times.push(`${h}:00`);
    if (interval === 30) {
      times.push(`${h}:30`);
    }
  }
  return times;
};

const TimeSelector = () => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const times = generateTimeSlots();

  return (
    <FlatList
      data={times}
      keyExtractor={(item) => item}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isSelected = item === selectedTime;
        return (
          <TouchableOpacity
            style={[styles.timeBox, isSelected && styles.activeBox]}
            onPress={() => setSelectedTime(item)}
          >
            <Text style={[styles.timeText, isSelected && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {

    paddingVertical: 10,
  },
  timeBox: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingVertical: 14,
    margin: 6,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,

  },
  activeBox: {
    backgroundColor: '#2176FF',
  },
  timeText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  activeText: {
    color: '#fff',
  },
});

export default TimeSelector;
