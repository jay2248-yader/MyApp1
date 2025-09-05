import React from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";
import ProductDetailList from "../components/ProductDetailList";
import usePriceData from "../hooks/usePriceData";

export default function ProductScreen({ route }) {
  const { qrData, qrType, productCode } = route.params || {};

  const { priceData, warehouseData, loading, error, usedCode } = usePriceData({ productCode, qrData });

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {usedCode && (
          <View style={styles.codeBox}>
            <Text style={styles.codeTitle}>Code Used</Text>
            <Text style={styles.codeText}>{usedCode}</Text>
          </View>
        )}

        {qrData && (
          <View style={styles.codeBox}>
            <Text style={styles.codeTitle}>Scanned Code</Text>
            <Text style={styles.codeText}>{qrData}</Text>
            {qrType && <Text style={styles.typeText}>Type: {qrType}</Text>}
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Product Details:</Text>
          {loading && <ActivityIndicator size="large" color="#fff" />}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          {!loading && !error && (
            <ProductDetailList
              priceData={priceData}
              warehouseData={warehouseData} // <-- ตรงนี้สำคัญ
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#408ee0" 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
});
