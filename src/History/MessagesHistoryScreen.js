import { Text, View } from "react-native";
import React from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { useLayoutEffect } from "react";

import MessageHistoryComponent from "../components/MessageHistoryComponent";

// SCREEN TO SHOW THE LIST OF PUSH NOTIFICATIONS SENT
const MessageHistoryScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // initialize the url for the requests
  const url = `${EXPO_PUBLIC_BASE_URL}/api/fetch-push-notification`;

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // execute the functions on the first render
  useEffect(() => {
    // get the push notification history and store it in the data state
    const getData = async () => {
      setLoading(true);
      const response = await fetch(url);
      setLoading(false);
      const json = await response.json();
      // reverse the data so that the last push appears first
      setData(json.reverse());
    };

    getData();
  }, []);

  // same with getData; it executes at the refresh of the list
  const loadUserData = async () => {
    setRefreshing(true);
    const response = await fetch(url);
    setRefreshing(false);
    const json = await response.json();
    setData(json.reverse());
  };

  return (
    <View style={{ overflow: "scroll", flex: 1 }}>
      {data.length === 0 && !loading && (
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 20,
              marginTop: 70,
            }}
          >
            Κανένα καταχωρημένο μήνυμα
          </Text>
        </View>
      )}
      {!loading ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
          }
          renderItem={({ item }) => (
            <MessageHistoryComponent
              title={item.title}
              body={item.body}
              dateTime={item.dateTimeRegistration}
            />
          )}
        />
      ) : (
        <ActivityIndicator
          size={45}
          color="#AEB1C0"
          style={{ marginTop: 30 }}
        />
      )}
    </View>
  );
};

export default MessageHistoryScreen;
