import React, { useState } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';

const SearchSettings = ({ navigation }) => {
  const [searchParams, setSearchParams] = useState({
    dogs: false,
    cats: false,
    age: false,
    gender: false,
  });

  const handleSearch = async () => {
    try {
      const queryParams = Object.keys(searchParams)
        .filter((key) => searchParams[key])
        .map((key) => `${key}=true`)
        .join('&');
  
      // Here you would fetch data based on queryParams and pass it to the HomeScreen
      // But instead of fetching here, consider just passing the queryParams to HomeScreen
      navigation.navigate('Home', { queryParams }); // Pass queryParams as a parameter
    } catch (error) {
      console.error('Failed to fetch pet data:', error);
    }
  };
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
        value={searchParams.dogs}
        onToggle={() => toggleSearchParam('dogs')}
      />
      {/* Repeat for other animal types or attributes */}
      <CustomCheckbox
        label="Cats"
        value={searchParams.cats}
        onToggle={() => toggleSearchParam('cats')}
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
