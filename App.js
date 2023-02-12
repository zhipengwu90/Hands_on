import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import RequestorRoute from "./pages/RequestorRoute";
import HelperRoute from "./pages/HelperRoute";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  //FIXME: testing, need to change isLoginReq back to false
  const [isLoginReq, setIsLoginReq] = useState(false);
  const [isLoginHelp, setIsLoginHelp] = useState(false);
  const loginHandler = (loginType) => {

    if(loginType==="Helper"){
      setIsLoginHelp(true);
      setIsLogin(true);
    }else if(loginType==="Requestor"){
      setIsLoginReq(true);
      setIsLogin(true);
    }
  };

  return (
    <>
      {/* FIXME: uncomment it */}
      {!isLogin && <Login onLogin={loginHandler}></Login>}
      {isLoginReq && <RequestorRoute />}
      {isLoginHelp && <HelperRoute />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
