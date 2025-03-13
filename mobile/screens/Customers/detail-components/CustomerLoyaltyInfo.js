import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerLoyaltyInfo = ({ customer }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!customer.IsLoyal && !customer.BirthDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Loyalty Information</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Not enrolled in loyalty program</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Loyalty Information</Text>

      <View style={styles.statusCard}>
        {customer.IsLoyal ? (
          <View style={styles.statusRow}>
            <MaterialIcons name="star" size={24} color="gold" />
            <Text style={styles.statusText}>Loyalty Member</Text>
          </View>
        ) : (
          <View style={styles.statusRow}>
            <MaterialIcons name="close" size={24} color="#dc3545" />
            <Text style={styles.statusText}>Not Enrolled</Text>
          </View>
        )}
      </View>

      <View style={styles.infoGrid}>
        {customer.LoyalCardNo && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Loyalty Card Number</Text>
            <Text style={styles.value}>{customer.LoyalCardNo}</Text>
          </View>
        )}

        {customer.BirthDate && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Birth Date</Text>
            <Text style={styles.value}>{formatDate(customer.BirthDate)}</Text>
          </View>
        )}

        {customer.LoyaltyActivationDate && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Activation Date</Text>
            <Text style={styles.value}>
              {formatDate(customer.LoyaltyActivationDate)}
            </Text>
          </View>
        )}
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
  statusCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
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
  emptyState: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    color: "#6c757d",
    fontSize: 16,
  },
});

export default CustomerLoyaltyInfo;
