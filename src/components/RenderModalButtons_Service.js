import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// COMPONENT TO RENDER THE BUTTONS OF OWNED SERVICES
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
    // call store data with the pressed service id
    storeData(buttonId);
    // then navigate to service body
    navigateService();
  };

  // navigate the user to service
  const navigateService = () => {
    navigation.replace("BodyService");
  };

  // store the given id to asyncStorage for future purposes
  const storeData = async (service_id) => {
    try {
      await AsyncStorage.setItem(`@TempServiceId`, service_id);
    } catch (e) {
      console.log(e + " at TempServiceId");
    }
  };

  // Generate buttons based on the number input
  for (let i = 0; i < numberOfButtons; i++) {
    buttons.push(
      <View key={i} style={styles.buttonContainer}>
        <Pressable
          onPress={() => handleButtonClick(numberOfBusiness.owner_service[i])}
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
