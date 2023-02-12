import { View, Text, Alert } from "react-native";
import AuthForm from "./AuthForm";
import { useState } from "react";

function AuthContent({ onAuthenticate, onLogin }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    confirmPassword: false,
  });
  function submitHandler(credentials) {
    let { email, name, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();
    name = name.trim();

    const nameIsValid = name.length > 0;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !nameIsValid ||
      !passwordsAreEqual
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !name,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ name, email, password });
  }

  return (
    <AuthForm
      // isLogin={isLogin}
      onSubmit={submitHandler}
      credentialsInvalid={credentialsInvalid}
      onLogin={onLogin}
    />
  );
}

export default AuthContent;
