import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { updatePassword } from "../../api/user";

const ChangePasswordTab = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({
        text: "All fields are required",
        type: "error",
      });
      return false;
    }

    if (newPassword.length < 6) {
      setMessage({
        text: "New password must be at least 6 characters",
        type: "error",
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        text: "New passwords don't match",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await updatePassword(
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        user._id
      );

      setMessage({
        text: "Password updated successfully!",
        type: "success",
      });

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      setMessage({
        text: error.message || "Failed to update password",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

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

      <View style={styles.formContainer}>
        {/* Current Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={formData.currentPassword}
              onChangeText={(value) => handleChange("currentPassword", value)}
              secureTextEntry={!showPasswords.current}
              placeholder="Enter your current password"
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility("current")}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPasswords.current ? "visibility" : "visibility-off"}
                size={20}
                color="#6c757d"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={formData.newPassword}
              onChangeText={(value) => handleChange("newPassword", value)}
              secureTextEntry={!showPasswords.new}
              placeholder="Enter your new password"
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility("new")}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPasswords.new ? "visibility" : "visibility-off"}
                size={20}
                color="#6c757d"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Password must be at least 6 characters
          </Text>
        </View>

        {/* Confirm New Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              secureTextEntry={!showPasswords.confirm}
              placeholder="Confirm your new password"
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility("confirm")}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPasswords.confirm ? "visibility" : "visibility-off"}
                size={20}
                color="#6c757d"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.changePasswordButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.changePasswordButtonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </View>
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#212529",
  },
  eyeIcon: {
    padding: 12,
  },
  helperText: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  },
  changePasswordButton: {
    backgroundColor: "#4a6cfa",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "#adb5bd",
  },
  changePasswordButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ChangePasswordTab;
