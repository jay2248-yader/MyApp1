// src/components/ProductList.jsx
import React from "react";
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProductItem from "./ProductItem";

export default function ProductList({ products, error, loading }) {
    const renderItem = ({ item }) => (
    <ProductItem 
      product={item} 
      onPress={() => {
        console.log('Product selected:', item);
      }}
    />
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
        <Text style={styles.emptyText}>
          {error || "ບໍ່ພົບຂໍ້ມູນສິນຄ້າ"}
        </Text>
        {!error && (
          <Text style={styles.emptySubText}>ກະລຸນາລອງຄົ້ນຫາດ້ວຍຄຳອື່ນ</Text>
        )}
      </View>
    );
  };

  return (
<View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.CODE}-${index}`}
        renderItem={renderItem}
        renderEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    color: '#0051a2',
    marginTop: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
