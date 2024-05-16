import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { usePets } from "../../PetsContext";

const SavedPets = () => {
  const { savedPets } = usePets();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("Pet selected", item.name)}>
      <Image
        source={{ uri: item.photos[0]?.medium }}
        className="w-48 h-48 rounded-lg shadow-lg"
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-white">
      <Text className="text-center font-semibold">Saved Pets</Text>
      <FlatList
        data={savedPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default SavedPets;
