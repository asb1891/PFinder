import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import styles from "../../assets/styles";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

// debounce function to limit the number of calls to a function
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Define the PetCard function
const PetCard = ({ pet, onSwipeRight, onSwipeLeft }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Initialize the current photo index
  const fadeAnim = useRef(new Animated.Value(1)).current; // UseRef instead of useState to prevent unnecessary re-renders

  // Photo change function using debounce
  const handlePhotoChange = debounce(() => {
    if (!pet.photo_urls || pet.photo_urls.length === 0) return;
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const nextIndex = (currentPhotoIndex + 1) % pet.photo_urls.length;
    setCurrentPhotoIndex(nextIndex);
  }, 400);

  return (
    <View style={styles.cardWrapper}>
      {/* Pet Card */}
      <View style={styles.cardContainer}>
        {/* Image */}
        <TouchableOpacity
          onPress={handlePhotoChange}
          activeOpacity={0.8}
          style={styles.petImageContainer}
        >
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
          
          {/* Personality Tags */}
          <View style={styles.personalityTagsContainer}>
            {pet.tags && pet.tags.length > 0 ? (
              pet.tags.map((tag, index) => (
                <Text key={index} style={styles.personalityTag}>{tag}</Text>
              ))
            ) : (
              <Text style={styles.personalityTag}>No personality traits listed</Text>
            )}
          </View>
        </View>
      </View>
  
      {/* Buttons - placed **below** the card */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onSwipeLeft} style={styles.dismissButton}>
          <Ionicons name="close" size={40} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onSwipeRight} style={styles.saveButton}>
          <Ionicons name="heart" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

export default PetCard;
