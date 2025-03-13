import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerListScreen from "../screens/Customers/CustomerListScreen";
import CustomerFormScreen from "../screens/Customers/CustomerFormScreen";
import CustomerDetailsScreen from "../screens/Customers/CustomerDetailsScreen";

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#4a6cfa",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="CustomerList"
        component={CustomerListScreen}
        options={{ title: "Customers" }}
      />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerForm"
        component={CustomerFormScreen}
        options={({ route }) => ({
          title: route.params?.customer ? "Edit Customer" : "Add Customer",
        })}
      />
    </Stack.Navigator>
  );
};

export default CustomerStack;
