import React, { useState } from 'react';
import { View, CheckBox, Button, Text, StyleSheet } from'react-native';

const SearchSettings = ({navigation}) => {
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
            .join('');

            const response = await fetch(`https://localhost:4000/api/search?types=${queryParams}`);
            const data = await response.json();
            navigation.navigate('HomeScreen', {data});
        } catch (error) {
            console.error(
                'Failed to fetch pet data:',
                error.response? error.response.data : error
            )};

            return (
                <View style={styles.container}>
                    
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={searchParams.dogs}
                            onValueChange={() => setSearchParams({ ...searchParams, dogs: !searchParams.dogs })}
                        />
                        <Text style={styles.label}>Dogs</Text>
                    </View>
                    {/* Repeat for other animal types or attributes */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={searchParams.cats}
                            onValueChange={() => setSearchParams({ ...searchParams, cats: !searchParams.cats })}
                        />
                        <Text style={styles.label}>Cats</Text>
                    </View>
                    {/* Submit button */}
                    <Button title="Search" onPress={handleSearch} />
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
            checkboxContainer: {
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
            },
            label: {
                marginLeft: 8,
            },
        });
    };
export default SearchSettings;