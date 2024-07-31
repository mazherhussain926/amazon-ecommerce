import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Constants/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../../userContext";
import axios from "axios";

export default function AddAddressScreen() {
  const { userId, setUserId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  //fetching addresses from database
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (err) {
      console.log("Errorrrr", err);
    }
  };
//Refresh the addresses when component comes to the focus
useFocusEffect(
  useCallback(()=>{
    fetchAddresses();
  },[])
);
  //console.log(addresses);


  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: Colors.WHITE }}>
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: Colors.BLACK,
            padding: 10,
          }}
        >
          Your Addresses
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Address")}
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 0.5,
            borderColor: Colors.GRAY,
            padding: 10,
            width: "95%",
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Colors.GRAY,
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            Add a new Address
          </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable
          style={
            {
              // marginTop: 10,
              // width: "90%",
              // //height: 160,
              // //backgroundColor: Colors.LIGHT_GRAY,
              // borderRadius: 5,
              // borderWidth: 0.5,
              // alignSelf: "center",
              // padding: 10,
            }
          }
        >
          {addresses?.map((item, index) => {
            return (
              <View
                style={{
                  marginTop: 15,
                  width: "90%",
                  //height: 160,
                  //backgroundColor: Colors.LIGHT_GRAY,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  alignSelf: "center",
                  padding: 10,
                }}
                key={index}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: Colors.GRAY,
                      marginRight: 10,
                    }}
                  >
                    {item.name.toUpperCase()}
                  </Text>
                  <Ionicons name="location" size={24} color="red" />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    color: Colors.GRAY,
                    marginRight: 10,
                  }}
                >{`${item.house}, ${item.landmark}`}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    color: Colors.GRAY,
                    marginRight: 10,
                  }}
                >
                  {item.city}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    color: Colors.GRAY,
                    marginRight: 10,
                  }}
                >{`Mobile # : ${item.mobileNo}`}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    color: Colors.GRAY,
                    marginRight: 10,
                  }}
                >{`Postal Code : ${item.postalCode}`}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 60,
                      height: 30,
                      backgroundColor: Colors.GRAY,
                      borderRadius: 5,
                      marginTop: 5,
                      elevation: 40,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: Colors.WHITE,
                        marginRight: 10,
                      }}
                    >
                      Edit
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 70,
                      height: 30,
                      backgroundColor: Colors.GRAY,
                      borderRadius: 5,
                      marginTop: 5,
                      elevation: 40,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: Colors.WHITE,
                        marginRight: 10,
                      }}
                    >
                      Remove
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 90,
                      height: 30,
                      backgroundColor: Colors.GRAY,
                      borderRadius: 5,
                      marginTop: 5,
                      elevation: 40,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: Colors.WHITE,
                        marginRight: 10,
                      }}
                    >
                      Set as Default
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
