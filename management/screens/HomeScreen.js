import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthMob } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuthMob();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Logout Failed", error.message || "Something went wrong");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Management</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <MaterialIcons name="verified-user" size={48} color="#4a6cfa" />
          <Text style={styles.welcomeText}>
            Welcome, {user?.username || "User"}!
          </Text>
          <Text style={styles.welcomeSubtext}>
            You have successfully logged in.
          </Text>
        </View>

        <View style={styles.userInfoCard}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <View style={styles.userInfoItem}>
            <MaterialIcons name="person" size={20} color="#6c757d" />
            <Text style={styles.userInfoLabel}>Username:</Text>
            <Text style={styles.userInfoValue}>{user?.username || "N/A"}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <MaterialIcons name="email" size={20} color="#6c757d" />
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoValue}>{user?.email || "N/A"}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <MaterialIcons name="verified" size={20} color="#6c757d" />
            <Text style={styles.userInfoLabel}>Role:</Text>
            <Text style={styles.userInfoValue}>
              {user?.isAdmin ? "Administrator" : "Regular User"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="logout" size={20} color="#fff" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    alignItems: "center",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a6cfa",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtext: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  userInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
    paddingBottom: 8,
  },
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 4,
  },
  userInfoLabel: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 8,
    marginRight: 8,
    width: 80,
  },
  userInfoValue: {
    fontSize: 16,
    color: "#212529",
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default HomeScreen;
