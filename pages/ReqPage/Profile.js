import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Button,
  Alert,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import FirstButton from "../../components/FirstButton";
import Toast from "react-native-root-toast";

function Profile({route}) {
  const authCtx = useContext(AuthContext);
  const displayName = authCtx.respondData.displayName;
  
  
  const onLogout = route.params.onLogout;

  const logoutHandler = () => {
    authCtx.logout();

    Toast.show("You have successfully logged out", {
      duration: 1800,
      position: 60,
      backgroundColor: "#c80000",
      shadow: true,
      animation: true,
      opacity: 1,
    });
  };

  const logoutConfirm = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => {logoutHandler(); onLogout();} },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/img/profileHeader.png")}
        style={styles.bannerImg}
      />
      <View style={styles.bannerContainer}>
        <View style={styles.profileBox}>
          <Image
            source={require("../../assets/img/profile.png")}
            style={styles.userProfile}
          />
          <Text style={styles.userName}>{displayName}</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.taskBox}>
            <Text style={styles.number}>10</Text>
            <Text style={styles.infoText}>Total Tasks</Text>
          </View>
          <View style={styles.rateBox}>
            <View style={styles.scoreBox}>
              <Text style={styles.number}>4.0/5.0</Text>
              <Image
                source={require("../../assets/img/star.png")}
                style={styles.star}
              />
            </View>
            <Text style={styles.infoText}>Rating</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoutButton}>
        <FirstButton
          onPress={logoutConfirm}
          style={styles.cancelButton}
          buttonText={styles.buttonText}
        >
          Logout
        </FirstButton>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImg: {
    width: "100%",
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
  userProfile: {
    alignSelf: "center",
    width: Platform.OS === "android" ? 100 : 90,
    height: Platform.OS === "android" ? 100 : 90,
  },
  profileBox: {
    marginTop: 130,
  },
  userName: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  infoBox: {
    marginTop: Platform.OS === "android" ? 20 : 36,
    flexDirection: "row",

    width: "100%",
    justifyContent: "space-around",
  },
  taskBox: {
    alignItems: "center",
    width: "50%",
    borderEndWidth: 2,
    borderEndColor: "#858484b4",
  },
  rateBox: {
    alignItems: "center",
    width: "50%",
  },
  star: {
    width: 27,
    height: 27,
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: Platform.OS === "android" ? "800" : "700",
    lineHeight: 45,
  },
  infoText: {
    color: "#858484",
    fontSize: 15,
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#D35D5D",
    width: "50%",
    height: 45,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  logoutButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
});
