import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator, Card } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { EXPO_PUBLIC_BASE_URL } from "@env";

import news from "../../assets/news.png";

// SCREEN TO SHOW THE LIST OF THE NEWS
const NewsScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // initialize the url for the request
  const url = `${EXPO_PUBLIC_BASE_URL}/api/mobile/news-list`;

  // execute in the first render
  useEffect(() => {
    // function to get the data and put them to the according state
    const getData = async () => {
      setLoading(true);
      const response = await fetch(url);
      setLoading(false);
      const json = await response.json();
      // reverse data to show the last announcment first
      setData(json.reverse());
    };

    getData();
  }, []);

  // same as getData but gets executed onRefresh
  const loadUserData = async () => {
    setRefreshing(true);
    const response = await fetch(url);
    setRefreshing(false);
    const json = await response.json();
    setData(json.reverse());
  };

  // handle the press of each item on the list
  const handlePress = (title, text, dateTime) => {
    // navigate to details screen while passing the information
    navigation.navigate("NewsDetailsScreen", {
      title: title,
      text: text,
      dateTime: dateTime,
    });
  };

  return (
    <>
      <Image
        source={news}
        resizeMode="cover"
        style={{ width: "100%", height: 250, marginTop: -25 }}
      />
      {!loading ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.title}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: "center",
                paddingBottom: 500,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: 20,
                  marginTop: 70,
                }}
              >
                Καμία καταχωρημένη ανακοίνωση
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                handlePress(item.title, item.body, item.dateTimeRegistration)
              }
            >
              <Card style={styles.renderContainer}>
                <View
                  style={{
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.body}</Text>
                  <Text style={styles.dateTime}>
                    {item.dateTimeRegistration}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator
          size={45}
          color="#AEB1C0"
          style={{ marginTop: 30 }}
        />
      )}
    </>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  renderContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 0,
    height: 140,
  },
  title: {
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: Platform.OS === "ios" ? 500 : 700,

    color: "#AEB1C0",
  },
  dateTime: {
    fontSize: 13,
    fontWeight: Platform.OS === "ios" ? 500 : 700,
    position: "absolute",
    bottom: 5,
    right: 10,
    color: "#AEB1C0",
  },
});
