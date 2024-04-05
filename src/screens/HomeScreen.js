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
import PetSwiper from "./components/PetCard";
import useAuth from "../../hooks/useAuth";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ route }) => {
  const [pets, setPets] = useState([]); //Create an array to hold the pets
  const { logout } = useAuth(); //Pass the logout function to the useAuth hook
  const isFocused = useIsFocused(); //Pass the isFocused function to the useIsFocused hook
  const [isFetchingMore, setIsFetchingMore] = useState(false); 
  const [page, setPage] = useState(1); //Create a state variable to hold the page number

  //Fetch the pets from the server
  useEffect(() => {
    const fetchPets = async (queryParams = '') => {
      const url = `http://localhost:4000/api/pets${queryParams ? '?' + queryParams : ''}`;
      console.log('Fetching pets from:', url); // Log the URL being fetched
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Pets fetched:', data); // Log the fetched data
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets: ", error);
      }
    };
  
    if (route.params?.queryParams) {
      console.log('Received queryParams:', route.params.queryParams); // Log received query parameters
      fetchPets(route.params.queryParams);
    } else {
      console.log('Fetching all pets as no queryParams were received.');
      fetchPets(); // Fetch without filters to get all animals
    }
  }, [route.params?.queryParams, page]);

  const fetchMorePets = () => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    setPage(currentPage => currentPage + 1);
  };


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text>LogOut</Text>
      </TouchableOpacity>
      {pets.length > 0 ? (
        <PetSwiper pets={pets} onEndReached={fetchMorePets} />
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </SafeAreaView>
  );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default HomeScreen;
