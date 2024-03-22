import React, {useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from'react-native';

const PetCard = ({ pet }) => {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: pet.photos[0]?.medium }} />
            <Text style={styles.text}>{pet.name}</Text>
            <Text style={styles.text}>Age: {pet.age}</Text>
            <Text style={styles.text}>Gender: {pet.gender}</Text>
            <Text style={styles.text}>Contact: {pet.contact.email}</Text>
        </View>
    )};

    const styles = StyleSheet.create({
      card: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
      image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
      },
      text: {
        marginTop: 5,
      },
    });
    
    const PetSwiper = () => {
      const [pets, setPets] = useState([]);

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
          <View>
            {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
          </View>
          </ScrollView>
        );
    };

    export default PetSwiper;