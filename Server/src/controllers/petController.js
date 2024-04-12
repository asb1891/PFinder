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
        description: animal.description
    }));
}
//Controller function to handle requests for pet data
export const getPets = async (req, res) => {
    try {
        console.log('Bearer Token:', token);

        const page = req.query.page || 1;
        const limit = req.query.limit || 100;
        
        // Define default types or fetch all types if none are specified
        const defaultTypes = ['Dog', 'Cat', 'Bird']; // Example default types
        const types = req.query.type ? req.query.type.split(',') : defaultTypes;

        let allAnimals = [];

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
                size: req.query.size
            };

            const animals = await fetchAnimals(token, searchParams);
            allAnimals = allAnimals.concat(animals);
        }

        res.json(allAnimals);
    } catch (error) {
        console.error('Failed to fetch pet data:', error.response ? error.response.data : error);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};

export { fetchAnimals };
