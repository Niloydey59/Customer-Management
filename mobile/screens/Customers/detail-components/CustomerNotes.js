import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerNotes = ({ customer }) => {
  if (!customer.CusRemarks) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Notes</Text>
      <View style={styles.notesCard}>
        <MaterialIcons
          name="note"
          size={24}
          color="#6c757d"
          style={styles.noteIcon}
        />
        <Text style={styles.noteContent}>{customer.CusRemarks}</Text>
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
  notesCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  noteIcon: {
    marginTop: 2,
  },
  noteContent: {
    flex: 1,
    fontSize: 16,
    color: "#495057",
    lineHeight: 24,
  },
});

export default CustomerNotes;
