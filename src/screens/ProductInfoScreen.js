import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "../../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
export default function ProductInfoScreen() {

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  /* useRoute is a hook which gives access to route object. It's useful when you cannot pass the route prop into the component directly, or don't want to pass it in case of a deeply nested child.
 useRoute() returns the route prop of the screen it's inside. */
  const [addedToCart, setAddedToCart] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  //for images
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = (product) => {
    setAddedToCart(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };
  const cart = useSelector((state) => state.cart.cart);
  //console.log(cart);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Colors.CYAN,
            width: "100%",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: Colors.WHITE,
              width: "90%",
              borderRadius: 5,
              //justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              gap: 10,
            }}
          >
            <FontAwesome name="search" size={24} color="black" />
            <TextInput placeholder="Search" />
          </Pressable>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {route.params.carouselImages.map((item, index) => (
            <ImageBackground
              key={index}
              source={{ uri: item }}
              style={{
                width,
                height,
                marginTop: 20,
                resizeMode:"contain",
              }}
            >
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    //padding: 10,
                    backgroundColor: Colors.LUST,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.WHITE,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    20% off
                  </Text>
                </View>
                <View
                  style={{
                    //padding: 10,
                    backgroundColor: Colors.LIGHT_GRAY,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>
                    <Entypo name="share" size={24} color="black" />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  //padding: 10,
                  backgroundColor: Colors.LIGHT_GRAY,
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "auto",
                  marginBottom: 20,
                  marginLeft: 20,
                }}
              >
                <Text>
                  <AntDesign name="hearto" size={24} color="black" />
                </Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={{ padding: 5, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 7,
              marginRight: 7,
              color: Colors.BLACK,
            }}
          >
            {route.params.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
            }}
          >
            ${route.params.price}
          </Text>
        </View>
        <Text
          style={{
            borderWidth: 1,
            borderColor: Colors.LIGHT_GRAY,
            height: 1,
            marginTop: 10,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
              color: Colors.GRAY,
            }}
          >
            Color:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
            }}
          >
            {route.params.color}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
              color: Colors.GRAY,
            }}
          >
            Size:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
            }}
          >
            {route.params.size}
          </Text>
        </View>
        <Text
          style={{
            borderWidth: 1,
            borderColor: Colors.LIGHT_GRAY,
            height: 1,
            marginTop: 10,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
              color: Colors.BLACK,
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
            }}
          >
            ${route.params.price}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
              color: "#008E97",
            }}
          >
            Free Delivery Tommorrow by 3PM. Order within 10hours 30mints
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 7,
            marginTop: 5,
          }}
        >
          <FontAwesome6 name="location-dot" size={20} color="black" />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 10,
              marginRight: 7,
              marginTop: 5,
              color: Colors.BLACK,
            }}
          >
            Deliver to Mazher - Kamalia 56000
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginLeft: 10,
            marginRight: 7,
            marginTop: 5,
            color: Colors.GRAY,
          }}
        >
          In Stock
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            paddingVertical: 10,
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => addItemToCart(route?.params?.item)}
            style={{
              width: "90%",
              height: 40,
              backgroundColor: Colors.SAFFRON,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
          >
            {addedToCart ? (
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  Added to Cart
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                Add to Cart
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 40,
              backgroundColor: Colors.SAFFRON,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
