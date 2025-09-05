import React from "react";
import { TextInput, Text, StyleSheet } from "react-native";

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  fontFamily = "NotoSansLao",
}) {
  return (
    <>
      <TextInput
        style={[
          styles.input,
          { fontFamily },
          error ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      {error ? (
        <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    color: "black",
    padding: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: -15,
    marginBottom: 20,
    textAlign: "left",
  },
});
