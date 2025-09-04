import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import PassInput from "../components/PassInput";
import BranchDropdown from "../components/BranchDropdown";
import Button from "../components/LoginButton";
import useLogin from "../hooks/useLogin";

export default function LoginScreen({ navigation }) {
  const {
    employeeId,
    setEmployeeId,
    password,
    setPassword,
    value,
    setValue,
    loading,
    errorID,
    errorPass,
    comboboxError,
    handleLogin,
  } = useLogin(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.header, { fontFamily: "NotoSansLao" }]}>
          ໂປຣແກຣມກວດລາຄາ ແລະ ສະຕັອກ
        </Text>

        <BranchDropdown
          open={false}
          value={value}
          setOpen={() => {}}
          setValue={(val) => {
            setValue(val);
          }}
          error={comboboxError}
        />

        <CustomInput
          placeholder="ລະຫັດພະນັກງານ"
          value={employeeId}
          onChangeText={setEmployeeId}
          error={errorID}
        />

        <PassInput
          value={password}
          onChangeText={setPassword}
          error={errorPass}
        />

        <Button title="ເຂົ້າສູ່ລະບົບ" onPress={handleLogin} loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0051a2", justifyContent: "center", alignItems: "center" },
  box: { width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10 },
  header: { fontSize: 22, fontWeight: "bold", color: "black", textAlign: "center", marginBottom: 20 },
});
