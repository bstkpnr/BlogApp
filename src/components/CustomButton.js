import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ onPress, title, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[disabled ? styles.disabledButton : styles.button, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#98EECC",
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText:{
    fontSize: 18,
    fontWeight: "700",
    color:'white'
  }
});
