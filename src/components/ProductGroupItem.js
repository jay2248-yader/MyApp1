// src/components/ProductGroupItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DataPrice from "./DataPrice";
import DataWarehouseItem from "./DataWarehouseItem";
import { Table, Row } from "react-native-table-component";

export default function ProductGroupItem({ dataPrice, dataWarehouse = [] }) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ຂໍ້ມູນສິນຄ້າ</Text>
        <Text style={styles.productCode}>{dataPrice?.CURRENCYCODE}</Text>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        {/* Price Information */}
        <View style={styles.priceSection}>
          <DataPrice item={dataPrice} />
        </View>

        {/* Warehouse Information */}
        {dataWarehouse && dataWarehouse.length > 0 && (
          <View style={styles.warehouseSection}>
            {/* Table Header */}
            <Table borderStyle={{ borderWidth: 1, borderColor: "#e9ecef" }}>
              <Row
                data={["ສາງ", "ຫົວໜ່ວຍ", "ຈຳນວນ"]}
                flexArr={[2, 1, 1]}
                style={styles.tableHeader}
                textStyle={styles.tableHeaderText}
              />
            </Table>

            {/* Data Rows */}
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "NotoSansLao-Regular",
  },
  productCode: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    fontFamily: "NotoSansLao-Regular",
    backgroundColor: "#89bff8",
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
  tableHeader: {
    height: 40,
    backgroundColor: "#f0f7ff",
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0051a2",
    textAlign: "center",
    fontFamily: "NotoSansLao-Regular",
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
