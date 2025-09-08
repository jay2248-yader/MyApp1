import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ScanQrScreen from "./src/screens/ScanqrScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { useCallback } from 'react';
import { Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'NotoSansLao': require('./assets/fonts/Noto_Sans_Lao/NotoSansLao-VariableFont_wdth,wght.ttf'),
    'NotoSansThai': require('./assets/fonts/Noto_Sans_Lao/NotoSansThai-VariableFont_wdth,wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Override default font family for all Text components
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { 
    fontFamily: 'NotoSansLao,NotoSansThai',
    // กำหนดค่าเริ่มต้นอื่นๆ สำหรับ Text
    fontSize: 14,
    color: '#000000',
  };

  return (
    <ErrorBoundary>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScanQR"
            component={ScanQrScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
