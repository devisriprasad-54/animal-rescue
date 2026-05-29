import express from 'express';
import { 
  createRescueRequest, 
  getRescueRequests, 
  getRescueRequestById, 
  updateRescueRequest, 
  addRescueUpdate, 
  closeRescueRequest 
} from '../controllers/rescueController.js';
import { protectRoute, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getRescueRequests);

// Protected routes - any authenticated user can create
router.post('/', protectRoute, createRescueRequest);

// Specific routes (must come before /:id)
router.post('/:id/updates', protectRoute, addRescueUpdate);
router.put('/:id/close', protectRoute, closeRescueRequest);
router.put('/:id', protectRoute, authorize('ngo', 'admin'), updateRescueRequest);

// Get by ID - public
router.get('/:id', getRescueRequestById);

export default router;
