import React, {useState} from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal, 
  StyleSheet,
  Button,
  Linking
} from "react-native";
import { usePets } from "../../PetsContext";

const debounce = (func, delay) => {
  let inDebounce; // This is the timer
  return function () {
    const context = this; // This is the context
    const args = arguments; // This is the arguments array
    clearImmediate(inDebounce); // Clear the timer
    inDebounce = setTimeout(() => func.apply(context, args), delay); // Set the timer
  };
};

const SavedPets = () => {
  const { savedPets } = usePets();
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePhotoChange = debounce(() => {
    const nextIndex = (currentPhotoIndex + 1) % selectedPet.photos.length; // loop back to 0 if at the end of the array
    setCurrentPhotoIndex(nextIndex); // Update the current photo index
  }, 100); // Call the function after 400ms

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedPet(item); setCurrentPhotoIndex(0)}}>
      <Image
        source={{ uri: item.photos[0]?.medium }}
        className="m-1 w-48 h-64 rounded-lg shadow-lg"
      />
      <Text style={{ textAlign: 'center', marginTop: 1 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const sendEmail = () => {
    const email = selectedPet.contact.email;
    const subject = `Inquiry about ${selectedPet.name}`;
    const body = `Hello,\n\nI am interested in learning more about ${selectedPet.name}. Could you please provide more details?\n\nThank you!`;

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.canOpenURL(mailto)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Email client is not available');
        } else {
          return Linking.openURL(mailto);
        }
      })
      .catch((err) => console.error('Error opening email client', err));
  };

  return (
<ScrollView className="bg-white">
      <Text className="text-center font-semibold text-lg my-2">Saved Pets</Text>
      <FlatList
        data={savedPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
      {selectedPet && (
        <Modal
          visible={!!selectedPet}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedPet(null)}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="w-72 p-5 bg-white rounded-lg items-center border border-gray-200 shadow-lg">
              <TouchableOpacity onPress={handlePhotoChange} className="h-72 mb-4">
                <Image
                  source={{ uri: selectedPet.photos[currentPhotoIndex]?.large }}
                  className="w-64 h-64 rounded-lg"
                />
              </TouchableOpacity>
              <View className="flex-row justify-center mt-2 mb-4">
                {selectedPet.photos.map((_, idx) => (
                  <View
                    key={idx}
                    className={`h-2 w-2 mx-1 rounded-full ${idx === currentPhotoIndex ? 'bg-red-400' : 'bg-black'}`}
                  />
                ))}
              </View>
              <Text className="text-center text-lg mt-2">{selectedPet.name}</Text>
              <Text className="text-center text-sm">{selectedPet.age}</Text>
              <Text className="text-center text-sm">{selectedPet.gender}</Text>
              <Text className="text-center text-sm">{selectedPet.contact.email}</Text>
              <Text className="text-center text-sm">
                Location: {selectedPet.contact.address.city}, {selectedPet.contact.address.state} {selectedPet.contact.address.postcode}
              </Text>
              <TouchableOpacity onPress={sendEmail} className="mt-5 bg-yellow-400 py-2 px-5 rounded">
                <Text className="text-white text-lg">Send Email</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedPet(null)} className="mt-5 bg-red-500 py-2 px-5 rounded">
                <Text className="text-white text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

export default SavedPets;
