import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";
import { usePets } from '../../../PetsContext';


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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); //Current photo index

  //function to cycle to the next photo
  const handlePhotoChange = debounce(() => {
    const nextIndex = (currentPhotoIndex + 1) % pet.photos.length; // loop back to 0 if at the end of the array
    setCurrentPhotoIndex(nextIndex); // Update the current photo index
  }, 100); // Call the function after 400ms

  return (
    <TouchableOpacity
      onPress={handlePhotoChange}
      className="m-4 rounded-lg shadow overflow-hidden relative"
      style={{ height: 650 }} // Set a fixed height for consistency
    >
      
      <Image
        className="absolute top-0 left-0 w-full h-full"
        source={{ uri: pet.photos[currentPhotoIndex]?.medium }}
        resizeMode="cover"
      />
      <View className="flex-row justify-center mt-5 mb-2">
          {pet.photos.map((_, idx) => (
            <View
              key={idx}
              className={`h-2 w-2 mx-1 rounded-full ${
                idx === currentPhotoIndex ? 'bg-red-400' : 'bg-black'
              }`}
            />
          ))}
        </View>
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <Text className="text-lg font-bold text-white">{pet.name}</Text>
        <Text className="text-white">Age: {pet.age}</Text>
        <Text className="text-white">Gender: {pet.gender}</Text>
        <Text className="text-white">Contact: {pet.contact.email}</Text>
        <Text className="text-white">
          Location: {pet.contact.address.city}, {pet.contact.address.state} {pet.contact.address.postcode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

//Creating a PetSwiper component to display the pets in a swipeable deck
const PetSwiper = ({ pets }) => {

  const { handleSavePet } = usePets();


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
          const pet = pets[cardIndex];
          handleSavePet(pets[cardIndex]);
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={25}
      ></Swiper>
    </View>
  );
};

export default PetSwiper;
