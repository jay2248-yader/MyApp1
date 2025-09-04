export default function useGoToProduct(navigation) {
  const goToProduct = ({ product, productCode, qrData, qrType } = {}) => {
    navigation.navigate("Product", {
      product: product || null,
      productCode: productCode || product?.CODE || null,
      qrData: qrData || null,
      qrType: qrType || null,
    });
  };

  return { goToProduct };
}
