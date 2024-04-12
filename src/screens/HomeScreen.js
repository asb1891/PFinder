import {
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView, 
  Button
} from "react-native";
import React, { useEffect, useState } from "react";
import PetSwiper from "./components/PetCard";
import useAuth from "../../hooks/useAuth";

const HomeScreen = ({ navigation, route }) => {
  const [pets, setPets] = useState([]);
  const { logout } = useAuth();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);

  // Function to fetch pets
  const fetchPets = async (pageNumber = 1, queryParams = '') => {
    setIsFetchingMore(true);
    const params = new URLSearchParams(queryParams);
    params.set('page', pageNumber); // Use `set` to ensure the page number is always set correctly
    const url = `http://localhost:4000/api/pets?${params.toString()}`;

    console.log(`Fetching pets from: ${url}`);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPets(prevPets => pageNumber === 1 ? data : [...prevPets, ...data]);
      setPage(prevPage => data.length > 0 ? pageNumber : prevPage);
    } catch (error) {
      console.error("Error fetching pets: ", error);
    } finally {
      setIsFetchingMore(false);
    }
  };
  // Effect for initial fetch and when search parameters change
  useEffect(() => {
    const queryParams = route.params?.queryParams || '';
    fetchPets(1, queryParams);
    // Reset the pets array and page state when search parameters change
    return () => {
      setPets([]);
      setPage(1);
    };
  }, [route.params?.queryParams]);
  // Function to fetch more pets when nearing end of the swiper stack
  const fetchMorePets = () => {
    if (!isFetchingMore && page > 1) {
      fetchPets(page);
    }
  };

  const handleSwipe = (cardIndex) => {
    if (cardIndex === pets.length - 10) {
      fetchMorePets();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Sign Out" onPress={logout} />
      {isFetchingMore && <ActivityIndicator size="large" color="#00ff00" />}
      {pets.length > 0 ? (
        <PetSwiper pets={pets} onSwipe={handleSwipe} />
      ) : (
        !isFetchingMore && <Text>No pets available.</Text>
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
  logoutButton: {
    margin: 10,
    backgroundColor: "#000",
    fontSize: 10,
    borderRadius: 5,
    padding: 10,
    
  },
});

export default HomeScreen;
