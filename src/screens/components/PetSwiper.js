import React, { useRef } from "react";
import Swiper from "react-native-deck-swiper";
import { usePets } from "../../../PetsContext";
import PetCard from "./PetCard";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../assets/styles";

const PetSwiper = ({ pets }) => {
  const { handleSavePet } = usePets();
  const swiperRef = useRef(null);

  const handleRightSwipe = (cardIndex) => {
    if (!pets[cardIndex]) return;
    console.log("Swiped right:", pets[cardIndex].name);
    handleSavePet(pets[cardIndex]); // Save pet to DB
  };

  const handleLeftSwipe = (cardIndex) => {
    console.log("Swiped left:", pets[cardIndex]?.name || "Unknown pet");
  };

  // Function to manually swipe right when the heart button is clicked
  const handleManualSwipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight(); // Manually trigger swipeRight
    }
  };

  // Function to manually swipe left when the X button is clicked
  const handleManualSwipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft(); // Manually trigger swipeLeft
    }
  };

  return (
  <View style={{ flex: 1, justifyContent: "space-between" }}>
    <Swiper
      ref={swiperRef}
      cards={pets}
      renderCard={(card, cardIndex) =>
        card ? (
          <PetCard
            key={card.id}
            pet={card}
            onSwipeRight={handleManualSwipeRight}
            onSwipeLeft={handleManualSwipeLeft}
          />
        ) : null
      }
      onSwipedRight={handleRightSwipe}
      onSwipedLeft={handleLeftSwipe}
      backgroundColor="transparent"
      cardIndex={0}
      stackSize={5}
      containerStyle={{ marginBottom: 100 }} // ✅ Moves cards up to separate them from buttons
    />

    {/* Swipe Buttons Container */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleManualSwipeLeft} style={styles.dismissButton}>
        <Text>❌</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleManualSwipeRight} style={styles.saveButton}>
        <Text>💛</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

export default PetSwiper;

