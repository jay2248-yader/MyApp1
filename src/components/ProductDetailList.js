// src/components/ProductDetailList.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductGroupItem from "./ProductGroupItem";

export default function ProductDetailList({ priceData = [], warehouseData = [] }) {
  // ถ้าไม่มีข้อมูลทั้งสอง
  if ((!priceData || priceData.length === 0) && (!warehouseData || warehouseData.length === 0)) {
    return <Text style={styles.emptyText}>ไม่มีข้อมูลราคาและคลังสินค้า</Text>;
  }

  // Group data by product - create array of { dataPrice, dataWarehouse }
  const groupedData = priceData.map(priceItem => {
    // Find warehouse data for this product
    const relatedWarehouse = warehouseData.filter(
      whItem => whItem.PRODUCTCODE === priceItem.PRODUCTCODE
    );
    
    return {
      dataPrice: priceItem,
      dataWarehouse: relatedWarehouse
    };
  });

  return (
    <View style={styles.container}>
      {groupedData.map((item, index) => (
        <ProductGroupItem 
          key={`${item.dataPrice.PRODUCTCODE}-${index}`}
          dataPrice={item.dataPrice} 
          dataWarehouse={item.dataWarehouse} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    color: "#aaa",
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
