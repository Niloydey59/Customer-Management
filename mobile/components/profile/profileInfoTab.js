import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { updateUserProfile } from "../../api/user";

const ProfileInfoTab = ({ user }) => {
  const { setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    phone: "",
  });
  const [changedFields, setChangedFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Initialize form data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        username: user.username || "",
        phone: user.phone || "",
      });
      setChangedFields({});
    }
  }, [user]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only track field if it's different from original user data
    if (value !== user[name]) {
      setChangedFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Remove field from changedFields if it's same as original
      setChangedFields((prev) => {
        const newFields = { ...prev };
        delete newFields[name];
        return newFields;
      });
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(changedFields).length === 0) {
      setMessage({
        text: "No changes made",
        type: "info",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await updateUserProfile(changedFields, user._id);
      setUser(response.payload.updatedUser);

      setMessage({
        text: "Profile updated successfully!",
        type: "success",
      });

      setIsEditing(false);
      setChangedFields({});

      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      setMessage({
        text: error.message || "Failed to update profile",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>

      {/* Message display */}
      {message.text ? (
        <View
          style={[
            styles.messageContainer,
            message.type === "success"
              ? styles.successMessage
              : message.type === "error"
              ? styles.errorMessage
              : styles.infoMessage,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      ) : null}

      {isEditing ? (
        // Edit Form
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(value) => handleChange("username", value)}
              placeholder="Enter username"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={formData.displayName}
              onChangeText={(value) => handleChange("displayName", value)}
              placeholder="Enter display name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={user.email}
              editable={false}
            />
            <Text style={styles.helperText}>Email cannot be changed</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsEditing(false);
                setChangedFields({});
                setFormData({
                  displayName: user.displayName || "",
                  username: user.username || "",
                  phone: user.phone || "",
                });
              }}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                (loading || Object.keys(changedFields).length === 0) &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={loading || Object.keys(changedFields).length === 0}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Display Profile
        <View style={styles.profileDetailsContainer}>
          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Username:</Text>
            <Text style={styles.fieldValue}>{user.username}</Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Display Name:</Text>
            <Text style={styles.fieldValue}>
              {user.displayName || "Not provided"}
            </Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{user.email}</Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Phone:</Text>
            <Text style={styles.fieldValue}>
              {user.phone || "Not provided"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <MaterialIcons name="edit" size={20} color="#ffffff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 16,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  successMessage: {
    backgroundColor: "#d1e7dd",
    borderLeftWidth: 4,
    borderLeftColor: "#20c997",
  },
  errorMessage: {
    backgroundColor: "#f8d7da",
    borderLeftWidth: 4,
    borderLeftColor: "#dc3545",
  },
  infoMessage: {
    backgroundColor: "#cff4fc",
    borderLeftWidth: 4,
    borderLeftColor: "#0dcaf0",
  },
  messageText: {
    fontSize: 14,
    fontWeight: "500",
  },
  profileDetailsContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
  },
  profileField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6c757d",
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: "#212529",
  },
  editButton: {
    backgroundColor: "#4a6cfa",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 8,
  },
  formContainer: {
    marginTop: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#ffffff",
  },
  disabledInput: {
    backgroundColor: "#e9ecef",
    color: "#6c757d",
  },
  helperText: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6c757d",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#4a6cfa",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#adb5bd",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default ProfileInfoTab;
