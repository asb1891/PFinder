import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useAuth from "../../hooks/useAuth";;
import { FIREBASE_AUTH } from "../../database/firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = FIREBASE_AUTH; //Get the auth object from the database;

const SearchSettings = () => {
  
  //set the search params to false
  const [searchParams, setSearchParams] = useState({
    Dog: false,
    Cat: false,
    Bird: false,
    Male: false,
    Female: false,
    Young: false,
    Adult: false,
    Baby: false,
    Mature: false,
  });

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
    let types = ["Dog", "Cat", "Bird"].filter((type) => searchParams[type]);
    let ageParam = searchParams.Young
      ? "Young"
      : searchParams.Adult
      ? "Adult"
      : searchParams.Baby
      ? "Baby"
      : searchParams.Mature
      ? "Mature"
      : "";
    let genderParam = searchParams.Male
      ? "Male"
      : searchParams.Female
      ? "Female"
      : "";
    let queryParams = `type=${types.join(",")}&gender=${genderParam}`;
    if (location) {
      queryParams += `&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&radius=${radius}`;
    }
    navigation.navigate("Home", { queryParams });
  };
  //
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
      Alert.alert('Logged out', 'You have been logged out successfully');
      navigation.navigate('LoginScreen'); // Navigate to the login screen upon successful logout
    } catch (error) {
      // console.error('Error logging out: ', error);
      Alert.alert('Error', 'Error logging out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      {/* Dogs */}
      <TouchableOpacity
        onPress={() => toggleSearchParam("Dog")}
        className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
      >
        <FontAwesome5 name="dog" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg"> Dog</Text>
        <View
          className={`w-5 h-5 rounded-full ${
            searchParams.Dog ? "bg-yellow-400" : "bg-transparent"
          } border border-yellow-400`}
        />
      </TouchableOpacity>
      {/* Cats */}
      <TouchableOpacity
        onPress={() => toggleSearchParam("Cat")}
        className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
      >
        <FontAwesome5 name="cat" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg"> Cat</Text>
        <View
          className={`w-5 h-5 rounded-full ${
            searchParams.Cat ? "bg-yellow-400" : "bg-transparent"
          } border border-yellow-400`}
        />
      </TouchableOpacity>
      {/* Birds */}
      <TouchableOpacity
        onPress={() => toggleSearchParam("Bird")}
        className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
      >
        <FontAwesome name="twitter" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg"> Bird</Text>
        <View
          className={`w-5 h-5 rounded-full ${
            searchParams.Bird ? "bg-yellow-400" : "bg-transparent"
          } border border-yellow-400`}
        />
      </TouchableOpacity>
      {/* Male */}
      <TouchableOpacity
        onPress={() => toggleSearchParam("Male")}
        className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
      >
        <Icon name="male" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg"> Male</Text>
        <View
          className={`w-5 h-5 rounded-full ${
            searchParams.Male ? "bg-yellow-400" : "bg-transparent"
          } border border-yellow-400`}
        />
      </TouchableOpacity>
      {/* Female */}
      <TouchableOpacity
        onPress={() => toggleSearchParam("Female")}
        className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow"
      >
        <Icon name="female" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg"> Female</Text>
        <View
          className={`w-5 h-5 rounded-full ${
            searchParams.Female ? "bg-yellow-400" : "bg-transparent"
          } border border-yellow-400`}
        />
      </TouchableOpacity>
      {/* Search Radius */}
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
    </View>
  );
};

export default SearchSettings;
