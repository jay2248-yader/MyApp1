import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import PassInput from "../components/PassInput";
import BranchDropdown from "../components/BranchDropdown";
import Button from "../components/LoginButton";
import useLogin from "../hooks/useLogin";

export default function LoginScreen({ navigation, fontFamily = "NotoSansLao" }) {
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
  } = useLogin(); 

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.header, { fontFamily }]}>
          ໂປຣແກຣມກວດລາຄາ ແລະ ສະຕັອກ
        </Text>

        <BranchDropdown
          value={value}
          setValue={setValue} // อัปเดตค่า branch
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

        <Button
          title="ເຂົ້າສູ່ລະບົບ"
          onPress={handleLogin} // handleLogin ใน hook จะส่ง branch/value เป็น site ไป backend
          loading={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#408ee0", justifyContent: "center", alignItems: "center" },
  box: { width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10 },
  header: { fontSize: 22, fontWeight: "bold", color: "black", textAlign: "center", marginBottom: 20 },
});
