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
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../Constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function LoginScreen() {
const[name,setName]=useState()
const[email,setEmail]=useState()
const[password,setPassword]=useState()
// Register New User
const handleRegister = ()=>{

}
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.WHITE }}>
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
            onChangeText={(text)=>setName(text)}
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
            onChangeText={(text)=>setEmail(text)}

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
            onChangeText={(text)=>setPassword(text)}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
