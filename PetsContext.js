import React, { createContext, useContext, useState, useEffect } from 'react';

const PetsContext = createContext();

export const usePets = () => useContext(PetsContext); // Export the custom hook

//
export const PetsProvider = ({ children }) => {
  const [savedPets, setSavedPets] = useState([]);

  const savePetToBackend = async (pet) => {
    try {
      const response = await fetch("http://localhost:4000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      });
      if (!response.ok) {
        throw new Error("Failed to save pet in the backend");
      }
      console.log("Pet saved successfully in the backend");
    } catch (error) {
      console.error("Error saving pet in the backend:", error.message);
    }
  };

   // Function to handle saving a right-swiped pet
   const handleSavePet = async (pet) => {
    // Save to backend
    await savePetToBackend(pet);

    // Update local saved pets state
    setSavedPets((prevPets) => [...prevPets, pet]);
  };

  //fetch saved pets from backend
  const fetchSavedPets = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/pets/saved");
      if (!response.ok) {
        throw new Error("Failed to fetch saved pets from the backend");
    } 
    const fetchedPets = await response.json();
    setSavedPets(fetchedPets); // update local state with saved pets
    } catch (error) {
      console.error("Error fetching saved pets from the backend:", error.message);
    }
  };
  useEffect(() => {
    fetchSavedPets();
  }, []);

  return (
    <PetsContext.Provider value={{ savedPets, handleSavePet }}>
      {children}
    </PetsContext.Provider>
  );
};
