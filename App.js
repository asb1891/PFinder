// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./src/screens/HomeScreen";
// import SavedPets from "./src/screens/SavedPets";
// import { AuthProvider } from "./hooks/useAuth";
// import useAuth from "./hooks/useAuth";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import SearchSettings from "./src/screens/SearchSettings";
// import LoginScreen from "./src/screens/LoginScreen";
// import { Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { PetsProvider } from "./PetsContext";

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <PetsProvider>
//     <NavigationContainer>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </NavigationContainer>
//     </PetsProvider>
//   );
// }

// const AppContent = () => {
//   const { user, loadingInitial } = useAuth(); //Pass the user and loadingInitial to the useAuth hook

//   if (loadingInitial) {
//     // You could return a loading spinner here
//     return null; // Or some loading component
//   }

//   return (
//     // If the user is not logged in, show the login screen
//     // If user is authenticated, bring user to home screen
//     !user ? (
//       <LoginScreen />
//     ) : (
//       <Tab.Navigator initialRouteName="Home">
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             headerTitle: () => (
//               <Image
//                 source={require("./assets/PetSwipeLogo.png")}
//                 style={{
//                   width: 65,
//                   height: 65,
//                   resizeMode: "contain",
//                   alignSelf: "center",
//                 }}
//               />
//             ),
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="My Pets"
//           component={SavedPets}
//           options={{
//             headerTitle: () => (
//               <Image
//                 source={require("./assets/PetSwipeLogo.png")}
//                 style={{
//                   width: 65,
//                   height: 65,
//                   resizeMode: "contain",
//                   alignSelf: "center",
//                 }}
//               />
//             ),
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="paw" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Preferences"
//           component={SearchSettings}
//           options={{
//             headerTitle: () => (
//               <Image
//                 source={require("./assets/PetSwipeLogo.png")}
//                 style={{
//                   width: 65,
//                   height: 65,
//                   resizeMode: "contain",
//                   alignSelf: "center",
//                 }}
//               />
//             ),
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="search" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     )
//   );
// };
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import SavedPets from './src/screens/SavedPets';
import SearchSettings from './src/screens/SearchSettings';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider } from './hooks/useAuth';
import useAuth from './hooks/useAuth';
import { PetsProvider } from './PetsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('./assets/PetSwipeLogo.png')}
              style={{
                width: 65,
                height: 65,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Pets"
        component={SavedPets}
        options={{
          headerTitle: () => (
            <Image
              source={require('./assets/PetSwipeLogo.png')}
              style={{
                width: 65,
                height: 65,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Preferences"
        component={SearchSettings}
        options={{
          headerTitle: () => (
            <Image
              source={require('./assets/PetSwipeLogo.png')}
              style={{
                width: 65,
                height: 65,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const { user, loadingInitial } = useAuth();

  if (loadingInitial) {
    // You could return a loading spinner here
    return null; // Or some loading component
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="App"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <PetsProvider>
      <NavigationContainer>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NavigationContainer>
    </PetsProvider>
  );
}
