import dotenv from "dotenv";
import axios from "axios";
import { getPetFinderToken } from "../utils/tokenManager.js";
import {
  saveSwipedPet,
  getSavedPets,
} from "../../database/postgres/queries.js";
import db from "../../database/postgres/index.js";

dotenv.config();

async function fetchAnimals(searchParams) {
  const petfinderAccessToken = await getPetFinderToken(); //get the latest token
  const petResponse = await axios.get(`https://api.petfinder.com/v2/animals`, {
    headers: { Authorization: `Bearer ${petfinderAccessToken}` },
    params: searchParams,
  });

  // Filter out animals that have no photos
  const animalsWithPhotos = petResponse.data.animals.filter(
    (animal) => animal.photos.length > 0
  );

  // Map over the filtered animals to return only the necessary data
  return animalsWithPhotos.map((animal) => ({
    id: animal.id,
    type: animal.type,
    name: animal.name,
    species: animal.species,
    age: animal.age,
    gender: animal.gender,
    photos: animal.photos,
    contact: animal.contact,
    description: animal.description,
    tags: animal.tags,
  }));
}
//Controller function to handle requests for pet data
export const getPets = async (req, res) => {
  try {
    const token = await getPetFinderToken(); // Get the Petfinder token
    console.log("Bearer Token:", token);

    // Parse page, limit, and radius from query parameters
    const page = req.query.page || 1; // Default page number
    const limit = req.query.limit || 100; // Default limit
    const radius = req.query.radius || "25"; // Default radius in miles

    // Additional parameters for location-based search
    const latitude = req.query.latitude || 40.7128; // Default latitude
    console.log("Latitude:", latitude);
    const longitude = req.query.longitude || -74.006; // Default longitude
    console.log("Longitude:", longitude);

    // Validate latitude and longitude
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({
          message:
            "Latitude and longitude are required for location-based search.",
        });
    }

    // Define default types or fetch all types if none are specified
    const defaultTypes = ["Dog", "Cat", "Bird"]; // Example default types
    const types = req.query.type ? req.query.type.split(",") : defaultTypes; // Split the type parameter into an array

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
    console.error(
      "Failed to fetch pet data:",
      error.response ? error.response.data : error
    );
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
};

export const savePet = async (req, res) => {
  try {
    const pet = req.body;
    console.log("Received pet data:", pet);

    // Check if pet already exists
    const existingPet = await db.query("SELECT * FROM pets WHERE pet_id = $1", [pet.id]);
    if (existingPet.rows.length > 0) {
      console.log("Pet already exists in the database:", pet.id);
      return res.status(200).json({ message: "Pet already saved." });
    }

    // Prepare SQL Query
    const query = `
      INSERT INTO pets (
        pet_id, type, name, species, age, gender, description, status, tags,
        photo_urls, contact_email, contact_phone, contact_address1, contact_address2,
        contact_city, contact_state, contact_postcode, contact_country
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      )
      ON CONFLICT (pet_id) DO NOTHING;
    `;

    // 🛠 FIX for PostgreSQL array formatting
    const formattedPhotoUrls =
      pet.photo_urls && pet.photo_urls.length > 0
        ? `{${pet.photo_urls.map((url) => `"${url}"`).join(",")}}`
        : "{}"; // ✅ Convert empty arrays to PostgreSQL-compatible format

    const formattedTags =
      pet.tags && pet.tags.length > 0
        ? `{${pet.tags.map((tag) => `"${tag}"`).join(",")}}`
        : "{}"; // ✅ Convert empty arrays to PostgreSQL-compatible format

    const values = [
      pet.id,
      pet.type,
      pet.name,
      pet.species,
      pet.age,
      pet.gender,
      pet.description || null,
      pet.status || null,
      formattedTags, // ✅ Fix for tags
      formattedPhotoUrls, // ✅ Fix for photo_urls
      pet.contact?.email || null,
      pet.contact?.phone || null,
      pet.contact?.address?.address1 || null,
      pet.contact?.address?.address2 || null,
      pet.contact?.address?.city || null,
      pet.contact?.address?.state || null,
      pet.contact?.address?.postcode || null,
      pet.contact?.address?.country || null,
    ];

    await db.query(query, values);

    console.log("Pet saved successfully:", pet.id);
    res.status(201).json({ message: "Pet saved successfully." });
  } catch (error) {
    console.error("Error saving pet:", error.message);
    res.status(500).json({ error: "Failed to save pet." });
  }
};



// Retrieve saved pets from the database
export const getAllSavedPets = async (req, res) => {
  try {
    const savedPets = await getSavedPets(); // Fetch pets from PostgreSQL
    res.status(200).json(savedPets);
  } catch (error) {
    console.error("Error fetching saved pets:", error.message);
    res.status(500).json({ error: "Failed to fetch saved pets." });
  }
};

export { fetchAnimals };
