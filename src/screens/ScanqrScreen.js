import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import useScanQR from "../hooks/useScanQR";

export default function ScanQrScreen({ navigation }) {
  const { permission, BOX_SIZE, handleBarCodeScanned } = useScanQR(navigation);

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

      {/* Overlay */}
      <View style={styles.overlayContainer} pointerEvents="box-none">
        {/* Top mask */}
        <View style={styles.mask} />

        {/* Middle row: left mask, scan box, right mask */}
        <View style={[styles.centerRow, { height: BOX_SIZE }]}> 
          <View style={styles.mask} />
          <View style={[styles.scanBox, { width: BOX_SIZE, height: BOX_SIZE }]}> 
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.mask} />
        </View>

        {/* Bottom mask with hint + back icon */}
        <View style={[styles.mask, styles.bottomArea]}>
          <Text style={styles.hintText}>ຈໍ່ QR code ໃຫ້ຢູ່ໃນກອບ</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <Text style={styles.backText}>ກັບຄືນ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  mask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  centerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  scanBox: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "#00E0A6",
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  bottomArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
    
  },
  hintText: {
    color: "#fff",
    fontSize: 30,
    marginTop: -50,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#0051a2",
    borderRadius: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 6,
  },
});
