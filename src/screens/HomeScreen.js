import { View, Text, ScrollView } from'react-native';
import React, { useEffect, useState } from 'react';
import PetCard from './components/PetCard'
import Swiper from 'react-native-deck-swiper';

const HomeScreen = () => {
const [pets, setPets] = useState([]);//Create an array to hold the pets

//Fetch the pets from the server
useEffect(() => {
  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/pets');
      const data = await response.json();
      setPets(data);
    }
    catch (error) {
      console.error('Error fetching pets: ', error);
    }};
    fetchPets();
  }, []);

  return (
    <ScrollView>
      {pets.length > 0 ? (
        pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
      ) : (
        <Text>Loading pets...</Text>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
