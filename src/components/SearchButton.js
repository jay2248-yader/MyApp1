import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import MagnifyingGlass from "../assets/Icon/magnifying-glass-sharp-duotone-solid.svg";

export default function SearchButton({ title, onPress, loading }) {
  return (
    <TouchableOpacity
      style={[styles.button, loading ? styles.disabled : null]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <MagnifyingGlass width={24} height={24} fill="#fff" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#0051a2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansLao",
    fontWeight: "bold",
  },
});
