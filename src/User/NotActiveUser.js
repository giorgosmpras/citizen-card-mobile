import React, { useEffect } from "react";
import { Text, StatusBar, Platform } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ON HOLD! CURRENTLY NO USE FROM THE APPLICATION
export default function NotActiveUser({ navigation }) {
  useEffect(() => {
    const clear = async () => {
      await AsyncStorage.clear();
    };

    clear();
  }, []);

  const goBack = async () => {
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
        <AntDesign
          name="close"
          size={44}
          color="white"
          style={{ position: "absolute", right: 10, top: 10 }}
          onPress={goBack}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginHorizontal: 10,
            lineHeight: 25,
            color: "white",
          }}
        >
          Ο λογαριασμός σας έχει απενεργοποιηθεί παρακαλώ επικοινωνήστε με το
          πλησιέστερο δημαρχειό.
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
