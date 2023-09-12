import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateBlogScreen from "./src/screens/CreateBlogScreen";
import { Provider } from "./src/context/BlogContext";
import IndexScreen from "./src/screens/IndexScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: "BlogApp" }}>
          <Stack.Screen name="Home" component={IndexScreen} />
          <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
