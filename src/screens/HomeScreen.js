import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import SearchInput from "../components/SearchInput";
import SearchButton from "../components/SearchButton";
import QrScanButton from "../components/QrscanButton";
import LogoutButton from "../components/LogoutButton";
import useHomeScreen from "../hooks/useHome";
import ProductList from "../components/ProductList";
import useGoToProduct from "../hooks/useGoToProduct";

export default function HomeScreen({ navigation }) {
  const {
    searchText,
    setSearchText,
    loading,
    qrLoading,
    products,
    error,
    handleSearch,
    handleQrScan,
    handleLogout,
  } = useHomeScreen(navigation);

  const { goToProduct } = useGoToProduct(navigation);

  const handleSelectProduct = (product) => {
    goToProduct({ product });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ຄົ້ນຫາຊື່ສິນຄ້າ"
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SearchButton
            title="ຄົ້ນຫາ"
            onPress={handleSearch}
            loading={loading}
          />
        </View>
      </View>

      {/* Product List */}
      <View style={styles.resultsBox}>
        <ProductList
          products={products}
          error={error}
          loading={loading}
          onSelect={handleSelectProduct}
        />
      </View>

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomButtonRow}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <QrScanButton
            title="Scan QR"
            onPress={handleQrScan}
            loading={qrLoading}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <LogoutButton onLogout={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#408ee0" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#408ee0", 
  },
  inputWrapper: { flex: 3, marginRight: 10 },
  buttonWrapper: { flex: 1 },
  resultsBox: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 60, 
  },
  bottomButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
  },
});
