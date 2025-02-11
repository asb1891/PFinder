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
  },

  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
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
});
