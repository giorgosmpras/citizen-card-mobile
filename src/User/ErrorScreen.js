import React, { useEffect } from "react";
import { Text, StatusBar, Platform } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ON HOLD! CURRENTLY NO USE FROM THE APPLICATION
export default function ErrorScreen({ navigation }) {
  const reload = () => {
    navigation.replace("Body");
  };

  const goBack = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: "rgb(104,112,138)" },
        styles.AndroidSafeArea,
      ]}
    >
      <View
        style={{
          backgroundColor: "rgb(104,112,138)",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginHorizontal: 10,
            lineHeight: 25,
            color: "white",
          }}
        >
          Κάτι πήγε λάθος, παρακαλώ προσπαθήστε ξανά.
        </Text>
        <Ionicons
          name="reload-outline"
          size={44}
          color="white"
          style={{ alignSelf: "center", marginTop: 30, marginBottom: 30 }}
          onPress={reload}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginHorizontal: 10,
            lineHeight: 25,
            color: "white",
            textDecorationLine: "underline",
          }}
          onPress={goBack}
        >
          Αλλιώς συνδεθείτε ξανά
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
