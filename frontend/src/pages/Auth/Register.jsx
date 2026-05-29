import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'user',
    phone: '',
    address: '',
    // NGO fields
    ngoName: '',
    registrationNumber: '',
    // Volunteer fields
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.register(formData);
      login(res.data);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <PawPrint className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Join the Network</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am joining as a:</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="user">Regular User (Report/Adopt)</option>
              <option value="volunteer">Volunteer (Field Rescuer)</option>
              <option value="ngo">NGO (Manage Cases/Animals)</option>
            </select>
          </div>

          {/* Basic Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address *</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password *</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg"
                placeholder="City, State"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          {/* NGO Specific Fields */}
          {formData.role === 'ngo' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">NGO Name *</label>
                <input
                  type="text"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2.5 border border-gray-300 rounded-lg mt-1"
                  placeholder="Your NGO name"
                  value={formData.ngoName}
                  onChange={(e) => setFormData({...formData, ngoName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Number *</label>
                <input
                  type="text"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2.5 border border-gray-300 rounded-lg mt-1"
                  placeholder="Your registration number"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                ✓ NGO verification will be completed within 24-48 hours
              </div>
            </>
          )}

          {/* Volunteer Specific Fields */}
          {formData.role === 'volunteer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Animal handling, First aid, Tracking"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Add
                </button>
              </div>
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-indigo-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-6"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;