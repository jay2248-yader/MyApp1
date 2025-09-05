// src/components/DataPrice.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DataPrice({ item }) {
  const formattedDate = item.DOCDATE ? item.DOCDATE.split("T")[0] : "";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(item.SALEPRICE1);

  return (
    <View style={styles.priceBox}>
      <Text style={styles.codeText}>{item.PRODUCTCODE}</Text>
      <Text style={styles.priceText}>ວັນທີປັບລາຄາ: {formattedDate}</Text>
      <Text style={styles.priceText}>{item.PRODUCTNAME}</Text>
      <Text style={styles.priceText}>ຫົວໜ່ວຍ: {item.UNITCODE}</Text>
      <Text style={styles.priceText}>
        ລາຄາ: {formattedPrice} {item.CURRENCYCODE}
      </Text>
      {item.REMARK ? (
        <Text style={styles.remarkText}>💬 {item.REMARK}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  priceBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    padding: 0,
  },
  codeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0051a2",
    marginBottom: 6,
  },
  priceText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  remarkText: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
    fontStyle: "italic",
  },
});
