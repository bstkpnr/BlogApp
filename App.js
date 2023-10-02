import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateBlogScreen from "./src/screens/CreateBlogScreen";
import { Provider } from "./src/context/BlogContext";
import IndexScreen from "./src/screens/IndexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import { AntDesign } from "@expo/vector-icons";
import EditScreen from "./src/screens/EditScreen";
import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./src/screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet,TouchableOpacity,View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CustomTabBarButton=({children,onPress})=>(
  <TouchableOpacity style={{top:-10,justifyContent:'center',alignItems:'center',...styles.shadow}} onPress={onPress}>
    <View style={{width:60,height:60,borderRadius:30,backgroundColor:'#98EECC'}}>
{children}
    </View>
  </TouchableOpacity>
)
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel:false,tabBarStyle:{position:'absolute',bottom:15,left:20,right:20,elevation:0,backgroundColor:'#ffffff',borderRadius:15,height:70,...styles.shadow}}}>
      <Tab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#98EECC" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen name="CreateBlog" component={CreateBlogScreen} options={{tabBarIcon:({focused})=>(
        <AntDesign name="pluscircle" size={24} color="white" />      ),headerShown:false,tabBarButton:(props)=>(
          <CustomTabBarButton {...props} />
        )}}>

      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel:false,
          
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#98EECC" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function App({ navigation }) {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: "Bestlog" }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
           
          />
          <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
          <Stack.Screen
            name="ShowBlog"
            component={ShowScreen}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Edit", { id: route.params.id })
                  }
                >
                  <FontAwesome name="edit" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles=StyleSheet.create({
  shadow:{
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
})