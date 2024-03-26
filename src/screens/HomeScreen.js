import { ActivityIndicator, StyleSheet, View, ScrollView, TouchableOpacity, Text } from'react-native';
import React, { useEffect, useState } from 'react';
import PetCard from './components/PetCard'
import useAuth from '../../hooks/useAuth';

const HomeScreen = () => {
const [pets, setPets] = useState([]);//Create an array to hold the pets
const { logout } = useAuth();

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
      <TouchableOpacity onPress={logout} style={{ margineRight: 10}}>
      <Text>LogOut</Text>
    </TouchableOpacity>
      {pets.length > 0 ? (
        pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
      ) : (
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default HomeScreen;
