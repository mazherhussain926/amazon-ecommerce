import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.
// import { ScrollView } from 'react-native-virtualized-view';
//icons
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//hardcore data list
import { list, images, deals, offers } from "../../Constants/HomeScreenData";
import { Colors } from "../../Constants/Colors";

// axios
import axios from "axios";
//local components
import ProductItem from "../../components/ProductItem";
//drop down
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//At npm the name of library is wrong.It is react-native-modals. Where at npm its name is react-native-modal which is wrong
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../userContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  //console.log(selectedAddress);

  //for drop down
  const [open, setOpen] = useState(false);
  const [companyOpen,setCompanyOpen]=useState(true);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console("error during fetching data", err);
      }
    };
    fetchData();
    //  const category=  products.map((item)=>item.category)
    //  console.log(category)
  }, []);
  //use callback hook memorizes the function. It will freeze the function
  //which means that function will not render automatically when state change in main component
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  // accessing reducers , we use useSelector() hook from react-redux
  //from store cart then from slice cart array
  // const cart = useSelector((state) => state.cart.cart);
  // console.log(cart)

  const { userId, setUserId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (err) {
      console.log("Error", err);
    }
  };
  //Refresh the addresses when component comes to the focus which means that when we will navigate back
useFocusEffect(
  useCallback(()=>{
    fetchAddresses();
  },[])
);


  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);


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

  //console.log("addresses:", addresses);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
        >
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
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              backgroundColor: Colors.CYAN_LIGHT,
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome6 name="location-dot" size={24} color="black" />
            {selectedAddress ? (
              <Text style={{ fontWeight: "600" }}>
                Deliver to {selectedAddress?.name.toUpperCase()} -{" "}
                {selectedAddress?.street.toUpperCase()}
              </Text>
            ) : (
              <Text style={{ fontWeight: "600" }}>
               Add Address
              </Text>
            )}
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            {list.map((item, index) => (
              <View key={index} style={{ padding: 10, alignItems: "center" }}>
                <View style={{}}>
                  <Image
                    source={{ uri: item?.image }}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
                <View style={{ padding: 5 }}>
                  <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((item, index) => (
              <View key={index}>
                <ImageBackground
                  source={{ uri: item }}
                  style={{
                    height: 200,
                    width: 400,
                    objectFit: "cover",
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                ></ImageBackground>
              </View>
            ))}
          </ScrollView>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            Trending Deals of the week
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: 10,
              //backgroundColor:"red"
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Product Info", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    offer: item.offer,
                    item: item,
                  })
                }
                key={index}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 160,
                    height: 160,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              borderWidth: 2,
              borderColor: Colors.GRAY,
              height: 1,
              marginTop: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            Today's Deals
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, width: "100%" }}
          >
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Product Info", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    offer: item.offer,
                    item: item,
                  })
                }
                key={index}
                style={{
                  padding: 10,
                  //backgroundColor: "green",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                />
                <TouchableOpacity
                  key={index}
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: Colors.RED,
                    //alignSelf: "center",
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: Colors.WHITE,
                    }}
                  >{`Upto ${item.offer}`}</Text>
                </TouchableOpacity>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              borderWidth: 2,
              borderColor: Colors.GRAY,
              height: 1,
              marginTop: 10,
            }}
          />
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: Colors.SAFFRON,
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //gender value
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              companyOpen={companyOpen}
              setItems={setItems}
              placeholder="Choose category"
              placeholderStyle={styles.placeholderStyle}
              onOpen={onGenderOpen}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-around",
              padding: 10,
              //backgroundColor:"red"
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
            useNativeDriver: true,
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent
          style={{ width: "100%", height: 400, backgroundColor: Colors.WHITE }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: Colors.GRAY }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", marginTop: 10, }}
          >
            {addresses?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => setSelectedAddress(item)}
                  key={index}
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: Colors.GRAY,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft:5,
                    backgroundColor:
                    selectedAddress === item ? Colors.SAFFRON : Colors.WHITE,
                  }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 5, }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: Colors.GRAY,
                        marginRight: 10,
                      }}
                    >
                      {item.name.toUpperCase()}
                    </Text>
                    <Ionicons name="location" size={24} color="red" />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: Colors.GRAY,
                        marginRight: 10,
                      }}
                    >
                      {item.house}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: Colors.GRAY,
                        marginRight: 10,
                      }}
                    >
                      {item.street}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: Colors.GRAY,
                        marginRight: 10,
                      }}
                    >
                      {item.city}
                    </Text>
                  </View>
                </Pressable>
              );
            })}

            <Pressable
              onPress={() => {
                navigation.navigate("Add Address");
                setModalVisible(false);
              }}
              style={{
                width: 140,
                height: 140,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: Colors.GRAY,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.BLUE,
                  fontWeight: "500",
                  textAlign: "center",
                  padding: 10,
                }}
              >
                Add an address or pickup point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <FontAwesome6 name="location-dot" size={24} color="blue" />
            <Text
              style={{ marginLeft: 10, color: Colors.BLUE, fontWeight: "500" }}
            >
              Enter an Indian pincode
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <MaterialIcons name="gps-fixed" size={24} color="blue" />
            <Text
              style={{ marginLeft: 10, color: Colors.BLUE, fontWeight: "500" }}
            >
              Use my correct location
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Ionicons name="globe-outline" size={24} color="blue" />
            <Text
              style={{ marginLeft: 10, color: Colors.BLUE, fontWeight: "500" }}
            >
              Deliver outside India
            </Text>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({});
