import { StatusBar } from "expo-status-bar";
import {  LogBox } from "react-native";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./ReqPage/Home";
import TasksPage from "./ReqPage/TasksPage";
import TasksCompleted from "./ReqPage/TasksCompleted";
import TasksOnProcess from "./ReqPage/TasksOnProcess";
import Notification from "./ReqPage/Notification";
import Profile from "./ReqPage/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Details from "./ReqPage/Details";

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
          backgroundColor: "#008c8c",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
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
          backgroundColor: "#008c8c",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
      />
      <Stack.Screen 
      name="Details" 
      component={Details} 
            options={{
        headerStyle: {
          backgroundColor: "#008c8c",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
      />
    </Stack.Navigator>
  );
}

function RequestorRoute(props) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#008c8c",
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
              backgroundColor: "#008c8c",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
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
          initialParams={{ onLogout: props.onLogout }}

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
