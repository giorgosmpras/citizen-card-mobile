import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";

import UserImageComponent from "../components/UserImageComponent";

// SCREEN TO CHANGE THE PROFILE PHOTO OF THE USER
const ProfileScreenAddNewImage = ({ navigation }) => {
  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // THE WHOLE ACTION IS PERFORMED BY A COMPONENT
  return <UserImageComponent navigation={navigation} />;
};

export default ProfileScreenAddNewImage;

const styles = StyleSheet.create({});
