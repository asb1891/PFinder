import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import { usePets } from "../../../PetsContext";
import styles from "../../assets/styles";
import { LinearGradient } from "expo-linear-gradient";


// debounce function to limit the number of calls to a function
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
// Define the PetCard function
const PetCard = ({ pet }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Initialize the current photo index
  const fadeAnim = new Animated.Value(1) //fade effect on image change

  //Photo change function using debounce
  const handlePhotoChange = debounce(() => {
    if (!pet.photo_urls || pet.photo_urls.length === 0) return;
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    const nextIndex = (currentPhotoIndex + 1) % pet.photo_urls.length;
    setCurrentPhotoIndex(nextIndex);
  }, 400);

  console.log("Pet Data:", pet);

  return (
<View style={styles.cardWrapper}>
    <View style={styles.cardContainer}>
      {/* Image */}
      <TouchableOpacity onPress={handlePhotoChange} activeOpacity={0.8} style={styles.petImageContainer}>
        <Image
          source={{
            uri: pet.photo_urls?.[currentPhotoIndex] || "https://via.placeholder.com/350",
          }}
          style={styles.petImage}
        />
      </TouchableOpacity>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {(pet.photo_urls || []).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentPhotoIndex ? "#FF6B6B" : "#D9D9D9" },
            ]}
          />
        ))}
      </View>

      {/* Pet Details */}
      <View style={styles.petInfoContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petInfo}>🐾 Age: {pet.age}</Text>
        <Text style={styles.petInfo}>🧑‍🦰 Gender: {pet.gender}</Text>
        <Text style={styles.petInfo}>📍 {pet.contact.address.city}, {pet.contact.address.state}</Text>
        <Text style={styles.petContact}>✉️ {pet.contact.email}</Text>
      </View>
    </View>
  </View>
    );
};

const PetSwiper = ({ pets }) => {
  const { handleSavePet } = usePets();
  const debouncedHandleSavePet = debounce(handleSavePet, 500);
  return (
    <View>
      <Swiper
        cards={pets}
        renderCard={(card) =>
          card ? <PetCard key={card.id} pet={card} /> : null
        }
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedLeft={(cardIndex) => {
          console.log("Swiped left", cardIndex);
        }}
        onSwipedRight={(cardIndex) => {
          console.log("swiped right", cardIndex);
          const pet = pets[cardIndex];
          debouncedHandleSavePet(pet);
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={1}
      />
    </View>
  );
};

export default PetSwiper;

