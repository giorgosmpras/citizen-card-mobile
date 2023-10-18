import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

import headerHome from "../../assets/headerHome.png";
import flowers from "../../assets/flowers.png";
import { useMyContext } from "../Globals/MyContext";

// HOMESCREEN FOR SERVICE
export default function HomeScreenService({ navigation }) {
  // states for the service info
  const [userRole, setUserRole] = useState("");
  const [Service_Id, setService_Id] = useState("");
  const [title, setTitle] = useState("");
  const [mobile, setMobile] = useState("");

  // state for the visibility of the animated menu
  const [menuVisible, setMenuVisible] = useState(false);

  // get the state from the context
  const { myVariable, setMyVariable } = useMyContext();

  // state for the user id
  const [User_Id, setUser_Id] = useState("");

  // initialization of the animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // const to show the animated menu
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // const to hide the animated menu
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  // consts for every choice in the animated menu
  const handleScanPress = () => {
    navigation.navigate("ScannerScreen");
  };
  const handleReportPress = () => {
    navigation.navigate("ReportProblemNavigator");
  };
  const handleHistoryPress = () => {
    navigation.navigate("HistoryScreen");
  };
  const handleMessageHistory = () => {
    navigation.navigate("MessageHistoryScreen");
  };
  const handleUpdatePress = () => {
    navigation.navigate("ProfileScreenService");
  };

  // navigate home from the button bottom left
  const navigateHome = () => {
    navigation.replace("Body");
  };

  // function to get the service id and its data
  const getService_Id = async () => {
    // get id from asyncStorage
    const Service_Id = await AsyncStorage.getItem(`@TempServiceId`);
    console.log(Service_Id);
    // set it to the appropriate state
    setService_Id(Service_Id);
    const response = await fetch(
      `${EXPO_PUBLIC_BASE_URL}/api/organization/services-data?services_id=` +
        Service_Id
    );
    const json = await response.json();
    console.log(json);
    // from the response set the business info
    setTitle(json.service.title);
    setMobile(json.service.mobile);
    setUser_Id(JSON.parse(myVariable));
  };

  // get user role from async
  const getRole = async () => {
    const role = await AsyncStorage.getItem(`@userRole`);
    setUserRole(JSON.parse(role));
  };

  // execute getBusiness_Id in the first render
  useEffect(() => {
    getService_Id();
    getRole();

    console.log("User_Id :" + User_Id);
  }, []);

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
    console.log(menuVisible);
  };

  // initialize the delay
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <>
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
                User_Id +
                "&date=" +
                new Date(),
            }}
            style={styles.cover}
            contentFit="contain"
          />
        </View>
      </ImageBackground>
      <View style={{ marginTop: 55, alignItems: "center" }}>
        <Text style={{ color: "#8F929A", fontSize: 15 }}>{title}</Text>
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
      </Animated.View>
      <ImageBackground
        source={flowers}
        resizeMode="stretch"
        style={{ flex: 1, marginTop: !menuVisible ? -50 : 0 }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Pressable onPress={handleUpdatePress} style>
              <Image
                source={require("../../assets/user_add.png")}
                style={styles.cover1}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={handleUpdatePress} style>
              <Image
                source={{
                  uri:
                    `${EXPO_PUBLIC_BASE_URL}/api/profile/service/download?user_id=` +
                    Service_Id +
                    "&date=" +
                    new Date(),
                }}
                style={styles.cover1}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
        <>
          <FontAwesome
            name="circle"
            size={55}
            color="rgb(104,112,138)"
            style={styles.circle}
            onPress={navigateHome}
          />
          <Ionicons
            name="md-person-sharp"
            size={20}
            color="white"
            style={styles.roleIcon}
            onPress={navigateHome}
          />
        </>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
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
  cover1: {
    height: 230,
    justifyContent: "center",
    alignSelf: "center",
    //marginLeft: -120,
    //marginTop: 80,
    width: 230,
    position: "absolute",
    //right: 0,

    //borderRadius: 150 / 2,
    //overflow: "hidden",
  },
});
