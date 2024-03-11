import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./hooks/useAuth"
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <NavigationContainer>
    <LoginScreen />
    </NavigationContainer>
  );
}