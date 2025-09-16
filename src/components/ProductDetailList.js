import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import ProductGroupItem from "./ProductGroupItem";
import AlertIcon from "../assets/Icon/circle-exclamation-sharp-duotone-solid.svg"; 

const { height, width } = Dimensions.get("window");

export default function ProductDetailList({ priceData = [], warehouseData = [] }) {

  // ถ้าไม่มี priceData ให้สร้าง groupedData จาก warehouseData โดยไม่ต้องใช้ priceItem
  const groupedData =
    priceData && priceData.length > 0
      ? priceData.map(priceItem => {
          const relatedWarehouse = warehouseData.filter(
            whItem => whItem.PRODUCTCODE === priceItem.PRODUCTCODE
          );
          return { dataPrice: priceItem, dataWarehouse: relatedWarehouse };
        })
      : warehouseData.length > 0
      ? warehouseData.map(whItem => ({
          dataPrice: null, // ไม่มี price
          dataWarehouse: [whItem], // เก็บเป็น array ของ warehouse item
        }))
      : [];

  // ถ้าไม่มี priceData และ warehouseData
  if (groupedData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AlertIcon width={100} height={100} fill="#ff5252" />
        <Text style={styles.emptyTitle}>ບໍ່ພົບຂໍ້ມູນສິນຄ້າ</Text>
        <Text style={styles.emptySubtitle}>ກະລຸນາລອງຄົ້ນຫາຫຼືເພີ່ມຂໍ້ມູນໃໝ່</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    {groupedData.map((item, index) => {
      const priceCode = item.dataPrice?.PRODUCTCODE || "";
      const warehouseCode = item.dataWarehouse[0]?.PRODUCTCODE || "";
      const key = `${priceCode}-${warehouseCode}-${index}`; // key แน่ใจว่าไม่ซ้ำ
      return (
        <ProductGroupItem
          key={key}
          dataPrice={item.dataPrice}
          dataWarehouse={item.dataWarehouse}
        />
      );
    })}
  </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: {
    height: height * 0.8,
    width: width * 0.92,
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
