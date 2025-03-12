import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../common/CustomButton";

const CustomerFilters = ({
  filters,
  filterOptions,
  onFilterChange,
  onApplyFilters,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Customer Type</Text>
        <Picker
          selectedValue={filters.Custype}
          onValueChange={(value) => onFilterChange("Custype", value)}
          style={styles.picker}
        >
          <Picker.Item label="All Types" value="" />
          {filterOptions.Custypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Zone</Text>
        <Picker
          selectedValue={filters.ZoneID}
          onValueChange={(value) => onFilterChange("ZoneID", value)}
          style={styles.picker}
        >
          <Picker.Item label="All Zones" value="" />
          {filterOptions.ZoneIDs.map((zone) => (
            <Picker.Item key={zone} label={zone} value={zone} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Area</Text>
        <Picker
          selectedValue={filters.AreaID}
          onValueChange={(value) => onFilterChange("AreaID", value)}
          style={styles.picker}
        >
          <Picker.Item label="All Areas" value="" />
          {filterOptions.AreaIDs.map((area) => (
            <Picker.Item key={area} label={area} value={area} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Sales Person</Text>
        <Picker
          selectedValue={filters.SalesPerson}
          onValueChange={(value) => onFilterChange("SalesPerson", value)}
          style={styles.picker}
        >
          <Picker.Item label="All Sales Persons" value="" />
          {filterOptions.SalesPersons.map((person) => (
            <Picker.Item key={person} label={person} value={person} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Reset"
          onPress={onReset}
          style={styles.resetButton}
          textStyle={styles.resetButtonText}
        />
        <CustomButton
          title="Apply Filters"
          onPress={onApplyFilters}
          style={styles.applyButton}
          textStyle={styles.applyButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  filterGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#343a40",
    marginBottom: 4,
  },
  picker: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  resetButtonText: {
    color: "#495057",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#4a6cfa",
  },
  applyButtonText: {
    color: "#fff",
  },
});

export default CustomerFilters;
