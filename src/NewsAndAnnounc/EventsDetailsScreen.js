import React from "react";
import { useLayoutEffect } from "react";
import { ImageBackground } from "react-native";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";

import flowers from "../../assets/flowers.png";

// SCREEN TO DISPLAY THE DETAILS OF AN EVENT
export default function EventsDetailsScreen({ navigation, route }) {
  // get the event info from the previous screen
  const { title, body, id } = route.params;

  // initialize the url for the request
  const url1 = `${EXPO_PUBLIC_BASE_URL}/api/event/download-event-photo?id=`;

  // construct the image uri for the event
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{body}</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 20,
    fontWeight: Platform.OS === "ios" ? 600 : 800,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dateTime: {
    alignSelf: "flex-end",
    marginTop: 50,
    marginRight: 10,
    color: "#AEB1C0",
  },
});
