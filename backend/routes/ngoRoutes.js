import express from 'express';
import { 
  getNGOs, 
  getNGOById, 
  updateNGOProfile 
} from '../controllers/ngoController.js';
import { protectRoute, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getNGOs);
router.get('/:id', getNGOById);

// Protected routes - NGO only
router.put('/profile', protectRoute, authorize('ngo'), updateNGOProfile);

export default router;
