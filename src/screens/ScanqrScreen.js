import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import useScanQR from "../hooks/useScanQR";

const { width: screenWidth } = Dimensions.get('window');

export default function ScanQrScreen({ navigation }) {
  const { 
    permission, 
    BOX_WIDTH, 
    BOX_HEIGHT, 
    handleBarCodeScanned, 
    resetScanner, 
    scannedData, 
    isScanned 
  } = useScanQR(navigation);

  if (!permission) return <Text>Requesting camera permission...</Text>;
  if (!permission.granted) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "code128","code39",
          ],
        }}
      />

      <View style={styles.overlayContainer}>
        <View style={styles.mask} />

        <View style={[styles.centerRow, { height: BOX_HEIGHT }]}> 
          <View style={styles.mask} />
          <View style={[styles.scanBox, { width: BOX_WIDTH, height: BOX_HEIGHT }]}> 
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {isScanned && scannedData && (
              <View style={styles.resultOverlay}>
                <Text style={styles.resultText}>{scannedData.data}</Text>
              </View>
            )}
          </View>
          <View style={styles.mask} />
        </View>

        <View style={[styles.mask, styles.bottomArea]}>
          <Text style={styles.hintText}>
            {isScanned ? "ສແກນສຳເລັດແລ້ວ" : "ຈໍ່ QR code ຫຼື Barcode ໃຫ້ຢູ່ໃນກອບ"}
          </Text>
          
          <View style={styles.buttonContainer}>
            {isScanned && (
              <TouchableOpacity style={[styles.backButton, styles.scanAgainButton]} onPress={resetScanner}>
                <Ionicons name="refresh" size={22} color="#fff" />
                <Text style={styles.backText}>ສແກນໃໝ່</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Product" }], // กลับไป ProductScreen โดยตรง
                })
              }
            >
              <Ionicons name="arrow-back" size={22} color="#fff" />
              <Text style={styles.backText}>ກັບຄືນ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlayContainer: { ...StyleSheet.absoluteFillObject, justifyContent: "center", pointerEvents: "box-none" },
  mask: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  centerRow: { width: "100%", flexDirection: "row", alignItems: "center" },
  scanBox: { borderRadius: 12, borderWidth: 2, borderColor: "rgba(255,255,255,0.6)", backgroundColor: "transparent", position: "relative" },
  corner: { position: "absolute", width: 28, height: 28, borderColor: "#00E0A6" },
  topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  resultOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 224, 166, 0.9)", borderRadius: 10, justifyContent: "center", alignItems: "center" },
  resultText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center", paddingHorizontal: 10 },
  bottomArea: { alignItems: "center", justifyContent: "center", paddingBottom: 24 },
  hintText: { color: "#fff", fontSize: 30, marginTop: -50, marginBottom: 20, fontFamily: "NotoSansLao-Regular", textAlign: "center" },
  buttonContainer: { flexDirection: "row", gap: 10 },
  backButton: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 14, backgroundColor: "#0051a2", borderRadius: 20 },
  scanAgainButton: { backgroundColor: "#00E0A6" },
  backText: { color: "#fff", fontSize: 24, marginLeft: 6, fontFamily: "NotoSansLao-Regular" },
});
