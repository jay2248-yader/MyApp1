import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back-circle" size={42} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0051a2',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    button: {
    padding: 8,
  },
        borderRadius: 15,
  },
});
