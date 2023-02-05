import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, Modal, } from "react-native";
import Task from "../../components/Task";
import GlobalStyles from "../../constants/GlobalStyles";
import TaskData from "../../data/dummy-data.js";
import TextButton from "../../components/TextButton";
import ViewButton from "../../components/ViewButton";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from 'react';
import NewTask from "./NewTask";

function Home({ navigation }) {
  const [newTask, setNewTask] = React.useState(false);
  let NewTaskData = TaskData.filter((item) => item.isCompleted === false);

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Details", {
        id: itemData.item.id,
      });
    }

    return (
      <ViewButton onPress={pressHandler}>
        <Task
          title={itemData.item.title}
          status={itemData.item.status}
          date={itemData.item.date}
          price={itemData.item.price}
          category={itemData.item.category}
        />
      </ViewButton>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={newTask}
      >
        <NewTask onPress={()=>setNewTask(false)}/>
      </Modal>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerText1}>Hands On</Text>
          <Text style={styles.bannerText2}>Your dedicated helper</Text>
        </View>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.bannerImg}
        />
      </View>
      <View style={styles.myTasks}>
        <Text style={styles.myTasksText}>My Tasks</Text>
        <TextButton
          style={styles.seeAllText}
          buttonText={styles.seeAllButton}
          onPress={() => navigation.navigate("Tasks")}
        >
          See All
        </TextButton>
      </View>
      <View style={styles.taskList}>
        <FlatList
          data={NewTaskData}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          style={{}}
        />
      </View>
      <ViewButton style={styles.addTask} onPress={()=> setNewTask(true)} >
        <Entypo name="new-message" size={40} color="#008c8c" />
      </ViewButton>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 140,
    flexDirection: "row",

    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#008c8c",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  bannerImg: {
    width: 185,
    height: 165,
  },
  bannerText: {
    paddingLeft: 20,
    alignItems: "center",
  },
  bannerText1: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  bannerText2: {
    color: "#fff",
    fontSize: 15,
    marginTop: 8,
  },

  myTasks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 22,
    marginTop: 10,
  },

  myTasksText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    alignSelf: "flex-end",
  },
  seeAllButton: {
    color: "#818181",
  },
  taskList: {
    paddingTop: 10,
    flex: 1,
  },
  addTask: {
    position: "absolute",
    color: "#100101",
    backgroundColor: "#ffffffae",
    width: 60,
    height: 60,
    right: 13,
    bottom: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 3, height: 2 },
    elevation: 4,
  },
});
