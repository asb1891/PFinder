import React, { useState } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchSettings = () => {
  const [searchParams, setSearchParams] = useState({
    Dog: false,
    Cat: false,
    age: false,
    gender: false,
  }); // Create an object to hold the searchParams

const navigation = useNavigation(); // Pass the navigation function to the useNavigation hook

//Search function to update the searchParams
const handleSearch = async () => {
    // Create query params based on searchParams
    const queryParams = Object.entries(searchParams)
      .filter(([key, value]) => value) // Filter out empty values
      .map(([key]) => `type=${key}`) // Map the key to the value
      .join('&'); // Join the values

    // Pass the queryParams to the HomeScreen via navigation
    navigation.navigate('Home', { queryParams });
  };
  // Update the searchParams when a checkbox is toggled
  const toggleSearchParam = (param) => {
    setSearchParams((currentParams) => ({
      ...currentParams,
      [param]: !currentParams[param],
    }));
  };

  // Helper component for a custom checkbox
  const CustomCheckbox = ({ value, onToggle, label }) => (
    <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
      <View style={[styles.checkboxBox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkboxCheckmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomCheckbox
        label="Dogs"
        value={searchParams.Dog}
        onToggle={() => toggleSearchParam('Dog')}
      />
      {/* Repeat for other animal types or attributes */}
      <CustomCheckbox
        label="Cats"
        value={searchParams.Cat}
        onToggle={() => toggleSearchParam('Cat')}
      />
      {/* ... other checkboxes */}
      {/* Submit button */}
      <Button title="Update Search Filter" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkbox: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxBox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  checkboxCheckmark: {
    color: '#fff',
  },
  label: {
    marginLeft: 8,
  },
});

export default SearchSettings;
