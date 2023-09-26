import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity,ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import jsonServer from "../../api/jsonServer";
import { EvilIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
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
        username,
      });

      console.log("Kullanıcı başarıyla kaydedildi:", response.data);
    } catch (error) {
      console.error("Kayıt sırasında hata", error.message);
    }
  };
  const handleError = (errorMessage, email, password,username) => {
    setErrors((prevState) => ({ ...prevState, email, password,username }));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ width: "80%" }}>
        <CustomInput
          value={username}
          placeholder="Kullanıcı adınızı giriniz"
          label={"Kullanıcı Adı"}
          error={errors.username}
          onFocus={() => handleError(username)}
          onChangeText={(e) => setUsername(e)}
        />
        <CustomInput
          value={email}
          placeholder="Mail adresi giriniz"
          label={"Email"}
          error={errors.email}
          onFocus={() => handleError(email)}
          onChangeText={(e) => setEmail(e)}
        />
        <CustomInput
          label={"Şifre"}
          password
          error={errors.password}
          placeholder="Şifre"
          value={password}
          onFocus={() => handleError(password)}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton onPress={signUp} title={"Kayıt Ol"} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <EvilIcons name="arrow-left" size={24} color="black" />         
           </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
