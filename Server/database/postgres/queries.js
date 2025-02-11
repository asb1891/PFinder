import db from "./index.js";

// Save a pet to the database (from a right swipe)
export const saveSwipedPet = async (pet) => {
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
  // Convert the pet object to an array of values
  const values = [
    pet.id,
    pet.type,
    pet.name,
    pet.species,
    pet.age,
    pet.gender,
    pet.description,
    pet.status || null,
    pet.tags || null,
    `{${pet.photos.map((photo) => `"${photo.full}"`).join(",")}}`, // Convert to proper PostgreSQL array format
    pet.contact.email || null,
    pet.contact.phone || null,
    pet.contact.address.address1 || null,
    pet.contact.address.address2 || null,
    pet.contact.address.city || null,
    pet.contact.address.state || null,
    pet.contact.address.postcode || null,
    pet.contact.address.country || null,
  ];
  
  await db.query(query, values);
};

// Retrieve all saved pets from the database
export const getSavedPets = async () => {
  const query = `
        SELECT * FROM pets
        ORDER BY created_at DESC;
    `;
  const result = await db.query(query); // Map the rows to objects and trim the photo URLs (if any)
  return result.rows.map((pet) => ({
    ...pet, 
    photo_urls: pet.photo_urls? pet.photo_urls.map((url) => url.trim()) : [], // Trim the URLs and convert to an array
  }))
};
