import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";
import { usePets } from "../../../PetsContext";

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearImmediate(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const PetCard = ({ pet }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePhotoChange = debounce(() => {
    const nextIndex = (currentPhotoIndex + 1) % pet.photos.length;
    setCurrentPhotoIndex(nextIndex);
  }, 400);

  return (
    <TouchableOpacity
      onPress={handlePhotoChange}
      className="m-4 rounded-lg shadow-lg overflow-hidden relative"
      style={{ height: 600, flex: "auto"}}
    >
      <Image
        className="absolute top-0 left-0 w-full h-full"
        source={{ uri: pet.photos[currentPhotoIndex]?.medium }}
        resizeMode="cover"
      />
      <View className="flex-row justify-center mb-1">
        {pet.photos.map((_, idx) => (
          <View
            key={idx}
            className={`h-2 w-2 mx-1 rounded-full mt-4 ${
              idx === currentPhotoIndex ? "bg-red-400" : "bg-white"
            }`}
          />
        ))}
      </View>
      <View
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text className="text-xl font-bold text-white">{pet.name}</Text>
        <Text className="text-white mt-1">Age: {pet.age}</Text>
        <Text className="text-white mt-1">Gender: {pet.gender}</Text>
        <Text className="text-white mt-1">Contact: {pet.contact.email}</Text>
        <Text className="text-white mt-1">
          Location: {pet.contact.address.city}, {pet.contact.address.state} {pet.contact.address.postcode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PetSwiper = ({ pets }) => {
  const { handleSavePet } = usePets();

  return (
    <View className="flex-1 justify-center items-center w-full">
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
          console.log("Swiped right", cardIndex);
          const pet = pets[cardIndex];
          handleSavePet(pet);
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={25}
      />
    </View>
  );
};

export default PetSwiper;
