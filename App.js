import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateBlogScreen from "./src/screens/CreateBlogScreen";
import { Provider } from "./src/context/BlogContext";
import IndexScreen from "./src/screens/IndexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import EditScreen from "./src/screens/EditScreen";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: "BlogApp" }}>
          <Stack.Screen
            name="Home"
            component={IndexScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateBlog")}
                >
                  <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
          <Stack.Screen
            name="ShowBlog"
            component={ShowScreen}
            options={({ navigation,route }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Edit",{id:route.params.id})}>
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
