import React from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";
import ProductDetailList from "../components/ProductDetailList";
import usePriceData from "../hooks/usePriceData";
import SearchInput from "../components/SearchInput";
import SearchButton from "../components/SearchButton";
import QrScanButton from "../components/QrscanButton";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";

export default function ProductScreen({ route, navigation }) {
  const { qrData, qrType, productCode } = route.params || {};
  const [searchText, setSearchText] = React.useState("");
  const [qrLoading, setQrLoading] = React.useState(false);

  const { priceData, warehouseData, loading, error } = usePriceData({ productCode, qrData });

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  const handleQrScan = () => {
    navigation.navigate("ScanQR");
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
  };

  return (
    <View style={styles.container}>
      {/* แถว search */}
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

      {/* ScrollView */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }} // กันไม่ให้ทับปุ่มล่าง
        showsVerticalScrollIndicator={false}
      >

        <View>
          {loading && <ActivityIndicator size="large" color="#fff" />}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          {!loading && !error && (
            <ProductDetailList
              priceData={priceData}
              warehouseData={warehouseData}
            />
          )}
        </View>
      </ScrollView>

      {/* ปุ่มล่าง fix */}
      <View style={styles.bottomButtonRow}>
        <View style={styles.leftButtons}>
          <View style={styles.backButtonContainer}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.qrButtonContainer}>
            <QrScanButton onPress={handleQrScan} loading={qrLoading} />
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <LogoutButton onLogout={handleLogout} />
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
    position: 'relative',
  },
  searchRow: { 
    flexDirection: "row", 
    alignItems: "center", 
   paddingTop: 60 ,
   padding: 10,
  
  },
  inputWrapper: { 
    flex: 3, 
    marginRight: 10, 
  },
  buttonWrapper: { 
    flex: 1 
  },
  scrollView: {
    flex: 1,
  },
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
  leftButtons: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonContainer: {
    flex: 1,
  },
  qrButtonContainer: {
    flex: 2,
  },
  logoutButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  codeBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: "bold",  
    marginBottom: 6,
    color: "#0051a2",
  },
  codeText: {
    fontSize: 16,
    color: "#222",
    marginBottom: 4,
  },
  typeText: {
    fontSize: 14,
    color: "#555",
  },
});
