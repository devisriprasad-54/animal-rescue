import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Stethoscope, Award, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { animalAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adopting, setAdopting] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await animalAPI.getById(id);
        setAnimal(res.data);
      } catch (error) {
        toast.error('Failed to load animal details');
        navigate('/adopt');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id, navigate]);

  const handleAdopt = async () => {
    if (!user) {
      toast.error('Please log in first');
      navigate('/login');
      return;
    }

    setAdopting(true);
    try {
      await animalAPI.adopt(id);
      toast.success('Adoption request sent! The NGO will contact you soon.');
      navigate('/adopt');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send adoption request');
    } finally {
      setAdopting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Animal not found</p>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80';
  const images = animal.images && animal.images.length > 0 ? animal.images : [defaultImage];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/adopt')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Animals
        </motion.button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img 
                  src={images[selectedImageIdx]} 
                  alt={animal.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                {animal.isAdopted && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                    Adopted
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        selectedImageIdx === idx ? 'border-indigo-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${animal.name} ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              {/* Name and Basic Info */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{animal.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{animal.species} • {animal.breed}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Age</p>
                    <p className="text-lg font-bold text-blue-600">{animal.age || 'Unknown'}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Health</p>
                        <p className="text-lg font-bold text-green-600">{animal.healthStatus || 'Good'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rescue Story */}
                {animal.rescueStory && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Their Story</h3>
                    <p className="text-gray-700 leading-relaxed">{animal.rescueStory}</p>
                  </div>
                )}

                {/* Managing NGO */}
                {animal.managingNGO && (
                  <div className="bg-indigo-50 p-4 rounded-lg mb-8">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Managed by</h3>
                    <p className="font-bold text-gray-900">{animal.managingNGO.ngoName || animal.managingNGO.name}</p>
                    {animal.managingNGO.phone && (
                      <p className="text-sm text-gray-600 mt-1">📞 {animal.managingNGO.phone}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleAdopt}
                disabled={animal.isAdopted || adopting}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  animal.isAdopted
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : adopting
                    ? 'bg-indigo-400 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                <Heart className="w-6 h-6" />
                {animal.isAdopted ? 'Already Adopted' : adopting ? 'Sending Request...' : 'Adopt Me!'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
