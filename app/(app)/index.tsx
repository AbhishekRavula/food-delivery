import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  { id: "1", icon: "🔥", name: "All" },
  { id: "2", icon: "🌭", name: "Hot Dog" },
  { id: "3", icon: "🍔", name: "Burger" },
  { id: "4", icon: "🍕", name: "Pizza" },
  { id: "5", icon: "🥪", name: "Sandwich" },
];

const restaurants = [
  {
    id: "1",
    name: "Rose Garden Restaurant",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    cuisines: ["Burger", "Chicken", "Rice", "Wings"],
    rating: 4.7,
    deliveryTime: "20 min",
    deliveryFee: "Free",
    description:
      "Rose Garden Restaurant offers a cozy dining experience with a variety of flavorful dishes. From juicy burgers and crispy chicken wings to hearty rice meals, every dish is crafted to perfection. Known for its excellent service and quick delivery, it’s a go-to spot for a delightful meal.",
  },
  {
    id: "2",
    name: "Spicy Restaurant",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    cuisines: ["Spicy", "Chinese", "Asian"],
    rating: 4.5,
    deliveryTime: "25 min",
    deliveryFee: "Free",
    description:
      "Spicy Restaurant is a paradise for lovers of bold and vibrant flavors. Specializing in Chinese and Asian cuisines, the menu features an array of spicy delights that are sure to tantalize your taste buds. With fresh ingredients and authentic recipes, every bite is an adventure.",
  },
];

export type Restaurant = (typeof restaurants)[0];

export default function HomeScreen() {
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="menu" size={24} color="black" />
          <View style={styles.locationText}>
            <Text style={styles.deliverTo}>DELIVER TO</Text>
            <Text style={styles.address}>Halal Lab office</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerActionButtons}>
          <TouchableOpacity style={styles.cartButton} onPress={logout}>
            <FontAwesome name="sign-out" size={24} color="black" />
          </TouchableOpacity>
          <Link href={"/cart"} asChild>
            <TouchableOpacity style={styles.cartButton}>
              <FontAwesome name="shopping-cart" size={24} color="black" />
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Hey Halal, Good Afternoon!</Text>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search dishes, restaurants"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
          >
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.restaurantsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Open Restaurants</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              style={styles.restaurantCard}
              href={{
                pathname: "/restaurant",
                params: { restaurant: JSON.stringify(restaurant) },
              }}
            >
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.cuisines}>
                  {restaurant.cuisines.join(" - ")}
                </Text>
                <View style={styles.restaurantMeta}>
                  <View style={styles.rating}>
                    <FontAwesome name="star" size={16} color="#FF6B2C" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                  <View style={styles.deliveryInfo}>
                    <FontAwesome name="clock-o" size={16} color="#666" />
                    <Text style={styles.deliveryText}>
                      {restaurant.deliveryTime}
                    </Text>
                  </View>
                  <View style={styles.deliveryInfo}>
                    <FontAwesome name="truck" size={16} color="#666" />
                    <Text style={styles.deliveryText}>
                      {restaurant.deliveryFee}
                    </Text>
                  </View>
                </View>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 8,
  },
  deliverTo: {
    fontSize: 12,
    color: "#FF6B2C",
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
  },
  cartButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#FF6B2C",
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#FF6B2C",
    fontSize: 14,
  },
  categoriesList: {
    paddingLeft: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "#FFF5EC",
    padding: 15,
    borderRadius: 25,
    minWidth: 80,
    flexDirection: "row",
    gap: 6,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
  },
  restaurantsSection: {
    paddingBottom: 24,
  },
  restaurantCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cuisines: {
    color: "#666",
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "500",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  deliveryText: {
    marginLeft: 4,
    color: "#666",
  },
  headerActionButtons: {
    flexDirection: "row",
    gap: 25,
  },
});
