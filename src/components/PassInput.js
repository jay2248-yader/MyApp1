import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

export default function PassInput({
  value,
  onChangeText,
  placeholder = "ລະຫັດຜ່ານ",
  error,
  fontFamily = "NotoSansLao",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            { fontFamily },
            error ? styles.inputError : null,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    color: "black",
    padding: 10,
  },
  inputError: {
    borderColor: "red",
  },
  iconWrapper: {
    padding: 5,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left",
  },
});
