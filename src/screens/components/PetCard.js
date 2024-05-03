import React from "react";
import { View, Text, Image } from "react-native";
import Swiper from "react-native-deck-swiper";

//Creating a PetCard component for each pet in the pets array
//Defines information about each Pet
const PetCard = ({ pet }) => {
  return (
    <View className="m-1 border border-gray-300 p-2.5 rounded-lg bg-orange-200 shadow-md elevation-2">
      <Image 
        className="w-full mb-2.5 h-[500px] rounded-lg"
        source={{ uri: pet.photos[0]?.medium }} 
      />
      <Text className="font-bold italic text-lg text-red-400">{pet.name}</Text>
      <Text className="mt-1">Age: {pet.age}</Text>
      <Text className="mt-1">Gender: {pet.gender}</Text>
      <Text className="mt-1">Contact: {pet.contact.email}</Text>
      <Text className="mt-1">Zip Code: {pet.contact.address.postcode}</Text>
    </View>
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
        onSwipedLeft={(cardIndex) =>{
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
