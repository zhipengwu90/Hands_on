import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
  Button,
} from "react-native";
import TextButton from "../components/TextButton";
import FirstButton from "../components/FirstButton";
import GlobalStyles from "../constants/GlobalStyles";
import Input from "../components/Input";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function SignUpHelper(props) {
  const [isSelected, setSelection] = useState(false);
  const [isError, setError] =useState(false);



  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, styles.container]}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create A</Text>
          <Text style={styles.title}>Helper Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.inputContent}
            iconName="person-outline"
            iconColor="white"
            textInputConfig={{
              placeholder: "Username",
              autoCorrect: false,
              color: "white",
              placeholderTextColor: "#f7f3f3a3",
            }}
          />
          <Input
            style={styles.inputContent}
            iconName="mail-open-outline"
            iconColor="white"
            textInputConfig={{
              placeholder: "Email",
              placeholderTextColor: "#f7f3f3a3",
              keyboardType: "email-address",
              autoCorrect: false,
              color: "white",
            }}
          />
          <Input
            style={styles.inputContent}
            iconName="lock-closed-outline"
            iconColor="white"
            textInputConfig={{
              placeholder: "Password",
              secureTextEntry: true,
              color: "white",
              placeholderTextColor: "#f7f3f3a3",
            }}
          />
        </View>
        <View style={styles.checkBox}>
          <BouncyCheckbox
            size={20}
            fillColor="#000000"
            unfillColor="#FFFFFF"
            text="By signing up you agree to the terms of service and privacy policy"
            textStyle={{
              textDecorationLine: "none",
              color: "white",
              fontSize: 14,
            }}
            iconStyle={{ borderColor: "#000000", borderRadius: 0 }}
            innerIconStyle={{ borderWidth: 1, borderRadius: 0 }}
            onPress={() => {
              setSelection(!isSelected);
              setError(false);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
        {isSelected&&<FirstButton
          onPress={props.onPress}
        
          style={styles.signUpButton}
          buttonText={styles.signUpText}
        >
          Sign Up
        </FirstButton>}

        {!isSelected&&<FirstButton
          onPress={()=>{setError(true)}}

          style={styles.disabledSignUpButton}
          buttonText={styles.disabledText}
        >
          Sign Up
        </FirstButton>}
       {isError&&<Text style={styles.errorText}>
          Please check the box if you want to proceed.
        </Text>}


        </View>

        <View style= {styles.loginContainer}>
          <Text style={styles.haveAcountText}>
          Already have account? 
          </Text>
        <TextButton
          style={styles.loginButton}
          buttonText={styles.loginText}
          onPress={props.onPress}
        >
          Login
        </TextButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUpHelper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D35D5D",
  },

  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
  titleContainer: {
    marginTop: 50,
    marginLeft: 30,
  },
  inputContainer: {
    marginTop: 50,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  inputContent: {
    // paddingVertical: 5,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,

    marginBottom: 20,
  },
  checkBox: {
    width: "100%",
    paddingHorizontal: 35,
  },
  buttonContainer:{
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  signUpButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#f8f8f8",
    width: 270,
    backgroundColor: "#fbfbfb",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },

  disabledSignUpButton:{
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#d2c7c7",
    width: 270,
    backgroundColor: "#d2c7c7",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  signUpText: {
    color: "#D35D5D",
    fontWeight: "700",
    fontSize: 20,
  },
  disabledText:{
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },

  errorText:{
    color: "#0b0a0a",
    fontWeight: "600",
    fontSize: 15
  },
  loginContainer:{
    marginTop: 20, 
    flexDirection: "row",
    justifyContent: "center"
    
  },
  haveAcountText:{
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 6
  },
  loginText:{
    color: "#008c8c",
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "600",
  }
});
