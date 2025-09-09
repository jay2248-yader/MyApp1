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
      <Ionicons name="arrow-back-circle" size={60} color="#6a6a6a" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
     backgroundColor: "rgba(255, 255, 255, 0.6)",
   width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
        borderRadius: 50,
  },
});
