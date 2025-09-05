// src/hooks/usePriceData.js
import { useState, useEffect } from "react";
import { getPriceByProductCode } from "../api/users";

/**
 * ใช้ดึงราคาสินค้าและข้อมูลคลังสินค้าโดยใช้ productCode หรือ qrData
 */
export default function usePriceData({ productCode, qrData }) {
  const [priceData, setPriceData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]); // เพิ่ม state สำหรับ warehouse
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usedCode, setUsedCode] = useState(null);

  useEffect(() => {
    const codeToUse = qrData?.trim() || productCode?.trim();
    if (codeToUse) {
      setUsedCode(codeToUse);
      fetchPriceData(codeToUse);
    }
  }, [productCode, qrData]);

  const fetchPriceData = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const { priceData: prices, warehouseData: warehouse } = await getPriceByProductCode(code);
      setPriceData(prices || []);
      setWarehouseData(warehouse || []); // เก็บ warehouseData
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลราคาและคลังสินค้าได้");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { priceData, warehouseData, loading, error, usedCode };
}
