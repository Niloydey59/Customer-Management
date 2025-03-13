import React from "react";
import { View, ScrollView, StyleSheet, Switch, Text } from "react-native";
import FormInput from "../../../components/common/FormInput";

const LoyaltyTab = ({ formData, onChange }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Loyalty Customer</Text>
        <Switch
          value={formData.IsLoyal}
          onValueChange={(value) => onChange("IsLoyal", value)}
        />
      </View>

      <View style={styles.section}>
        <FormInput
          label="Loyalty Card Number"
          value={formData.LoyalCardNo}
          onChangeText={(value) => onChange("LoyalCardNo", value)}
          disabled={!formData.IsLoyal}
        />

        <FormInput
          label="Birth Date"
          value={formData.BirthDate}
          onChangeText={(value) => onChange("BirthDate", value)}
          type="date"
        />

        <FormInput
          label="Loyalty Activation Date"
          value={formData.LoyaltyActivationDate}
          onChangeText={(value) => onChange("LoyaltyActivationDate", value)}
          type="date"
          disabled={!formData.IsLoyal}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#343a40",
  },
});

export default LoyaltyTab;
