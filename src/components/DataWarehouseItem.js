// src/components/DataWarehouseItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DataWarehouseItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        ສາງ: <Text style={styles.value}>( {item.WAREHOUSE}-{item.LOCATION} ) {item.WHNAME}</Text>
      </Text>
      <Text style={styles.label}>
        ຫົວໜ່ວຍ: <Text style={styles.value}>{item.UNITNAME}</Text>
      </Text>
      <Text style={styles.label}>
        ຈຳນວນ:{" "}
        <Text style={[styles.value, item.STOCKQTY > 0 ? styles.inStock : styles.outStock]}>
          {item.STOCKQTY}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0051a2",
    marginBottom: 6,
  },
  codeText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  value: {
    fontWeight: "600",
    color: "#222",
  },
  inStock: {
    color: "green",
  },
  outStock: {
    color: "red",
  },
});
