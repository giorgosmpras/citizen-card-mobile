import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_BASE_URL } from "@env";

// PROFILE SCREEN FOR BUSINESS
export default function ProfileScreenBussiness({ navigation }) {
  // states for the business info
  const [Business_Id, setBusiness_Id] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // get the user id
  const [User_Id, setUser_Id] = useState("");

  // function to get the business id and its data
  const getBusiness_Id = async () => {
    // get id from asyncStorage
    const Business_Id = await AsyncStorage.getItem(`@TempBusinessId`);
    // set it to the appropriate state
    setBusiness_Id(Business_Id);
    const response = await fetch(
      `${EXPO_PUBLIC_BASE_URL}/api/organization/business-data?business_id=` +
        Business_Id
    );
    const json = await response.json();
    // from the response set the business info
    setTitle(json.business.title);
    setMobile(json.business.mobile);
    setName(json.business.name);
    setEmail(json.business.email);
    setUser_Id(json.business.ownedBy);
  };

  // execute getBusiness_Id in the first render
  useEffect(() => {
    getBusiness_Id();
  });

  // const to navigate the user to change his business profile
  const onPress = () => navigation.navigate("BusinessProfileAddNewImage");

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={onPress}>
        <Image
          source={require("../../assets/user_add.png")}
          style={styles.cover}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable onPress={onPress}>
        <Image
          source={{
            uri:
              `${EXPO_PUBLIC_BASE_URL}/api/profile/business/download?user_id=` +
              Business_Id +
              "&date=" +
              new Date(),
          }}
          style={styles.cover}
          contentFit="contain"
        />
      </Pressable>
      <Text style={styles.mainText}>{name}</Text>
      <View style={styles.views}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.texts}>{title}</Text>
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
    marginTop: 120,
    padding: 40,
  },
  icon: {
    marginTop: 60,
    marginBottom: 30,
  },
  views: {
    backgroundColor: "#F5F4F8",
    marginBottom: 22,
    height: 70,
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
    bottom: 5,
  },
  cover: {
    height: 105,
    justifyContent: "center",
    alignSelf: "center",
    //marginLeft: -120,
    marginTop: 20,
    width: 105,
    position: "absolute",
    //right: 0,

    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
