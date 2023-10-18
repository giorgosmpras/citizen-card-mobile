// App.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import { Entypo } from "@expo/vector-icons";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { ActivityIndicator, Button } from "react-native-paper";

// FUNCTION FOR USER IMAGE UPLOAD
function ImageUpload({ navigation }) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const toast = useToast();
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Αρνηθήκατε στην εφαρμογή την πρόσβαση στα αρχεία σας");
      return;
    }

    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync();
    setLoading(false);

    // Explore the result
    console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      console.log(result.assets[0].uri);
      //console.log(result.uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Αρνηθήκατε στην εφαρμογή την πρόσβαση στην κάμερα");
      return;
    }

    setLoading(true);
    const result = await ImagePicker.launchCameraAsync();
    setLoading(false);

    // Explore the result
    //console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!pickedImagePath) {
        alert("Παρακαλώ επιλέξτε πρώτα μια φωτογραφία");
        return;
      }
      try {
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          pickedImagePath,
          [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
          { compress: 0.7, format: "jpeg" }
        );
        console.log(resizedPhoto);
        const userId = await AsyncStorage.getItem("@userId");
        setId(JSON.parse(userId));
        console.log(JSON.parse(userId));
        // Assuming your API endpoint for image upload is "https://your-api-endpoint/upload"
        const apiUrl =
          `${EXPO_PUBLIC_BASE_URL}/api/profile/user/upload?_id=` +
          JSON.parse(userId);
        const formData = new FormData();
        formData.append("image", {
          uri: resizedPhoto.uri,
          type: "image/jpeg", // Adjust the mime type if necessary (e.g., image/png)
          name: "image.jpg", // Adjust the filename if necessary
        });
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        console.log("Profile photo: " + response.status);
        if (response.status == "200") {
          setPickedImagePath(null);
          navigation.replace("HomeScreen");
          toast.show("Επιτυχής αλλαγή φωτογραφίας προφίλ!", {
            type: "normal",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in | zoom-in",
          });
        } else {
          setPickedImagePath(null);
          navigation.replace("HomeScreen");
          toast.show("Κάτι πήγε λάθος, Προσπαθήστε ξανά", {
            type: "normal",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in | zoom-in",
          });
        }
        // console.log("Image uploaded successfully!", response.data);
      } catch (e) {
        setPickedImagePath(null);
        navigation.replace("HomeScreen");
        toast.show("Κάτι πήγε λάθος, Προσπαθήστε ξανά", {
          type: "normal",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        });
      }

      // Add any additional data you want to send along with the image here
      // formData.append('userId', userId);

      // If needed, you can also clear the selected image after successful upload
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

// Kindacode.com
// Just some styles
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
  image: {
    marginTop: 30,
    width: "60%",
    height: 220,
    resizeMode: "cover",
  },
});

export default ImageUpload;
