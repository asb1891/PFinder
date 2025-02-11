import { ActivityIndicator, Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import PetSwiper from "./components/PetCard";
import useAuth from "../../hooks/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../assets/styles";

const HomeScreen = ({ navigation, route }) => {
  const [pets, setPets] = useState([]); // Pets array
  const { logout } = useAuth(); // Pass the logout function to the useAuth hook
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Fetching more pets indicator
  const [page, setPage] = useState(1); // Current page number

  // Function to fetch pets from the backend
  const fetchPets = async (pageNumber = 1, queryParams = "") => {
    setIsFetchingMore(true); // Set the fetching more indicator to true
    const params = new URLSearchParams(queryParams); // Create a new URLSearchParams object
    params.set("page", pageNumber); // Use `set` to ensure the page number is always set correctly

    const localIP = "192.168.1.92"; // Use your local IP address
    const url = `http://${localIP}:4000/api/pets?${params.toString()}`; // Create the URL to fetch the pets from
    console.log(`Fetching pets from: ${url}`); // Log the URL for debugging

    try {
      const response = await fetch(url); // Fetch the pets
      const data = await response.json(); // Parse the JSON response
      
      // Convert API response to ensure `photo_urls` exists
      const formattedPets = data.map((pet) => ({
        ...pet,
        photo_urls: pet.photos ? pet.photos.map((photo) => photo.full) : [], // Convert `photos` to `photo_urls`
      }));

      console.log("Formatted Pets Data:", formattedPets); // Debugging log

      setPets((prevPets) =>
        pageNumber === 1 ? formattedPets : [...prevPets, ...formattedPets]
      ); // Update pets array
      setPage((prevPage) => (data.length > 0 ? pageNumber : prevPage)); // Set the page number
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

    return () => {
      setPage(1);
    };
  }, [route.params?.queryParams]); // Only re-run the effect when search parameters change

  // Function to fetch more pets when nearing the end of the swiper stack
  const fetchMorePets = () => {
    if (!isFetchingMore && page > 1) {
      fetchPets(page); // Fetch more pets
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}> 
      {isFetchingMore ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Top Navigation Controls */}
          <View style={[styles.headerContainer]}>
            <View style={styles.navButton}>
              <Ionicons name="arrow-back" size={30} color="red" style={styles.iconSpacing} />
              <Text style={styles.navText}>Left For Next</Text>
            </View>
            <View style={styles.navButton}>
              <Text style={styles.navText}>Right To Save</Text>
              <Ionicons name="arrow-forward" size={30} color="green" style={styles.iconSpacing} />
            </View>
          </View>

          {/* Pet Swiper Component */}
          <View style={{ flex: 1 }}>
            {pets.length > 0 ? (
              <PetSwiper pets={pets} />
            ) : (
              <View style={styles.noPetsContainer}>
                <Text style={styles.noPetsText}>No pets available.</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

