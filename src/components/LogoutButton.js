import React from "react";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import LogOutDuotone from "../assets/Icon/arrow-left-from-arc-sharp-duotone-solid.svg"; // ✅ import SVG

export default function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: onLogout },
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handleLogout}
      activeOpacity={0.7}
    >
    <LogOutDuotone width={50} height={50} color="#ff4d4d" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
