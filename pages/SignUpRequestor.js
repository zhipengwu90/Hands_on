import { StyleSheet, Text, SafeAreaView } from "react-native";
import LoadingOverlay from "../components/LoadingOverlay";
import GlobalStyles from "../constants/GlobalStyles";
import { createUser } from "../util/auth";
import React, { useState } from "react";

import AuthContent from "../components/ReAuth/AuthContent";

function SignUpRequestor({ onClose, onSignup }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ username, email, password }) {
    //  console.log(username);
    //  console.log(email);
    //  console.log(password)

    setIsAuthenticating(true);
    await createUser(email, password);
    setIsAuthenticating(false);

    onSignup({
      email: email,
      password: password,
      type: "Requestor"
    });
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating the user..." />;
  }

  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, styles.container]}>
      <AuthContent
        onLogin={onClose}
        onAuthenticate={signupHandler}
      ></AuthContent>
    </SafeAreaView>
  );
}

export default SignUpRequestor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008c8c",
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
  buttonContainer: {
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

  disabledSignUpButton: {
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
    color: "#008c8c",
    fontWeight: "700",
    fontSize: 20,
  },
  disabledText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },

  errorText: {
    color: "red",
    fontWeight: "600",
    fontSize: 15,
  },
  loginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  haveAcountText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 6,
  },
  loginText: {
    color: "#db0404",
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "600",
  },
});
