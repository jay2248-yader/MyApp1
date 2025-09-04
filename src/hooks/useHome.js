import { useState } from "react";
import useAppNavigation from "../navigation/useAppNavigation";
import { getProductByName } from "../api/users";

export default function useHomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { goToScanQR, resetToLogin } = useAppNavigation();

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    // Clear error and products when user starts typing
    if (error) {
      setError(null);
    }
    if (products.length > 0) {
      setProducts([]);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError("ກະລຸນາປ້ອນຄຳຄົ້ນຫາ");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const searchResults = await getProductByName(searchText);
      setProducts(searchResults);
      console.log("Search results:", searchResults);
      
      if (searchResults.length === 0) {
        setError("ບໍ່ພົບຂໍ້ມູນສິນຄ້າ");
      }
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
      setError("ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາ");
    } finally {
      setLoading(false);
    }
  };

  const handleQrScan = () => {
    goToScanQR();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    resetToLogin();
  };

  return {
    searchText,
    setSearchText: handleSearchTextChange,
    loading,
    qrLoading,
    products,
    error,
    handleSearch,
    handleQrScan,
    handleLogout,
  };
}
