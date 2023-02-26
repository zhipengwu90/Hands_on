import { StyleSheet, useWindowDimensions, Modal, Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import React, { useState, useContext } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { login } from "../util/auth.js";
import LoginContent from "../components/LoginAuth/LoginContent";
import Toast from 'react-native-root-toast';

function Register(props) {
  const { height, width } = useWindowDimensions();
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [tryEnteredEmail, setTryEnteredEmail] = useState("");

  async function loginHandler({ email, password, type }) {
    setIsAuthenticating(true);
    try {
      const respondData = await login(email, password);
      authCtx.setRespondData(respondData);
      authCtx.authenticate(respondData.idToken);
      props.onLogin(type);
      setIsAuthenticating(false);
      Toast.show(`${respondData.displayName}, Good to have you back! Let's get started.` , {
        duration: 1800,
        position: 60,
        backgroundColor: '#c80000',
        shadow: true,
        animation: true,
        opacity: 1,
    });
    } catch (err) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in" />;
  }
  return <LoginContent onAuthenticate={loginHandler}></LoginContent>;
}

export default Register;

const styles = StyleSheet.create({});
