import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

const CscLoading = ({ isLoading, size = 100, onLoadingComplete }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;

    if (isLoading) {
      animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      spinValue.stopAnimation();
      spinValue.setValue(0);
      if (onLoadingComplete) onLoadingComplete();
    }

    return () => spinValue.stopAnimation();
  }, [isLoading, onLoadingComplete]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.loader,
          {
            width: size + 50,
            height: size + 50,
            borderRadius: (size + 50) / 2,
            borderTopColor: '#00aaff',
            transform: [{ rotate: spin }],
          },
        ]}
      />
      <Image
        source={require('../assets/artboard.png')}
        style={{ width: size, height: size, position: 'absolute' }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    zIndex: 5000,
  },
  loader: {
    borderWidth: 8,
    borderColor: 'transparent',
  },
});

export default CscLoading;
