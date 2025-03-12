import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import ProfileInfoTab from "../../components/profile/profileInfoTab";
import ChangePasswordTab from "../../components/profile/changePasswordTab";
import LogoutButton from "../../components/profile/logoutButtton";

const ProfileScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>User information not available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user?.displayName || user?.username || "User"}
              </Text>
              <Text style={styles.userEmail}>{user?.email || ""}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "info" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("info")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "info" && styles.activeTabText,
              ]}
            >
              Profile Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "password" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("password")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "password" && styles.activeTabText,
              ]}
            >
              Change Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        <View style={styles.content}>
          {activeTab === "info" ? (
            <ProfileInfoTab user={user} />
          ) : (
            <ChangePasswordTab />
          )}
        </View>

        <View style={styles.footer}>
          <LogoutButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4a6cfa",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
  },
  userEmail: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#4a6cfa",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6c757d",
  },
  activeTabText: {
    color: "#4a6cfa",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  footer: {
    paddingHorizontal: 16,
    marginTop: 24,
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#dc3545",
    textAlign: "center",
    padding: 20,
  },
});

export default ProfileScreen;
