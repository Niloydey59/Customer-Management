import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerDetailHeader = ({ customer }) => {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "C";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(customer.Name)}</Text>
        </View>
        {customer.IsLoyal && (
          <View style={styles.loyaltyBadge}>
            <MaterialIcons name="star" size={16} color="#212529" />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{customer.Name}</Text>
        <View style={styles.details}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{customer.CustomerCode}</Text>
          </View>
          {customer.Custype && (
            <View style={[styles.badge, styles.typeBadge]}>
              <Text style={[styles.badgeText, styles.typeText]}>
                {customer.Custype}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.date}>
          Customer since {formatDate(customer.CreateDate)}
        </Text>
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
    flexDirection: "row",
    alignItems: "center",
  },
  avatarSection: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4a6cfa",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  loyaltyBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "gold",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "#e9ecef",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#495057",
  },
  typeBadge: {
    backgroundColor: "#4a6cfa",
  },
  typeText: {
    color: "#ffffff",
  },
  date: {
    fontSize: 12,
    color: "#6c757d",
  },
});

export default CustomerDetailHeader;
