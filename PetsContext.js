import React, { createContext, useContext, useState, useEffect } from "react";

const PetsContext = createContext();

export const usePets = () => useContext(PetsContext); // Export the custom hook

//
export const PetsProvider = ({ children }) => {
  const [savedPets, setSavedPets] = useState([]);

  const savePetToBackend = async (pet) => {
    // Function to save a pet to the backend
    try {
      const response = await fetch("http://localhost:4000/api/pets/", {
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

      // Check if the pet is already in the savedPets state
      setSavedPets((prevPets) => {
        if (prevPets.some((p) => p.id === pet.id)) {
          return prevPets; // Don't add duplicates
        }
        return [...prevPets, pet]; // Add only if not a duplicate
      });
    } catch (error) {
      console.error("Error saving pet in the backend:", error.message);
    }
  };

  // Function to handle saving a right-swiped pet
  const handleSavePet = async (pet) => {
    if (!pet) return; // Prevent errors if pet is undefined
  
    setSavedPets((prevPets) => {
      if (prevPets.some((p) => p.id === pet.id)) {
        console.log("Duplicate detected, skipping save:", pet.id);
        return prevPets; // Skip adding duplicate
      }
      return [...prevPets, pet];
    });
  
    await savePetToBackend(pet);
  };

  // Fetch saved pets from backend
  const fetchSavedPets = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/pets/saved");
      if (!response.ok) {
        throw new Error("Failed to fetch saved pets from the backend");
      }
  
      const fetchedPets = await response.json();
  
      setSavedPets((prevPets) => {
        const uniquePetsMap = new Map();
  
        // Add all previous pets to the map
        prevPets.forEach((pet) => uniquePetsMap.set(pet.id, pet));
  
        // Add new fetched pets, automatically avoiding duplicates
        fetchedPets.forEach((pet) => uniquePetsMap.set(pet.id, pet));
  
        return Array.from(uniquePetsMap.values()); // Convert Map back to an array
      });
    } catch (error) {
      console.error("Error fetching saved pets from the backend:", error.message);
    }
  };
  

  // UseEffect to fetch saved pets on component mount
  useEffect(() => {
    fetchSavedPets(); //fetch saved pets on component mount
  }, []); // fetch saved pets every time the component re-renders (on state change)

  return (
    <PetsContext.Provider value={{ savedPets, handleSavePet }}>
      {children}
    </PetsContext.Provider>
  );
};
