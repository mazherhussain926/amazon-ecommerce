import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../Constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart, decrementQuantity, incrementQuantity,removeFromCart } from "../../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const navigation = useNavigation()
  //The reduce method in JavaScript is used to apply a function to each element of an array, resulting in a single output value. It is particularly useful for summing values, accumulating results, or performing operations where you need a single output from an array.
  /*
 array.reduce((accumulator, currentValue, currentIndex, array) => {
  // return updated accumulator
}, initialValue);  
 */

  const cart = useSelector((state) => state.cart.cart);

  const sameProductPrice = cart.map((item) => {
    return item.price * item.quantity;
  });
  const totalPrice = sameProductPrice.reduce((current, previous) => {
    return current + previous;
  }, 0);
  //console.log(total);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteFromCart = (item)=>{
    dispatch(removeFromCart(item))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Colors.CYAN,
            width: "100%",
            alignItems: "center",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-around",
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
              marginLeft: 10,
            }}
          >
            <FontAwesome name="search" size={24} color="black" />
            <TextInput placeholder="Search" />
          </Pressable>
          <FontAwesome name="microphone" size={24} color="black" />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Subtotal :
          <Text style={{ fontSize: 17, fontWeight: "800" }}>{totalPrice}</Text>
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "500", marginLeft: 10 }}>
          EM detail available
        </Text>
        <Pressable
        onPress={()=>navigation.navigate("Confirmation Screen")}
          style={{
            width: "90%",
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.YELLOW,
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "700" }}>
            Proceed to buy ({cart.length}) items
          </Text>
        </Pressable>
        <Text
          style={{
            width: "100%",
            height: 1,
            backgroundColor: Colors.GRAY,
            marginTop: 15,
          }}
        />
        <View style={{ backgroundColor: Colors.WHITE }}>
          {cart.map((item, index) => {
            return (
              <View key={index}>
                <Pressable
                  style={{
                    flexDirection: "row",
                    //marginLeft: 10,
                    //marginRight: 20,
                    //backgroundColor: "red",
                    width: "95%",
                    height: 120,
                    alignSelf: "center",
                    //alignItems:"center"
                  }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={{ marginLeft: 15, justifyContent: "center" }}>
                    <Text numberOfLines={2} style={{ width: 200 }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>
                      {item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: Colors.LUST,
                      }}
                    >
                      In Stock
                    </Text>
                  </View>
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // marginBottom: 10,
                  }}
                >
                  <Pressable onPress={() => decreaseQuantity(item)}>
                    {item.quantity > 1 ? (<AntDesign
                      name="minus"
                      size={24}
                      color="black"
                      style={{
                        marginLeft: 20,
                        backgroundColor: Colors.LIGHT_GRAY,
                        padding: 5,
                        borderRadius: 5,
                      }}
                    />):(<AntDesign
                      name="delete"
                      size={24}
                      color="black"
                      style={{
                        marginLeft: 20,
                        backgroundColor: Colors.LIGHT_GRAY,
                        padding: 5,
                        borderRadius: 5,
                      }}
                    />)}
                    
                  </Pressable>

                  <Text
                    style={{ marginLeft: 10, fontSize: 20, fontWeight: "600" }}
                  >
                    {item.quantity}
                  </Text>
                  <Pressable onPress={() => increaseQuantity(item)}>
                    <AntDesign
                      name="plus"
                      size={24}
                      color="black"
                      style={{
                        marginLeft: 20,
                        backgroundColor: Colors.LIGHT_GRAY,
                        padding: 5,
                        borderRadius: 5,
                      }}
                    />
                  </Pressable>
                  <Pressable onPress={()=>deleteFromCart(item)}
                    style={{
                      marginLeft: 20,
                      backgroundColor: Colors.WHITE,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: Colors.GRAY,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "400" }}>
                      Delete
                    </Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Pressable
                    style={{
                      marginLeft: 20,
                      backgroundColor: Colors.WHITE,
                      //padding: 5,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: Colors.GRAY,
                      //width: 55,
                      //height: 35,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      backgroundColor: Colors.LIGHT_GRAY,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "400" }}>
                      Save For Later
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      marginLeft: 20,
                      backgroundColor: Colors.WHITE,
                      //padding: 5,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: Colors.GRAY,
                      //width: 55,
                      //height: 35,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      backgroundColor: Colors.LIGHT_GRAY,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "400" }}>
                      See More Like This
                    </Text>
                  </Pressable>
                </View>
                <Text
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: Colors.GRAY,
                    marginTop: 15,
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
