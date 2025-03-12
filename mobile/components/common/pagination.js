import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {totalItems > 0
          ? `Showing ${startItem}-${endItem} of ${totalItems}`
          : "No items to display"}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.disabled]}
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={currentPage === 1 ? "#adb5bd" : "#4a6cfa"}
          />
        </TouchableOpacity>

        <View style={styles.pageInfo}>
          <Text style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.disabled,
          ]}
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={currentPage === totalPages ? "#adb5bd" : "#4a6cfa"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  infoText: {
    color: "#6c757d",
    fontSize: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
  },
  disabled: {
    borderColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
  },
  pageInfo: {
    marginHorizontal: 12,
  },
  pageText: {
    color: "#495057",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default Pagination;
