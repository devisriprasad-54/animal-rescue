import React, { useState, useEffect } from 'react';
import { Search, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { animalAPI } from '../../services/api';

const Adopt = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await animalAPI.getAll({ isAdopted: false });
        setAnimals(res.data);
        setFilteredAnimals(res.data);
      } catch (error) {
        toast.error('Failed to load animals');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  useEffect(() => {
    let filtered = animals;

    // Filter by species
    if (filter !== 'All') {
      filtered = filtered.filter(a => a.species === filter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.breed?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAnimals(filtered);
  }, [filter, searchTerm, animals]);

  const getSpecies = () => {
    const species = ['All', ...new Set(animals.map(a => a.species))];
    return species;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your New Best Friend</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These animals have been rescued and rehabilitated. Now they need a loving forever home.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 gap-4">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            {getSpecies().map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  filter === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'All' ? 'All Animals' : category + 's'}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by breed or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Animal Count */}
        <div className="mb-6 text-gray-600 text-sm">
          Found <span className="font-bold text-gray-900">{filteredAnimals.length}</span> animal{filteredAnimals.length !== 1 ? 's' : ''} available for adoption
        </div>

        {/* Animal Grid */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAnimals.map((animal, index) => {
              const defaultImage = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80';
              const imageUrl = animal.images && animal.images.length > 0 ? animal.images[0] : defaultImage;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={animal._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                  onClick={() => navigate(`/animal/${animal._id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={imageUrl}
                      alt={animal.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{animal.name}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">
                        {animal.age || 'Unknown'}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mb-4">{animal.breed || 'Mixed Breed'}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-6">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{animal.managingNGO?.ngoName || 'Rescue Center'}</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white py-3 rounded-xl font-bold transition-colors border border-indigo-100 hover:border-transparent">
                      <Heart className="w-5 h-5" />
                      Learn More
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No animals available for adoption matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adopt;