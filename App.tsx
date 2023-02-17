import "react-native-gesture-handler";
import { Home, PostDetails } from "./screens";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { PostsUsersContextProvider } from "./context";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PostsUsersContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontFamily: "Roboto_900Black",
            },
            headerTitleAlign: "center",
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: "white",
            },

            headerTintColor: "black",
          }}
          initialRouteName="Feed"
        >
          <RootStack.Screen name="Feed" component={Home} />
          <RootStack.Screen
            name="PostDetails"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
            component={PostDetails}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PostsUsersContextProvider>
  );
}
