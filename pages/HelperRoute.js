import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image,Platform } from "react-native";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./HelpPage/Home";
import TasksPage from "./HelpPage/TasksPage";
import TasksCompleted from "./HelpPage/TasksCompleted";
import TasksOnProcess from "./HelpPage/TasksOnProcess";
import Notification from "./HelpPage/Notification";
import Profile from "./HelpPage/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Details from "./HelpPage/Details";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeDetail() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerStyle: {
            backgroundColor: "#D35D5D",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function TaskIsCompleted() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="All" component={TasksPage} />
      <TopTab.Screen name="On Process" component={TasksOnProcess} />
      <TopTab.Screen name="Completed" component={TasksCompleted} />
    </TopTab.Navigator>
  );
}

function TasksDetail() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tasks List"
        component={TaskIsCompleted}
        options={{
          headerStyle: {
            backgroundColor: "#D35D5D",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerStyle: {
            backgroundColor: "#D35D5D",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function RequestorRoute() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#D35D5D",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeDetail}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksDetail}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            headerStyle: {
              backgroundColor: "#D35D5D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default RequestorRoute;
