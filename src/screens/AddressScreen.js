import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import { Colors } from "../../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../../userContext";
import axios from "axios";

export default function AddAddressScreen() {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      //accessing token which we have sent during log in
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  
  const handleAddAddress = async () => {
    try {
      const address = {
        city,
        name,
        mobileNo,
        house,
        street,
        landmark,
        postalCode,
      };
      if (
        !city ||
        !name ||
        !mobileNo ||
        !house ||
        !street ||
        !landmark ||
        !postalCode
      ) {
        Alert.alert("Please fill all fields");
        return;
      }
      // Posting data to the endpoint addresses
      const response = await axios.post("http://10.0.2.2:8000/addresses", {
        userId,
        address,
      });
      Alert.alert("Address added successfully");
      console.log(response.data);
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (err) {
      Alert.alert("Failed to add address");
      console.log("error", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: Colors.WHITE }}>
        <View
          style={{
            backgroundColor: Colors.CYAN,
            width: "100%",
            height: 30,
            alignItems: "center",
            padding: 10,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
              alignSelf: "center",
            }}
          >
            Add a new Address
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            City
          </Text>
          <TextInput
            placeholder="Enter city "
            value={city}
            onChangeText={(text) => setCity(text)}
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",
              height: 40,
              borderRadius: 3,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            Full Name (First and last name)
          </Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",
              height: 40,
              borderRadius: 3,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            Mobile Number
          </Text>
          <TextInput
            placeholder="Mobile No"
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",
              height: 40,
              borderRadius: 3,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            Flat, House No, Building, Company
          </Text>
          <TextInput
            placeholder=""
            value={house}
            onChangeText={(text) => setHouse(text)}
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",
              height: 40,
              borderRadius: 3,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            Area, Street, Sector,Village
          </Text>
          <TextInput
            placeholder=""
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",
              height: 40,
              borderRadius: 3,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            Landmark
          </Text>
          <TextInput
            placeholder="e.g near Alied Hospital"
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",

              borderRadius: 3,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: Colors.BLACK,
              padding: 10,
            }}
          >
            Postal Code
          </Text>
          <TextInput
            placeholder="Enter your postal code"
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            style={{
              alignSelf: "center",
              borderWidth: .5,
              borderColor: Colors.BLACK,
              padding: 10,
              width: "95%",
              height: 40,
              borderRadius: 3,
            }}
          />
          <TouchableOpacity
            onPress={handleAddAddress}
            style={{
              marginTop: 20,
              alignSelf: "center",
              padding: 10,
              width: "95%",
              height: 50,
              borderRadius: 5,
              backgroundColor: Colors.YELLOW,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700" }}>Add Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
