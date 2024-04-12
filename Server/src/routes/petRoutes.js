// defining the routes for the pets API
import express from 'express';
import { getPets } from '../controllers/petController.js';

const router = express.Router(); // Create a new express router
// Route for fetching pet data
router.get('/pets', getPets);

export default router;

