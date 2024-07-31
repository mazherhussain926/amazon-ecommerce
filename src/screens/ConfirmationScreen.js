import { View, Text, ScrollView, Pressable,Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { UserType } from "../../userContext";
import { Colors } from "../../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ConfirmationScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

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
  console.log(addresses);
  //deleting address in database
  const removeAddress = async (addressId) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:8000/users/${userId}/addresses/${addressId}`);
      if (response.status === 200) {
        Alert.alert('Success', 'Address removed successfully');
        setAddresses(addresses.filter(address => address._id !== addressId));
      } else {
        Alert.alert('Error', 'Failed to remove address');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, index) => (
            <View
              key={index}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <View
                style={[
                  {
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    backgroundColor: "#ccc",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              {index >= 0 && (
                <View
                  style={[
                    {
                      flex: 1,
                      height: 2,
                      backgroundColor: "black",
                      marginTop: 2,
                      width: 40,
                    },
                    index == currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {step.title}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {currentStep == 0 && (
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Select Delivery Address
            </Text>
            <Pressable
              style={{
                marginTop: 5,
              }}
            >
              {addresses?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: "100%",
                      borderRadius: 5,
                      borderWidth: 1,
                      alignSelf: "center",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                      borderColor: Colors.LIGHT_GRAY,
                    }}
                  >
                    <View>
                      <Pressable onPress={() => setSelectedAddress(item)}>
                        {selectedAddress && selectedAddress._id === item._id ? (
                          <FontAwesome6
                            name="circle-dot"
                            size={24}
                            color="green"
                          />
                        ) : (
                          <Entypo name="circle" size={24} color="black" />
                        )}
                      </Pressable>
                    </View>
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "800",
                            color: Colors.BLACK,
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
                          gap: 10,
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
                        <Pressable onPress={()=>removeAddress(item._id)}
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
                      <View>
                        {selectedAddress &&
                          selectedAddress._id === item._id && (
                            <Pressable
                              onPress={() => setCurrentStep(1)}
                              style={{
                                backgroundColor: Colors.CYAN,
                                width: "95%",
                                padding: 10,
                                borderRadius: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 10,
                                alignSelf: "center",
                              }}
                            >
                              <Text
                                style={{ color: Colors.WHITE, fontSize: 13 }}
                              >
                                Deliver to this Address
                              </Text>
                            </Pressable>
                          )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </Pressable>
          </View>
        )}
        {currentStep == 1 && (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.BLACK,
              }}
            >
              Choose your delivery options
            </Text>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.WHITE,
                padding: 10,
                gap: 5,
              }}
            >
              <View>
                {options == false ? (
                  <Entypo
                    onPress={() => setOptions(true)}
                    name="circle"
                    size={24}
                    color="black"
                  />
                ) : (
                  <FontAwesome6 name="circle-dot" size={24} color="green" />
                )}
              </View>
              <View>
                <Text style={{ color: "green" }}>
                  Tomorrow by 10pm{" "}
                  <Text style={{ color: Colors.GRAY }}>
                    - Free Delivery with your Prime membership
                  </Text>
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: Colors.SAFFRON,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                marginTop: 20,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}
        {currentStep == 2 && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Select your payment Method
            </Text>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.WHITE,
                gap: 6,
                padding: 10,
                marginTop: 10,
              }}
            >
              {selectedOptions == "cash" ? (
                <FontAwesome6 name="circle-dot" size={24} color="green" />
              ) : (
                <Entypo
                  onPress={() => setSelectedOptions("cash")}
                  name="circle"
                  size={24}
                  color="black"
                />
              )}
              <Text>Cash on Delivery</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.WHITE,
                gap: 6,
                padding: 10,
                marginTop: 10,
              }}
            >
              {selectedOptions == "card" ? (
                <FontAwesome6 name="circle-dot" size={24} color="green" />
              ) : (
                <Entypo
                  onPress={() => setSelectedOptions("card")}
                  name="circle"
                  size={24}
                  color="black"
                />
              )}
              <Text>Credit / Debit card</Text>
            </View>
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: Colors.SAFFRON,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                marginTop: 20,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
