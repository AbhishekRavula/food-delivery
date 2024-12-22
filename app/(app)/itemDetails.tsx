import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "@/contexts/CartContext";
import { router, useLocalSearchParams } from "expo-router";

const sizes = [
  { id: "1", size: '10"' },
  { id: "2", size: '14"' },
  { id: "3", size: '16"' },
];

const ingredients = [
  { id: "1", name: "Cheese", icon: "🧀" },
  { id: "2", name: "Pepperoni", icon: "🍕" },
  { id: "3", name: "Onion", icon: "🧅" },
  { id: "4", name: "Pepper", icon: "🫑" },
  { id: "5", name: "Mushroom", icon: "🍄" },
];

export default function ItemDetailsScreen() {
  const { addItem } = useCart();
  const params = useLocalSearchParams() as any;

  const [selectedSize, setSelectedSize] = useState("2");
  const [quantity, setQuantity] = useState(1);

  const item = JSON.parse(params.item);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      size: sizes.find((s) => s.id === selectedSize)?.size,
      image: item.image,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.restaurantInfo}>
            <FontAwesome name="map-marker" size={16} color="#FF6B2C" />
            <Text style={styles.restaurantName}>{item.description}</Text>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>
            Prosciutto e funghi is a pizza variety that is topped with tomato
            sauce.
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FF6B2C" />
            <Text style={styles.rating}>4.7</Text>
            <FontAwesome
              name="truck"
              size={16}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.deliveryInfo}>Free</Text>
            <FontAwesome
              name="clock-o"
              size={16}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.deliveryInfo}>20 min</Text>
          </View>
          <View style={styles.sizeContainer}>
            <Text style={styles.sectionTitle}>SIZE:</Text>
            <View style={styles.sizeOptions}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  style={[
                    styles.sizeButton,
                    selectedSize === size.id && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(size.id)}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size.id && styles.selectedSizeButtonText,
                    ]}
                  >
                    {size.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.ingredientsContainer}>
            <Text style={styles.sectionTitle}>INGREDIENTS:</Text>
            <View style={styles.ingredientsList}>
              {ingredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientItem}>
                  <Text style={styles.ingredientIcon}>{ingredient.icon}</Text>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.addToCartButtonPrice}>
              ${item.price * quantity}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <FontAwesome name="minus" size={10} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <FontAwesome name="plus" size={10} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 24,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingTop: 16,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  restaurantName: {
    marginLeft: 8,
    fontSize: 14,
    color: "#FF6B2C",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    marginLeft: 4,
    marginRight: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  icon: {
    marginRight: 4,
  },
  deliveryInfo: {
    marginRight: 16,
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sizeContainer: {
    marginBottom: 24,
  },
  sizeOptions: {
    flexDirection: "row",
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 12,
  },
  selectedSizeButton: {
    backgroundColor: "#FF6B2C",
    borderColor: "#FF6B2C",
  },
  sizeButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedSizeButtonText: {
    color: "white",
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ingredientItem: {
    alignItems: "center",
    marginRight: 24,
    marginBottom: 16,
  },
  ingredientIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  ingredientName: {
    fontSize: 12,
    color: "#666",
  },
  footer: {
    gap: 16,
    padding: 16,
    backgroundColor: "#F0F5FA",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  quantityButton: {
    padding: 6,
    backgroundColor: "grey",
    borderRadius: "50%",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
    color: "white",
  },
  addToCartButton: {
    backgroundColor: "#FF6B2C",
    paddingVertical: 18,
    borderRadius: 12,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    textAlign: "center",
  },
  addToCartButtonPrice: {
    fontSize: 20,
    fontWeight: "600",
  },
});
