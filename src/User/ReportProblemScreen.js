import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, HelperText, Modal, TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

import map from "../../assets/map.png";

// SCREEN TO REPORT A PROBLEM
export default function ReportProblemScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [residency, setResidency] = useState("");
  const [code, setCode] = useState("");
  const toast = useToast();
  const [problemAddress, setProblemAddress] = useState("");

  const checkError = () => {
    if (description.length > 100) return true;
    return false;
  };

  const handlePress = () => {
    console.log(
      description,
      email,
      mobile,
      address1,
      address2,
      residency,
      code,
      problemAddress
    );
    navigation.replace("HomeScreen");
    toast.show("Επιτυχής Καταχώρηση Βλάβης!", {
      type: "normal",
      placement: "bottom",
      duration: 4000,
      offset: 30,
      animationType: "slide-in | zoom-in",
    });
  };

  return (
    <View style={{ flex: 1, overflow: "scroll" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          width: "100%",
        }}
        style={{ flex: 1, overflow: "scroll" }}
      >
        <Text style={styles.title}>Περιγραφή Βλάβης</Text>
        <TextInput
          mode="outlined"
          style={styles.descriptionInput}
          placeholder="Περιγράψτε την βλάβη εδώ. *"
          multiline
          value={description}
          onChangeText={(desc) => setDescription(desc)}
          error={checkError()}
        />
        <HelperText type="info" style={{ marginLeft: 30 }}>
          {description.length}/100
        </HelperText>
        <View style={styles.line}></View>
        <Text style={styles.title}>Στοιχεία Επικοινωνίας</Text>
        <TextInput
          mode="outlined"
          style={styles.communicationInput}
          placeholder="Email *"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          mode="outlined"
          style={styles.communicationInput}
          placeholder="Κινητό Τηλέφωνο *"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={(mobile) => setMobile(mobile)}
        />
        <TextInput
          mode="outlined"
          style={styles.communicationInput}
          placeholder="Διεύθυνση Κατοικίας (1) *"
          value={address1}
          onChangeText={(address1) => setAddress1(address1)}
        />
        <TextInput
          mode="outlined"
          style={styles.communicationInput}
          placeholder="Διεύθυνση Κατοικίας (2)"
          value={address2}
          onChangeText={(address2) => setAddress2(address2)}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            mode="outlined"
            style={styles.communicationResidency}
            placeholder="Δήμος Κατοικίας *"
            value={residency}
            onChangeText={(residency) => setResidency(residency)}
          />
          <TextInput
            mode="outlined"
            style={styles.communicationCode}
            placeholder="ΤΚ *"
            keyboardType="decimal-pad"
            value={code}
            onChangeText={(code) => setCode(code)}
          />
        </View>
        <View style={[styles.line, styles.line2]}></View>
        <Text style={[styles.title, { marginTop: 10 }]}>Τοποθεσία Βλάβης</Text>
        <TextInput
          mode="outlined"
          style={styles.communicationInput}
          placeholder="Διεύθυνση Βλάβης *"
          value={problemAddress}
          onChangeText={(problemAddress) => setProblemAddress(problemAddress)}
        />
        <Text style={styles.smallText}>Επιλογή στον χάρτη</Text>
        {/* FOR NOW THE MAP IS ONLY AN IMAGE */}
        <Image source={map} resizeMode="contain" style={styles.map} />
        <Button
          style={styles.btn}
          labelStyle={{
            fontSize: 15,
            color: "white",
            lineHeight: 25,
          }}
          mode="contained"
          onPress={handlePress}
        >
          Ολοκλήρωση
        </Button>
        <HelperText type="info" style={{ marginLeft: 10 }}>
          Τα πεδία με * είναι υποχρεωτικά
        </HelperText>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 600,
    fontSize: 15,
  },
  descriptionInput: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  communicationInput: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  communicationResidency: {
    marginLeft: 30,
    marginTop: 10,
    width: 180,
  },
  communicationCode: {
    marginHorizontal: 30,
    marginTop: 10,
    width: 100,
  },
  line2: {
    marginVertical: 20,
  },
  smallText: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 13,
  },
  map: {
    height: 200,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    marginHorizontal: 20,
    height: 45,
    marginTop: 20,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: "#687089",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgb(104,112,138)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
  },
});
