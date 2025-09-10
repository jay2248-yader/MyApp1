import { useState } from "react";
import { Alert } from "react-native";
import { login as loginApi } from "../api/users";
import useAppNavigation from "../navigation/useAppNavigation";

export default function useLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("VT"); // default branch/site
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

      // ส่ง value (site) ไป backend
      const { data } = await loginApi(employeeId, password, value);
      
      // ตรวจสอบ response
      if (typeof data === "string" && data.includes("<!DOCTYPE html>")) {
        throw new Error(
          "Server returned HTML instead of JSON. Please check if the API server is running."
        );
      }

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
