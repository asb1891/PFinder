import axios from 'axios';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

let petfinderToken = process.env.PETFINDER_TOKEN; // Initializing with the existing token from the .env file

// Function to refresh the token
export const refreshPetfinderToken = async () => {
    try {
        const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
            grant_type: 'client_credentials',
            client_id: process.env.PETFINDER_API_KEY,
            client_secret: process.env.PETFINDER_SECRET_KEY,
        });
        petfinderToken = response.data.access_token; // Updating the token in memory
        console.log('Token refreshed successfully:', petfinderToken);
        return petfinderToken; // Return the new token
    } catch (error) {
        console.error('Failed to refresh token:', error.response?.data || error.message);
        throw new Error('Could not refresh token');
    }
};

// Function to get the current token
export const getPetFinderToken = async () => {
    if (!petfinderToken) {
        await refreshPetfinderToken(); // If the token is expired, refresh it
    }
    return petfinderToken;
};

// Cron job to refresh the token every 50 minutes
cron.schedule('*/50 * * * *', async () => {
    console.log('Refreshing Petfinder Token...');
    try {
        await refreshPetfinderToken();
    } catch (error) {
        console.error('Error refreshing token in cron job:', error.message);
    }
});
