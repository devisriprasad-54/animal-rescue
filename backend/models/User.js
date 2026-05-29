import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'volunteer', 'ngo', 'admin'], 
    default: 'user' 
  },
  // Volunteer specific fields
  skills: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  // NGO specific fields
  ngoName: { type: String },
  registrationNumber: { type: String },
  // General Fields
  phone: { type: String },
  address: { type: String },
  profileImage: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);