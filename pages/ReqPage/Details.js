import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import TaskData from "../../data/dummy-data.js";
import TaskIconFinder from "../../components/TaskIconFinder";
import { Entypo } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import FirstButton from "../../components/FirstButton.js";
import ViewButton from "../../components/ViewButton.js";
import React, { useState } from "react";
import ModifiedTask from "./ModifiedTask.js";
const windowHeight = Dimensions.get("window").height;
function Details({ route }) {
  const { id } = route.params;
  const selectedTask = TaskData.find((item) => item.id === id);
  const [update, setUpdate] = React.useState(false);
  return (
    <ScrollView>
      <Modal animationType="slide" transparent={true} visible={update}>
        <ModifiedTask onPress={() => setUpdate(false)} />
      </Modal>
      <View style={styles.container}>
        <View style={styles.topTitle}>
          <Image
            source={TaskIconFinder(selectedTask.category)}
            style={styles.taskIcon}
          />
          <View style={styles.topTitleInner}>
            <Text style={styles.date}>{selectedTask.date}</Text>
            <Text style={styles.title}>{selectedTask.title}</Text>
            <Text style={styles.status}>⦿ {selectedTask.status}</Text>
          </View>
          <ViewButton onPress={() => setUpdate(true)}>
            <Entypo name="new-message" size={40} color="#008c8c" />
          </ViewButton>
        </View>
        <View style={styles.taskDetailsBox}>
          <Grid>
            <Col style={styles.gridLeft}>
              <Text style={styles.leftText}>Task Type:</Text>
            </Col>
            <Col>
              <Text style={styles.rightText}>{selectedTask.category}</Text>
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
                {selectedTask.estTime} {selectedTask.estTimeUnit}
              </Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.gridLeft}>
              <Text style={styles.leftText}>Scheduled At:</Text>
            </Col>
            <Col>
              <Text style={styles.rightText}>{selectedTask.scheduled}</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.gridLeft}>
              <Text style={styles.leftText}>Address:</Text>
            </Col>
            <Col>
              <Text style={styles.rightText}>{selectedTask.address}</Text>
            </Col>
          </Grid>

          <View>
            <Text style={styles.leftText}>Task Description:</Text>
            <Text style={styles.rightText}>{selectedTask.description}</Text>
          </View>
        </View>
        <FirstButton style={styles.cancelButton} buttonText={styles.buttonText}>
          Cancel Task
        </FirstButton>
      </View>
    </ScrollView>
  );
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
  status: {
    fontSize: 14,
    color: "#008c8c",
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
  cancelButton: {
    backgroundColor: "#D35D5D",
    width: "50%",
    height: 45,
    marginTop: 30,
    alignSelf: "center",
    justifyContent:"center"

  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  
  },
});
