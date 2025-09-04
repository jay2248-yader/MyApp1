import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; 

export default function QrScanButton({ title = "Scan QR", onPress, loading }) {
  return (
    <TouchableOpacity
      style={[styles.button, loading ? styles.disabled : null]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>
          <FontAwesome5 name="qrcode" size={50} color="#fff" /> {" "}{title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0051a2", 
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: "#fff",
    fontFamily: "NotoSansLao",
    fontWeight: "bold",
  },
});
