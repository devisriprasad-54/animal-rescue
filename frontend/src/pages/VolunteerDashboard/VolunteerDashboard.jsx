import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, User, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { volunteerAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('assigned');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await volunteerAPI.getDashboard();
        setDashboard(res.data);
      } catch (error) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'volunteer') {
      fetchDashboard();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Failed to load dashboard</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      assigned: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getEmergencyColor = (level) => {
    const colors = {
      low: 'bg-blue-50 border-l-4 border-blue-500',
      medium: 'bg-yellow-50 border-l-4 border-yellow-500',
      high: 'bg-orange-50 border-l-4 border-orange-500',
      critical: 'bg-red-50 border-l-4 border-red-500'
    };
    return colors[level] || 'bg-gray-50';
  };

  const RescueCard = ({ rescue, isPending = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg ${getEmergencyColor(rescue.emergencyLevel)}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{rescue.animalType}</h3>
          <p className="text-gray-600">{rescue.location}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(rescue.status)}`}>
          {rescue.status.charAt(0).toUpperCase() + rescue.status.slice(1)}
        </span>
      </div>

      <p className="text-gray-700 mb-4">{rescue.description}</p>

      {rescue.reporterId && (
        <div className="bg-white bg-opacity-50 rounded p-3 mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User className="w-4 h-4" />
            <span><strong>Reporter:</strong> {rescue.reporterId.name}</span>
          </div>
          {rescue.reporterId.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4" />
              <span>{rescue.reporterId.phone}</span>
            </div>
          )}
          {rescue.reporterId.address && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{rescue.reporterId.address}</span>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-600">
        Reported: {new Date(rescue.createdAt).toLocaleDateString()}
      </div>

      {isPending && (
        <button className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition">
          Accept Rescue
        </button>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Volunteer Dashboard</h1>
          <p className="text-lg text-gray-600">Hello, {dashboard.volunteer?.name}! Here's your rescue overview.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Assigned Rescues</p>
                <p className="text-3xl font-bold text-indigo-600">{dashboard.assignedRescues?.length || 0}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-indigo-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Rescues</p>
                <p className="text-3xl font-bold text-yellow-600">{dashboard.unassignedCount || 0}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Your Skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dashboard.volunteer?.skills?.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                  {(!dashboard.volunteer?.skills || dashboard.volunteer.skills.length === 0) && (
                    <span className="text-gray-500 text-sm">No skills added yet</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`pb-4 px-4 font-medium transition-colors ${
              activeTab === 'assigned'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-5 h-5 inline mr-2" />
            My Rescues ({dashboard.assignedRescues?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-4 px-4 font-medium transition-colors ${
              activeTab === 'pending'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertCircle className="w-5 h-5 inline mr-2" />
            Available Rescues ({dashboard.pendingRescues?.length || 0})
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'assigned' && (
            <>
              {dashboard.assignedRescues?.length > 0 ? (
                dashboard.assignedRescues.map(rescue => (
                  <RescueCard key={rescue._id} rescue={rescue} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No rescues assigned yet</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'pending' && (
            <>
              {dashboard.pendingRescues?.length > 0 ? (
                dashboard.pendingRescues.map(rescue => (
                  <RescueCard key={rescue._id} rescue={rescue} isPending />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No pending rescues right now</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
