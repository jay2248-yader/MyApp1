import { useState } from "react";
import { Alert } from "react-native";
import { login as loginApi } from "../api/users";
import useAppNavigation from "../navigation/useAppNavigation";

export default function useLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("vit"); // branch
  const [loading, setLoading] = useState(false);

  const [errorID, setErrorID] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [comboboxError, setComboboxError] = useState("");

  const { resetToHome } = useAppNavigation(); // เรียกใช้ navigation helper

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

      // ใช้ navigation helper
      resetToHome({
        employeeId: data?.userCODE || employeeId,
        branch: value,
        user: data,
      });
    } catch (e) {
      const serverMsg = e?.response?.data;
      const msg =
        typeof serverMsg === "string"
          ? serverMsg
          : serverMsg?.message || "ເຊື່ອມຕໍ່ API ບໍ່ໄດ້";
      Alert.alert("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", msg);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
