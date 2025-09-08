import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; 

export default function QrScanButton({ onPress, loading }) {
  return (
    <TouchableOpacity
      style={[styles.button, loading ? styles.disabled : null]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <FontAwesome5 name="qrcode" size={50} color="#0051a2" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
