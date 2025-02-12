import { ActivityIndicator, Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import PetSwiper from "./components/PetSwiper";
import useAuth from "../../hooks/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../assets/styles";

const HomeScreen = ({ navigation, route }) => {
  const [pets, setPets] = useState([]); // Pets array
  const { logout } = useAuth();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);

  // Function to fetch pets from the backend
  const fetchPets = async (pageNumber = 1, queryParams = "") => {
    setIsFetchingMore(true);
    const params = new URLSearchParams(queryParams);
    params.set("page", pageNumber);

    const localIP = "192.168.1.92"; // Use your local IP address
    const url = `http://${localIP}:4000/api/pets?${params.toString()}`;
    console.log(`Fetching pets from: ${url}`);

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Convert API response to ensure `photo_urls` exists
      const formattedPets = data.map((pet) => ({
        ...pet,
        photo_urls: pet.photos ? pet.photos.map((photo) => photo.full) : [], // Convert `photos` to `photo_urls`
      }));

      console.log("Formatted Pets Data:", formattedPets);

      setPets((prevPets) =>
        pageNumber === 1 ? formattedPets : [...prevPets, ...formattedPets]
      );
      setPage((prevPage) => (data.length > 0 ? pageNumber : prevPage));
    } catch (error) {
      console.error("Error fetching pets: ", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Effect for initial fetch and when search parameters change
  useEffect(() => {
    const queryParams = route.params?.queryParams || "";
    fetchPets(1, queryParams);

    return () => {
      setPage(1);
    };
  }, [route.params?.queryParams]);

  // Function to fetch more pets when nearing the end of the swiper stack
  const fetchMorePets = () => {
    if (!isFetchingMore && page > 1) {
      fetchPets(page);
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
          <View style={styles.headerContainer}>
            <View style={styles.navButton}>
              <Ionicons name="arrow-back" size={20} color="red" style={styles.iconSpacing} />
              <Text style={styles.navText}>Left For Next</Text>
            </View>
            <View style={styles.navButton}>
              <Text style={styles.navText}>Right To Save</Text>
              <Ionicons name="arrow-forward" size={20} color="green" style={styles.iconSpacing} />
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
