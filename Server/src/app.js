import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import petRoutes from './routes/petRoutes.js';


const app = express();

app.use('/api', petRoutes); // Use your routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

