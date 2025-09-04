import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

/**
 * Custom hook สำหรับ navigation ของแอป
 * แยกออกจาก component หรือ hook หลัก
 */
export default function useAppNavigation() {
  const navigation = useNavigation();

  const resetToHome = useCallback((params) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home", params }],
    });
  }, [navigation]);

  const resetToLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }, [navigation]);

  const goToScanQR = useCallback(() => {
    navigation.navigate("ScanQR");
  }, [navigation]);

  return {
    resetToHome,
    resetToLogin,
    goToScanQR,
  };
}
