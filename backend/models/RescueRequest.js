import mongoose from 'mongoose';

const rescueRequestSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  animalType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  emergencyLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'], 
    required: true 
  },
  images: [{ type: String }], // Cloudinary URLs
  status: { 
    type: String, 
    enum: ['pending', 'assigned', 'resolved', 'closed'], 
    default: 'pending' 
  },
  assignedNGO: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updates: [{
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('RescueRequest', rescueRequestSchema);