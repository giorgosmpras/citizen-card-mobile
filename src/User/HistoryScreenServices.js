import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { EXPO_PUBLIC_BASE_URL } from "@env";

import { useMyContext } from "../Globals/MyContext";

// A SCREEN LISTING THE SERVICES THAT HAVE SCANNED THE USER
export default function HistoryScreenServices({ navigation }) {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // state to keep the userId
  const { myVariable, setMyVariable } = useMyContext();

  // url for request
  const url =
    `${EXPO_PUBLIC_BASE_URL}/api/organization-get-user?id= ` +
    JSON.parse(myVariable);

  // In the first render get all the services from the user_record
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch(url);
      setLoading(false);
      const json = await response.json();
      setData(json.user_services_record.reverse());
      console.log(data);
    };

    getData();
  }, []);

  // const that does the same thing with the useEffect but gets called to refresh the list
  const loadUserData = async () => {
    setRefreshing(true);
    const response = await fetch(url);
    setRefreshing(false);
    const json = await response.json();
    setData(json.user_services_record.reverse());
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
                <Text style={styles.title}>{item.service_title}</Text>
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
                    {item.dateOfRegistration}
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
