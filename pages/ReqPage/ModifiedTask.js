import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ViewButton from "../../components/ViewButton";
import GlobalStyles from "../../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import NewTaskInput from "../../components/NewTaskInput";
import FirstButton from "../../components/FirstButton";

function ModifiedTask(props) {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, GlobalStyles.IosSafeArea]}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <ViewButton onPress={props.onPress}>
            <Ionicons name="chevron-back" size={28} color="black" />
          </ViewButton>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>Update Task</Text>
          </View>
        </View>

        <NewTaskInput
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ModifiedTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
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

    width: "83%",
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
