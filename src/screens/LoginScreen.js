// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput";
import PassInput from "../components/PassInput";
import BranchDropdown from "../components/BranchDropdown";
import Button from "../components/LoginButton";
import { login as loginApi } from "../api/users";

export default function LoginScreen({ navigation }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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
      setErrorID("ກະລຸນາປ້ອນລະຫັດພະນັກງານ!");
      hasError = true;
    }

    if (!password) {
      setErrorPass("ກະລຸນາປ້ອນລະຫັດຜ່ານ!");
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      const { data } = await loginApi(employeeId, password);
      console.log("Login success:", data);
      navigation.navigate("Home", {
        employeeId: data?.userCODE || employeeId,
        branch: value,
        user: data,
      });
    } catch (e) {
      const serverMsg = e?.response?.data;
      const msg = typeof serverMsg === "string"
        ? serverMsg
        : (serverMsg?.message || "ເຊື່ອມຕໍ່ API ບໍ່ໄດ້");
      Alert.alert("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", msg);
    } finally {
      setLoading(false);
    }
  };

  


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.header, { fontFamily: "NotoSansLao" }]}>
          ລະບົບ
        </Text>

        <BranchDropdown
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={(val) => {
            setValue(val);
            if (val) setComboboxError("");
          }}
          error={comboboxError}
        />

        <CustomInput
          placeholder="ລະຫັດພະນັກງານ"
          value={employeeId}
          onChangeText={(text) => {
            setEmployeeId(text);
            if (text) setErrorID("");
          }}
          error={errorID}
        />

        <PassInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text) setErrorPass("");
          }}
          error={errorPass}
        />

        <Button
          title="ເຂົ້າສູ່ລະບົບ"
          onPress={handleLogin}
          loading={loading}
        />
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
});
