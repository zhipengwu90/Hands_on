
import { View, Text, Alert } from "react-native"
import AuthForm from "./AuthForm";
import { useState } from 'react';

function AuthContent({ onAuthenticate, onLogin }) {

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        username: false,
        confirmPassword: false,
      });
      function submitHandler(credentials) {

        let { email, username, password, confirmPassword } = credentials;
    
        email = email.trim();
        password = password.trim();
        username = username.trim();
    
        const usernameIsValid = username.length > 0;
        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const passwordsAreEqual = password === confirmPassword;
    
        if (
          !emailIsValid ||
          !passwordIsValid ||
          !usernameIsValid ||
           !passwordsAreEqual
        ) {
          Alert.alert('Invalid input', 'Please check your entered credentials.');
          setCredentialsInvalid({
            email: !emailIsValid,
            username: !username,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
          });
          return;
        }
        // onAuthenticate({ username, email, password });
      }
    



    return(
        <AuthForm
        // isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        onLogin ={onLogin}
      />
    )
};

export default AuthContent;