import { StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import LoadingOverlay from "../components/LoadingOverlay";
import GlobalStyles from "../constants/GlobalStyles";
import { createUser } from "../util/auth";
import React, { useState } from "react";
import Toast from "react-native-root-toast";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../util/firebaseConfig";

import AuthContent from "../components/ReAuth/AuthContent";

function SignUpRequestor({ onClose, onSignup }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function signupHandler({ name, email, password }) {
    setIsAuthenticating(true);

    createUser(name, email, password)
      .then((respondData) => {
        setIsAuthenticating(false);
        onSignup({
          email: email,
          password: password,
          type: "Requestor",
        });
        return respondData;
      })
      .then((respondData) => {
        Toast.show(
          `${name}, you're officially a member of Hands On family, Please log in to your account`,
          {
            duration: 2500,
            position: 60,
            backgroundColor: "#07897c",
            shadow: true,
            animation: true,
            opacity: 1,
          }
        );
        const { email: userEmail, localId: uid } = respondData;

        const data = {
          email: userEmail,
          name: name,
          localId: uid,
          type: "Requestor",
        };
        try {
          const collectionRef = doc(collection(doc(db, 'requestData', 'userList'), "allUsers"), uid);

          const docRef = setDoc(collectionRef, data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Alert.alert(
            "Authentication failed",
            `An account with Email ${email} already exists`
          );
        } else {
          Alert.alert(
            "Authentication failed",
            "Could not create user, please check your input and try again"
          );
        }

        setIsAuthenticating(false);
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
