import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../../contexts/CartContext";
import { StatusBar } from "expo-status-bar";

export default function CartScreen() {
  const { items, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return items.length > 0 ? (
          <Text style={{ color: "#FF6B2C" }}>EDIT ITEMS</Text>
        ) : null;
      },
      headerStyle: {
        backgroundColor: "#121223",
      },
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.itemsContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  <FontAwesome name="minus" size={16} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FontAwesome name="plus" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <FontAwesome name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Fee</Text>
          <Text style={styles.summaryText}>${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTextBold}>Total</Text>
          <Text style={styles.summaryTextBold}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121223",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomColor: "#E5E5E5",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "white",
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 8,
    color: "white",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    color: "white",
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: "#666",
  },
  summaryTextBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#FF6B2C",
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
