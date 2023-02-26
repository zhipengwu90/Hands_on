import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useCallback,useContext } from "react";
import ViewButton from "../../components/ViewButton";
import GlobalStyles from "../../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import ModifiedTaskForm from "../../components/ModifiedTaskForm";
import { db } from "../../util/firebaseConfig";
import { collection, updateDoc, doc } from "firebase/firestore"; 
import Toast from 'react-native-root-toast';
import { AuthContext } from "../../store/auth-context";


function ModifiedTask(props) {
  const authCtx = useContext(AuthContext);
  const uid= authCtx.respondData.localId;


  

  const datahandler = async(data, id) => {
    try {
      const docRef = doc(collection(doc(db, 'requestData', 'taskList'), "allTasks"), id);
      await updateDoc(docRef, 
        {

            "taskTitle": data.taskTitle,
            "price": data.price,
            "taskType": data.taskType,
            "description": data.description,
            "address": data.address,
            "estHour": data.estHour,
            "phone": data.phone,
        }
        
        ); // update the document with new data
      props.onPress();
      Toast.show("Your task has been updated successfully.", {
      duration: 1300,
      position: Toast.positions.CENTER,
      backgroundColor: "#08685e",
      shadow: true,
      animation: true,
      opacity: 1,
      });
      } catch (e) {
        props.onPress();
      Toast.show("An error has occurred, please try again", {
      duration: 2000,
      position: Toast.positions.CENTER,
      backgroundColor: "#ab0808",
      shadow: true,
      animation: true,
      opacity: 1,
     
      });
      }
  };

  return (
    <KeyboardAvoidingView
    behavior="padding"
    style={[styles.container, GlobalStyles.IosSafeArea]}
  >
  <ScrollView style={{ flex: 1 }} 
   keyboardShouldPersistTaps="handled">

        <View style={styles.header}>
        <ViewButton style={styles.backClose} onPress={props.onPress}>
          <Ionicons name="close-circle-outline" size={35} color="#be0707" />
        </ViewButton>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>Update Task</Text>
          </View>
        </View>
        <ModifiedTaskForm  onPress={props.onPress}
        taskData = {props.taskData}
        modifieddData = {datahandler}
        />

        {/* <NewTaskInput
          style={styles.inputContent}
          label="Task Title"
          textInputConfig={{
            placeholder: "eg. Mow the yard",
            keyboardType: "default",
          }}
        />
        <NewTaskInput
          style={styles.inputContent}
          label="Total Price"
          textInputConfig={{
            placeholder: "Price",
            keyboardType: "numeric",
          }}
        />
        <NewTaskInput
          style={styles.inputContent}
          label="Task Type"
          textInputConfig={{
            placeholder: "Choose your task type",
            keyboardType: "default",
          }}
        />
        <NewTaskInput
          style={styles.inputContent}
          label="Scheduled At"
          textInputConfig={{
            placeholder: "Date Time",
            keyboardType: "default",
          }}
        />
        <NewTaskInput
          style={styles.inputContent}
          label="Address"
          textInputConfig={{
            placeholder: "Address",
            keyboardType: "default",
          }}
        />
        <NewTaskInput
          style={styles.description}
          label="Task Description"
          textInputConfig={{
            placeholder: "Your task details",
            keyboardType: "default",
            multiline: true,
          }}
        />
        <View style={styles.buttonBox}>
          <FirstButton style={styles.submit} buttonText={styles.submitText}>
            Save
          </FirstButton>
          <FirstButton
            onPress={props.onPress}
            style={styles.cancel}
            buttonText={styles.cancelText}
          >
            Cancel
          </FirstButton>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ModifiedTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", 
   },
   backClose: {
    position: "absolute",
    right: 20,
    zIndex: 100,
  },
  header: {
    flexDirection: "row",

    marginTop: 40,

  },
  headerText: {
    fontSize: 30,
    color: "#008c8c",
    fontWeight: "600",
  },
  headerTextBox:{

    width: "100%",
    alignItems: "center"
  },

  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 10,
    backgroundColor: "#008c8c",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
  },
  description: {
    minHeight: 150,
  },
  cancel: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 40,
    backgroundColor: "#D35D5D",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "#cd2121",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: "white",
    fontWeight: "600",
  },
});
