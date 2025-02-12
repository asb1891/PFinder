import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = 520;

export default StyleSheet.create({
  screenBackground: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  headerContainer: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15, // Add spacing between arrows and pet card
    marginTop: 10,
  },

  navButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },

  iconSpacing: {
    marginHorizontal: 8,
  },

  noPetsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noPetsText: {
    fontSize: 18,
    color: "#777",
  },

  cardWrapper: {
    padding: 10,
    alignItems: "center",
    marginTop: -85, // Moves pet card higher (reduce the gap)
    marginBottom: 10, // Keeps space between pet card and buttons
  },

  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    backgroundColor: "#faf9f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
    paddingBottom: 20,
  },

  petImageContainer: {
    width: "100%",
    height: CARD_HEIGHT * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },

  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  petInfoContainer: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },

  petName: {
    fontSize: 24,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    color: "#363636",
    marginBottom: 4,
  },

  petInfo: {
    fontSize: 16,
    fontFamily: "Times New Roman",
    color: "#666",
    textAlign: "center",
    marginBottom: 2,
  },

  petContact: {
    fontSize: 14,
    fontFamily: "Times New Roman",
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: 5,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#D9D9D9",
  },
  // Styles for SavedPets.js
  savedPetsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  savedPetsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  savedPetCard: {
    margin: 8,
    width: "46%",
    backgroundColor: "#faf9f6",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  savedPetImage: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  savedPetName: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageWrapper: {
    marginBottom: 15,
    alignItems: "center",
  },
  modalPetImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  petInfoContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  petName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  petDetails: {
    fontSize: 16,
    color: "#777",
  },
  petLocation: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  petEmail: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 15,
  },
  emailButton: {
    backgroundColor: "#F4C430",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  emailButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#808080",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: -98, // Moves buttons lower
    left: 30,
    right: 30,
    marginBottom: 5,
  },

  dismissButton: {
    backgroundColor: "#d9534f", // Red color for X button
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 40,
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: "#facc15", // Yellow color for Heart button
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 40,
    marginBottom: 20,
  },
  personalityTagsContainer: {
    flexDirection: "row",  // Display tags in a row
    flexWrap: "wrap",      // Allow wrapping to next line if needed
    justifyContent: "center",
    marginTop: 5,
    marginBottom: -30,
  },
  
  personalityTag: {
    backgroundColor: "#ffdead", // Soft yellow background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 6, // Space between tags
    marginBottom: 6,
    fontSize: 14,
    color: "#333", // Dark text
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 15,
  },


});