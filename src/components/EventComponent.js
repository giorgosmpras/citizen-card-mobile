import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { useEffect } from "react";
import { useState } from "react";

import user_add1 from "../../assets/user_add1.png";

// COMPONENT TO SHOW EACH REGISTERED EVENT
export default function EventsComponent({ id, title, body, img }) {
  // status for the image request
  const [status, setStatus] = useState();

  const [loading, setLoading] = useState();
  const date = new Date();

  // const to get the image from the incoming variable img
  const getImage = async () => {
    setLoading(true);
    const resp = await fetch(img);
    setLoading(false);
    // set the status of the response
    setStatus(resp.status);
  };

  // get the image in the first render
  useEffect(() => {
    getImage();
  }, []);

  return (
    <Card style={styles.renderContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{body}</Text>
        </View>
        {!loading ? (
          <>
            {/* Check the status; if 404 not found render default otherwise render the given photo */}
            {status == "404" && (
              <Image
                source={user_add1}
                style={styles.cover}
                resizeMode="contain"
              />
            )}
            {status == "200" && (
              <Image
                source={{ uri: img + `&date=${date}` }}
                style={styles.cover}
                resizeMode="contain"
              />
            )}
          </>
        ) : (
          <ActivityIndicator
            style={{ position: "absolute", right: "15%", top: "50%" }}
            color="#AEB1C0"
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  renderContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 0,
    height: 145,
  },
  title: {
    fontSize: 15,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    width: 160,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
  },
  text: {
    marginHorizontal: 15,
    fontSize: 12,
    width: 180,
    height: 72,
    color: "#AEB1C0",
    fontWeight: Platform.OS === "ios" ? 500 : 700,
  },
  cover: {
    height: 145,
    justifyContent: "center",
    marginLeft: 185,
    width: 200,
    position: "absolute",
    right: -28,
  },
});
