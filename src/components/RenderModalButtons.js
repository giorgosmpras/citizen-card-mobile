import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";

export default function NumberButtonGenerator({
  numberOfButtons,
  numberOfBusiness,
  nameOfBusiness,
}) {
  const buttons = [];
  const navigation = useNavigation();

  // Function to handle button click
  const handleButtonClick = (buttonId) => {
    console.log(buttonId);
    // call store data with the pressed business id
    storeData(buttonId);
    // then navigate to business body
    navigateBussiness();
  };

  // navigate the user to business
  const navigateBussiness = () => {
    navigation.replace("BodyBussiness");
  };

  // store the given id to asyncStorage for future purposes
  const storeData = async (business_id) => {
    try {
      await AsyncStorage.setItem(`@TempBusinessId`, business_id);
    } catch (e) {
      console.log(e + " at TempBusinessId");
    }
  };

  // Generate buttons based on the number input
  for (let i = 0; i < numberOfButtons; i++) {
    buttons.push(
      <View key={i} style={styles.buttonContainer}>
        <Pressable
          onPress={() => handleButtonClick(numberOfBusiness.owner_business[i])}
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
          }}
        >
          <Text style={styles.text}>{nameOfBusiness[i].id}</Text>
        </Pressable>
      </View>
    );
  }

  return <View style={styles.choicesContainer}>{buttons}</View>;
}

const styles = StyleSheet.create({
  choicesContainer: {
    marginTop: 41,
    marginBottom: 31,
  },
  buttonContainer: {
    marginBottom: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
});

//export default NumberButtonGenerator;
