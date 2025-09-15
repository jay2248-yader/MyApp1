// src/components/DataPrice.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DataPrice({ item }) {
  const formattedDate = item.DOCDATE ? item.DOCDATE.split("T")[0] : "";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(item.SALEPRICE1);

  const isThai = /[\u0E00-\u0E7F]/.test(item.PRODUCTNAME);
  const productFont = isThai ? "NotoSansThai" : "NotoSansLao-Regular";

  return (
    <View style={styles.priceBox}>
      <Text style={styles.codeText}>{item.PRODUCTCODE}</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>ວັນທີປັບລາຄາ:</Text>
        <Text style={styles.dateValue}>{formattedDate}</Text>
      </View>

      <Text style={[styles.priceText, { fontFamily: productFont }]}>
        {item.PRODUCTNAME}
      </Text>

      <Text style={styles.priceText}>
        ຫົວໜ່ວຍ: <Text style={[styles.priceText, { fontFamily: "NotoSansThai" }]}>{item.UNITCODE}</Text>
      </Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>ລາຄາ:</Text>
        <Text style={styles.dateValue}>
          {formattedPrice} {item.CURRENCYCODE}
        </Text>
      </View>
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#0051a2",
    marginBottom: 6,
    fontFamily: "NotoSansLao-Regular",
  },
  priceText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
    paddingLeft: 5,
    fontFamily: "NotoSansLao-Regular",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#e3f2fd",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 20,
    color: "#1565c0",
    marginRight: 8,
    fontWeight: "600",
    fontFamily: "NotoSansLao-Regular",
  },
  dateValue: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "NotoSansLao-Regular",
  },
});
