import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import ProductItem from "./ProductItem";
import CscLoading from "./CscLoading"; 
import AlertIcon from "../assets/Icon/circle-exclamation-sharp-duotone-solid.svg";

export default function ProductList({ products, error, loading, onSelect }) {
  const [showLoading, setShowLoading] = useState(false);

  // จับเวลา minimum 3 วินาที
  useEffect(() => {
    let timer;
    if (loading) {
      setShowLoading(true);
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 3000); // 3000 ms = 3 วินาที
    } else {
      // ถ้า loading = false ก่อนครบ 3 วินาที ให้รอจนครบ
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  const renderItem = ({ item }) => (
    <ProductItem product={item} onPress={() => onSelect && onSelect(item)} />
  );

  const renderEmptyComponent = () => {
    if (showLoading) {
      return (
        <View style={styles.emptyContainer}>
          <CscLoading isLoading={true} styles={styles.loading} />
          <Text style={styles.loadingText}>ກຳລັງຄົ້ນຫາ...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <AlertIcon width={50} height={50} color="#ff5252" />
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
  background: { flex: 1 },
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
