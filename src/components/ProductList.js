import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "./ProductItem";

export default function ProductList({ products, error, loading, onSelect }) {
  const renderItem = ({ item }) => (
    <ProductItem product={item} onPress={() => onSelect && onSelect(item)} />
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#0051a2" />
          <Text style={styles.loadingText}>ກຳລັງຄົ້ນຫາ...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#ff5252" />
        <Text style={styles.emptyText}>
          {error || "ບໍ່ພົບຂໍ້ມູນສິນຄ້າ"}
        </Text>
        {!error && (
          <Text style={styles.emptySubText}>
            ກະລຸນາລອງຄົ້ນຫາ ຫຼື ສະແກນ QR
          </Text>
        )}
      </View>
    );
  };

  return (
  <ImageBackground
  source={require("../assets/artboard.png")}
  style={styles.background}
  imageStyle={{
    opacity: 0.1,
    resizeMode: "contain",
    width: "100%",   
    height: "100%",  
    alignSelf: "center", 
    padding: 50,
    marginTop: -20,
  }}
>
  <View style={styles.overlay} />

  <FlatList
    data={products}
    keyExtractor={(item, index) => `${item.CODE}-${index}`}
    renderItem={renderItem}
    ListEmptyComponent={renderEmptyComponent}
    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
    showsVerticalScrollIndicator={false}
  />
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    opacity: 0.3, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    zIndex: 1,
  },
  loadingText: {
    fontFamily: "NotoSansLao-Regular",
    fontSize: 16,
    color: "#0051a2",
    marginTop: 10,
    fontWeight: "bold",
    zIndex: 1,
  },
  emptyText: {
    fontFamily: "NotoSansLao-Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginTop: 10,
    marginBottom: 8,
    zIndex: 1,
  },
  emptySubText: {
    fontFamily: "NotoSansLao-Regular",
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    zIndex: 1,
  },
});

