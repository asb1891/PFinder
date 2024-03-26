import { NavigationContainer } from '@react-navigation/native';;
import HomeScreen from './src/screens/HomeScreen';
import SavedPets from './src/screens/SavedPets';
import { AuthProvider } from './hooks/useAuth';
import useAuth from './hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchSettings from './src/screens/SearchSettings';
import LoginScreen from './src/screens/LoginScreen';

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
  const { user, loadingInitial } = useAuth();

  if (loadingInitial) {
    // You could return a loading spinner here
    return null; // Or some loading component
  }

  return (
    !user ? (
      <LoginScreen />
    ) : (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Pets" component={SavedPets} />
        <Tab.Screen name="Search Settings" component={SearchSettings} />
      </Tab.Navigator>
    )
  );
};
    