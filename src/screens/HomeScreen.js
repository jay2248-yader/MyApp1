import { View, StyleSheet } from "react-native";
import SearchInput from "../components/SearchInput";
import SearchButton from "../components/SearchButton";
import QrScanButton from "../components/QrscanButton";
import LogoutButton from "../components/LogoutButton";
import useHomeScreen from "../hooks/useHome";
import ProductList from "../components/ProductList";

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

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ຄົ້ນຫາ..."
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SearchButton title="ຄົ້ນຫາ" onPress={handleSearch} loading={loading} />
        </View>
      </View>

      <View style={styles.resultsBox}>
        <ProductList products={products} error={error} loading={loading} />
      </View>

      <View style={styles.bottomButtonRow}>
        <QrScanButton title="Scan QR" onPress={handleQrScan} loading={qrLoading} />
        <LogoutButton onLogout={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0051a2" },
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, paddingTop: 40 },
  inputWrapper: { flex: 3, marginRight: 10 },
  buttonWrapper: { flex: 1 },
  resultsBox: { flex: 1, backgroundColor: "#eee", borderRadius: 8, padding: 10 },
  bottomButtonRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, position: "absolute", bottom: 20, left: 20, right: 20 },
});
