import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import QrCodeDuotone from "../assets/Icon/QrCodeDuotone.svg"; 

export default function QrScanButton({ onPress, loading }) {
  return (
    <TouchableOpacity
      style={[styles.button, loading ? styles.disabled : null]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#0051a2" />
      ) : (
        <QrCodeDuotone width={70} height={70}   style={{ color: "#0051a2" }} /> 
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
  disabled: {
    opacity: 0.6,
  },
});
