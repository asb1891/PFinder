// defining the routes for the pets API
import express from 'express';
import { getPets } from '../controllers/petController.js';

const router = express.Router();
// Route for fetching pet data
router.get('/pets', getPets);

export default router;

