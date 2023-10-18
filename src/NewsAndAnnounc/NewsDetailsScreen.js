import React from "react";
import { useLayoutEffect } from "react";
import { ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";

import flowers from "../../assets/flowers.png";

// SCREEN TO DISPLAY THE DETAILS OF AN ANNOUNCEMENT
export default function NewsDetailsScreen({ navigation, route }) {
  // get the announc info from the previous screen
  const { title, text, dateTime } = route.params;

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  return (
    <ImageBackground source={flowers} resizeMode="stretch" style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
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
  },
  dateTime: {
    alignSelf: "flex-end",
    marginTop: 50,
    marginRight: 10,
    color: "#AEB1C0",
  },
});
