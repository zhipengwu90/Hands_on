import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from "react-native";
import Task from "../../components/Task";
import GlobalStyles from "../../constants/GlobalStyles";
import TaskData from "../../data/dummy-data.js";
import TextButton from "../../components/TextButton";
import ViewButton from "../../components/ViewButton";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";


function Home({ navigation }) {

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

      <View style={styles.bannerContainer}>
        <Image
          source={require("../../assets/img/helpLogo.png")}
          style={styles.bannerImg}
        />
        <View style={styles.bannerText}>
          <Text style={styles.bannerText1}>Unlock Your Potential</Text>
          <Text style={styles.bannerText2}>Monetize Your Skills</Text>
        </View>
      </View>
      <View style={styles.myTasks}>
        <Text style={styles.myTasksText}>Recent Tasks</Text>
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

    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 140,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#D35D5D",
    alignItems: "center",
    
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  bannerImg: {
    marginLeft: 20,
    width: 105,
    height: 155,

  },
  bannerText: {

    alignItems: "center",
  },
  bannerText1: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  bannerText2: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
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
});
