import dotenv from 'dotenv';
import axios from 'axios';
// const { createUser } = require('../../database/postgres/queries');
import { getPetFinderToken } from '../utils/tokenManager.js';
import { saveSwipedPet, getSavedPets } from '../databae/postgres/queries.js';

dotenv.config();

// const token = process.env.PETFINDER_TOKEN



async function fetchAnimals(searchParams) {
    const petfinderAccessToken = await getPetFinderToken(); //get the latest token
    const petResponse = await axios.get(`https://api.petfinder.com/v2/animals`, {
        headers: { Authorization: `Bearer ${petfinderAccessToken}` },
        params: searchParams
    });

    // Filter out animals that have no photos
    const animalsWithPhotos = petResponse.data.animals.filter(animal => animal.photos.length > 0);

    // Map over the filtered animals to return only the necessary data
    return animalsWithPhotos.map(animal => ({
        id: animal.id,
        type: animal.type,
        name: animal.name,
        species: animal.species,
        age: animal.age,
        gender: animal.gender,
        photos: animal.photos,
        contact: animal.contact,
        description: animal.description,
        tags: animal.tags
    }));
}
//Controller function to handle requests for pet data
export const getPets = async (req, res) => {
    try {
        const token = await getPetFinderToken(); // Get the Petfinder token
        console.log('Bearer Token:', token);

        // Parse page, limit, and radius from query parameters
        const page = req.query.page || 1; // Default page number
        const limit = req.query.limit || 100; // Default limit
        const radius = req.query.radius || '25'; // Default radius in miles
        
        // Additional parameters for location-based search
        const latitude = req.query.latitude || 40.7128; // Default latitude
        console.log('Latitude:', latitude);
        const longitude = req.query.longitude || -74.0060; // Default longitude
        console.log('Longitude:', longitude);

        // Validate latitude and longitude
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required for location-based search.' });
        }

        // Define default types or fetch all types if none are specified
        const defaultTypes = ['Dog', 'Cat', 'Bird']; // Example default types
        const types = req.query.type ? req.query.type.split(',') : defaultTypes; // Split the type parameter into an array

        let allAnimals = []; // Initialize an array to hold all the animals

        // Fetch animals for each type and accumulate results
        for (let type of types) {

            let searchParams = {
                page: page,
                limit: limit,
                type: type, // Pass single type here
                name: req.query.name,
                age: req.query.age,
                gender: req.query.gender,
                breed: req.query.breed,
                size: req.query.size,
                tags: req.query.tags,
                species: req.query.species,
                status: req.query.status,
                color: req.query.color,
                size: req.query.size,
                distance: radius,
                location: `${latitude},${longitude}`, // Pass the latitude and longitude as a single string
            };

            const animals = await fetchAnimals(searchParams); // Fetch the animals for the current type
            allAnimals = allAnimals.concat(animals); // Accumulate the results
        }

        res.json(allAnimals); // Return the animals as JSON
    } catch (error) {
        console.error('Failed to fetch pet data:', error.response ? error.response.data : error);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};

// Save a right-swiped pet to the database
export const savePet = async (req, res) => {
    try {
        const pet = req.body; // Pet data sent from the frontend
        await saveSwipedPet(pet); // Save the pet in PostgreSQL

        res.status(201).json({ message: 'Pet saved successfully.' });
    } catch (error) {
        console.error('Error saving pet:', error.message);
        res.status(500).json({ error: 'Failed to save pet.' });
    }
};

// Retrieve saved pets from the database
export const getAllSavedPets = async (req, res) => {
    try {
        const savedPets = await getSavedPets(); // Fetch pets from PostgreSQL
        res.status(200).json(savedPets);
    } catch (error) {
        console.error('Error fetching saved pets:', error.message);
        res.status(500).json({ error: 'Failed to fetch saved pets.' });
    }
};

export { fetchAnimals };
