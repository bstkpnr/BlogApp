import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity,ActivityIndicator ,ImageBackground} from "react-native";
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
    <ImageBackground source={require('../../assets/plant.jpg')} style={styles.imgBg}>

    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <CustomInput
          value={username}
          placeholder="Kullanıcı adınızı giriniz"
          label={"Kullanıcı Adı"}
          error={errors.username}
          onFocus={() => handleError(username)}
          onChangeText={(e) => setUsername(e)}
          style={styles.input}
        />
        <CustomInput
          value={email}
          placeholder="Mail adresi giriniz"
          label={"Email"}
          error={errors.email}
          onFocus={() => handleError(email)}
          onChangeText={(e) => setEmail(e)}
          style={styles.input}

        />
        <CustomInput
          label={"Şifre"}
          password
          error={errors.password}
          placeholder="Şifre"
          value={password}
          onFocus={() => handleError(password)}
          onChangeText={(e) => setPassword(e)}
          style={styles.input}

        />
      </View>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton onPress={signUp} title={"Kayıt Ol"}  style={styles.button}/>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <EvilIcons name="arrow-left" size={24} color="black" />         
           </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
});
