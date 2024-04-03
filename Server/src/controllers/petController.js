import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();



//Async function to fetch the PetFinder API token
// async function getPetFinderToken() {
//     try {
//         //Set up the parameters for the POST request to the PetFinder API
//         const params = new URLSearchParams();
//         params.append('grant_type', 'client_credentials');
//         params.append('client_id', process.env.PETFINDER_API_KEY);
//         params.append('client_secret', process.env.PETFINDER_SECRET_KEY);
//         // Make the POST request to the PetFinder API
//         const tokenResponse = await axios.post('https://api.petfinder.com/oauth2/token', params.toString(), {
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         });

//         console.log('Token Response:', tokenResponse.data);

//         return tokenResponse.data.access_token;
//     } catch (error) {
//         console.error('Error fetching token:', error.response ? error.response.data : error.message);
//         return null;
//     }
// }

const token = process.env.PETFINDER_TOKEN
//Async function to handle the requests for the pet data
// async function fetchAnimals(token, type) {
//     const petResponse = await axios.get(`https://api.petfinder.com/v2/animals`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { type }
//     });
//     //return the animal data
//     return petResponse.data.animals;
// }

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
        let searchParams = {};
        if (req.query.type) {
            searchParams.type =  req.query.type;
        }
        if (req.query.name) {
            searchParams.name = req.query.name;
        }
        if (req.query.age) {
            searchParams.age = req.query.age;
        }
        if (req.query.gender) {
            searchParams.gender = req.query.gender;
        }
        if (req.query.breed) {
            searchParams.breed = req.query.breed;
        }
        if (req.query.size) {
            searchParams.size = req.query.size;
        }
        if (req.query.type) {
            searchParams.type = req.query.type;
        }
        const animals = await fetchAnimals(token, searchParams);

        res.json(animals);
    } catch (error) {
        console.error('Failed to fetch pet data:', error.response ? error.response.data : error);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};
// export the token retrieval function and animal fetching functions for use elsewhere
export { fetchAnimals };
