import { useState, React, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { ActivityIndicator } from "react-native-paper";

import headerBussiness from "../../assets/headerBussiness.png";
import BussinessComponent from "../components/BussinessComponent";

// GLOBAL SCREEN TO SHOW THE LIST OF THE REGISTERED BUSINESSES
export default function BussinessScreen({ navigation }) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // urls for the needed requests
  const url = `${EXPO_PUBLIC_BASE_URL}/api/mobile/business-list`;
  const url1 = `${EXPO_PUBLIC_BASE_URL}/api/profile/business/download?user_id=`;

  // const to handle the press of every item in flatlist
  const handlePress = (id, name, title, email, mobile, body) => {
    // Navigate user to the details screen with the info of the touched item
    navigation.navigate("BussinessDetails", {
      id: id,
      name: name,
      title: title,
      email: email,
      mobile: mobile,
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
    fetch(url1);
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
        source={headerBussiness}
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
                Καμία Συνεργαζόμενη Επιχείρηση
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
                  item.email,
                  item.mobile,
                  item.body
                )
              }
            >
              <BussinessComponent
                id={item.id}
                title={item.title}
                name={item.name}
                email={item.email}
                mobile={item.mobile}
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
