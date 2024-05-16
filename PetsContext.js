import React, { createContext, useContext, useState } from 'react';

const PetsContext = createContext();

export const usePets = () => useContext(PetsContext);

export const PetsProvider = ({ children }) => {
  const [savedPets, setSavedPets] = useState([]);

  const handleSavePet = (pet) => {
    setSavedPets((prevPets) => [...prevPets, pet]);
  };

  return (
    <PetsContext.Provider value={{ savedPets, handleSavePet }}>
      {children}
    </PetsContext.Provider>
  );
};
