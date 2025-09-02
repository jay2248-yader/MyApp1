// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFonts } from "expo-font";

export default function LoginScreen({ onLogin }) {
  const [fontsLoaded] = useFonts({
    NotoSansLao: require("../../assets/fonts/Noto_Sans_Lao/NotoSansLao-VariableFont_wdth,wght.ttf"),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Vientiane", value: "1" },
    { label: "Paksane", value: "2" },
    { label: "Pakse", value: "3" },
  ]);

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorID, setErrorID] = useState("");
  const [errorPass, setErrorPass] = useState(""); 
  const [comboboxError, setComboboxError] = useState("");

  const handleLogin = async () => {
    setErrorID("");
    setErrorPass("");
    setComboboxError("");

    let hasError = false;

    if (!value) {
      setComboboxError("ກະລຸນາເລືອກສາຂາ!");
      hasError = true;
    }

    if (!employeeId) {
      setErrorID("ກະລຸນາປ້ອນຂໍ້ມູນທັງໝົດ!");
      hasError = true;
    }

    if (!password) {
      setErrorPass("ກະລຸນາປ້ອນຂໍ້ມູນທັງໝົດ!");
      hasError = true;
    }

    if (hasError) return;

    if (onLogin) {
      onLogin({ employeeId, password, location: value });
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.header, { fontFamily: "NotoSansLao" }]}>
          ລະບົບ
        </Text>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(val) => {
            setValue(val);
            if (val) setComboboxError("");
          }}
          setItems={setItems}
          placeholder="ເລືອກສາຂາ"
          style={[
            styles.combobox,
            { fontFamily: "NotoSansLao" },
            comboboxError ? styles.inputError : null,
          ]}
          dropDownContainerStyle={styles.dropdown}
          textStyle={{ color: "black", fontFamily: "NotoSansLao" }}
        />
        {comboboxError ? (
          <Text style={[styles.errorText, { fontFamily: "NotoSansLao" }]}>
            {comboboxError}
          </Text>
        ) : null}

        <TextInput
          style={[styles.input, { fontFamily: "NotoSansLao" }]}
          placeholder="ລະຫັດພະນັກງານ"
          placeholderTextColor="#aaa"
          value={employeeId}
          onChangeText={(text) => {
            setEmployeeId(text);
            if (text) setErrorID("");
          }}
        />
        {errorID ? <Text style={styles.errorText}>{errorID}</Text> : null}

        <TextInput
          style={[styles.input, { fontFamily: "NotoSansLao" }]}
          placeholder="ລະຫັດຜ່ານ"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text) setErrorPass("");
          }}
        />

        {errorPass ? <Text style={styles.errorText}>{errorPass}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.buttonText, { fontFamily: "NotoSansLao" }]}>
              ເຂົ້າສູ່ລະບົບ
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0051a2",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },

  combobox: {
    marginBottom: 20,
    borderColor: "black",
    backgroundColor: "white",
  },

  dropdown: { borderColor: "black", backgroundColor: "white" },

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

  button: {
    backgroundColor: "#0051a2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  errorText: {
    fontFamily: "NotoSansLao",
    color: "red",
    marginTop: -15,
    marginBottom: 20,
    textAlign: "left",
  },
});
