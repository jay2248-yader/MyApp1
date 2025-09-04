import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProductDetailList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>page ProductDetailList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#408ee0",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
