import React from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ใช้ไอคอน search

export default function SearchInput({ value, onChangeText, placeholder, onSubmitEditing }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#555" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search..."}
        placeholderTextColor="#888"
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        blurOnSubmit={true}
        onBlur={() => Keyboard.dismiss()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
