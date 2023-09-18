import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import jsonServer from "../../api/jsonServer";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      const response = await jsonServer.get("/users", {
        params: { email, password },
      });

      if (response.data.length === 0) {
        console.error("Hatalı e-posta adresi veya şifre.");
        return;
      }
      navigation.navigate("Home");
      console.log("Giriş başarılı:", response.data[0]);
    } catch (error) {
      console.error("Giriş sırasında hata", error.message);
    }
  };

  const signUp = async () => {
    try {
      const existingUserResponse = await jsonServer.get("/users", {
        params: { email },
      });

      if (existingUserResponse.data.length > 0) {
        console.error("Bu e-posta adresiyle zaten bir kullanıcı mevcut.");
        return;
      }
      const response = await jsonServer.post("/users", {
        email,
        password,
      });
      signIn();

      console.log("Kullanıcı başarıyla kaydedildi:", response.data);
    } catch (error) {
      console.error("Kayıt sırasında hata", error.message);
    }
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
      {loading ? (
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.label}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={signUp}
          >
            <Text style={styles.outlineLabel}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      )}
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
