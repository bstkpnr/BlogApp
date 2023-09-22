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
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function LoginScreen({ navigation }) {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [errors,setErrors]=useState({})
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
  
  const handleError = (errorMessage, email,password) => {
    setErrors(prevState => ({...prevState, email,password}));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{width:'80%'}}>
       <CustomInput value={email} placeholder='Mail adresi giriniz' label={'Email'} error={errors.email} onFocus={()=>handleError(email)} onChangeText={(e)=>setEmail(e)} />
        <CustomInput
        label={'Şifre'}
        password
        error={errors.email}
          placeholder="Şifre"
          value={password}
          onFocus={()=>handleError(password)}
          onChangeText={(e) => setPassword(e)}
        /> 
      </View>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton onPress={signIn} title={'Giriş Yap'} />
          <CustomButton onPress={signUp} title={'Kayıt Ol'} style={styles.outlineButton} textStyle={styles.outlineLabel} />
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

  buttonContainer: {
    width: "60%",
    marginTop: 40,
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
