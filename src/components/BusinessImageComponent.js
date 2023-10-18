// App.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EXPO_PUBLIC_BASE_URL } from "@env";
function BusinessImageUpload() {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [id, setId] = useState("");
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

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
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!pickedImagePath) {
        alert("Please select an image first.");
        return;
      }
      try {
        //console.log("start " + pickedImagePath);
        //resizeImage = async selectedImage => {
        /*const manipResult = await ImageManipulator.manipulateAsync(
                    pickedImagePath,
                    [{ resize: { width: pickedImagePath.width * 0.5, height: pickedImagePath.height * 0.5 } }],
                    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
                );
                console.log("finish " + pickedImagePath.uri);*/
        //}
        const userId = await AsyncStorage.getItem("@userId");
        setId(JSON.parse(userId));
        console.log(JSON.parse(userId));
        // Assuming your API endpoint for image upload is "https://your-api-endpoint/upload"
        const apiUrl =
          `${EXPO_PUBLIC_BASE_URL}/api/profile/user/upload?_id=` +
          JSON.parse(userId);
        const formData = new FormData();
        formData.append("image", {
          uri: pickedImagePath,
          type: "image/jpeg", // Adjust the mime type if necessary (e.g., image/png)
          name: "image.jpg", // Adjust the filename if necessary
        });
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        console.log("Image uploaded successfully!", response.data);
      } catch (e) {
        console.log(e + " at userId");
      }

      // Add any additional data you want to send along with the image here
      // formData.append('userId', userId);

      // If needed, you can also clear the selected image after successful upload
      setPickedImagePath(null);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>
      <FontAwesome
        name="circle"
        size={130}
        color="rgb(104,112,138)"
        style={styles.bothCircle1}
        //onPress={}
      />
      <MaterialIcons
        name="upload-file"
        size={80}
        color="white"
        style={styles.icon1}
        onPress={showImagePicker}
      />
      <FontAwesome
        name="circle"
        size={130}
        color="rgb(104,112,138)"
        style={styles.bothCircle2}
      />
      <MaterialIcons
        name="camera"
        size={80}
        color="white"
        style={styles.icon2}
        onPress={openCamera}
      />
      <FontAwesome
        name="circle"
        size={130}
        color="rgb(104,112,138)"
        style={styles.bothCircle3}
      />
      <MaterialIcons
        name="cloud-upload"
        size={80}
        color="white"
        style={styles.icon3}
        onPress={handleImageUpload}
      />
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    marginTop: -360,
    padding: 0,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },

  bothCircle1: {
    position: "absolute",
    right: 240,
    bottom: 160,
  },
  icon1: {
    position: "absolute",
    right: 252,
    bottom: 188,
    justifyContent: "center",
    alignItems: "center",
  },
  bothCircle2: {
    position: "absolute",
    alignItems: "center",
    right: 40,
    bottom: 160,
    justifyContent: "center",
  },
  icon2: {
    position: "absolute",
    right: 55,
    bottom: 185,
    //justifyContent: "center",
    //alignItems: "center",
  },
  bothCircle3: {
    position: "absolute",
    //alignItems: "center",
    right: 139,
    bottom: 40,
    //justifyContent: "center"
  },
  icon3: {
    position: "absolute",
    right: 155,
    bottom: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BusinessImageUpload;
