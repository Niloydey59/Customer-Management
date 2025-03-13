import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FormInput from "../../../components/common/FormInput";

const FinancialInfoTab = ({ formData, onChange, filterOptions = {} }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <FormInput
          label="Opening Balance"
          value={formData.OpenBalance?.toString()}
          onChangeText={(value) => onChange("OpenBalance", value)}
          keyboardType="numeric"
        />

        <FormInput
          label="Balance Type"
          value={formData.BalanceType}
          onChangeText={(value) => onChange("BalanceType", value)}
          type="picker"
          pickerItems={["CR", "DR"]}
        />

        <FormInput
          label="Credit Limit"
          value={formData.crefitlimit?.toString()}
          onChangeText={(value) => onChange("crefitlimit", value)}
          keyboardType="numeric"
          placeholder="0.00"
        />

        <FormInput
          label="Due Limit"
          value={formData.DueLimit?.toString()}
          onChangeText={(value) => onChange("DueLimit", value)}
          keyboardType="numeric"
          placeholder="0.00"
        />
      </View>

      <View style={styles.section}>
        <FormInput
          label="CM Days"
          value={formData.CMdays?.toString()}
          onChangeText={(value) => onChange("CMdays", value)}
          keyboardType="numeric"
        />

        <FormInput
          label="TDS %"
          value={formData.TDS?.toString()}
          onChangeText={(value) => onChange("TDS", value)}
          keyboardType="numeric"
        />

        <FormInput
          label="VDS %"
          value={formData.VDS?.toString()}
          onChangeText={(value) => onChange("VDS", value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <FormInput
          label="Sales Person"
          value={formData.SalesPerson}
          onChangeText={(value) => onChange("SalesPerson", value)}
          pickerItems={filterOptions?.SalesPersons || []}
          type="picker"
        />

        <FormInput
          label="Branch ID"
          value={formData.BranchID}
          onChangeText={(value) => onChange("BranchID", value)}
        />

        <FormInput
          label="Agent ID"
          value={formData.AgentID}
          onChangeText={(value) => onChange("AgentID", value)}
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
});

export default FinancialInfoTab;
