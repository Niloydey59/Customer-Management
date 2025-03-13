import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FormInput = ({
  label,
  error,
  required,
  containerStyle,
  labelStyle,
  inputStyle,
  disabled = false,
  type = "text",
  pickerItems = [],
  ...props
}) => {
  const renderInput = () => {
    if (type === "picker") {
      return (
        <View style={[styles.input, disabled && styles.inputDisabled]}>
          <Picker
            enabled={!disabled}
            style={[styles.picker, inputStyle]}
            selectedValue={props.value}
            onValueChange={props.onChangeText}
          >
            <Picker.Item label="Select..." value="" />
            {pickerItems &&
              pickerItems.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
          </Picker>
        </View>
      );
    }

    return (
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          inputStyle,
        ]}
        placeholderTextColor="#6c757d"
        editable={!disabled}
        {...props}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      {renderInput()}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#343a40",
    marginBottom: 8,
  },
  required: {
    color: "#dc3545",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  inputDisabled: {
    backgroundColor: "#e9ecef",
    color: "#6c757d",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#212529",
  },
});

export default FormInput;
