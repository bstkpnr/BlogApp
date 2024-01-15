import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
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
    
      <ImageBackground source={require('../../assets/plant.jpg')} style={styles.imgBg}>
      
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
       <CustomInput value={email} label={'Email'} placeholder='Mail adresi giriniz'  error={errors.email} onFocus={()=>handleError(email)} onChangeText={(e)=>setEmail(e)}           style={styles.input}
 />
        <CustomInput
        label={'Şifre'}
        password
        error={errors.email}
          placeholder="Şifre"
          value={password}
          onFocus={()=>handleError(password)}
          onChangeText={(e) => setPassword(e)}
          style={styles.input}

        /> 
      </View>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton onPress={signIn} title={'Giriş Yap'} style={styles.button} />
          <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.labelContainer}>
            <Text style={styles.outlineLabel}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>)}
    </KeyboardAvoidingView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height:'100%'
  },
  imgBg:{width:'100%',height:'100%',flex: 1,
  resizeMode: 'cover',
  justifyContent: 'center'

  },

  outlineLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign:'center',
    marginTop:5,
    lineHeight:18

  },
  formContainer:{
    width:'80%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20, 
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  input: {
    marginBottom: 15,
borderBottomWidth: 1,
borderBottomColor: '#D3D3D3', 
paddingBottom: 10,
color:'white'
  },
  button: {
    backgroundColor: '#6200EE', 
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width:300,
    margin:28
    
    },
    labelContainer:{
      top:50
    }
});
