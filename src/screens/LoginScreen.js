import { View, Text, StyleSheet, Image } from "react-native";
import CustomInput from "../components/CustomInput";
import PassInput from "../components/PassInput";
import BranchDropdown from "../components/BranchDropdown";
import Button from "../components/LoginButton";
import useLogin from "../hooks/useLogin";

export default function LoginScreen({
  navigation,
  fontFamily = "NotoSansLao",
}) {
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
    <View style={styles.logoBox}>
        <Image
          source={require("../assets/LogoAPP2.webp")}
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <View style={styles.box}>
        <View style={styles.headerRow}>
          <Text style={[styles.header, { fontFamily }]}>
            ໂປຣແກຣມກວດລາຄາ ແລະ ສະຕັອກ
          </Text>
        </View>

        <BranchDropdown
          value={value}
          setValue={setValue}
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
  container: {
    flex: 1,
    backgroundColor: "#408ee0",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flexShrink: 1,
  },
logoBox: {
  width: 150,     
  height: 150,
  backgroundColor: "#fff",
  borderRadius: 15,  
  justifyContent: "center",
  alignItems: "center",
  marginTop: -50,
  marginBottom: 10,


  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 5, 
},

logo: {
  width: "80%", 
  height: "80%",
},
});
