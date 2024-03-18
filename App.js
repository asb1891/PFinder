import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUp';
import HomeScreen from './src/screens/HomeScreen';
import { AuthProvider } from './hooks/useAuth';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName = 'Login' >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name = "Home" component = {HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}