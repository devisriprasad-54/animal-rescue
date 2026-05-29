import express from 'express';
import { 
  getVolunteers, 
  getVolunteerById, 
  updateVolunteerProfile, 
  getVolunteerDashboard, 
  assignRescueToVolunteer 
} from '../controllers/volunteerController.js';
import { protectRoute, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protected route - must come before /:id
router.get('/dashboard', protectRoute, authorize('volunteer'), getVolunteerDashboard);

// Public routes
router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);

// Protected routes - volunteers only
router.put('/profile', protectRoute, authorize('volunteer'), updateVolunteerProfile);

// Admin can assign rescues
router.post('/:rescueId/assign', protectRoute, authorize('ngo', 'admin'), assignRescueToVolunteer);

export default router;
