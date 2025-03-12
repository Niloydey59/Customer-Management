import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// Import screens
import ProfileScreen from "../screens/Dashboard/ProfileScreen";
import CustomerListScreen from "../screens/Customers/CustomerListScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4a6cfa",
        tabBarInactiveTintColor: "#6c757d",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#dee2e6",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
          elevation: 2,
          shadowOpacity: 0.2,
          borderBottomWidth: 1,
          borderBottomColor: "#dee2e6",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#4a6cfa",
        },
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Customers"
        component={CustomerListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          headerTitle: "My Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
