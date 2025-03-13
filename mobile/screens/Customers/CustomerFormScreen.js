import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BasicInfoTab from "./form-tabs/BasicInfoTab";
import ContactDetailsTab from "./form-tabs/ContactDetailsTab";
import FinancialInfoTab from "./form-tabs/FinancialInfoTab";
import LoyaltyTab from "./form-tabs/LoyaltyTab";
import {
  createCustomer,
  updateCustomer,
  getFilterOptions,
} from "../../api/customer";

const Tab = createMaterialTopTabNavigator();

const CustomerFormScreen = ({ route, navigation }) => {
  const editingCustomer = route.params?.customer;
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    CustomerCodes: [],
    Custypes: [],
    ZoneIDs: [],
    AreaIDs: [],
    SalesPersons: [],
  });

  // Initialize all form fields with default values
  const [formData, setFormData] = useState({
    CusID: "",
    Name: "",
    Phone: "",
    Phone2: "",
    Email: "",
    CompID: "",
    OpenBalance: "0",
    Website: "",
    Address: "",
    City: "",
    Zipcode: "",
    Country: "",
    ContactPerson: "",
    JobPosition: "",
    ContactPhone: "",
    ContactMobile: "",
    ContactEmail: "",
    DeliveryAddress: "",
    BranchID: "",
    CMdays: "0",
    DueLimit: "0",
    TDS: "0",
    VDS: "0",
    AgentID: "",
    CustomerCode: "",
    Type: "",
    crefitlimit: "0",
    SalesPerson: "",
    AreaID: "",
    Code: "",
    Custype: "",
    autocode: true,
    CusRemarks: "",
    BirthDate: "",
    IsLoyal: false,
    LoyaltyActivationDate: "",
    LoyalCardNo: "",
    ZoneID: "",
    BalanceType: "CR", // Default to Credit
  });

  // Load filter options on mount
  useEffect(() => {
    loadFilterOptions();
  }, []);

  // Load editing customer data if available
  useEffect(() => {
    if (editingCustomer) {
      // Convert all numeric values to strings for form inputs
      const formattedCustomer = {
        ...editingCustomer,
        OpenBalance: editingCustomer.OpenBalance?.toString() || "0",
        CMdays: editingCustomer.CMdays?.toString() || "0",
        DueLimit: editingCustomer.DueLimit?.toString() || "0",
        TDS: editingCustomer.TDS?.toString() || "0",
        VDS: editingCustomer.VDS?.toString() || "0",
        crefitlimit: editingCustomer.crefitlimit?.toString() || "0",
      };
      setFormData(formattedCustomer);
    }
  }, [editingCustomer]);

  const loadFilterOptions = async () => {
    try {
      const options = await getFilterOptions();
      if (options) {
        setFilterOptions(options);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load filter options");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!formData.CusID || !formData.Name) {
        Alert.alert("Error", "Customer ID and Name are required");
        return;
      }

      const response = await (editingCustomer
        ? updateCustomer(editingCustomer._id, formData)
        : createCustomer(formData));

      Alert.alert(
        "Success",
        `Customer successfully ${editingCustomer ? "updated" : "created"}`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to save customer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tab.Screen name="Basic Info">
          {() => (
            <BasicInfoTab
              formData={formData}
              onChange={handleChange}
              isEditing={!!editingCustomer}
              filterOptions={filterOptions}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Contact">
          {() => (
            <ContactDetailsTab formData={formData} onChange={handleChange} />
          )}
        </Tab.Screen>

        <Tab.Screen name="Financial">
          {() => (
            <FinancialInfoTab
              formData={formData}
              onChange={handleChange}
              filterOptions={filterOptions}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Loyalty">
          {() => <LoyaltyTab formData={formData} onChange={handleChange} />}
        </Tab.Screen>
      </Tab.Navigator>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {editingCustomer ? "Update Customer" : "Add Customer"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  footer: {
    padding: 16,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#4a6cfa",
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#adb5bd",
  },
  cancelButtonText: {
    color: "#495057",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  tabBar: {
    backgroundColor: "#ffffff",
  },
  tabBarIndicator: {
    backgroundColor: "#4a6cfa",
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CustomerFormScreen;
