import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import SavedPets from "./src/screens/SavedPets";
import { AuthProvider } from "./hooks/useAuth";
import useAuth from "./hooks/useAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchSettings from "./src/screens/SearchSettings";
import LoginScreen from "./src/screens/LoginScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
}

const AppContent = () => {
  const { user, loadingInitial } = useAuth(); //Pass the user and loadingInitial to the useAuth hook

  if (loadingInitial) {
    // You could return a loading spinner here
    return null; // Or some loading component
  }

  return (
    // If the user is not logged in, show the login screen
    // If user is authenticated, bring user to home screen
    !user ? (
      <LoginScreen />
    ) : (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require("./assets/PetSwipeLogo.png")}
                style={{
                  width: 65,
                  height: 65,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="My Pets"
          component={SavedPets}
          options={{
            headerTitle: () => (
              <Image
                source={require("./assets/PetSwipeLogo.png")}
                style={{
                  width: 65,
                  height: 65,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search Settings"
          component={SearchSettings}
          options={{
            headerTitle: () => (
              <Image
                source={require("./assets/PetSwipeLogo.png")}
                style={{
                  width: 65,
                  height: 65,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    )
  );
};
