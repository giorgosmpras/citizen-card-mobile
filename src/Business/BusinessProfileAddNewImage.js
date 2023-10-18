import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";

import BusinessScreenImageComponent from "../components/BusinessScreenImageComponent";

// SCREEN TO CHANGE THE PROFILE PHOTO OF THE BUSINESS
const BusinessProfileAddNewImage = ({ navigation }) => {
  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // THE WHOLE ACTION IS PERFORMED BY A COMPONENT
  return <BusinessScreenImageComponent navigation={navigation} />;
};

export default BusinessProfileAddNewImage;

const styles = StyleSheet.create({});
