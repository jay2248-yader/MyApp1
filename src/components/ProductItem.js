// src/components/ProductItem.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProductItem({ product }) {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>ລະຫັດສິນຄ້າ: {product.CODE}</Text>
      <Text style={styles.name}>{product.NAMEEN}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
    marginBottom: 2,
  },
  nameThai: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});
