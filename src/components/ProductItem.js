// src/components/ProductItem.jsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProductItem({ product, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Text style={styles.code}>ລະຫັດສິນຄ້າ: {product.CODE}</Text>
        <Text style={styles.name}>{product.NAMEEN}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    // React Native doesn't use boxShadow, use these instead
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  code: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0051a2',
    marginBottom: 6,
    letterSpacing: 0.5,
        fontFamily: "NotoSansLao-Regular",
  },
  name: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
    letterSpacing: 0.3,
    fontFamily: "NotoSansLao-Regular",
  },
});
