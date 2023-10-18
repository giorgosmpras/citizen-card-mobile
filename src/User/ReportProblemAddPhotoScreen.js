import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ActivityIndicator, Button } from "react-native-paper";

// SCREEN TO UPLOAD AN IMAGE FOR REPORTING A PROBLEM
function ReportProblemAddPhotoScreen({ navigation }) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [loading, setLoading] = useState(false);

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    // if user said no to permissions
    if (permissionResult.granted === false) {
      alert("Αρνηθήκατε στην εφαρμογή την πρόσβαση στα αρχεία σας");
      return;
    }

    // open the image library
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync();
    setLoading(false);

    // Explore the result
    console.log(result);

    // set the image path
    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    // if user said no to permissions
    if (permissionResult.granted === false) {
      alert("Αρνηθήκατε στην εφαρμογή την πρόσβαση στην κάμερα");
      return;
    }

    // open the camera
    setLoading(true);
    const result = await ImagePicker.launchCameraAsync();
    setLoading(false);

    // Explore the result
    //console.log(result);

    // set the image path
    if (!result.canceled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  // handle the image upload
  const handleImageUpload = async () => {
    try {
      // Add any additional data you want to send along with the image here
      // formData.append('userId', userId);

      // If needed, you can also clear the selected image after successful upload
      // FOR NOW IS ONLY FOR DEMONSTRATING PURPOSES
      navigation.navigate("ReportProblemScreen");
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.screen}>
      {pickedImagePath &&
        (!loading ? (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        ) : (
          <ActivityIndicator
            color="white"
            size={84}
            style={{ marginTop: 20 }}
          />
        ))}
      {!pickedImagePath && (
        <View style={styles.noPhotoContainer}>
          {!loading ? (
            <FontAwesome
              name="photo"
              size={180}
              color="#687089"
              style={styles.noPhotoIcon}
            />
          ) : (
            <ActivityIndicator
              color="#687089"
              size={84}
              style={{ marginBottom: 10 }}
            />
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",

            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={openCamera}>
              <View
                style={{
                  borderStyle: "solid",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 21,
                  marginBottom: 20,
                }}
              >
                <FontAwesome
                  name="video-camera"
                  size={20}
                  color="white"
                  style={styles.icon1}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                width: 90,
                textAlign: "center",
                color: "white",
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              Κάμερα
            </Text>
            <Text
              style={{
                width: 90,
                textAlign: "center",
                color: "white",
                fontSize: 11,
              }}
            >
              Τραβήξτε μία από την κάμερα
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={showImagePicker}>
              <View
                style={{
                  borderStyle: "solid",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                <Entypo
                  name="plus"
                  size={25}
                  color="white"
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                width: 90,
                textAlign: "center",
                color: "white",
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              Αρχεία
            </Text>
            <Text
              style={{
                width: 95,
                textAlign: "center",
                color: "white",
                fontSize: 11,
              }}
            >
              Επιλέξτε μία από τις φωτογραφίες
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: -15 }}>
          <Button
            onPress={handleImageUpload}
            mode="contained"
            style={{
              marginTop: 50,
              backgroundColor: "white",
              borderRadius: 10,
              width: 200,
            }}
            labelStyle={{ color: "black" }}
          >
            Συνέχεια
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#68708A",
  },
  buttonContainer: {
    marginTop: 40,
    width: "90%",
    alignItems: "center",
  },
  image: {
    marginTop: 30,
    width: "60%",
    height: 220,
    resizeMode: "cover",
  },
  icon1: {},
  icon2: {
    // marginLeft: 70,
  },
  icon3: {
    marginTop: 20,
  },
  noPhotoContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    width: "60%",
    paddingTop: 20,
    paddingHorizontal: 10,
    // paddingBottom: 20,
  },
  noPhotoIcon: {
    marginBottom: 40,
  },
  btn: {
    marginHorizontal: 20,
    height: 45,
    marginTop: 20,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: "#687089",
  },
});

export default ReportProblemAddPhotoScreen;
