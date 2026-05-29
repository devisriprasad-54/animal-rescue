import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number }, // approximate age in months/years
  healthStatus: { type: String },
  rescueStory: { type: String },
  images: [{ type: String }], // Cloudinary URLs
  isAdopted: { type: Boolean, default: false },
  managingNGO: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Animal', animalSchema);