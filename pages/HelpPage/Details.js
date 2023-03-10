import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
} from "react-native";

import TaskIconFinder from "../../components/TaskIconFinder";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import FirstButton from "../../components/FirstButton.js";
import ViewButton from "../../components/ViewButton.js";
import React, { useState, useContext } from "react";
import { ItemDataContext } from "../../store/data-context";
import { AuthContext } from "../../store/auth-context";
import ViewUser from "./ViewUser";
import Toast from "react-native-root-toast";
import { db } from "../../util/firebaseConfig";
import { collection, updateDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import RateUser from "./RateUser";

const windowHeight = Dimensions.get("window").height; 
function Details({ route }) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };


  try {
    const { id } = route.params;
    const dataCtx = useContext(ItemDataContext);
    const authCtx = useContext(AuthContext);
    const myUid = authCtx.respondData.localId;
    const helperName = authCtx.respondData.displayName;

    const [viewUser, setViewUser] = useState(false);
    const [rateUser, setRateUser] = useState(false);
    const selectedTask = dataCtx.itemData.find((item) => item.id === id);

    // if(selectedTask === undefined || selectedTask === null ){
    //   navigation.navigate("Home")
    // }

    const helperId = selectedTask.helperId;
    const isPending = selectedTask.status === "Pending";
    const isPosted = selectedTask.status === "Posted";
    const isAccepted = selectedTask.status === "Accepted";
    const isCancelled = selectedTask.status === "Cancelled";
    const isCompleted = selectedTask.isCompleted;
    const isReviewed = selectedTask.isReviewed;

    
    
    const postUserUid = selectedTask.uid;
    const docRef = doc(
      collection(doc(db, "requestData", "taskList"), "allTasks"),
      id
    );
    const status = () => {
      if (isCancelled) {
        return styles.taskStatusCancelled;
      } else if (isPending) {
        return styles.taskStatusPending;
      } else if (isAccepted) {
        return styles.taskStatusAccepted;
      } else if (isPosted) {
        return styles.taskStatus;
      } else {
        return styles.taskStatus;
      }
    };

    const toastYes = {
      duration: 1300,
      position: Toast.positions.CENTER,

      backgroundColor: "#08685e",
      shadow: true,
      animation: true,
      opacity: 1,
    };

    const toastNo = {
      duration: 2000,
      position: Toast.positions.CENTER,
      backgroundColor: "#ab0808",
      shadow: true,
      animation: true,

      opacity: 1,
    };

    const acceptConfirm = () => {
      Alert.alert(
        "Accept Task",
        "Are you sure you want to accept this task?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => acceptHandler() },
        ],
        { cancelable: false }
      );
    };

    const terminateConfirm = () => {
      Alert.alert(
        "Terminate Task",
        "Are you sure you want to terminate this task?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => terminateHandler() },
        ],
        { cancelable: false }
      );
    };

    const terminateHandler = async () => {
      try {
        await updateDoc(
          docRef,
          {
            status: "Posted",
            helperId: null,
            helperName: null,
          },
          { merge: true }
        ); // update the document with new data
        Toast.show("Task has been terminated.", toastYes);
      } catch (e) {
        console.log(e);
        Toast.show("An error has occurred, please try again", toastNo);
      }
    };

    const acceptHandler = async () => {
      try {
        await updateDoc(
          docRef,
          {
            status: "Pending",
            helperId: myUid,

            helperName: helperName,
          },
          { merge: true }
        ); // update the document with new data

        Toast.show("Waiting for requestor to approve it.", toastYes);
      } catch (e) {
        console.log(e);
        Toast.show("An error has occurred, please try again", toastNo);
      }
    };

    return (
      <ScrollView>
        <Modal animationType="slide" transparent={false} visible={viewUser}>
          <ViewUser
            viewUserInfo={postUserUid}
            onPress={() => setViewUser(false)}
          />
        </Modal>
        <Modal animationType="slide" transparent={false} visible={rateUser}>
          <RateUser
             postUserUid={postUserUid}
            viewUserInfo={postUserUid}
            taskId={id}
            onPress={() => setRateUser(false)}
          />
        </Modal>
        <View style={styles.container}>
          <View style={styles.topTitle}>
            <Image
              source={TaskIconFinder(selectedTask.taskType)}
              style={styles.taskIcon}
            />
            <View style={styles.topTitleInner}>
              <Text style={styles.date}>{selectedTask.date}</Text>
              <Text style={styles.title}>{selectedTask.title}</Text>
              <Text style={status()}>⦿ {selectedTask.status}</Text>
            </View>
          </View>
          <View style={styles.taskDetailsBox}>
            <Grid>
              <Col style={styles.gridLeft}>
                <Text style={styles.leftText}>Post By:</Text>
              </Col>
              <Col>
                <Text style={styles.rightText}>
                  <ViewButton
                    style={styles.nameButton}
                    onPress={() => setViewUser(true)}
                  >
                    <View style={styles.nameButtonContainer}>
                      <Ionicons name="person-outline" size={20} color="black" />
                      <Text style={styles.nameButtonText}>
                        {selectedTask.name}
                      </Text>
                    </View>
                  </ViewButton>
                </Text>
              </Col>
            </Grid>
            <Grid>
              <Col style={styles.gridLeft}>
                <Text style={styles.leftText}>Task Type:</Text>
              </Col>
              <Col>
                <Text style={styles.rightText}>{selectedTask.taskType}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col style={styles.gridLeft}>
                <Text style={styles.leftText}>Total Price:</Text>
              </Col>
              <Col>
                <Text style={styles.rightText}>${selectedTask.price}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col style={styles.gridLeft}>
                <Text style={styles.leftText}>Estimated Time:</Text>
              </Col>
              <Col>
                <Text style={styles.rightText}>
                  {selectedTask.estHour} hour(s)
                </Text>
              </Col>
            </Grid>
            {isAccepted && helperId === myUid && (
              <Grid>
                <Col style={styles.gridLeft}>
                  <Text style={styles.leftText}>Phone Number:</Text>
                </Col>
                <Col>
                  <Text style={styles.rightText}>{selectedTask.phone}</Text>
                </Col>
              </Grid>
            )}
             {isAccepted && helperId === myUid && (
            <Grid>
              <Col style={styles.gridLeft}>
                <Text style={styles.leftText}>Address:</Text>
              </Col>
              <Col>
                <Text style={styles.rightText}>{selectedTask.address}</Text>
              </Col>
            </Grid>
          )}

            <View>
              <Text style={styles.leftText}>Task Description:</Text>
              <Text style={styles.rightText}>{selectedTask.description}</Text>
            </View>
          </View>
          {isPending && (
            <View style={styles.waitingBox}>
              <Text style={styles.waitingText}> Waiting to be approved</Text>
            </View>
          )}
          {isPosted && (
            <FirstButton
              onPress={acceptConfirm}
              style={styles.acceptButton}
              buttonText={styles.buttonText}
            >
              Accept Task
            </FirstButton>
          )}
          {isAccepted && (
            <View>
              <Text style={styles.workText}>
                You are current working on this task.
              </Text>

              <View style={styles.workBox}>
                <Text style={styles.terminateText}>
                  If you cannot finish this task,
                </Text>
                <Text style={styles.terminateText}>you may terminate it.</Text>
                <FirstButton
                  style={styles.noButton}
                  buttonText={styles.buttonText}
                  onPress={terminateConfirm}
                >
                  Terminate
                </FirstButton>
              </View>
            </View>
          )}
          {isCompleted && (
            <View style={styles.completedBox}>
              <Text style={styles.completedText}>
                You have completed this task. Thank you for your help.
              </Text>
              {isReviewed?<FirstButton
                style={styles.rateButton}
                buttonText={styles.rateText}
              >
                See your review
              </FirstButton>:<FirstButton
                style={styles.rateButton}
                onPress={() => setRateUser(true)}
                buttonText={styles.rateText}
              >
                Please rate the user
              </FirstButton>}
            </View>
          )}
        </View>
      </ScrollView>
    );
  } catch (e) {
    return (
      <View style={styles.container}>
        <View style={styles.taskNoExist}>
          <Text style={styles.taskNoExistText}>
            The task has either been accepted or deleted by the user. Please
            check other tasks.
          </Text>
          <FirstButton
            onPress={() => goBack()}
            style={styles.acceptButton}
            buttonText={styles.buttonText}
         
          >
            Back
          </FirstButton>
        </View>
      </View>
    );
  }
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: windowHeight * 0.75,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  taskNoExist: {
    flex: 1,
    minHeight: windowHeight * 0.75,
    margin: 10,
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  taskNoExistText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    color: "#cb0c0c",
  },

  taskIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  topTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTitleInner: {
    flex: 1,
    flexDirection: "column",
    height: 80,
    justifyContent: "space-between",
  },
  date: {
    fontSize: 13,
    color: "#808080",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskStatus: {
    color: "#008c8c",
    fontWeight: "bold",
  },
  taskStatusPending: {
    color: "#ff8c00",
    fontWeight: "bold",
  },
  taskStatusCancelled: {
    color: "#a10000",
    fontWeight: "bold",
  },
  taskStatusAccepted: {
    color: "#000000",
    fontWeight: "bold",
  },
  taskDetailsBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopColor: "#b6afaf",
    borderTopWidth: 1,
    marginTop: 10,
  },
  gridLeft: {
    width: "45%",
  },
  leftText: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  rightText: {
    marginTop: 10,
    fontSize: 16,
  },
  nameButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f08484a5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  nameButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  waitingBox: {
    backgroundColor: "#D35D5D",
    width: "70%",
    height: 45,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  waitingText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

  acceptButton: {
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

  NoBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
    marginHorizontal: 10,
  },
  noButton: {
    backgroundColor: "#D35D5D",
    width: "40%",
    height: 40,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  workBox: {
    borderColor: "#df2b2b",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  workText: {
    textAlign: "center",
    color: "#df2b2b",
    fontSize: 15,
    fontWeight: "700",
  },
  terminateText: {
    textAlign: "center",
    color: "#df2b2b",
    fontSize: 15,
    fontWeight: "700",
  },
  completedBox: {
    
    width: "70%",

    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",

  },
  completedText: {
    textAlign: "center",
    color: "#df2b2b",

    fontSize: 18,
    fontWeight: "700",
  },
  rateButton: {
    backgroundColor: "#D35D5D",
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 25,

  },
  rateText: {
    padding: 5,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
