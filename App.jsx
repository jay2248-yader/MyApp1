// App.jsx
import React from "react";
import { Alert } from "react-native";
import LoginScreen from "./src/screens/LoginScreen.jsx";

export default function App() {
  const handleLogin = ({ employeeId, password, location }) => {
    // ตัวอย่างการล็อกข้อมูล
    Alert.alert(
      "Login Info",
      `Employee ID: ${employeeId}\nPassword: ${password}\nLocation: ${location}`
    );
  };

  return <LoginScreen onLogin={handleLogin} />;
}
