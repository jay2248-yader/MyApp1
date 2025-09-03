import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScanQrScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const scannedRef = useRef(false); // ใช้ ref เพื่อ block sync ทันที

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scannedRef.current) {
      scannedRef.current = true; // บล็อกการสแกนซ้ำทันที
      Alert.alert("Scanned!", `Type: ${type}\nData: ${data}`, [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack(); // ปิดหน้ากล้องหลัง Alert
          },
        },
      ]);
    }
  };

  if (!permission) return <Text>Requesting camera permission...</Text>;
  if (!permission.granted) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128"],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
