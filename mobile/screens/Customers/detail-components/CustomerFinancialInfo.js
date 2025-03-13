import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerFinancialInfo = ({ customer }) => {
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Financial Information</Text>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Balance</Text>
          <Text style={styles.amount}>
            {formatCurrency(customer.OpenBalance)}
          </Text>
          <Text style={styles.type}>
            {customer.BalanceType || "Opening Balance"}
          </Text>
        </View>

        {customer.crefitlimit > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Credit Limit</Text>
            <Text style={styles.amount}>
              {formatCurrency(customer.crefitlimit)}
            </Text>
          </View>
        )}

        {customer.DueLimit > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Due Limit</Text>
            <Text style={styles.amount}>
              {formatCurrency(customer.DueLimit)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoGrid}>
        {customer.CMdays > 0 && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Credit Period</Text>
            <Text style={styles.value}>{customer.CMdays} days</Text>
          </View>
        )}

        {customer.TDS > 0 && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>TDS</Text>
            <Text style={styles.value}>{customer.TDS}%</Text>
          </View>
        )}

        {customer.VDS > 0 && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>VDS</Text>
            <Text style={styles.value}>{customer.VDS}%</Text>
          </View>
        )}

        {customer.AgentID && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Agent ID</Text>
            <Text style={styles.value}>{customer.AgentID}</Text>
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
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    minWidth: 150,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
  },
  type: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
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
});

export default CustomerFinancialInfo;
