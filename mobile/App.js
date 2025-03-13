import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StatusBar } from "react-native";

import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

const Stack = createNativeStackNavigator();

// Loading screen shown during authentication check
const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
    }}
  >
    <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
    <ActivityIndicator size="large" color="#4a6cfa" />
  </View>
);

// Navigator component that checks auth state
const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  console.log("user: ", user);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App component
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
