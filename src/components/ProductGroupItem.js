// src/components/ProductGroupItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DataPrice from "./DataPrice";
import DataWarehouseItem from "./DataWarehouseItem";

export default function ProductGroupItem({ dataPrice, dataWarehouse = [] }) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Information</Text>
        <Text style={styles.productCode}>{dataPrice?.CURRENCYCODE}</Text>
      </View>
      
      {/* Body Section */}
      <View style={styles.body}>
        {/* Price Information */}
        <View style={styles.priceSection}>
          <Text style={styles.sectionTitle}>Price Information</Text>
          <DataPrice item={dataPrice} />
        </View>
        
        {/* Warehouse Information */}
        {dataWarehouse && dataWarehouse.length > 0 && (
          <View style={styles.warehouseSection}>
            <Text style={styles.sectionTitle}>Warehouse Information</Text>
            {dataWarehouse.map((whItem, index) => (
              <DataWarehouseItem 
                key={`${whItem.PRODUCTCODE}-${whItem.WAREHOUSE}-${whItem.LOCATION}-${index}`} 
                item={whItem} 
              />
            ))}
          </View>
        )}
      </View>
      
      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {dataWarehouse?.length || 0} warehouse location(s)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#0051a2",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  productCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  body: {
    padding: 16,
  },
  priceSection: {
    marginBottom: 20,
  },
  warehouseSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0051a2",
    marginBottom: 12,
  },
  footer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});