import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";
import React, { useEffect, useState } from "react";
import PetCard from "./components/PetCard";
import useAuth from "../../hooks/useAuth";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ route }) => {
  const [pets, setPets] = useState([]); //Create an array to hold the pets
  const { logout } = useAuth();
  const isFocused = useIsFocused();

  //Fetch the pets from the server
  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Use the queryParams to build the query string
        let queryString = '';
        if (route.params?.queryParams) {
          queryString = `?${route.params.queryParams}`;
        }

        const response = await fetch(`http://localhost:4000/api/pets${queryString}`);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets: ", error);
      }
    };

    if (isFocused) {
      fetchPets();
    }
    // Include route.params.queryParams in the dependency array
    // This will cause the useEffect to run again when queryParams change
  }, [isFocused, route.params?.queryParams]);


  return (
    
    <ScrollView>
      <SafeAreaView>
      <TouchableOpacity onPress={logout} style={{ marginLeft: 375 }}>
        <Text>LogOut</Text>
      </TouchableOpacity>
      {pets.length > 0 ? (
        pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
      ) : (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}</SafeAreaView>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default HomeScreen;
