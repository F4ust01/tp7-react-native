import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { AppProvider } from "@/context/AppContext";
import { storeData } from "@/utils/storage";
import { useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
    storeData("theme", "light");
  }, []);

  return (
    <NativeBaseProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="tasks" />
          <Stack.Screen name="settings"/>
        </Stack>
      </AppProvider>
    </NativeBaseProvider>
  );
}
