import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useAuth from "../../hooks/useAuth";
import { FIREBASE_AUTH } from "../../database/firebase";
import { getAuth, signOut } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../assets/styles";

const auth = FIREBASE_AUTH; //Get the auth object from the database;

const SearchSettings = () => {
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [speciesItems, setSpeciesItems] = useState([
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
    { label: "Bird", value: "Bird" },
    { label: "Rabbit", value: "Rabbit" },
    { label: "Horse", value: "Horse" },
    { label: "Reptile", value: "Reptile" },
    { label: "Small & Furry", value: "Small & Furry" },
    { label: "Barnyard", value: "Barnyard" },
  ]);

  const [ageOpen, setAgeOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [ageItems, setAgeItems] = useState([
    { label: "Baby", value: "Baby" },
    { label: "Young", value: "Young" },
    { label: "Adult", value: "Adult" },
    { label: "Senior", value: "Senior" },
  ]);

  const [genderOpen, setGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  const [location, setLocation] = useState(null); //Location state
  const [radius, setRadius] = useState("25"); //default radius
  const navigation = useNavigation(); //navigation hook
  const { logout } = useAuth(); //Pass the logout function to the useAuth hook
  const [loading, setLoading] = useState(false); //Loading indicator

  //Get the current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  //Function to handle the search
  const handleSearch = () => {
    let queryParams = [];
  
    // Ensure selected values are at least empty arrays to prevent null reference errors
    const safeSelectedSpecies = selectedSpecies || [];
    const safeSelectedAge = selectedAge || [];
    const safeSelectedGender = selectedGender || [];
  
    if (safeSelectedSpecies.length > 0)
      queryParams.push(`type=${safeSelectedSpecies.join(",")}`);
    if (safeSelectedAge.length > 0)
      queryParams.push(`age=${safeSelectedAge.join(",")}`);
    if (safeSelectedGender.length > 0)
      queryParams.push(`gender=${safeSelectedGender.join(",")}`);
  
    if (location) {
      queryParams.push(
        `latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&radius=${radius}`
      );
    }
  
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  
    navigation.navigate("Home", { queryParams: queryString });
  };

  const toggleSearchParam = (param) => {
    setSearchParams((currentParams) => ({
      ...currentParams,
      [param]: !currentParams[param],
    }));
  };
  //function to handle logging out the user
  const handleLogout = async () => {
    const auth = FIREBASE_AUTH; // Get the auth object from the database
    setLoading(true);
    try {
      await signOut(auth); // Sign out the user
      Alert.alert("Logged out", "You have been logged out successfully");
      navigation.navigate("LoginScreen"); // Navigate to the login screen upon successful logout
    } catch (error) {
      // console.error('Error logging out: ', error);
      Alert.alert("Error", "Error logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Select Preferences</Text>

      {/* Species Dropdown */}
      <View style={[styles.dropdownContainer, { zIndex: 3000 }]}>
        <DropDownPicker
          open={speciesOpen}
          value={selectedSpecies}
          items={speciesItems}
          setOpen={setSpeciesOpen}
          setValue={setSelectedSpecies}
          setItems={setSpeciesItems}
          placeholder="Select species"
          multiple={true} // Enable multi-selection
          mode="BADGE" // Shows selected options in a badge
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>

      {/* Age Dropdown */}
      <View style={[styles.dropdownContainer, { zIndex: 2000 }]}>
        <DropDownPicker
          open={ageOpen}
          value={selectedAge}
          items={ageItems}
          setOpen={setAgeOpen}
          setValue={setSelectedAge}
          setItems={setAgeItems}
          placeholder="Select age"
          multiple={true}
          mode="BADGE"
          zIndex={2000}
          zIndexInverse={2000}
        />
      </View>

      {/* Gender Dropdown */}
      <View style={[styles.dropdownContainer, { zIndex: 1000 }]}>
        <DropDownPicker
          open={genderOpen}
          value={selectedGender}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setSelectedGender}
          setItems={setGenderItems}
          placeholder="Select gender"
          multiple={true}
          mode="BADGE"
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>
      <View style={styles.searchRadiusContainer}>
  <Text style={styles.searchRadiusText}>Search Radius (miles):</Text>
  <TextInput
    style={styles.searchRadiusInput}
    value={radius}
    onChangeText={setRadius}
    keyboardType="numeric"
  />
</View>

<TouchableOpacity onPress={handleSearch} style={styles.updateSearchButton}>
  <Text style={styles.updateSearchButtonText}>Update Search Filter</Text>
</TouchableOpacity>

<View>
  <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
    <Text style={styles.logoutButtonText}>Logout</Text>
  </TouchableOpacity>
  <View style={styles.footer}>
    <Icon name="paw" size={100} color="#FACC15" />
  </View>
</View>
    </KeyboardAvoidingView>
  );
};

export default SearchSettings;
