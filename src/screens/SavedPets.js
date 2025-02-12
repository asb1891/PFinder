import React, { useState } from "react";
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
  Linking,
  Alert,
} from "react-native";
import { usePets } from "../../PetsContext";
import styles from "../assets/styles";

const debounce = (func, delay) => {
  let inDebounce; // This is the timer
  return function () {
    const context = this; // This is the context
    const args = arguments; // This is the arguments array
    clearImmediate(inDebounce); // Clear the timer
    inDebounce = setTimeout(() => func.apply(context, args), delay); // Set the timer
  };
};

// Define the SavedPets component
const SavedPets = () => {
  const { savedPets } = usePets(); // Get the saved pets from the context
  const [selectedPet, setSelectedPet] = useState(null); // Define the selected pet state
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Initialize the current photo index

  const handlePhotoChange = debounce(() => {
    if (!selectedPet?.photo_urls?.length) return; // Prevent error
    const nextIndex = (currentPhotoIndex + 1) % selectedPet.photo_urls.length;
    setCurrentPhotoIndex(nextIndex);
  }, 200);

  //Function to limit text in description to 2 sentences
  const truncateText = (text, sentenceCount) => {
    if (!text) return ""; // If there is no text, return an empty string
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g); // Split the text into an array of sentences
    if (!sentences) return text; // If there are no sentences, return the original text
    return sentences.slice(0, sentenceCount).join(" "); // Return the first sentenceCount sentences
  };
  // Rendering Pets photo
  const renderItem = ({ item }) => {
    const photoUri = item.photo_urls?.[0] || "https://via.placeholder.com/350";

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedPet(item);
          setCurrentPhotoIndex(0);
        }}
        style={styles.savedPetCard}
      >
        <Image source={{ uri: photoUri }} style={styles.savedPetImage} />
        <Text style={styles.savedPetName}>{item.name || "Unknown Name"}</Text>
      </TouchableOpacity>
    );
  };

  //function to send email via the saved pets card
  //linking to the default email client
  const sendEmail = () => {
    const email = selectedPet.contact_email; //get the email from the selected pet api
    const subject = `Inquiry about ${selectedPet.name}`; //get the subject of the email
    //custom email body
    const body = `Hello,\n\nI am interested in learning more about ${selectedPet.name}. Could you please provide more details?\n\nThank you!`;
    //create the email url
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    //check if the email client can be opened
    Linking.canOpenURL(mailto)
      .then((supported) => {
        //check if the email client can be opened
        if (!supported) {
          //if the email client can't be opened
          Alert.alert("Error", "Email client is not available");
        } else {
          return Linking.openURL(mailto); //if the email client can be opened, open the email client
        }
      })
      .catch((err) => console.error("Error opening email client", err));
  };

  return (
    <View style={styles.screenBackground}>
      <Text style={styles.savedPetsTitle}>Saved Pets</Text>
      <FlatList
        data={savedPets || []}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.savedPetsContainer}
      />

      {selectedPet && (
        <Modal
          visible={!!selectedPet}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedPet(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={handlePhotoChange}
                style={styles.imageWrapper}
              >
                <Image
                  source={{ uri: selectedPet?.photo_urls?.[currentPhotoIndex] }}
                  style={styles.modalPetImage}
                />
              </TouchableOpacity>

              {/* Pet Info */}
              <View style={styles.petInfoContainer}>
                <Text style={styles.petName}>{selectedPet.name}</Text>
                <Text style={styles.petDetails}>
                  {selectedPet.age} • {selectedPet.gender}
                </Text>
                <Text style={styles.petLocation}>
                  {selectedPet.contact?.address?.city || "Unknown City"},
                  {selectedPet.contact?.address?.state || "Unknown State"}
                  {selectedPet.contact?.address?.postcode || ""}
                </Text>
                <Text style={styles.petEmail}>
                  {selectedPet.contact?.email || "No email available"}
                </Text>
              </View>

              {/* Buttons */}
              <TouchableOpacity onPress={sendEmail} style={styles.emailButton}>
                <Text style={styles.emailButtonText}>Send Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPet(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SavedPets;
