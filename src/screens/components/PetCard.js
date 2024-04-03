import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Swiper from "react-native-deck-swiper";

//Creating a PetCard component for each pet in the pets array
//Defines information about each Pet
const PetCard = ({ pet }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: pet.photos[0]?.medium }} />
      <Text style={styles.text}>{pet.name}</Text>
      <Text style={styles.text}>Age: {pet.age}</Text>
      <Text style={styles.text}>Gender: {pet.gender}</Text>
      <Text style={styles.text}>Contact: {pet.contact.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 8,
  },
  text: {
    marginTop: 5,
  },
});

//Creating a PetSwiper component to display the pets in a swipeable deck
const PetSwiper = () => {
  const [pets, setPets] = useState([]);
  // const [savedPets, setSavedPets] = useState([]);

  //Fetch the pets from the server
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pets");
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets: ", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        cards={pets}
        renderCard={(card) =>
          card ? <PetCard key={card.id} pet={card} /> : null
        } //Renders each card in the pets array
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }} //
        onSwipedLeft={(cardIndex) =>{
          console.log("Swiped left", cardIndex);
        }} //
        onSwipedRight={(cardIndex) => {
          console.log("Swiped right", cardIndex);
        }}
        cardIndex={0}
        backgroundColor={"#4FD0E9"}
        stackSize={25}
      ></Swiper>
    </View>
  );
};

export default PetSwiper;
