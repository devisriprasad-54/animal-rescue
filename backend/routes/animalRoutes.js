import express from 'express';
import { 
  createAnimal, 
  getAnimals, 
  getAnimalById, 
  updateAnimal, 
  deleteAnimal, 
  adoptAnimal 
} from '../controllers/animalController.js';
import { protectRoute, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAnimals);

// Protected routes - NGO only (must come before /:id)
router.post('/', protectRoute, authorize('ngo', 'admin'), createAnimal);

// Specific routes before generic /:id
router.put('/:id/adopt', protectRoute, adoptAnimal);

// Generic ID routes
router.get('/:id', getAnimalById);

// Update and delete - NGO only
router.put('/:id', protectRoute, authorize('ngo', 'admin'), updateAnimal);
router.delete('/:id', protectRoute, authorize('ngo', 'admin'), deleteAnimal);

export default router;
