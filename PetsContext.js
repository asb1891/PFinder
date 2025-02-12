import React, { createContext, useContext, useState, useEffect } from "react";

const PetsContext = createContext();

export const usePets = () => useContext(PetsContext); // Export the custom hook

//
export const PetsProvider = ({ children }) => {
  const [savedPets, setSavedPets] = useState([]);

  const savePetToBackend = async (pet) => {
    try {
      const localIP = "192.168.1.92"; // Your actual local IP
      const response = await fetch(`http://${localIP}:4000/api/pets/`, {
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
  
      setSavedPets((prevPets) => {
        if (prevPets.some((p) => p.id === pet.id)) {
          return prevPets; // Prevent duplicates
        }
        return [...prevPets, pet];
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
      const localIP = "192.168.1.92"; // Use local IP instead of localhost
      const response = await fetch(`http://${localIP}:4000/api/pets/saved`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch saved pets from the backend");
      }
  
      const fetchedPets = await response.json();
  
      setSavedPets((prevPets) => {
        const uniquePetsMap = new Map();
  
        prevPets.forEach((pet) => uniquePetsMap.set(pet.id, pet));
        fetchedPets.forEach((pet) => uniquePetsMap.set(pet.id, pet));
  
        return Array.from(uniquePetsMap.values());
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
