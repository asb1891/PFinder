import React, { useRef } from "react";
import Swiper from "react-native-deck-swiper";
import { usePets } from "../../../PetsContext";
import PetCard from "./PetCard";
import { View } from "react-native";

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
    <View>
      <Swiper
        ref={swiperRef}
        cards={pets}
        renderCard={(card, cardIndex) =>
          card ? (
            <PetCard
              key={card.id}
              pet={card}
              onSwipeRight={handleManualSwipeRight} // Only triggers manual swipe, no state changes
              onSwipeLeft={handleManualSwipeLeft}
            />
          ) : null
        }
        onSwipedRight={handleRightSwipe} // Saves pet when swiped right
        onSwipedLeft={handleLeftSwipe}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={1}
      />
    </View>
  );
};

export default PetSwiper;

