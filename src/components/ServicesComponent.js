import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { Platform } from "react-native";
import { useState } from "react";
import { useEffect } from "react";

import user_add1 from "../../assets/user_add1.png";

// COMPONENT TO SHOW EACH REGISTERED SERVICE
export default function ServicesComponent({ id, title, paid, img }) {
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
    <Card style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              marginHorizontal: 10,
              marginTop: 35,
              fontWeight: Platform.OS === "ios" ? 600 : 700,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: Platform.OS === "ios" ? 500 : 700,
              position: "absolute",
              left: 10,
              bottom: -70,
              color: "#AEB1C0",
              width: 150,
            }}
          >
            {paid ? "Συνδρομή" : "Ελεύθερη Πρόσβαση"}
          </Text>
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
            style={{ position: "absolute", right: "15%", top: "100%" }}
            color="#AEB1C0"
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginVertical: 10,
    borderRadius: 0,
    height: 145,
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
