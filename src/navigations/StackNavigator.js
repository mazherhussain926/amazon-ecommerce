//navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen"
import ProductInfoScreen from "../screens/ProductInfoScreen";
//icon
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AddressScreen from "../screens/AddressScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";


export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <FontAwesome5 name="cart-plus" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <FontAwesome name="user" size={24} color="#008E97" />
              ) : (
                <FontAwesome name="user-o" size={24} color="black" />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: "true",
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: "true",
            
          }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{
            headerShown: false,
            headerTitle: "",
            headerTransparent: "true",
          }}
        />
        <Stack.Screen
          name="Product Info"
          component={ProductInfoScreen}
          options={{
            headerShown: false,
            headerTitle: "Product Info",
            headerTransparent: "true",
          
          }}
        />
        <Stack.Screen
          name="Add Address"
          component={AddAddressScreen}
          options={{
            headerShown: false,
            headerTitle: "Product Info",
            headerTransparent: "true",
          
          }}
        />
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{
            headerShown: false,
            headerTitle: "Product Info",
            headerTransparent: "true",
          
          }}
        />
        <Stack.Screen
          name="Confirmation Screen"
          component={ConfirmationScreen}
          options={{
            headerShown: false,
            headerTitle: "Confirm your Order",
            headerTransparent: "true",
          
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
