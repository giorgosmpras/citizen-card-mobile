import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react";
import { Modal } from "react-native-paper";
import { ImageBackground } from "react-native";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { Pressable } from "react-native";
import axios from "axios";

import flowers from "../../assets/flowers.png";

// SCREEN FOR USER SCANNER
export default function ScannerScreenService({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // info for the scanned user
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const isFocused = useIsFocused();

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // on the first render request for the camera permission
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // if is still pending
  if (hasPermission === null) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
      </View>
    );
  }

  // if there is no access
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // handle the scan
  const handleBarCodeScanned = async ({ data }) => {
    // set modal to visible
    setModalVisible(true);
    // get the data from the qr and split it with delimiter(:)
    arr = data.split(":");
    // set the scanned user info
    setName(arr[0]);
    setLastname(arr[1]);
    setMobile(arr[2]);
    setEmail(arr[3]);

    // get the current service id
    const Service_Id = await AsyncStorage.getItem(`@TempServiceId`);
    // get the info of the service for some requests
    const response = await fetch(
      `${EXPO_PUBLIC_BASE_URL}/api/organization/services-data?services_id=` +
        Service_Id
    );
    const json = await response.json();

    // format the data for the request to populate the user history
    const bodyForUserHistory = {
      name: json.service.name,
      service_title: json.service.title,
      mobile: parseInt(json.service.mobile),
      user_id: arr[4].substring(1, 25),
    };

    // format the data for the request to populate the service history
    const bodyForServiceHistory = {
      name_lastname: arr[0] + " " + arr[1],
      mobile: parseInt(arr[2]),
      service_id: Service_Id,
    };

    // Make the requests
    const resServ = axios.post(
      `${EXPO_PUBLIC_BASE_URL}/api/services-history`,
      bodyForServiceHistory
    );
    const resUser = axios.post(
      `${EXPO_PUBLIC_BASE_URL}/api/user-history-service`,
      bodyForUserHistory
    );

    const jsonData = JSON.stringify(data);
    try {
      await AsyncStorage.setItem(`@qrData`, jsonData);
    } catch (e) {
      console.log(e + " at qrData");
    }
  };

  return (
    <>
      {isFocused && (
        <View style={styles.mainContainer}>
          <View style={styles.scannerContainer}>
            {/* If modal is visible hide the camera to prevent multiple scans */}
            {!modalVisible && (
              <Camera
                onBarCodeScanned={handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, styles.camera]}
                ratio={"16:9"}
              />
            )}
            {/* Initialize the modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ImageBackground
                    source={flowers}
                    resizeMode="stretch"
                    style={{ justifyContent: "center", padding: 35 }}
                  >
                    {name && lastname && email && mobile ? (
                      <>
                        <Text style={styles.modalText}>Επιβεβαίωση Χρήστη</Text>
                        <Text style={styles.details}>Όνομα: {name}</Text>
                        <Text style={styles.details}>Επίθετο: {lastname}</Text>
                        <Text style={styles.details}>Email: {email}</Text>
                        <Text style={styles.details}>Τηλέφωνο: {mobile}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.modalText}>Επιβεβαίωση Χρήστη</Text>
                        <Text style={[styles.details, { alignSelf: "center" }]}>
                          Λανθασμένος Κωδικός
                        </Text>
                        <Text style={[styles.details, { alignSelf: "center" }]}>
                          Προσπαθήστε ξανά
                        </Text>
                      </>
                    )}

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Επιστροφή</Text>
                    </Pressable>
                  </ImageBackground>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scannerContainer: {
    flex: 1,
    margin: 30,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: "rgb(104,112,138)",
    borderStyle: "solid",
    borderWidth: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "rgb(104,112,138)",
  },
  buttonClose: {
    backgroundColor: "rgb(104,112,138)",
  },
  textStyle: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    textDecorationColor: "black",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  details: {
    margin: 4,
    width: "100%",
  },
});
