import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
  Modal,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import Input from "../components/Input";
import FirstButton from "../components/FirstButton";
import React, { useState } from "react";
import SignUpHelper from "./SignUpHelper";
import SignUpRequestor from "./SignUpRequestor";
import LoadingOverlay from "../components/LoadingOverlay";
import {login} from "../util/auth.js";
import LoginContent from "../components/LoginAuth/LoginContent";

function Register(props) {
  const { height, width } = useWindowDimensions();
  const [isHelper, setIsHelper] = React.useState(false);
  const [isRequestor, setIsRequestor] = React.useState(true);
  const [isSignUpRequestor, setSignUpRequestor] = React.useState(false);
  const [isSignUpHelper, setSignUpHelper] = React.useState(false);
  const userTypeHelper = isHelper ? styles.HeActivated : "";
  const userTypeHelperText = isHelper ? styles.activatedText : "";
  const userTypeRequestor = isRequestor ? styles.ReActivated : "";
  const userTypeRequestorText = isRequestor ? styles.activatedText : "";
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const backgroundImg = isRequestor? require("../assets/img/background.png"): require("../assets/img/heBackground.png");

  // const HelperHandler =()=> {
  //   props.onLogin("Helper");
  // };

  async function loginHandler({email, password, type}) {
    console.log(email);
    console.log(password);
    setIsAuthenticating(true);
    await login(email, password);
    setIsAuthenticating(false);
    props.onLogin(type);
  }

  // const signupHelpHandler = ({email, password})=>{
  //   setEnteredEmail(email);
  //   setEnteredPassword(password);
  //   setSignUpRequestor(false);
  // }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in" />;
  }
  return (
    <LoginContent
    onAuthenticate ={loginHandler}
    ></LoginContent>
    // <ImageBackground
    //   source={backgroundImg}
    //   style={[styles.rootScreen, { height: height }]}
    // >
    //   <Modal animationType="slide" visible={isSignUpHelper}>
    //     <SignUpHelper 
    //     onPress={() => setSignUpHelper(false)}
    //     />
    //   </Modal>

    //   <Modal animationType="slide" visible={isSignUpRequestor}>
    //     <SignUpRequestor onClose={() => setSignUpRequestor(false)} 
    //     onSignup ={signupHelpHandler}
    //     />
    //   </Modal>
    //   <SafeAreaView style={[{ height: height }, GlobalStyles.AndroidSafeArea]}>
    //     <View style={[styles.loginContainer]}>
    //       <View style={styles.loginType}>
    //         <FirstButton

    //           style={userTypeRequestor}
    //           buttonText={userTypeRequestorText}
    //           onPress={() => {
    //             setIsHelper(false);
    //             setIsRequestor(true);
    //           }}
    //         >
    //           Requestor
    //         </FirstButton>
    //         <FirstButton
    //           style={userTypeHelper}
    //           buttonText={userTypeHelperText}
    //           onPress={() => {
    //             setIsHelper(true);
    //             setIsRequestor(false);
    //           }}
    //         >
    //           Helper
    //         </FirstButton>
    //       </View>
    //       <View style={styles.inputContainer}>
    //         <Input
    //           style={styles.inputContent}
    //           value={enteredEmail}
    //           onChangeText={setEnteredEmail}
    //           iconName="mail-open-outline"
    //           textInputConfig={{
    //             placeholder: "Email",
    //             keyboardType: "email-address",
    //             autoCorrect: false,
    //           }}
    //         />

    //         <Input
    //           style={styles.inputContent}
    //           iconName="lock-closed-outline"
    //           value={enteredPassword}
    //           onChangeText={setEnteredPassword}
    //           textInputConfig={{
    //             placeholder: "Password",
    //             secureTextEntry: true,
    //           }}
    //         />

    //         {isRequestor && (
    //           <FirstButton
    //             onPress={loginReHandler}
    //             style={styles.ReLoginButton}
    //             buttonText={styles.ReLoginText}
    //           >
    //             LOGIN
    //           </FirstButton>
    //         )}
    //         {isHelper && (
    //           <FirstButton

    //             onPress={HelperHandler}
    //             style={styles.HeLoginButton}
    //             buttonText={styles.HeLoginText}
    //           >
    //             LOGIN
    //           </FirstButton>
    //         )}

    //         <Text style={styles.forgotPass}>Forgot Password?</Text>
    //       </View>
    //     </View>
    //     <View style={styles.signupContainer}>
    //       <FirstButton
    //         style={styles.signupStyle}
    //         buttonText={[styles.signupText, styles.reSignupText]}
    //         onPress={() => setSignUpRequestor(true)}
    //       >
    //         Sign up as a Requestor
    //       </FirstButton>
    //       <FirstButton
    //         style={styles.signupStyle}
    //         buttonText={[styles.signupText, styles.heSignupText]}
    //         onPress={() => setSignUpHelper(true)}
    //       >
    //         Sign up as a Helper
    //       </FirstButton>
    //     </View>
    //   </SafeAreaView>
    // </ImageBackground>
  );
}

export default Register;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  loginContainer: {
    flex: 2,
    marginTop: 120,
  },
  loginType: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  HeActivated: {
    backgroundColor: "#D35D5D",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  ReActivated: {
    backgroundColor: "#008c8c",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },

  activatedText: {
    color: "#fff",
  },

  inputContainer: {
    marginTop: 35,
    alignItems: "center",
    width: "100%",
  },
  inputContent: {
    // paddingVertical: 5,
    borderBottomColor: "#827c7c",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 20,
  },

  ReLoginButton: {
    marginTop: 20,
    borderWidth: 2,
    width: 270,
    borderColor: "#008c8c",
    backgroundColor: "#008c8c",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  HeLoginButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#D35D5D",
    width: 270,
    backgroundColor: "#D35D5D",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  ReLoginText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  HeLoginText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  forgotPass: {
    color: "#919194",
  },
  signupContainer: {
    flex: 1.7,
    marginTop: 180,
    alignItems: "center",
  },
  signupStyle: {
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginVertical: 10,
    width: "70%",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  reSignupText: {
    fontSize: 17,
    fontWeight:"600",
    color: "#008c8c",
  },
  heSignupText:{
    fontSize: 17,
    fontWeight:"600",
    color: "#D35D5D",
  }
});
