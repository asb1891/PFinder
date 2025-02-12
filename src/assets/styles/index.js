import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

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
    marginBottom: 15,
    marginTop: 10,
  },

  navButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  navText: {
    fontSize: 14,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },

  iconSpacing: {
    marginHorizontal: 8,
    marginBottom: 5,
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
    marginTop: -90,
    marginBottom: 10  ,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 20,
    backgroundColor: "#faf9f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
    // height: 600,  // ✅ Ensures consistent card height
    overflow: "hidden",  // ✅ Prevents content from spilling over
    
  },
  
  // 🖼️ Make the pet image take the full height of the card
  petImageContainer: {
    width: "100%",
    height: "100%", // ✅ Full height of the card
    position: "absolute",
    top: 0,
    left: 0,
  },
  
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // ✅ Ensures the image covers the entire card
  },
  
  // 🔥 Overlay should sit ON the image, not outside
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(220, 180, 92, 0.6)", // ✅ Dark overlay
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  
  petName: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    color: "white",
    textAlign: "center",
  },

  
  petInfo: {
    fontSize: 18,
    fontFamily: "Times New Roman",
    color: "white",
    textAlign: "center",
    marginHorizontal: 5, // ✅ Adds space between elements in the row
    justifyContent: "center",
  },
  petInfoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // Adds spacing between elements
    marginTop: 5,
  },

  petContact: {
    fontSize: 16,
    fontFamily: "Times New Roman",
    color: "blue",
    textAlign: "center",
    marginTop: 5,
  },

  dotsContainer: {
    position: "absolute",
    top: 15, // ✅ Ensure it stays visible at the top
    left: "50%", // ✅ Center it horizontally
    transform: [{ translateX: -30 }], // ✅ Adjust for centering
    flexDirection: "row",
    alignSelf: "center",
    zIndex: 5, // ✅ Ensure it appears above the image
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#D9D9D9",
  },

  savedPetsTitle: {
    fontSize: 22,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  savedOverlayContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(220, 180, 92, 0.6)", // Match HomeScreen overlay (golden transparent)
    paddingVertical: 10,
    alignItems: "center",
  },

  savedPetsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  savedPetImageContainer: {
    width: "100%",
    aspectRatio: 1, // ✅ Ensures square images (1:1 aspect ratio)
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#e0e0e0", // ✅ Fallback background in case no image
  },
  

  savedPetImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // ✅ Ensures full image visibility without distortion
  },
  

  savedPetName: {
    fontSize: 16,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  innerSavedPetName: {
    fontSize: 18,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 5,
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

  petDetails: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },

  petLocation: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },

  petEmail: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 0,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // ✅ Ensures proper button spacing
    alignItems: "center",
    position: "absolute",
    bottom: -10,  // ✅ Adjust position so it's below the Swiper
    left: 0,
    right: 0,
    zIndex: 5,  // ✅ Ensures buttons are ABOVE the pet cards but NOT stacked with them
    paddingVertical: 10, // ✅ Adds spacing to prevent merging effect
  },

  dismissButton: {
    backgroundColor: "#d9534f",
    padding: 12, // ✅ Reduce padding slightly
    borderRadius: 50,
    width: 60, // ✅ Reduce width
    height: 60, // ✅ Reduce height
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    bottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  saveButton: {
    backgroundColor: "#facc15",
    padding: 12, // ✅ Reduce padding slightly
    borderRadius: 50,
    width: 60, // ✅ Reduce width
    height: 60, // ✅ Reduce height
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    bottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // ✅ Adjust shadow offset
    shadowOpacity: 0.1, // ✅ Adjust shadow opacity
    shadowRadius: 1, // ✅ Adjust shadow radius
  },
  

  personalityTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 5,
    maxWidth: "95%", // Prevents tags from overflowing
  },

  personalityTag: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
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
    backgroundColor: "rgba(245, 245, 245, 0.7)", // Light grayish-white (smokey)


    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  savedPetImageWrapper: {
    marginBottom: 15,
    alignItems: "center",
  },
  modalPetImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  savedPetInfoContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  savedPetDetails: {
    fontSize: 16,
    fontFamily: "Times New Roman",
    color: "red", 
    marginBottom: 5,
  },
  savedPetLocation: {
    fontSize: 14,
    fontFamily: "Times New Roman",
    color: "black",
    marginBottom: 10,
  },
  savedPetEmail: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 1,
  },
  emailButton: {
    backgroundColor: "#F4C430",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
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
  //Styles for dropdown container in SearchSettings.js
  dropdownContainer: {
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  searchRadiusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  searchRadiusText: {
    flex: 1,
    fontSize: 18,
  },
  
  searchRadiusInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // Gray-300
    padding: 8,
    borderRadius: 10,
    fontSize: 16,
  },
  
  updateSearchButton: {
    backgroundColor: "#FACC15", // Yellow-400
    padding: 12,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  
  updateSearchButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "semibold",
  },
  
  logoutButton: {
    backgroundColor: "#EF4444", // Red-500
    padding: 12,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
  },
  footer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
