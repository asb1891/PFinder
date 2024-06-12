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
  }, 200); // Call the function after 400ms

  //Function to limit text in description to 2 sentences
  const truncateText = (text, sentenceCount) => {
    if (!text) return ''; // If there is no text, return an empty string
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g); // Split the text into an array of sentences
    if (!sentences) return text; // If there are no sentences, return the original text
    return sentences.slice(0, sentenceCount).join(' '); // Return the first sentenceCount sentences
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedPet(item);
        setCurrentPhotoIndex(0);
      }}
      style={{
        margin: 8,
        width: "46%",
        backgroundColor: "#facc15",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: item.photos[0]?.medium }}
        style={{ width: "100%", height: 170 }}
      />
      <Text style={{ textAlign: "center", padding: 8, fontWeight: "bold" }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  //function to send email via the saved pets card
  //linking to the default email client
  const sendEmail = () => {
    const email = selectedPet.contact.email; //get the email from the selected pet api
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 18,
          marginVertical: 10,
        }}
      >
        Saved Pets
      </Text>
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
              <TouchableOpacity
                onPress={handlePhotoChange}
                style={{ marginBottom: 15 }}
              >
                <Image
                  source={{ uri: selectedPet.photos[currentPhotoIndex]?.large }}
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 10,
                    marginBottom: 10,
                    marginLeft: 5
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 15,
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
                      backgroundColor:
                        idx === currentPhotoIndex ? "red" : "black",
                    }}
                  />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 5,
                  fontFamily: "Arial"
                }}
              >
                {selectedPet.name}
              </Text>
              <Text
                style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}
              >
                {selectedPet.age}
              </Text>
              <Text
                style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}
              >
                {selectedPet.gender}
              </Text>
              <Text
                style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}
              >
                {selectedPet.contact.email}
              </Text>
              <Text
                style={{ fontSize: 14, textAlign: "center", marginBottom: 5 }}
              >
                Location: {selectedPet.contact.address.city},{" "}
                {selectedPet.contact.address.state}{" "}
                {selectedPet.contact.address.postcode}
              </Text>
              <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 5, marginTop: 5 }}>
                {truncateText(selectedPet.description, 1)}
              </Text>

              <TouchableOpacity
                onPress={sendEmail}
                style={{
                  backgroundColor: "#facc15",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Send Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPet(null)}
                style={{
                  backgroundColor: "#d9534f",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SavedPets;
