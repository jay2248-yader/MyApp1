import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ProductDetailList from "../components/ProductDetailList";

export default function ProductScreen({ route }) {
  const { qrData, qrType, product, productCode } = route.params || {};

  return (
    <View style={styles.container}>
      <ProductDetailList />
      {productCode ? (
        <View style={styles.codeBox}>
          <Text style={styles.codeTitle}>Product Code</Text>
          <Text style={styles.codeText}>{productCode}</Text>
        </View>
      ) : null}
      {qrData ? (
        <View style={styles.codeBox}>
          <Text style={styles.codeTitle}>Scanned Code</Text>
          <Text style={styles.codeText}>{qrData}</Text>
          {qrType ? <Text style={styles.typeText}>Type: {qrType}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#408ee0" },
  codeBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#0051a2",
  },
  codeText: {
    fontSize: 16,
    color: "#222",
    marginBottom: 4,
  },
  typeText: {
    fontSize: 14,
    color: "#555",
  },
});
