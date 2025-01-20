import db from './index.js';

// Save a pet to the database (from a right swipe)
export const saveSwipedPet = async (pet) => {
    const query = `
        INSERT INTO pets (
            id, type, name, species, age, gender, size, status, description, 
            photo_url, contact_email, contact_city, contact_state, contact_postcode
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO NOTHING; -- Avoid duplicate entries
    `;
    // Define the values for the query
    const values = [
        pet.id,
        pet.type,
        pet.name,
        pet.species,
        pet.age,
        pet.gender,
        pet.size,
        pet.status || null,
        pet.description || null,
        pet.photo_url || null,
        pet.contact_email || null,
        pet.contact_city || null,
        pet.contact_state || null,
        pet.contact_postcode || null,
    ];
    await db.query(query, values);
};

// Retrieve all saved pets from the database
export const getSavedPets = async () => {
    const query = `
        SELECT * FROM pets
        ORDER BY created_at DESC;
    `;
    const result = await db.query(query);
    return result.rows;
};

