import React from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import flowers from "../../assets/flowers.png";
import { ImageBackground } from "react-native";
import { useLayoutEffect } from "react";
import { EXPO_PUBLIC_BASE_URL } from "@env";

// SCREEN TO SHOW THE DETAILS OF EACH BUSINESS
export default function BussinessDetails({ route, navigation }) {
  // get the data from business list
  const { id, name, title, email, mobile, body } = route.params;

  // initialize the url we will use
  const url1 = `${EXPO_PUBLIC_BASE_URL}/api/profile/business/download?user_id=`;

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // initialize the uri for the image
  const img = url1 + id + `&date=${new Date()}`;

  return (
    <ImageBackground source={flowers} resizeMode="stretch" style={{ flex: 1 }}>
      <ScrollView>
        <View style={{}}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
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
                marginTop: 20,
              }}
            >
              <Image
                source={{ uri: img }}
                style={{
                  alignSelf: "center",
                  height: 180,
                  width: 200,
                }}
              />
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              marginTop: 20,
              fontWeight: 600,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              marginTop: 20,
              fontWeight: 600,
              color: "#687089",
            }}
          >
            {title}
          </Text>

          <Text style={{ marginTop: 30, marginLeft: 10 }}>
            Περιγραφή Επιχείρησης
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 10,
              marginHorizontal: 10,
            }}
          >
            {body}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              marginTop: 30,
              marginHorizontal: 10,
            }}
          >
            {email}
          </Text>
          <Text style={{ textAlign: "center", marginTop: 20 }}>{mobile}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
