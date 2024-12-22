import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { Restaurant } from "@/app/(app)/index";

const menuCategories = [
  { id: "1", name: "Burger" },
  { id: "2", name: "Sandwich" },
  { id: "3", name: "Pizza" },
  { id: "4", name: "Sanwich" },
];

const menuItems = [
  {
    id: "1",
    name: "Burger Ferguson",
    description: "Spicy Restaurant",
    price: 40,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: "2",
    name: "Rockin' Burgers",
    description: "Cafecafachino",
    price: 40,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    description: "Burger Joint",
    price: 35,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9",
  },
];

export default function RestaurantScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { items } = useCart();

  const restaurant = JSON.parse(params.restaurant as any) as Restaurant;
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome
          name="ellipsis-h"
          size={20}
          color="black"
          style={{ paddingTop: 10, marginRight: 8 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Image source={{ uri: restaurant.image }} style={styles.coverImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.description}
          </Text>
          <View style={styles.restaurantMeta}>
            <View style={styles.metaItem}>
              <FontAwesome name="star" size={16} color="#FF6B2C" />
              <Text style={styles.metaText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome name="clock-o" size={16} color="#666" />
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome name="truck" size={16} color="#666" />
              <Text style={styles.metaText}>{restaurant.deliveryFee}</Text>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {menuCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                category.id === "1" && styles.activeCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category.id === "1" && styles.activeCategoryButtonText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Burger (10)</Text>
          {menuItems.map((item) => (
            <Link
              href={{
                pathname: "/itemDetails",
                params: { item: JSON.stringify(item) },
              }}
              key={item.id}
              asChild
            >
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.menuItemPrice}>${item.price}</Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuItemImage}
                />
                <TouchableOpacity style={styles.addButton}>
                  <FontAwesome name="plus" size={16} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
      {cartItemCount > 0 && (
        <Link href={"/cart"} asChild>
          <TouchableOpacity style={styles.viewCartButton}>
            <Text style={styles.viewCartText}>View Cart ({cartItemCount})</Text>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
  },
  restaurantInfo: {
    paddingVertical: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#F5F5F5",
  },
  activeCategoryButton: {
    backgroundColor: "#FF6B2C",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeCategoryButtonText: {
    color: "white",
  },
  menuContainer: {
    paddingTop: 8,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    marginBottom: 16,
    position: "relative",
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FF6B2C",
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF6B2C",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  viewCartButton: {
    backgroundColor: "#FF6B2C",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  viewCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
