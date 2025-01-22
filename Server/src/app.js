import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import petRoutes from './routes/petRoutes.js';
import 'module-alias/register.js';
import cors from 'cors';





const app = express();
// Enable CORS
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

app.use('/api', petRoutes); // Use the petRoutes for all routes starting with /api

const PORT = process.env.PORT || 4000; // Set the port to 4000 by default

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

