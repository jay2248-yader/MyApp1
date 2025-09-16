import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Platform,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ProductDetailList from "../components/ProductDetailList";
import usePriceData from "../hooks/usePriceData";
import SearchInput from "../components/SearchInput";
import SearchButton from "../components/SearchButton";
import QrScanButton from "../components/QrscanButton";
import BackButton from "../components/BackButton";

export default function ProductScreen({ route, navigation }) {
  const { qrData, productCode } = route.params || {};
  const [searchText, setSearchText] = React.useState(productCode || qrData || "");
  const [qrLoading, setQrLoading] = React.useState(false);

  const { priceData, warehouseData, loading, error } = usePriceData({
    productCode,
    qrData,
  });

  // ฟังก์ชันเดียวสำหรับไปหน้า Home
  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home", params: { searchQuery: qrData || searchText } }],
    });
  };

  // Search button logic
  const handleSearch = () => {
    if (!searchText) return;
    navigation.reset({
      index: 0,
      routes: [{ name: "Home", params: { searchQuery: searchText } }],
    });
  };

  // QR scan button logic → reset stack ไป ScanQR
  const handleQrScan = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "ScanQR" }],
    });
  };

  // จับปุ่ม Back ของเครื่อง
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        goHome();
        return true; // ป้องกัน behavior ปกติ
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [qrData, searchText])
  );

  return (
    <View style={styles.container}>
      {/* Search Row */}
      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <SearchInput
            placeholder="ຄົ້ນຫາຊື່ສິນຄ້າ"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SearchButton title="ຄົ້ນຫາ" onPress={handleSearch} loading={loading} />
        </View>
      </View>

      {/* Product List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {!loading && !error && (
          <ProductDetailList priceData={priceData} warehouseData={warehouseData} />
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonRow}>
        <View style={styles.leftButtons}>
          <View style={styles.backButtonContainer}>
            <BackButton onPress={goHome} />
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <QrScanButton onPress={handleQrScan} loading={qrLoading} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#408ee0",
    position: "relative",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: Platform.select({ ios: 40, android: 30, web: 0 }),
  },
  inputWrapper: { flex: 3, marginRight: 10 },
  buttonWrapper: { flex: 1 },
  scrollView: { flex: 1 },
  bottomButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 8,
  },
  leftButtons: { flex: 3, flexDirection: "row", alignItems: "center" },
  backButtonContainer: { flex: 1 },
  logoutButtonContainer: { flex: 1, alignItems: "flex-end" },
});
