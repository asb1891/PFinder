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
      <View className="flex-row items-center p-3 mt-4 bg-white rounded-lg shadow">
        <Text className="flex-1 text-lg">Search Radius (miles):</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded-lg"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        onPress={handleSearch}
        className="bg-yellow-400 p-3 rounded-lg mt-6 items-center"
      >
        <Text className="text-black text-lg">Update Search Filter</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-3 rounded-lg mt-6 items-center"
        >
          <Text className="text-white text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchSettings;
//   return (
//     <View className="flex-1 bg-white p-5">
//       {/* Dogs */}
//       <TouchableOpacity
//         onPress={() => toggleSearchParam("Dog")}
//         className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
//       >
//         <FontAwesome5 name="dog" size={20} color="#4B5563" className="mr-2" />
//         <Text className="flex-1 text-lg"> Dog</Text>
//         <View
//           className={`w-5 h-5 rounded-full ${
//             searchParams.Dog ? "bg-yellow-400" : "bg-transparent"
//           } border border-yellow-400`}
//         />
//       </TouchableOpacity>
//       {/* Cats */}
//       <TouchableOpacity
//         onPress={() => toggleSearchParam("Cat")}
//         className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
//       >
//         <FontAwesome5 name="cat" size={20} color="#4B5563" className="mr-2" />
//         <Text className="flex-1 text-lg"> Cat</Text>
//         <View
//           className={`w-5 h-5 rounded-full ${
//             searchParams.Cat ? "bg-yellow-400" : "bg-transparent"
//           } border border-yellow-400`}
//         />
//       </TouchableOpacity>
//       {/* Birds */}
//       <TouchableOpacity
//         onPress={() => toggleSearchParam("Bird")}
//         className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
//       >
//         <FontAwesome
//           name="twitter"
//           size={20}
//           color="#4B5563"
//           className="mr-2"
//         />
//         <Text className="flex-1 text-lg"> Bird</Text>
//         <View
//           className={`w-5 h-5 rounded-full ${
//             searchParams.Bird ? "bg-yellow-400" : "bg-transparent"
//           } border border-yellow-400`}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => toggleSearchParam("Rabbit")}
//         className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
//       >
//         <FontAwesome5 name="paw" size={20} color="#4B5563" className="mr-2" />
//         <Text className="flex-1 text-lg"> Rabbit</Text>
//         <View
//           className={`w-5 h-5 rounded-full ${
//             searchParams.Rabbit ? "bg-yellow-400" : "bg-transparent"
//           } border border-yellow-400`}
//         />
//       </TouchableOpacity>
//       {/* Male */}
//       <TouchableOpacity
//         onPress={() => toggleSearchParam("Male")}
//         className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
//       >
//         <Icon name="male" size={20} color="#4B5563" className="mr-2" />
//         <Text className="flex-1 text-lg"> Male</Text>
//         <View
//           className={`w-5 h-5 rounded-full ${
//             searchParams.Male ? "bg-yellow-400" : "bg-transparent"
//           } border border-yellow-400`}
//         />
//       </TouchableOpacity>
//       {/* Female */}
//       <TouchableOpacity
//         onPress={() => toggleSearchParam("Female")}
//         className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
//       >
//         <Icon name="female" size={20} color="#4B5563" className="mr-2" />
//         <Text className="flex-1 text-lg"> Female</Text>
//         <View
//           className={`w-5 h-5 rounded-full ${
//             searchParams.Female ? "bg-yellow-400" : "bg-transparent"
//           } border border-yellow-400`}
//         />
//       </TouchableOpacity>
//       {/* Search Radius */}
// <View className="flex-row items-center p-3 mt-4 bg-white rounded-lg shadow">
//   <Text className="flex-1 text-lg">Search Radius (miles):</Text>
//   <TextInput
//     className="border border-gray-300 p-2 rounded-lg"
//     value={radius}
//     onChangeText={setRadius}
//     keyboardType="numeric"
//   />
// </View>
// <TouchableOpacity
//   onPress={handleSearch}
//   className="bg-yellow-400 p-3 rounded-lg mt-6 items-center"
// >
//   <Text className="text-black text-lg">Update Search Filter</Text>
// </TouchableOpacity>
// <View>
//   <TouchableOpacity
//     onPress={handleLogout}
//     className="bg-red-500 p-3 rounded-lg mt-6 items-center"
//   >
//     <Text className="text-white text-lg">Logout</Text>
//   </TouchableOpacity>
// </View>
//     </View>
//   );
// };

// export default SearchSettings;
