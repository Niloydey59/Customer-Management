import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerBasicInfo = ({ customer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Customer ID</Text>
          <Text style={styles.value}>{customer.CusID}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>{customer.Custype || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Zone</Text>
          <View style={styles.infoWithIcon}>
            <MaterialIcons name="location-on" size={16} color="#6c757d" />
            <Text style={styles.value}>{customer.ZoneID || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Area</Text>
          <View style={styles.infoWithIcon}>
            <MaterialIcons name="location-on" size={16} color="#6c757d" />
            <Text style={styles.value}>{customer.AreaID || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Sales Person</Text>
          <Text style={styles.value}>{customer.SalesPerson || "N/A"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "500",
  },
  infoWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgeContainer: {
    alignSelf: "flex-start",
  },
  badge: {
    backgroundColor: "#4a6cfa",
    color: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CustomerBasicInfo;
