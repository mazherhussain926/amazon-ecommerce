import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../Constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* 
  // Register New User using axios
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send  a post request to the backend API

    axios
      .post("https://10.0.2.2:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration is Successful",
          "You have registered successfully"
        );

        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {

        Alert.alert(
          "Registration Error",
          "An error occurred during registration"
        );
        console.log("registration failed", err);
      });
  };
*/

  // Register New User
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    //posting data to the endpoint register
    fetch("http://10.0.2.2:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (!name || !email || !password) {
          return Alert.alert("Please fill all fields");
        }
        Alert.alert(
          "Registration is Successful",
          "You have registered successfully"
        );

        setName("");
        setEmail("");
        setPassword("");
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert(
          "Registration Error",
          "An error occurred during registration"
        );
        console.log("registration failed", err);
      });
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 10, marginTop: 20, alignItems: "center" }}>
            <Image
              source={require("./../../assets/amazon.png")}
              style={{ width: "90%", height: 100 }}
            />
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 22,
                fontWeight: "800",
                textAlign: "center",
                padding: 10,
                marginBottom: 20,
              }}
            >
              Register To Your Account
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              width: "90%",
              height: 50,
              borderRadius: 5,
              borderWidth: 0.5,
              backgroundColor: Colors.GRAY,
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              paddingHorizontal: 10,
              gap: 10,
              marginBottom: 10,
            }}
          >
            <FontAwesome name="user" size={24} color="black" />
            <TextInput
              placeholder="Enter your Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                width: "90%",
                height: 50,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              width: "90%",
              height: 50,
              borderRadius: 5,
              borderWidth: 0.5,
              backgroundColor: Colors.GRAY,
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              paddingHorizontal: 10,
              gap: 10,
              marginBottom: 10,
            }}
          >
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              placeholder="Enter your Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                width: "90%",
                height: 50,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              width: "90%",
              height: 50,
              borderRadius: 5,
              borderWidth: 0.5,
              backgroundColor: Colors.GRAY,
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              paddingHorizontal: 10,
              gap: 10,
            }}
          >
            <MaterialIcons name="lock" size={24} color="black" />
            <TextInput
              placeholder="Enter your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: "90%",
                height: 50,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
              padding: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ color: Colors.BLACK, fontSize: 14, fontWeight: "500" }}
            >
              Keep me logged in
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: Colors.BLUE, fontSize: 14, fontWeight: "400" }}
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity
              onPress={handleRegister}
              style={{
                width: "50%",
                height: 50,
                backgroundColor: Colors.YELLOW,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 15,
              }}
            >
              <Text
                style={{ color: Colors.WHITE, fontSize: 15, fontWeight: "400" }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{ color: Colors.GRAY, fontSize: 15, fontWeight: "600" }}
              >
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
