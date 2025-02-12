import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
  Platform
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
        {/* Pet Image Container */}
        <View style={styles.savedPetImageContainer}>
          <Image source={{ uri: photoUri }} style={styles.savedPetImage} />
  
          {/* Overlay with Pet Name */}
          <View style={styles.savedOverlayContainer}>
            <Text style={styles.savedPetName}>{item.name || "Unknown Name"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //function to send email via the saved pets card
  const sendEmail = () => {
    console.log("Selected Pet Data:", selectedPet); // Debugging: Log the entire pet object
  
    // Try different key names
    const email = selectedPet?.contact_email || selectedPet?.contact?.email;
  
    if (!email) {
      Alert.alert("Error", "No email address available for this pet.");
      return;
    }
  
    const subject = `Inquiry about ${selectedPet.name}`;
    const body = `Hello,\n\nI am interested in learning more about ${selectedPet.name}. Could you please provide more details?\n\nThank you!`;
  
    // Default mailto link
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    // Open Gmail if available
    const gmailURL = `googlegmail://co?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    Linking.canOpenURL(mailto)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailto); // Try opening default mail client first
        } else {
          return Linking.canOpenURL(gmailURL).then((gmailSupported) => {
            if (gmailSupported) {
              return Linking.openURL(gmailURL); // Open Gmail app
            } else {
              Alert.alert("Error", "No email client available. Please configure an email app.");
            }
          });
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
                style={styles.savedPetImageWrapper}
              >
                <Image
                  source={{ uri: selectedPet?.photo_urls?.[currentPhotoIndex] }}
                  style={styles.modalPetImage}
                />
              </TouchableOpacity>

              {/* Pet Info */}
              <View style={styles.savedPetInfoContainer}>
                <Text style={styles.innerSavedPetName}>{selectedPet.name}</Text>
                <Text style={styles.savedPetDetails}>
                  {selectedPet.age} • {selectedPet.gender}
                </Text>
                <Text style={styles.savedPetLocation}>
                  {selectedPet.contact?.address?.city || "Unknown City"},
                  {selectedPet.contact?.address?.state || "Unknown State"}
                  {selectedPet.contact?.address?.postcode || ""}
                </Text>
                <Text style={styles.savedPetEmail}>
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
