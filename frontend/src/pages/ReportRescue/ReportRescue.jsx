import React, { useState } from 'react';
import { AlertCircle, Upload, MapPin, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { rescueAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ReportRescue = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    animalType: '',
    location: '',
    description: '',
    emergencyLevel: 'medium',
    images: []
  });

  const emergencyLevels = [
    { value: 'low', label: 'Low - Not urgent', color: 'bg-blue-100 text-blue-700' },
    { value: 'medium', label: 'Medium - Needs help soon', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high', label: 'High - Needs immediate help', color: 'bg-orange-100 text-orange-700' },
    { value: 'critical', label: 'Critical - Life threatening', color: 'bg-red-100 text-red-700' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in first');
      navigate('/login');
      return;
    }

    if (!formData.animalType || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await rescueAPI.create(formData);
      toast.success('Rescue request submitted! Volunteers will be notified.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rescue request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Report Emergency</h1>
          </div>
          <p className="text-lg text-gray-600">
            Help us save a life. Report an animal in need of rescue and our network of volunteers will respond quickly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Animal Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Animal Type *
              </label>
              <input
                type="text"
                name="animalType"
                placeholder="e.g., Dog, Cat, Bird, etc."
                value={formData.animalType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                placeholder="Street address, landmark, or area"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 inline mr-2" />
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe the animal's condition, what happened, any injuries, etc."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Emergency Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Emergency Level *
              </label>
              <select
                name="emergencyLevel"
                value={formData.emergencyLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {emergencyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <div className="mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  emergencyLevels.find(l => l.value === formData.emergencyLevel)?.color
                }`}>
                  {emergencyLevels.find(l => l.value === formData.emergencyLevel)?.label}
                </span>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Upload className="w-4 h-4 inline mr-2" />
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageInput"
                />
                <label htmlFor="imageInput" className="cursor-pointer">
                  <div className="text-gray-600">
                    <p className="text-sm font-medium mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Reporting...' : 'Report Emergency'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportRescue;
