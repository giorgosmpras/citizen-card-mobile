import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// SCREEN TO SHOW THE USERS THAT HAVE BEEN SCANNED FROM THE BUSINESS
export default function HistoryScreen({ navigation }) {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // initialize the url for the request
  let url = `${EXPO_PUBLIC_BASE_URL}/api/organization/business-data?business_id=`;

  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // Execute on the first render
  useEffect(() => {
    // function to get the data
    const getData = async () => {
      // get the business id
      const Business_Id = await AsyncStorage.getItem(`@TempBusinessId`);
      // construct the url
      url = url + Business_Id;
      setLoading(true);
      const response = await fetch(url);
      setLoading(false);
      const json = await response.json();
      // use the response and set the data
      setData(json.business.business_activity);
      console.log(data);
    };

    getData();
  }, []);

  // same thing with getData; execute when refreshing the screen
  const loadUserData = async () => {
    const Business_Id = await AsyncStorage.getItem(`@TempBusinessId`);
    url = url + Business_Id;
    setRefreshing(true);
    const response = await fetch(url);
    setRefreshing(false);
    const json = await response.json();
    setData(json.business.business_activity);
    console.log(data);
  };

  return (
    <View style={{ overflow: "scroll", flex: 1 }}>
      {data.length === 0 && !loading && (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 20,
              marginTop: 70,
            }}
          >
            Άδειο Ιστορικό
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
            <Card style={styles.renderContainer}>
              <View style={{ width: "100%" }}>
                <Text style={styles.title}>{item.name_lastname}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 25,
                  }}
                >
                  <Text style={[styles.text, { alignSelf: "flex-end" }]}>
                    {item.mobile}
                  </Text>
                  <Text style={[styles.text, { alignSelf: "flex-end" }]}>
                    {item.dateTimeRegistration}
                  </Text>
                </View>
              </View>
            </Card>
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

const styles = StyleSheet.create({
  renderContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 0,
    height: 100,
  },
  title: {
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: Platform.OS === "ios" ? 600 : 700,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: Platform.OS === "ios" ? 500 : 700,
    color: "#AEB1C0",
  },
  dateTime: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#AEB1C0",
    alignSelf: "flex-end",
    marginTop: 20,
  },
});
