// defining the routes for the pets API
import express from "express";
import {
  getPets,
  savePet,
  getAllSavedPets,
} from "../controllers/petController.js";

// const { signupUser } = require('../controllers/petController.js');

const router = express.Router(); // Create a new express router
// Route for fetching pet data
router.get("/pets", getPets);

//router for saving a right swiped pet
router.post("/pets", savePet);

// Route for fetching saved pets
router.get("/pets/saved", getAllSavedPets);

export default router;
