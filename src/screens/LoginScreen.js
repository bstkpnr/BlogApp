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
const [username, setUsername]=useState('')

  const signIn = async () => {
    try {
      const response = await jsonServer.get("/users", {
        params: { email, password },
      });

      if (response.data.length === 0) {
        console.error("Hatalı e-posta adresi veya şifre.");
        return;
      }
      const user = response.data[0];
      navigation.navigate("Home",{user});
      console.log("Giriş başarılı:", response.data[0]);
    } catch (error) {
      console.error("Giriş sırasında hata", error.message);
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
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.outlineLabel}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>)}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  outlineLabel: {
    color: "grey",
    fontSize: 16,
    fontWeight: "700",
    textAlign:'center',
    marginTop:5,

  },
});
