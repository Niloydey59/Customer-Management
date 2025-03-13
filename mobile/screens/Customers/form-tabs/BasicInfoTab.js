import React from "react";
import { View, ScrollView, StyleSheet, Switch, Text } from "react-native";
import FormInput from "../../../components/common/FormInput";

const BasicInfoTab = ({
  formData,
  onChange,
  filterOptions = {},
  isEditing,
}) => {
  return (
    <ScrollView style={styles.container}>
      <FormInput
        label="Customer ID"
        value={formData.CusID}
        onChangeText={(value) => onChange("CusID", value)}
        required
        disabled={isEditing}
      />

      <FormInput
        label="Customer Name"
        value={formData.Name}
        onChangeText={(value) => onChange("Name", value)}
        required
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Auto-generate Customer Code</Text>
        <Switch
          value={formData.autocode}
          onValueChange={(value) => onChange("autocode", value)}
        />
      </View>

      <FormInput
        label="Customer Code"
        value={formData.CustomerCode}
        onChangeText={(value) => onChange("CustomerCode", value)}
        disabled={formData.autocode}
        placeholder={formData.autocode ? "Will be auto-generated" : ""}
      />

      <FormInput
        label="Customer Type"
        value={formData.Custype}
        onChangeText={(value) => onChange("Custype", value)}
        type="picker"
        pickerItems={filterOptions?.Custypes || []}
        disabled={false}
      />

      <FormInput
        label="Company ID"
        value={formData.CompID}
        onChangeText={(value) => onChange("CompID", value)}
      />

      <FormInput
        label="Zone"
        value={formData.ZoneID}
        onChangeText={(value) => onChange("ZoneID", value)}
        type="picker"
        pickerItems={filterOptions?.ZoneIDs || []}
      />

      <FormInput
        label="Area"
        value={formData.AreaID}
        onChangeText={(value) => onChange("AreaID", value)}
        type="picker"
        pickerItems={filterOptions?.AreaIDs || []}
      />

      <FormInput
        label="Remarks"
        value={formData.CusRemarks}
        onChangeText={(value) => onChange("CusRemarks", value)}
        multiline
        numberOfLines={3}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default BasicInfoTab;
