import React from "react";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import flowers from "../../assets/flowers.png";
import { useLayoutEffect } from "react";
import { EXPO_PUBLIC_BASE_URL } from "@env";

// SCREEN TO SHOW THE DETAILS OF EACH SERVICE
export default function ServiceDetails({ route, navigation }) {
  // get the data from service list
  const { id, name, title, subscriptionService, body } = route.params;

  // initialize the url we will use
  const url1 = `${EXPO_PUBLIC_BASE_URL}/api/profile/service/download?user_id=`;

  // initialize the uri for the image
  const img = url1 + id + `&date=${new Date()}`;

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

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
                resizeMode="stretch"
                style={{
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
            {title}
          </Text>

          <Text style={{ marginTop: 30, marginLeft: 10 }}>
            Περιγραφή Υπηρεσίας:
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
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            {subscriptionService ? "Με συνδρομή" : "Ελεύθερη Πρόσβαση"}
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
