import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
//import { TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../Constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  //check that user is login or not
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = AsyncStorage.getItem(authToken);
        if(token){
          navigation.replace("Main")
        }
      } catch (err) {
        console.log("error:", err);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://10.0.2.2:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("Response status:", response.status); // Log the response status
      console.log("response:", response);
      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        return; // Exit the function if login failed
      }

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      const token = data.token;

      if (token) {
        await AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      } else {
        console.error("Token is undefined");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <KeyboardAvoidingView>
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
            Login In To Your Account
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
            // backgroundColor: "red",
            justifyContent: "space-between",
            marginLeft: 10,
            marginRight: 10,
            //marginTop: 10,
            padding: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 14, fontWeight: "500" }}
          >
            Keep me logged in
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Main")}>
            <Text
              style={{ color: Colors.BLUE, fontSize: 14, fontWeight: "400" }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            onPress={handleLogin}
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
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{ color: Colors.GRAY, fontSize: 15, fontWeight: "600" }}
            >
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
