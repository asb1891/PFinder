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
    const fetchPets = async () => {
      const queryParams = route.params?.queryParams || '';
      const params = new URLSearchParams(queryParams);
      params.append('page', page);
  
      const url = `http://localhost:4000/api/pets?${params.toString()}`;
      console.log('Fetching pets from:', url); // For debugging
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (page === 1) {
          setPets(data); // Starting a new search or initial load
        } else {
          setPets(prevPets => [...prevPets, ...data]); // Adding to existing pets
        }
      } catch (error) {
        console.error("Error fetching pets: ", error);
      } finally {
        setIsFetchingMore(false); // Done fetching, whether successful or not
      }
    };
      if (isFocused) {
        fetchPets();
      }
    }, [isFocused, route.params?.queryParams, page]);
  
    // Call this function when the end of the swiper stack is reached
    const fetchMorePets = async () => {
      if (isFetchingMore) {
        return; // Exit if already fetching the next page
      }
      setIsFetchingMore(true);
      setPage(prevPage => prevPage +1) // Set the flag to true to start fetching more pets
  
      try {
        const nextPage = page + 1; // Calculate the next page number
        const queryParams = route.params?.queryParams || '';
        const params = new URLSearchParams(queryParams);
        params.append('page', nextPage);
        const url = `http://localhost:4000/api/pets?${params.toString()}`;
        console.log(`Fetching pets from: ${url}, page: ${nextPage}`);
  
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.length > 0) {
          setPets(prevPets => [...prevPets, ...data]);
          setPage(nextPage); // Update the page number to the next page
        } else {
          console.log('No more pets to fetch.');
        }
      } catch (error) {
        console.error("Error fetching more pets: ", error);
      } finally {
        setIsFetchingMore(false); // Reset the flag after fetching
      }
    };
  
    // Reset when the search criteria change
    useEffect(() => {
      setPage(1);
      setPets([]); // Clear the existing pets to start a new search
    }, [route.params?.queryParams]);

    const handleSwipe = (cardIndex) => {
      console.log(`Card swiped: ${cardIndex}, Total Pets: ${pets.length}`);
      if (!isFetchingMore && cardIndex >= pets.length - 5) {
        console.log('Fetching more pets...');
        fetchMorePets();
      }
    };


    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text>LogOut</Text>
        </TouchableOpacity>
        {pets.length > 0 ? (
          <>
            <PetSwiper pets={pets} 
            onSwipe={handleSwipe} />
            {isFetchingMore && 
              <ActivityIndicator size="large" color="#00ff00" />
            }
          </>
        ) : isFetchingMore ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Text>No pets available.</Text> // You can change this to your preferred message or UI for no pets
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
