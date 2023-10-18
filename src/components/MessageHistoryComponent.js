import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

// COMPONENT TO SHOW EACH PUSH NOTIFICATION
export default function MessageHistoryComponent({ title, body, dateTime }) {
  return (
    <Card style={styles.renderContainer}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{body}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
      </View>
    </Card>
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
    marginHorizontal: 10,
    fontSize: 12,
    color: "#AEB1C0",
    alignSelf: "flex-end",
    marginTop: 10,
  },
});
