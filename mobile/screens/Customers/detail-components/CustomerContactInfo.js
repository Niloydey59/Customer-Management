import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerContactInfo = ({ customer }) => {
  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebPress = (website) => {
    Linking.openURL(website);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contact Information</Text>

      <View style={styles.section}>
        <Text style={styles.subsectionTitle}>Primary Contact</Text>
        {customer.Phone && (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePhonePress(customer.Phone)}
          >
            <MaterialIcons name="phone" size={20} color="#4a6cfa" />
            <Text style={styles.contactText}>{customer.Phone}</Text>
          </TouchableOpacity>
        )}

        {customer.Email && (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleEmailPress(customer.Email)}
          >
            <MaterialIcons name="email" size={20} color="#4a6cfa" />
            <Text style={styles.contactText}>{customer.Email}</Text>
          </TouchableOpacity>
        )}

        {customer.Website && (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleWebPress(customer.Website)}
          >
            <MaterialIcons name="language" size={20} color="#4a6cfa" />
            <Text style={styles.contactText}>{customer.Website}</Text>
          </TouchableOpacity>
        )}
      </View>

      {customer.Address && (
        <View style={styles.section}>
          <Text style={styles.subsectionTitle}>Address</Text>
          <View style={styles.addressItem}>
            <MaterialIcons name="location-on" size={20} color="#6c757d" />
            <Text style={styles.addressText}>
              {customer.Address}
              {customer.City && `\n${customer.City}`}
              {customer.Zipcode && `, ${customer.Zipcode}`}
              {customer.Country && `\n${customer.Country}`}
            </Text>
          </View>
        </View>
      )}

      {(customer.ContactPerson ||
        customer.ContactPhone ||
        customer.ContactEmail) && (
        <View style={styles.section}>
          <Text style={styles.subsectionTitle}>Contact Person</Text>
          {customer.ContactPerson && (
            <View style={styles.contactItem}>
              <MaterialIcons name="person" size={20} color="#6c757d" />
              <Text style={styles.contactText}>{customer.ContactPerson}</Text>
              {customer.JobPosition && (
                <Text style={styles.jobPosition}>{customer.JobPosition}</Text>
              )}
            </View>
          )}

          {customer.ContactPhone && (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handlePhonePress(customer.ContactPhone)}
            >
              <MaterialIcons name="phone" size={20} color="#4a6cfa" />
              <Text style={styles.contactText}>{customer.ContactPhone}</Text>
            </TouchableOpacity>
          )}

          {customer.ContactEmail && (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleEmailPress(customer.ContactEmail)}
            >
              <MaterialIcons name="email" size={20} color="#4a6cfa" />
              <Text style={styles.contactText}>{customer.ContactEmail}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  section: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    color: "#212529",
  },
  addressItem: {
    flexDirection: "row",
    gap: 12,
  },
  addressText: {
    fontSize: 16,
    color: "#212529",
    flex: 1,
    lineHeight: 24,
  },
  jobPosition: {
    fontSize: 14,
    color: "#6c757d",
    marginLeft: 8,
  },
});

export default CustomerContactInfo;
