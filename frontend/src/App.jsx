import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Adopt from './pages/Adopt/Adopt';
import ReportRescue from './pages/ReportRescue/ReportRescue';
import VolunteerDashboard from './pages/VolunteerDashboard/VolunteerDashboard';
import AnimalDetails from './pages/AnimalDetails/AnimalDetails';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/animal/:id" element={<AnimalDetails />} />
            <Route 
              path="/report" 
              element={
                <ProtectedRoute>
                  <ReportRescue />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/volunteer" 
              element={
                <ProtectedRoute requiredRole="volunteer">
                  <VolunteerDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
