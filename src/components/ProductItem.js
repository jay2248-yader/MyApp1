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
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    // แก้ไขจาก shadow* เป็น boxShadow
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  code: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0051a2",
    marginBottom: 3,
  },
  name: {
    fontSize: 13,
    color: "#333",
  },
});
