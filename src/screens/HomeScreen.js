import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchInput from "../components/SearchInput";
import SearchButton from "../components/SearchButton";
import QrScanButton from "../components/QrscanButton";
import LogoutButton from "../components/LogoutButton";

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Search:", searchText);
      setLoading(false);
    }, 1000);
  };

  const handleQrScan = () => {
    navigation.navigate("ScanQR");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    navigation.replace("Login");
  };




  return (
    <View style={styles.container}>
      
      <View style={styles.searchRow}>
        <View style={styles.inputWrapper}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ຄົ້ນຫາ..."
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

      {/* Results box */}
      <View style={styles.resultsBox}>
        <Text style={{ fontFamily: "NotoSansLao", fontSize: 18 }}>
          View results here
        </Text>
      </View>

      <View style={styles.bottomButtonRow}>
        <QrScanButton
          title="Scan QR"
          onPress={handleQrScan}
          loading={qrLoading}
          style={styles.qrButton}
        />
        <LogoutButton onLogout={handleLogout} style={styles.logoutButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0051a2",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 40,
  },
  inputWrapper: {
    flex: 3,
    marginRight: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
  resultsBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
    position: "relative",
  },
  
  bottomButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 10,
  position: "absolute",
  bottom: 20,
    left: 20,
  right: 20,
},

qrButton: {
  flex: 3,
  marginRight: 10,
},

logoutButton: {
  flex: 1,
},

});
