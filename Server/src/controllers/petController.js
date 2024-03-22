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
async function fetchAnimals(token, type) {
    const petResponse = await axios.get(`https://api.petfinder.com/v2/animals`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { type }
    });
    //return the animal data
    return petResponse.data.animals;
}
//Controller function to handle requests for pet data
export const getPets = async (req, res) => {
    try {
        console.log('Bearer Token:', token);
        const type = req.query.type || 'dog'; 
        const animals = await fetchAnimals(token, type);

        res.json(animals);
    } catch (error) {
        console.error('Failed to fetch pet data:', error.response ? error.response.data : error);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};
// export the token retrieval function and animal fetching functions for use elsewhere
export { fetchAnimals };
