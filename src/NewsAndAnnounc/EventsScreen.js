import { Text, View } from "react-native";
import React from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { TouchableOpacity } from "react-native";

import eventsPhoto from "../../assets/events.jpg";
import EventsComponent from "../components/EventComponent";

// SCREEN TO SHOW THE LIST OF EVENTS
export default function EventsScreen({ navigation }) {
  // initialize the urls for the requests
  const url = `${EXPO_PUBLIC_BASE_URL}/api/organization/events-list`;
  const url1 = `${EXPO_PUBLIC_BASE_URL}/api/event/download-event-photo?id=`;

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState("");

  // execute in the first render
  useEffect(() => {
    // function to get the data and put them to the according state
    const getData = async () => {
      setLoading(true);
      const response = await fetch(url);
      setLoading(false);
      const json = await response.json();
      // reverse data to show the last event first
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

  const handlePress = (title, body, _id) => {
    // navigate to details screen while passing the information
    navigation.navigate("EventsDetailsScreen", {
      title: title,
      body: body,
      id: _id,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={eventsPhoto}
        resizeMode="cover"
        style={{ width: "100%", height: 250, marginTop: -25 }}
      />
      {!loading ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
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
                Καμία καταχωρημένη εκδήλωση
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item.title, item.body, item._id)}
            >
              <EventsComponent
                title={item.title}
                body={item.body}
                id={item._id}
                img={url1 + item._id}
              />
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
    </View>
  );
}
