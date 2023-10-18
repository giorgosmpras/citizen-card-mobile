import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageBackground } from "react-native";
import { Image } from "expo-image";
import { useEffect } from "react";

import { useMyContext } from "../Globals/MyContext";
import authScreen from "../../assets/authScreen.png";
import { logUser, validateUser } from "../api/auth";

// PIN SCREEN
export default function PinScreen({ navigation, route }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // get dynamic data from server to easily change the municipality
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState();

  // store userId to context variable
  const { myVariable, setMyVariable } = useMyContext();

  // store userId to context variable
  const { activeVariable, setActiveVariable } = useMyContext();

  // get the phone from the previous screen
  const { phone } = route.params;

  // overwrite the goBack function and use it for the back arrow
  const goBack = () => {
    navigation.navigate("Login");
  };

  // call it when user want the otp to be sent to him again; Use the same api
  const handleSendAgain = async () => {
    const userInfo = {
      mobile: parseInt(phone),
    };

    // from the response show the suitable message
    const res = await logUser(userInfo);
    if (res === "Only after one hour you can request for another token!") {
      setError("Πρεπει να περιμενετε 1 ώρα για να σας ξαναστείλουμε κωδικό");
    } else {
      setError("Σας έχουμε στείλει τον κωδικό");
    }
  };

  // function to handle the press of the main button
  const handlePress = async () => {
    // store the data with the suitable format for the request
    const userInfo = {
      mobile: parseInt(phone),
      otp: parseInt(pin),
    };

    setLoading(true);
    const res = await validateUser(userInfo);
    setLoading(false);

    // check the response and render the appropriate message
    // if success also call the needed functions
    if (res.data) {
      storeData(res.data);
      setActiveVariable(true);
      navigation.replace("Body");
    } else if (res === "Token not found!") {
      setError("Λάθος κωδικός προσπαθήστε ξανά");
    } else if (res === "Please submit a valid OTP!") {
      setError("Λάθος κωδικός προσπαθήστε ξανά");
    } else {
      setError("Κάτι πήγε λάθος προσπαθήστε ξανά");
    }
  };

  // function to store the data if otp-confirm is ok
  const storeData = async ({
    // deconstruct the data sent by the call
    mobile,
    name,
    token,
    userId,
    lastname,
    email,
    owner,
  }) => {
    console.log("test :" + JSON.stringify(mobile));

    // stringify the data to make it ready for asyncStorage
    const jsonMobile = JSON.stringify(mobile);
    const jsonName = JSON.stringify(name);
    const jsonLastname = JSON.stringify(lastname);
    const jsonToken = JSON.stringify(token);
    const jsonUserId = JSON.stringify(userId);
    const jsonUserRole = JSON.stringify(owner);
    const jsonEmail = JSON.stringify(email);

    // set userId to context variable
    setMyVariable(jsonUserId);

    // store everything to AsyncStorage for future use
    try {
      await AsyncStorage.setItem(`@mobile`, jsonMobile);
    } catch (e) {
      console.log(e + " at mobile");
    }
    try {
      await AsyncStorage.setItem(`@name`, jsonName);
    } catch (e) {
      console.log(e + " at name");
    }
    try {
      await AsyncStorage.setItem(`@lastname`, jsonLastname);
    } catch (e) {
      console.log(e + " at lastname");
    }
    try {
      await AsyncStorage.setItem(`@token`, jsonToken);
    } catch (e) {
      console.log(e + " at token");
    }
    try {
      await AsyncStorage.setItem(`@userId`, jsonUserId);
    } catch (e) {
      console.log(e + " at userId");
    }
    try {
      await AsyncStorage.setItem(`@userRole`, jsonUserRole);
    } catch (e) {
      console.log(e + " at userRole");
    }
    try {
      await AsyncStorage.setItem(`@email`, jsonEmail);
    } catch (e) {
      console.log(e + " at email");
    }
  };

  // function to make sure that the input is valid; If not disable the button
  const validateData = () => {
    if (pin.length === 6) return true;
    return false;
  };

  // useEffect to execute the functions at the first render
  useEffect(() => {
    // getFile and getPhoto to get the dynamic data from the server. Soon to be deleted.
    const getFile = async () => {
      // fetch(
      //   "https://cloud.gksoftware.gr/index.php/s/iqPb8bQd3mtQXJK/download/logoTitleMobile.txt"
      // ).then(function (response) {
      //   response.text().then(function (text) {
      //     const storedText = text;
      setTitle(" ");
      //   });
      // });
    };

    const getPhoto = async () => {
      fetch("https://website.gksoftware.gr/logo.png").then((resp) =>
        setPhoto(resp.url)
      );
    };

    getPhoto();
    getFile();
  }, []);

  return (
    <ImageBackground source={authScreen} resizeMode="cover" style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          height: Dimensions.get("window").height / 1.1,
          width: "100%",
        }}
      >
        <ScrollView style={{ overflow: "scroll" }}>
          <View style={styles.headContainer}>
            <View style={{}}>
              <FontAwesome
                name="circle"
                size={64}
                color="rgb(245,244,248)"
                style={{ marginLeft: 10 }}
                onPress={goBack}
              />
              <MaterialIcons
                name="keyboard-arrow-left"
                size={29}
                style={{ marginLeft: 22, position: "absolute", top: "17%" }}
                color="black"
                onPress={goBack}
              />
            </View>
          </View>
          {title.length > 3 ? (
            <>
              <Image
                source={{
                  uri: photo + "?date=" + new Date(),
                }}
                contentFit="contain"
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                  marginTop: -50,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: 700,
                  color: "#687089",
                }}
              >
                {title}
              </Text>
            </>
          ) : (
            <View>
              <Image
                source={{
                  uri: photo + "?date=" + new Date(),
                }}
                contentFit="contain"
                style={{
                  width: 350,
                  height: 250,
                  alignSelf: "center",
                  marginTop: -50,
                }}
              />
            </View>
          )}
          <View style={styles.actionCon}>
            {error && (
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                {error}
              </Text>
            )}
            {!loading ? (
              <TextInput
                value={pin}
                keyboardType="numeric"
                onChangeText={(text) => setPin(text)}
                placeholderTextColor="#d1d0d6"
                placeholder="Pin*"
                selectionColor="grey"
                activeUnderlineColor="rgb(245,244,248)"
                underlineColor="rgb(245,244,248)"
                style={styles.input}
              />
            ) : (
              <ActivityIndicator color="#68708A" size={"large"} />
            )}
            <Button
              style={styles.btn}
              labelStyle={{
                fontSize: 15,
                color: "white",
                lineHeight: 25,
              }}
              mode="contained"
              onPress={handlePress}
              disabled={!validateData()}
            >
              Είσοδος
            </Button>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <Text style={styles.text1}>
                Παρακαλώ συμπληρώστε τον τετραψήφιο κωδικό που λάβατε με SMS στο
                κινητό σας
              </Text>
              <Text style={{ color: "black", marginTop: 30 }}>
                Δεν λάβατε το SMS;
              </Text>
              <Text style={{ color: "#2B59A2" }} onPress={handleSendAgain}>
                Πατήστε εδώ για να το στείλουμε
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    marginTop: 30,
    height: 100,
    flexDirection: "row",
  },
  icon: {
    textAlign: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
  },
  actionCon: {
    marginTop: 100,
  },
  text1: {
    fontSize: 25,
    fontWeight: 700,
    color: "rgb(34, 41, 90)",
  },
  text2: {
    marginTop: 30,
    textAlign: "center",
    width: 340,
  },
  input: {
    marginHorizontal: 38,
    height: 40,
    backgroundColor: "white",
  },
  btn: {
    marginHorizontal: 20,
    height: 45,
    marginTop: 30,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: "#687089",
  },
  text1: {
    marginTop: 7,
    textAlign: "center",
    width: 300,
    fontSize: 13,
    color: "#F19D37",
  },
});
