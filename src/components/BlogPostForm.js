import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

export default function BlogPostForm({ onSubmit, initialValues, isEditable }) {
  const [title, setTitle] = useState(initialValues ? initialValues.title : "");
  const [content, setContent] = useState(
    initialValues ? initialValues.content : ""
  );
  return (
    <View style={styles.main}>
      <Text style={styles.label}>Başlığı Giriniz</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>İçeriği Giriniz</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TouchableOpacity
        style={styles.buttonMain}
        onPress={() => onSubmit(title, content)}
      >
        <View style={styles.buttonView}>
          {isEditable ? (
            <Text style={styles.buttonText}>Güncelle</Text>
          ) : (
            <Text style={styles.buttonText}>Kaydet</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    marginLeft: 12,
  },
  input: {
    borderWidth: 1,
    margin: 12,
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  buttonMain: {
    padding: 35,
  },
  buttonView: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
});
