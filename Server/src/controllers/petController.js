import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const token = process.env.PETFINDER_TOKEN

async function fetchAnimals(token, searchParams) {
    const petResponse = await axios.get(`https://api.petfinder.com/v2/animals`, {
        headers: { Authorization: `Bearer ${token}` },
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
        console.log('Bearer Token:', token);

        // Parse page, limit, and radius from query parameters
        const page = req.query.page || 1;
        const limit = req.query.limit || 100;
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

            const animals = await fetchAnimals(token, searchParams); // Fetch the animals for the current type
            allAnimals = allAnimals.concat(animals); // Accumulate the results
        }

        res.json(allAnimals); // Return the animals as JSON
    } catch (error) {
        console.error('Failed to fetch pet data:', error.response ? error.response.data : error);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};

export { fetchAnimals };
