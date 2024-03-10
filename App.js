import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./hooks/useAuth"

export default function App() {
  return (
    <NavigationContainer>
    <AuthProvider>
    <StackNavigator />
    </AuthProvider>
    </NavigationContainer>
  );
}