import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import ArrowBackDuotone from '../assets/Icon/circle-caret-left-sharp-duotone-solid.svg';

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ArrowBackDuotone width={60} height={60} fill="#6a6a6a" />
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
