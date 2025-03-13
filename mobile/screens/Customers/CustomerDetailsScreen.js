import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getCustomerById, deleteCustomer } from "../../api/customer";

import CustomerDetailHeader from "./detail-components/CustomerDetailHeader";
import CustomerBasicInfo from "./detail-components/CustomerBasicInfo";
import CustomerContactInfo from "./detail-components/CustomerContactInfo";
import CustomerFinancialInfo from "./detail-components/CustomerFinancialInfo";
import CustomerLoyaltyInfo from "./detail-components/CustomerLoyaltyInfo";
import CustomerNotes from "./detail-components/CustomerNotes";

const CustomerDetailsScreen = ({ route, navigation }) => {
  const { customerId } = route.params;
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      setIsLoading(true);
      const response = await getCustomerById(customerId);
      setCustomer(response.customer);
    } catch (err) {
      setError("Failed to load customer details");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate("CustomerForm", { customer });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Customer",
      "Are you sure you want to delete this customer?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCustomer(customerId);
              navigation.goBack();
            } catch (err) {
              Alert.alert("Error", "Failed to delete customer");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4a6cfa" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.centered}>
        <Text>Customer not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#4a6cfa" />
        </TouchableOpacity>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <MaterialIcons name="edit" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <MaterialIcons name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <CustomerDetailHeader customer={customer} />
        <CustomerBasicInfo customer={customer} />
        <CustomerContactInfo customer={customer} />
        <CustomerFinancialInfo customer={customer} />
        <CustomerLoyaltyInfo customer={customer} />
        {customer.CusRemarks && <CustomerNotes customer={customer} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  backButton: {
    padding: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    backgroundColor: "#4a6cfa",
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#dc3545",
    fontSize: 16,
  },
});

export default CustomerDetailsScreen;
