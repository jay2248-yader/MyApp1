// src/components/DataWarehouseItem.js
import React from "react";
import { Text, StyleSheet } from "react-native";
import { Table, Row } from "react-native-table-component";

export default function DataWarehouseItem({ item }) {
  // เตรียมข้อมูล row
  const rowData = [
    `(${item.WAREHOUSE}-${item.LOCATION})\n${item.WHNAME}`,
    item.UNITNAME,
    item.STOCKQTY.toString(),
  ];

  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: "#e9ecef" }}>
      <Row
        data={rowData}
        style={styles.row}
        textStyle={styles.text}
        flexArr={[2, 1, 1]} // column แรกกว้างกว่าหน่อย
      />
    </Table>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 40,
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "NotoSansLao-Regular",
    fontFamily: "NotoSansThai",
    color: "#495057",
    paddingVertical: 6,
  },
  inStock: {
    color: "#2e7d32", // เขียว
    fontWeight: "600",
  },
  outStock: {
    color: "#d32f2f", // แดง
    fontWeight: "600",
  },
});
