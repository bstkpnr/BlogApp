import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const CustomInput = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? "red" : isFocused ? "blue" : "gray",
          },
        ]}
      >
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(false);
          }}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: "white",
    fontWeight:'600'
  },
 
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 8,
    borderRadius: 8,
  },
});
