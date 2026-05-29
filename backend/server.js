import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import rescueRoutes from './routes/rescueRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL || 'https://animal-rescue.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/animal-rescue')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI environment variable not set. Using local MongoDB fallback.');
    }
  });

// Basic Route Structure
app.get('/', (req, res) => {
  res.send('Animal Rescue API is running...');
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/rescues', rescueRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/ngos', ngoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));