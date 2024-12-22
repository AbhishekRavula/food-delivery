import { ActivityIndicator } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size={50} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
        <Stack.Screen name={"index"} />
        <Stack.Screen
          name="restaurant"
          options={{ headerShown: true, title: "Restaurant" }}
        />
        <Stack.Screen
          name="itemDetails"
          options={{ headerShown: true, title: "Details" }}
        />
        <Stack.Screen
          name={"cart"}
          options={{ headerShown: true, title: "Cart" }}
        />
      </Stack>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
