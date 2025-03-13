import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FormInput from "../../../components/common/FormInput";

const ContactDetailsTab = ({ formData, onChange }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <FormInput
          label="Phone"
          value={formData.Phone}
          onChangeText={(value) => onChange("Phone", value)}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Alternative Phone"
          value={formData.Phone2}
          onChangeText={(value) => onChange("Phone2", value)}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Email"
          value={formData.Email}
          onChangeText={(value) => onChange("Email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          label="Website"
          value={formData.Website}
          onChangeText={(value) => onChange("Website", value)}
          autoCapitalize="none"
          placeholder="https://"
        />
      </View>

      <View style={styles.section}>
        <FormInput
          label="Address"
          value={formData.Address}
          onChangeText={(value) => onChange("Address", value)}
          multiline
          numberOfLines={3}
        />

        <FormInput
          label="Delivery Address"
          value={formData.DeliveryAddress}
          onChangeText={(value) => onChange("DeliveryAddress", value)}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.section}>
        <FormInput
          label="City"
          value={formData.City}
          onChangeText={(value) => onChange("City", value)}
        />

        <FormInput
          label="Zipcode"
          value={formData.Zipcode}
          onChangeText={(value) => onChange("Zipcode", value)}
        />

        <FormInput
          label="Country"
          value={formData.Country}
          onChangeText={(value) => onChange("Country", value)}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <FormInput
          label="Contact Person"
          value={formData.ContactPerson}
          onChangeText={(value) => onChange("ContactPerson", value)}
        />

        <FormInput
          label="Job Position"
          value={formData.JobPosition}
          onChangeText={(value) => onChange("JobPosition", value)}
        />

        <FormInput
          label="Contact Phone"
          value={formData.ContactPhone}
          onChangeText={(value) => onChange("ContactPhone", value)}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Contact Mobile"
          value={formData.ContactMobile}
          onChangeText={(value) => onChange("ContactMobile", value)}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Contact Email"
          value={formData.ContactEmail}
          onChangeText={(value) => onChange("ContactEmail", value)}
          keyboardType="email-address"
          autoCapitalize="none"
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
  divider: {
    height: 1,
    backgroundColor: "#dee2e6",
    marginVertical: 24,
  },
});

export default ContactDetailsTab;
