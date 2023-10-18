import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Image } from "expo-image";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ActivityIndicator } from "react-native-paper";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import headerHome from "../../assets/headerHome.png";
import flowers from "../../assets/flowers.png";
import NumberButtonGenerator from "../components/RenderModalButtons";
import NumberButtonGenerator_Service from "../components/RenderModalButtons_Service";
import { useMyContext } from "../Globals/MyContext";

const Tab = createMaterialTopTabNavigator();

// HOMESCREEN FOR THE USER AND THE WHOLE APP
export default function HomeScreen({ navigation }) {
  // states for the user info
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const [loading, setLoading] = useState();

  // states for modal visibilities
  const [modalVisible_business, setModalVisible_business] = useState(false);
  const [modalVisible_service, setModalVisible_service] = useState(false);

  // states for number of businesses and services that user is accountable
  const [number_of_business, setNumber_of_business] = useState(0);
  const [number_of_service, setNumber_of_Service] = useState(0);

  // business and service info
  const [business_id, setBusiness_id] = useState("");
  const [business_data, setBusiness_data] = useState([]);
  const [service_id, setService_id] = useState("");
  const [service_data, setService_data] = useState([]);

  // state for the visibility of the animated menu
  const [menuVisible, setMenuVisible] = useState(false);

  // initialization of the animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // const to show the animated menu
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 1 second
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // const to hide the animated menu
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 0.7 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  // get all the states from the context
  const { myVariable, setMyVariable, activeVariable, setActiveVariable } =
    useMyContext();

  // initialize the userId from the context
  const [userId, setUserId] = useState(myVariable);

  // get the qrValue from the userInfo
  const qrValue = `${name}:${lastname}:${mobile}:${email}:${userId}`;

  // consts for every choice in the animated menu
  const handlePress = () => {
    navigation.navigate("ProfileScreen");
  };
  const handleMessageHistory = () => {
    navigation.navigate("MessageHistoryScreen");
  };
  const handleScanPress = () => {
    navigation.navigate("ScannerScreenHome");
  };
  const handleUpdatePress = () => {
    navigation.navigate("ProfileScreen");
  };
  const handleReportPress = () => {
    navigation.navigate("ReportProblemNavigator");
  };
  const handleHistoryPress = () => {
    navigation.navigate("HistoryScreen");
  };
  const handleChangePhoto = () => {
    navigation.navigate("ProfileScreenAddNewImage");
  };
  const handleLinkedCards = () => {
    navigation.navigate("linkedcards");
  };

  // QrScreen for the tab navigator
  const Qrscreen = () => {
    return (
      <>
        <ImageBackground
          source={flowers}
          defaultSource={flowers}
          resizeMode="stretch"
          style={{ flex: 1 }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                alignItems: "center",
                marginTop: 50,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 10,
                backgroundColor: "white",
                width: 200,
              }}
            >
              <TouchableOpacity onPress={handlePress}>
                {name && mobile && userId ? (
                  <QRCode value={qrValue} size={200} />
                ) : (
                  <ActivityIndicator color="#4BAD4E" size={"large"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* Check the userRole and show the appropriate buttons */}
          {userRole === "BUSINESS" && (
            <>
              <FontAwesome
                name="circle"
                size={55}
                color="rgb(104,112,138)"
                style={styles.circle}
                onPress={() => setModalVisible_business(true)} //onPress={navigateBussiness}
              />
              <FontAwesome5
                name="briefcase"
                size={20}
                color="white"
                style={styles.roleIcon}
                onPress={() => setModalVisible_business(true)} //onPress={navigateBussiness}
              />
            </>
          )}
          {userRole === "BOTH" && (
            <>
              <FontAwesome
                name="circle"
                size={55}
                color="rgb(104,112,138)"
                style={styles.circle}
                onPress={() => setModalVisible_business(true)} //onPress={navigateBussiness}
              />
              <FontAwesome5
                name="briefcase"
                size={20}
                color="white"
                style={styles.roleIcon}
                onPress={() => setModalVisible_business(true)} //onPress={navigateBussiness}
              />
              <FontAwesome
                name="circle"
                size={55}
                color="rgb(104,112,138)"
                style={styles.bothCircle}
                onPress={() => setModalVisible_service(true)} //onPress={navigateBussiness}
              />
              <MaterialIcons
                name="message"
                size={20}
                color="white"
                style={styles.bothIcon}
                onPress={() => setModalVisible_service(true)} //onPress={navigateBussiness}
              />
            </>
          )}
          {userRole === "SERVICE" && (
            <>
              <FontAwesome
                name="circle"
                size={55}
                color="rgb(104,112,138)"
                style={styles.circle}
                onPress={() => setModalVisible_service(true)} //onPress={navigateBussiness}
              />
              <MaterialIcons
                name="message"
                size={20}
                color="white"
                style={styles.roleIcon}
                onPress={() => setModalVisible_service(true)} //onPress={navigateBussiness}
              />
            </>
          )}
        </ImageBackground>
      </>
    );
  };

  // LinkedCards for the tab navigator
  const LinkedCards = () => {
    return (
      <>
        <ImageBackground
          source={flowers}
          defaultSource={flowers}
          resizeMode="stretch"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Καμία Συσχετιζόμενη Κάρτα
          </Text>
        </ImageBackground>
      </>
    );
  };

  // function to get all the data needed to populate the homescreen
  const getData = async () => {
    try {
      setLoading(true);
      // request to get all the user collection using the userId
      const response = await fetch(
        `${EXPO_PUBLIC_BASE_URL}/api/organization-get-user?id=` +
          JSON.parse(myVariable)
      );

      // make all the response json
      const json = await response.json();
      console.log(json);

      setLoading(false);

      // set all the user info according to the response of the request
      setName(json.name);
      setLastname(json.lastname);
      setEmail(json.email);
      setMobile(json.mobile);
      setActiveVariable(json.active);

      // if user not active clear the AsyncStorage and navigate the user to login
      if (!json.active) {
        await AsyncStorage.clear();
        navigation.navigate("Login");
      }

      //set the userRole later to be used to show the appropriate buttons
      setUserRole(json.owner);
      console.log(json.owner);

      // START HANDLING THE OWNED BUSINESSES
      setBusiness_id(json);
      // set the number of businesses
      setNumber_of_business(json.owner_business.length);
      // initialize the business data
      setBusiness_data([]);
      // loop for every business
      for (let y = 0; y < json.owner_business.length; y++) {
        // get the business info for each of them
        const response1 = await fetch(
          `${EXPO_PUBLIC_BASE_URL}/api/organization/business-data?business_id=` +
            json.owner_business[y]
        );
        const json1 = await response1.json();
        // lastly store for every business her data with id
        setBusiness_data((business_data) => [
          ...business_data,
          { id: json1.business.name },
        ]);
      }

      // START HANDLING THE OWNED SERVICES
      setService_id(json);
      // set the number of services
      setNumber_of_Service(json.owner_service.length);
      // initialize the business data
      setService_data([]);
      // loop for every service
      for (let y = 0; y < json.owner_service.length; y++) {
        // get the service info for each of them
        const response2 = await fetch(
          `${EXPO_PUBLIC_BASE_URL}/api/organization/services-data?services_id=` +
            json.owner_service[y]
        );
        const json2 = await response2.json();
        // lastly store for every service her data with id
        setService_data((service_data) => [
          ...service_data,
          { id: json2.service.title },
        ]);
      }
    } catch (e) {}
  };

  // execute functions before anything been rendered
  useLayoutEffect(() => {
    console.log("start");
    getData();
  }, []);

  // execute in the first render
  useEffect(() => {
    // always when in focus close the animated menu
    const unsubscribe = navigation.addListener("focus", () => {
      setMenuVisible(false);
    });
  }, [navigation]);

  // const that handle the actions when user press "More..."
  const onMorePress = async () => {
    if (menuVisible === false) {
      fadeIn();

      setMenuVisible(true);
    } else {
      fadeOut();
      await delay(600);
      setMenuVisible(false);
    }
  };

  // initialize the delay
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // when the app still tries to get the user data render only that
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={53} color="rgb(104,112,138)" />
      </View>
    );
  }

  // if user is active and the loading has stopped render this
  if (activeVariable && !loading) {
    return (
      <>
        {/* Initialize modal for owned businesses */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_business}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible_business(!modalVisible_business);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground
                source={flowers}
                resizeMode="stretch"
                style={{ justifyContent: "center", padding: 35 }}
              >
                <Text style={styles.modalText}>Επιλέξτε Επιχείρηση</Text>
                {/* Call component to populate the buttons */}
                <NumberButtonGenerator
                  numberOfButtons={number_of_business}
                  numberOfBusiness={business_id}
                  nameOfBusiness={business_data}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    setModalVisible_business(!modalVisible_business)
                  }
                >
                  <Text style={styles.textStyle}>Επιστροφή</Text>
                </Pressable>
              </ImageBackground>
            </View>
          </View>
        </Modal>

        {/* Initialize modal for owned services */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_service}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible_service(!modalVisible_service);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground
                source={flowers}
                resizeMode="stretch"
                style={{
                  justifyContent: "center",
                  padding: 35,
                }}
              >
                <Text style={[styles.modalText, {}]}>Επιλέξτε Υπηρεσία</Text>
                {/* Call component to populate the buttons */}
                <NumberButtonGenerator_Service
                  numberOfButtons={number_of_service}
                  numberOfBusiness={service_id}
                  nameOfBusiness={service_data}
                />

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible_service(!modalVisible_service)}
                >
                  <Text style={styles.textStyle}>Επιστροφή</Text>
                </Pressable>
              </ImageBackground>
            </View>
          </View>
        </Modal>

        {/* START OF THE SCREEN */}
        <ImageBackground
          source={headerHome}
          style={{ width: "100%", height: 180 }}
        >
          <View
            style={{
              position: "absolute",
              bottom: -45,
              left: "39%",
            }}
          >
            <Image
              source={require("../../assets/user_add.png")}
              style={styles.cover}
              contentFit="contain"
            />
            <Image
              source={{
                uri:
                  `${EXPO_PUBLIC_BASE_URL}/api/profile/user/download?user_id=` +
                  JSON.parse(myVariable) +
                  "&date=" +
                  new Date(),
              }}
              style={styles.cover}
              contentFit="contain"
            />
          </View>
        </ImageBackground>
        <View style={{ marginTop: 55, alignItems: "center" }}>
          <Text style={{ color: "#8F929A" }}>
            {name} {lastname}
          </Text>
          <Text style={{ color: "#AEB1C0" }}>{mobile}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleReportPress}>
              <AntDesign
                name="scan1"
                size={14}
                color="black"
                style={{ textAlign: "center" }}
              />
              <Text style={{ fontSize: 10, padding: 5 }}>Αναφορά</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleUpdatePress}>
              <Ionicons
                name="person-circle-outline"
                size={14}
                color="black"
                style={{ textAlign: "center" }}
              />
              <Text style={{ fontSize: 10, padding: 5 }}>Προφίλ</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleHistoryPress}>
              <Ionicons
                name="filter"
                size={14}
                color="black"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ fontSize: 10, padding: 5 }}>Ιστορικό</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={onMorePress}>
              <MaterialCommunityIcons
                name="settings-helper"
                size={14}
                color="black"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ fontSize: 10, padding: 5 }}>Περισσότερα</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*-----------------Animated View--------------- */}
        <Animated.View
          style={{
            flexDirection: "row",
            opacity: fadeAnim,
            marginTop: menuVisible ? 2 : 0,
          }}
        >
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleScanPress}>
              <AntDesign
                name="qrcode"
                size={14}
                color="black"
                style={{ textAlign: "center" }}
              />
              <Text style={{ fontSize: 10, padding: 5 }}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleMessageHistory}>
              <Ionicons
                name="newspaper-outline"
                size={14}
                color="black"
                style={{ textAlign: "center" }}
              />
              <Text style={{ fontSize: 10, textAlign: "center", width: 60 }}>
                Ιστορικό Μηνυμάτων
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleChangePhoto}>
              <MaterialIcons
                name="add-a-photo"
                size={14}
                color="black"
                style={{ textAlign: "center" }}
              />
              <Text style={{ fontSize: 10, textAlign: "center", width: 80 }}>
                Αλλαγή Εικόνας Προφίλ
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#cdced1",
            }}
          >
            <TouchableOpacity onPress={handleLinkedCards}>
              <AntDesign
                name="idcard"
                size={14}
                color="black"
                style={{ textAlign: "center" }}
              />
              <Text style={{ fontSize: 10, textAlign: "center", width: 80 }}>
                Συσχετιζόμενες Κάρτες
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {/* START OF THE NESTED TAB NAVIGATOR */}
        <Tab.Navigator
          tabBarPosition="bottom"
          screenOptions={{
            tabBarLabelStyle: {
              textTransform: "none",
              height: 20,
              color: "#68708A",
            },
            tabBarIndicatorStyle: { backgroundColor: "#68708A" },
          }}
          style={[{ marginTop: !menuVisible ? -50 : 0 }]}
        >
          <Tab.Screen
            name="qrscreen"
            component={Qrscreen}
            options={{ title: "Η κάρτα μου" }}
          />
          <Tab.Screen
            name="linkedcards"
            component={LinkedCards}
            options={{ title: "Συσχετιζόμενες κάρτες" }}
          />
        </Tab.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  roleIcon: {
    position: "absolute",
    right: 34,
    bottom: 38,
  },
  circle: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  bothIcon: {
    position: "absolute",
    right: 33,
    bottom: 105,
  },
  bothCircle: {
    position: "absolute",
    right: 20,
    bottom: 88,
  },
  cover: {
    height: 105,
    justifyContent: "center",
    marginLeft: -10,
    marginTop: -100,
    width: 105,
    position: "absolute",
    //right: 0,

    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "rgb(104,112,138)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: "rgb(104,112,138)",
    borderStyle: "solid",
    borderWidth: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "rgb(104,112,138)",
  },
  buttonClose: {
    backgroundColor: "rgb(104,112,138)",
  },
  textStyle: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    textDecorationColor: "black",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});
