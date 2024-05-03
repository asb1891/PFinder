import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchSettings = () => {
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

  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState('25');
  const navigation = useNavigation();

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

  const handleSearch = () => {
    let types = ["Dog", "Cat", "Bird"].filter(type => searchParams[type]);
    let ageParam = searchParams.Young ? 'Young' : searchParams.Adult ? 'Adult' : searchParams.Baby ? 'Baby' : searchParams.Mature ? 'Mature' : '';
    let genderParam = searchParams.Male ? 'Male' : searchParams.Female ? 'Female' : '';
    let queryParams = `type=${types.join(",")}&gender=${genderParam}`;
    if (location) {
      queryParams += `&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&radius=${radius}`;
    }
    navigation.navigate("Home", { queryParams });
  };

  const toggleSearchParam = (param) => {
    setSearchParams(currentParams => ({
      ...currentParams,
      [param]: !currentParams[param],
    }));
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Dogs */}
      <TouchableOpacity onPress={() => toggleSearchParam('Dog')} className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow">
        <Icon name="paw" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg">Dog</Text>
        <View className={`w-5 h-5 rounded-full ${searchParams.Dog ? 'bg-yellow-400' : 'bg-transparent'} border border-yellow-400`}/>
      </TouchableOpacity>
      {/* Cats */}
      <TouchableOpacity onPress={() => toggleSearchParam('Cat')} className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow">
        <Icon name="paw" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg">Cat</Text>
        <View className={`w-5 h-5 rounded-full ${searchParams.Cat ? 'bg-yellow-400' : 'bg-transparent'} border border-yellow-400`}/>
      </TouchableOpacity>
      {/* Birds */}
      <TouchableOpacity onPress={() => toggleSearchParam('Bird')} className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow">
        <Icon name="paw" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg">Bird</Text>
        <View className={`w-5 h-5 rounded-full ${searchParams.Bird ? 'bg-yellow-400' : 'bg-transparent'} border border-yellow-400`}/>
      </TouchableOpacity>
      {/* Male */}
      <TouchableOpacity onPress={() => toggleSearchParam('Male')} className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow">
        <Icon name="male" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg">Male</Text>
        <View className={`w-5 h-5 rounded-full ${searchParams.Male ? 'bg-yellow-400' : 'bg-transparent'} border border-yellow-400`}/>
      </TouchableOpacity>
      {/* Female */}
      <TouchableOpacity onPress={() => toggleSearchParam('Female')} className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow">
        <Icon name="female" size={20} color="#4B5563" className="mr-2" />
        <Text className="flex-1 text-lg">Female</Text>
        <View className={`w-5 h-5 rounded-full ${searchParams.Female ? 'bg-yellow-400' : 'bg-transparent'} border border-yellow-400`}/>
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
      <TouchableOpacity onPress={handleSearch} className="bg-yellow-400 p-3 rounded-lg mt-6 items-center">
        <Text className="text-black text-lg">Update Search Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchSettings;

