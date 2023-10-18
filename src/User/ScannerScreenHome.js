import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useLayoutEffect } from "react";

// SCREEN FOR USER SCANNER ONLY FOR DISPLAY
export default function ScannerScreenHome({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [OpenCameraModal, setOpenCameraModal] = useState(false);
  const isFocused = useIsFocused();

  // To Open Camera screen for fault report
  const openCamera = () => setOpenCameraModal(true);

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

  // handle the scan; for now show only a toast message
  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate("HomeScreen");
    Alert.alert(
      "Αποτέλεσμα",
      `Qr Code with data ${data} was scanned successfull. Tap to dissmiss`
    );
  };

  return (
    <>
      {isFocused && (
        <View style={styles.mainContainer}>
          <View style={styles.scannerContainer}>
            <Camera
              onBarCodeScanned={handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject, styles.camera]}
              ratio={"16:9"}
            />
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
});
