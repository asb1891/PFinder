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
<View className="bg-white flex-1">
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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <TouchableOpacity onPress={handlePhotoChange} className="mb-4">
                <Image
                  source={{ uri: selectedPet.photos[currentPhotoIndex]?.large }}
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                {selectedPet.photos.map((_, idx) => (
                  <View
                    key={idx}
                    style={{
                      height: 10,
                      width: 10,
                      marginHorizontal: 5,
                      borderRadius: 5,
                      backgroundColor: idx === currentPhotoIndex ? "red" : "black",
                    }}
                  />
                ))}
              </View>
              <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 5 }}>{selectedPet.name}</Text>
              <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}>{selectedPet.age}</Text>
              <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}>{selectedPet.gender}</Text>
              <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}>{selectedPet.contact.email}</Text>
              <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 15 }}>
                Location: {selectedPet.contact.address.city}, {selectedPet.contact.address.state} {selectedPet.contact.address.postcode}
              </Text>
              <TouchableOpacity onPress={sendEmail} style={{ backgroundColor: "#facc15", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}>
                <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>Send Email</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedPet(null)} style={{ backgroundColor: "#d9534f", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default SavedPets;
