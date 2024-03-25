import { NavigationContainer } from '@react-navigation/native';;
import HomeScreen from './src/screens/HomeScreen';
import SavedPets from './src/screens/SavedPets';
import { AuthProvider } from './hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Tab.Navigator>
        <Tab.Screen name = "Home" component = {HomeScreen} />
        <Tab.Screen name = "My Pets" component = {SavedPets} />
      </Tab.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}