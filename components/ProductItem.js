import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductItem({ item }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (product) => {
    setAddedToCart(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };
  const cart = useSelector((state)=>state.cart.cart);
  console.log(cart)
  return (
    <View style={{ padding: 10, alignItems: "center" }}>
      <Image
        source={{ uri: item?.image }}
        style={{ width: 130, height: 130, resizeMode: "contain" }}
      />
      <Text
        numberOfLines={1}
        style={{
          width: 130,
          fontSize: 13,
          fontWeight: "700",
          padding: 5,
          color: Colors.GRAY,
        }}
      >
        {item?.title}
      </Text>
      <View style={{ flexDirection: "row", gap: 15 }}>
        <Text style={{ fontSize: 13, fontWeight: "700" }}>${item?.price}</Text>
        <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.YELLOW }}>
          {item?.rating?.rate} rating
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => addItemToCart(item)}
        style={{
          width: 130,
          height: 35,
          backgroundColor: Colors.SAFFRON,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          margin: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Added to Cart
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: "600" }}>Add to Cart</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
