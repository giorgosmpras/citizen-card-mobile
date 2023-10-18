import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions } from "react-native";
import { Image } from "expo-image";

import authScreen from "../../assets/authScreen.png";
import { logUser } from "../api/auth";
import { useMyContext } from "../Globals/MyContext";

// LOGIN SCREEN
export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // store userId to context variable
  const { myVariable, setMyVariable } = useMyContext();

  // store the "active" state of the user to context variable
  const { activeVariable, setActiveVariable } = useMyContext();

  // get dynamic data from server to easily change the municipality
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState();

  // function to handle the press of the main button "Login"
  const handlePress = async () => {
    // Take the input result and store it for api request
    const userInfo = {
      mobile: phone,
    };
    setLoading(true);

    // Use the imported constant and make the request with the userInfo
    const res = await logUser(userInfo);
    setLoading(false);
    console.log(res);

    //check the response and render the appropriate message
    if (res.myMessage) {
      navigation.replace("Pin", {
        phone: phone,
      });
    } else if (res === "User should be reactivate!") {
      setError(
        "Ο λογαριασμός σας έχει απενεργοποιηθεί, Παρακαλώ επικοινωνήστε με το πλησιέστερο δημαρχείο"
      );
    } else {
      setError("Λάθος αριθμός κινητού, Προσπαθήστε ξανά");
    }
  };

  // function to make sure that the input is valid; If not disable the button
  const validateData = () => {
    if (phone.length === 10) return true;
    return false;
  };

  // useEffect to execute the functions at the first render
  useEffect(() => {
    // When opening the app check everytime if the user is not active
    if (activeVariable === false) {
      setError(
        "Ο λογαριασμός σας έχει απενεργοποιηθεί, Παρακαλώ επικοινωνήστε με το πλησιέστερο δημαρχείο"
      );
      // setActiveVariable(true);
    }

    // Always check if there is a token at the AsyncStorage; If yes navigate directly to the body of the application
    const persist = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        if (value !== null) {
          setMyVariable(await AsyncStorage.getItem(`@userId`));
          console.log("log : " + (await AsyncStorage.getItem(`@userId`)));
          navigation.replace("Body");
        }
      } catch (e) {
        console.log(e);
      }
    };

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
    persist();
  }, []);

  return (
    <>
      <ImageBackground
        source={authScreen}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            height: Dimensions.get("window").height / 1.1,
            width: "100%",
          }}
        >
          <ScrollView style={{ overflow: "scroll", flex: 1 }}>
            {title.length > 3 ? (
              <>
                <Image
                  source={{
                    uri: photo + "?date=" + new Date(),
                  }}
                  style={{
                    width: 350,
                    height: 180,
                    alignSelf: "center",
                    marginTop: 50,
                  }}
                  contentFit="contain"
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
                  style={{
                    width: 350,
                    height: 250,
                    alignSelf: "center",
                    marginTop: 50,
                  }}
                  contentFit="contain"
                />
              </View>
            )}
            <View style={styles.actionCon}>
              {error && (
                <Text style={{ textAlign: "center", marginBottom: 10 }}>
                  {error}
                </Text>
              )}
              {loading ? (
                <ActivityIndicator color="#68708A" size={"large"} />
              ) : (
                <TextInput
                  value={phone}
                  keyboardType="numeric"
                  onChangeText={(text) => setPhone(text)}
                  placeholderTextColor="#d1d0d6"
                  placeholder="Αριθμός Κινητού*"
                  selectionColor="black"
                  activeUnderlineColor="rgb(245,244,248)"
                  underlineColor="rgb(245,244,248)"
                  style={styles.input}
                />
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
                  Παρακαλώ συμπληρώστε τον αριθμό του κινητού σας τηλεφώνου
                </Text>
                <Text style={styles.text2}>
                  Συνεχίζοντας συμφωνείτε με τους
                  <Text style={{ color: "#2B59A2" }}>
                    {" "}
                    Όρους Παροχής Υπηρεσιών{" "}
                  </Text>
                  και
                  <Text style={{ color: "#2B59A2" }}> Πολιτική Απορρήτου</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
  },
  actionCon: {
    marginTop: 130,
    width: "100%",
  },
  input: {
    marginHorizontal: 20,
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
  text2: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
  },
});
