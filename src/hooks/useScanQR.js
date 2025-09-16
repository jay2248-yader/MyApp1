import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useCameraPermissions } from "expo-camera";
import useGoToProduct from "./useGoToProduct";

export default function useScanQR(navigation) {
  const [permission, requestPermission] = useCameraPermissions();
  const scannedRef = useRef(false);
  const [scannedData, setScannedData] = useState(null);
  const { goToProduct } = useGoToProduct(navigation);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  
  const BOX_WIDTH = SCREEN_WIDTH * 0.85;
  const BOX_HEIGHT = 200;

  const scanBoxRect = useMemo(() => ({
    left: (SCREEN_WIDTH - BOX_WIDTH) / 2,
    top: (SCREEN_HEIGHT - BOX_HEIGHT) / 2,
    right: (SCREEN_WIDTH + BOX_WIDTH) / 2,
    bottom: (SCREEN_HEIGHT + BOX_HEIGHT) / 2,
  }), [SCREEN_WIDTH, SCREEN_HEIGHT]);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const isPointInside = (x, y) =>
    x >= scanBoxRect.left && x <= scanBoxRect.right && y >= scanBoxRect.top && y <= scanBoxRect.bottom;

  const isWithinScanBox = (event) => {
    try {
      if (event?.bounds?.origin && event?.bounds?.size) {
        const cx = event.bounds.origin.x + event.bounds.size.width / 2;
        const cy = event.bounds.origin.y + event.bounds.size.height / 2;
        return isPointInside(cx, cy);
      }
      if (Array.isArray(event?.cornerPoints) && event.cornerPoints.length) {
        const xs = event.cornerPoints.map((p) => p.x);
        const ys = event.cornerPoints.map((p) => p.y);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
        const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
        return isPointInside(cx, cy);
      }
      return true;
    } catch {
      return true;
    }
  };

  const handleBarCodeScanned = ({ type, data, bounds, cornerPoints }) => {
    if (scannedRef.current) return;
    const evt = { bounds, cornerPoints };
    if (!isWithinScanBox(evt)) return;

    scannedRef.current = true;
    setScannedData({ type, data });

    // สแกนแล้วไป goToProduct เลย
    goToProduct({ qrData: data, qrType: type });
  };

  return {
    permission,
    BOX_WIDTH,
    BOX_HEIGHT,
    handleBarCodeScanned,
    scannedData,
    isScanned: scannedRef.current,
  };
}
