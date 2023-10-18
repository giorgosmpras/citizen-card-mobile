import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { Alert } from "react-native";
import { Image } from "expo-image";

// PROFILE SCREEN FOR THE USER
export default function ProfileScreen({ navigation }) {
  // states for the user info
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  // show an alert if the user press logout
  const handleAsk = async () => {
    try {
      Alert.alert("Αποσύνδεση", "Είστε σίγουροι πως θέλετε να αποσυνδεθείτε;", [
        {
          text: "Ακύρωση",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Αποσύνδεση", onPress: () => handleLogout() },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  // handle logout function; clear asyncStorage and navigate the user to login
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  // execute the function for the first render
  useEffect(() => {
    // function to get all the info from the asyncStorage and set it at the states
    const getData = async () => {
      try {
        const name = await AsyncStorage.getItem("@name");
        setName(JSON.parse(name));
      } catch (e) {
        console.log(e + " at name");
      }
      try {
        const lastname = await AsyncStorage.getItem("@lastname");
        setLastname(JSON.parse(lastname));
      } catch (e) {
        console.log(e + " at lastname");
      }
      try {
        const mobile = await AsyncStorage.getItem("@mobile");
        setMobile(mobile);
      } catch (e) {
        console.log(e + " at mobile");
      }
      try {
        const email = await AsyncStorage.getItem("@email");
        setEmail(JSON.parse(email));
      } catch (e) {
        console.log(e + " at email");
      }
      try {
        const userId = await AsyncStorage.getItem("@userId");
        setUserId(JSON.parse(userId));
      } catch (e) {
        console.log(e + " at userId");
      }
    };

    getData();
  });

  // function to handle if the user wants to change profile photo
  const onPress = () => navigation.navigate("ProfileScreenAddNewImage");

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={onPress}>
        <Image
          source={require("../../assets/user_add.png")}
          style={styles.cover}
        />
      </Pressable>
      <Pressable onPress={onPress}>
        <Image
          source={{
            uri:
              `${EXPO_PUBLIC_BASE_URL}/api/profile/user/download?user_id=` +
              userId +
              "&date=" +
              new Date(),
          }}
          transition={1000}
          style={styles.cover}
          contentFit="contain"
        />
      </Pressable>
      <View style={{ width: "100%", alignItems: "center", marginTop: 200 }}>
        <View style={styles.views}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.texts}>
              {name} {lastname}
            </Text>
            <Ionicons
              name="person-outline"
              size={18}
              color="#585C82"
              style={styles.lineIcons}
            />
          </View>
        </View>
        <View style={styles.views}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.texts}>{mobile}</Text>
            <Feather
              name="phone"
              size={18}
              color="#585C82"
              style={styles.lineIcons}
            />
          </View>
        </View>
        <View style={styles.views}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.texts}>{email}</Text>
            <Feather
              name="mail"
              size={18}
              color="#585C82"
              style={styles.lineIcons}
            />
          </View>
        </View>
      </View>

      <Text style={{ color: "red" }} onPress={handleAsk}>
        Αποσύνδεση
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: "white",
    alignItems: "center",
  },
  mainText: {
    color: "#0B508C",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 50,
  },
  icon: {
    marginTop: 30,
    marginBottom: 30,
  },
  views: {
    backgroundColor: "#F5F4F8",
    marginBottom: 22,
    height: 60,
    width: "85%",
    borderRadius: 17,
    justifyContent: "center",
  },
  texts: {
    fontSize: 17,
    marginLeft: 17,
  },
  lineIcons: {
    position: "absolute",
    right: 20,
    bottom: 0,
  },
  cover: {
    height: 105,
    width: 105,

    justifyContent: "center",
    alignSelf: "center",
    //marginLeft: -120,
    marginTop: 20,
    position: "absolute",
    //right: 0,

    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
