import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ServicesComponent from "../components/ServicesComponent";
import headerServices from "../../assets/headerServices.png";

// GLOBAL SCREEN TO SHOW THE LIST OF THE REGISTERED SERVICES
export default function ServicesScreen({ navigation }) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // urls for the needed requests
  const url = `${EXPO_PUBLIC_BASE_URL}/api/mobile/services-list`;
  const url1 = `${EXPO_PUBLIC_BASE_URL}/api/profile/service/download?user_id=`;

  // const to handle the press of every item in flatlist
  const handlePress = (id, name, title, subscriptionService, body) => {
    // Navigate user to the details screen with the info of the touched item
    navigation.navigate("ServicesDetails", {
      id: id,
      name: name,
      title: title,
      subscriptionService: subscriptionService,
      body: body,
    });
  };

  // useEffect so that in the first render call the api, get the data and set them in the data variable
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // const that does the same thing with the useEffect but gets called to refresh the list
  const loadUserData = () => {
    setRefreshing(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  };

  return (
    <>
      <Image
        source={headerServices}
        resizeMode="stretch"
        style={{ width: "100%", height: 250, marginTop: -25 }}
      />
      {!loading ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: 20,
                  marginTop: 70,
                }}
              >
                Καμία Συνεργαζόμενη Υπηρεσία
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                handlePress(
                  item.id,
                  item.name,
                  item.title,
                  item.subscriptionService,
                  item.body
                )
              }
            >
              <ServicesComponent
                id={item.id}
                title={item.title}
                paid={item.subscriptionService}
                img={url1 + item.id}
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
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 800,
  },
});
