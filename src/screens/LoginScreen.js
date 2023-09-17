import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Kullanıcı", user.email);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChange={(e) => setPassword(e)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.label}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={handleSignUp}
        >
          <Text style={styles.outlineLabel}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 40,
  },
  button: {
    padding: 15,
    backgroundColor: "#98EECC",
    alignItems: "center",
    borderRadius: 8,
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  outlineButton: {
    backgroundColor: "white",
    marginTop: 5,
  },
  outlineLabel: {
    color: "#98EECC",
    fontSize: 18,
    fontWeight: "700",
  },
});
