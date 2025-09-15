// src/components/ProductDetailList.js
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProductGroupItem from "./ProductGroupItem";
import AlertIcon from "../assets/Icon/circle-exclamation-sharp-duotone-solid.svg"; 

const { height, width } = Dimensions.get("window");
export default function ProductDetailList({ priceData = [], warehouseData = [] }) {


  if (!priceData || priceData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AlertIcon width={100} height={100} fill="#ff5252" />
        <Text style={styles.emptyTitle}>ບໍ່ພົບຂໍ້ມູນສິນຄ້າ</Text>
        <Text style={styles.emptySubtitle}>ກະລຸນາລອງຄົ້ນຫາຫຼືເພີ່ມຂໍ້ມູນໃໝ່</Text>
      </View>
    );
  }

  // Group data by product - create array of { dataPrice, dataWarehouse }
  const groupedData = priceData.map(priceItem => {
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
  container: { flex: 1, },
  emptyContainer: {
 height: height * 0.8, 
    width: width* 0.92, 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
    backgroundColor: "#f9f9f9",
        borderRadius: 10,
    
  },
  emptyTitle: {
        fontFamily: "NotoSansLao-Regular",
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
        fontFamily: "NotoSansLao-Regular",
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
