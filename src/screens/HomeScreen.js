import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  Button,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PetSwiper from "./components/PetCard";
import useAuth from "../../hooks/useAuth";

const HomeScreen = ({ navigation, route }) => {
  const [pets, setPets] = useState([]); //Pets array
  const { logout } = useAuth(); //Pass the logout function to the useAuth hook
  const [isFetchingMore, setIsFetchingMore] = useState(false); //Fetching more pets indicator
  const [page, setPage] = useState(1); //Current page number

  // Function to fetch pets
  const fetchPets = async (pageNumber = 1, queryParams = "") => {
    setIsFetchingMore(true); //Set the fetching more indicator to true
    const params = new URLSearchParams(queryParams); // Create a new URLSearchParams object
    params.set("page", pageNumber); // Use `set` to ensure the page number is always set correctly
    const url = `http://localhost:4000/api/pets?${params.toString()}`; // Create the URL to fetch the pets from

    console.log(`Fetching pets from: ${url}`);

    try {
      const response = await fetch(url); // Fetch the pets
      const data = await response.json(); // Parse the JSON response
      setPets((prevPets) => (pageNumber === 1 ? data : [...prevPets, ...data])); // Add the new pets to the pets array
      setPage((prevPage) => (data.length > 0 ? pageNumber : prevPage)); // Set the page number to 1 if there are no more pets
    } catch (error) {
      console.error("Error fetching pets: ", error);
    } finally {
      setIsFetchingMore(false);
    }
  };
  // Effect for initial fetch and when search parameters change
  useEffect(() => {
    const queryParams = route.params?.queryParams || ""; // Get the search parameters from the route
    fetchPets(1, queryParams); // Fetch the pets with the search parameters
    // Reset the pets array and page state when search parameters change
    return () => {
      setPets([]);
      setPage(1);
    };
  }, [route.params?.queryParams]); // Only re-run the effect when the search parameters change

  // Function to fetch more pets when nearing end of the swiper stack
  const fetchMorePets = () => {
    // Increment the page number and fetch more pets
    if (!isFetchingMore && page > 1) {
      fetchPets(page); // Fetch more pets
    }
  };
  // Function to handle swiping to fetch more pets when nearing end of the swiper
  const handleSwipe = (cardIndex) => {
    // Fetch more pets when nearing the end of the swiper stack
    if (cardIndex === pets.length - 10) {
      fetchMorePets();
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-[50px] pb-4 px-2 bg-white">
      
      {isFetchingMore && <ActivityIndicator size="large" color="#00ff00" />}
      {pets.length > 0 ? (
        <View className="justify-items-center mb-7">
          {/* <Button title="Sign Out" onPress={logout} className="mb-2 mt-4" /> */}
          <PetSwiper pets={pets} onSwipe={handleSwipe} />
        </View>
      ) : (
        !isFetchingMore && (
          <Text className="text-lg font-bold m-4 text-center">
            No pets available.
          </Text>
        )
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
