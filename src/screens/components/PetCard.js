import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";

const debounce = (func, delay) => {
  let inDebounce; // This is the timer
  return function () {
    const context = this; // This is the context
    const args = arguments; // This is the arguments array
    clearImmediate(inDebounce); // Clear the timer
    inDebounce = setTimeout(() => func.apply(context, args), delay); // Set the timer
  };
};

//Creating a PetCard component for each pet in the pets array
//Defines information about each Pet
const PetCard = ({ pet }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  //function to cycle to the next photo
  const handlePhotoChange = debounce(() => {
    const nextIndex = (currentPhotoIndex + 1) % pet.photos.length; // loop back to 0 if at the end of the array
    setCurrentPhotoIndex(nextIndex); // Update the current photo index
  }, 400); // Call the function after 400ms

  return (
    <TouchableOpacity
      onPress={handlePhotoChange}
      className="m-1 border-2 border-neutral-300 p-3.5 rounded-lg bg-orange-100 shadow-md elevation-2"
    >
      <Image
        className="w-full h-[500px] mb-0.5 rounded-lg border-2 border-neutral-300"
        source={{ uri: pet.photos[currentPhotoIndex]?.medium }}
      />
      <View className="flex-row justify-center mt-1">
        {pet.photos.map((_, idx) => (
          <View
            key={idx}
            className={`h-3 w-3 mx-1 rounded-full ${
              idx === currentPhotoIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></View>
        ))}
      </View>
      <Text className="text-lg font-bold italic text-rose-500">{pet.name}</Text>
      <Text className="mt-1">Age: {pet.age}</Text>
      <Text className="mt-1">Gender: {pet.gender}</Text>
      <Text className="mt-1">Contact: {pet.contact.email}</Text>
      <Text className="mt-1">
        Location: {pet.contact.address.city}, {pet.contact.address.state}{" "}
        {pet.contact.address.postcode}
      </Text>
    </TouchableOpacity>
  );
};

//Creating a PetSwiper component to display the pets in a swipeable deck
const PetSwiper = ({ pets }) => {
  return (
    <View>
      <Swiper
        cards={pets}
        renderCard={(card) =>
          card ? <PetCard key={card.id} pet={card} /> : null
        } //Renders each card in the pets array
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }} //
        onSwipedLeft={(cardIndex) => {
          console.log("Swiped left", cardIndex);
        }} //
        onSwipedRight={(cardIndex) => {
          console.log("Swiped right", cardIndex);
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={25}
      ></Swiper>
    </View>
  );
};

export default PetSwiper;
