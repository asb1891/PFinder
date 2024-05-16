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
  Button
} from "react-native";
import { usePets } from "../../PetsContext";

const SavedPets = () => {
  const { savedPets } = usePets();
  const [selectedPet, setSelectedPet] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedPet(item)}>
      <Image
        source={{ uri: item.photos[0]?.medium }}
        className="m-1 w-48 h-64 rounded-lg shadow-lg"
      />
      <Text style={{ textAlign: 'center', marginTop: 1, fontSize: '14' }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Pets</Text>
      <FlatList
        data={savedPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
      {selectedPet && (
        <Modal
          visible={!!selectedPet} // If there is a selected pet, show the modal
          transparent={true} // Make the modal transparent
          animationType="slide" // Slide the modal in from the bottom
          onRequestClose={() => setSelectedPet(null)} // When the modal is closed, set the selected pet to null
        >
          <View style={styles.modalContainer}> 
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedPet.photos[0]?.large }}
                className="w-64 h-80 rounded-lg shadow-lg"
              />
              <Text style={styles.modalText}>{selectedPet.name}</Text>
              <Text style={styles.modalText}>{selectedPet.gender}</Text>
              <Text style={styles.modalText}>{selectedPet.age}</Text>
              <Text style={styles.modalText}>{selectedPet.contact.email}</Text>
              <Text style={styles.modalText}>{selectedPet.contact.address.city}, {selectedPet.contact.address.state} {selectedPet.contact.address.postcode}</Text>
              {/* <Text style={styles.modalText}>{selectedPet.description}</Text> */}
              <Button title="Close" onPress={() => setSelectedPet(null)} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textAlign: "center",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  modalText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});

export default SavedPets;
