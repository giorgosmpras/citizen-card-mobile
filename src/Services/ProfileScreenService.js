import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react";
import { EXPO_PUBLIC_BASE_URL } from "@env";

// PROFILE SCREEN FOR SERVICE
export default function ProfileScreenService({ navigation }) {
  // states for the service info
  const [ServiceId, setServiceId] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // get the user id
  const [User_Id, setUser_Id] = useState("");

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // function to get the service id and its data
  const getServiceId = async () => {
    // get id from asyncStorage
    const ServiceId = await AsyncStorage.getItem(`@TempServiceId`);
    // set it to the appropriate state
    setServiceId(ServiceId);
    const response = await fetch(
      `${EXPO_PUBLIC_BASE_URL}/api/organization/services-data?services_id=` +
        ServiceId
    );
    const json = await response.json();
    // from the response set the service info
    setTitle(json.service.title);
    setMobile(json.service.mobile);
    setName(json.service.name);
    setEmail(json.service.email);
    setUser_Id(json.service.ownedBy);
    setServiceId(json.service._id);
  };

  // execute getBusiness_Id in the first render
  useEffect(() => {
    getServiceId();
  });

  return (
    <View style={styles.mainContainer}>
      <Pressable>
        <Image
          source={require("../../assets/user_add.png")}
          style={styles.cover}
          contentFit="contain"
        />
      </Pressable>
      <Pressable>
        <Image
          source={{
            uri:
              `${EXPO_PUBLIC_BASE_URL}/api/profile/service/download?user_id=` +
              ServiceId +
              "&date=" +
              new Date(),
          }}
          style={styles.cover}
          contentFit="contain"
        />
      </Pressable>
      <Text style={styles.mainText}>{title}</Text>
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
