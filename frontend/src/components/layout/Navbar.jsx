import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, Menu, X, Heart, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'Adopt', path: '/adopt' },
  ];

  const authenticatedLinks = [
    { name: 'Report Rescue', path: '/report' },
  ];

  const volunteerLinks = [
    { name: 'Dashboard', path: '/volunteer' },
  ];

  const getNavLinks = () => {
    let links = [...baseLinks];
    if (user) {
      links = [...links, ...authenticatedLinks];
      if (user.role === 'volunteer') {
        links = [...links, ...volunteerLinks];
      }
    }
    return links;
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">RescueNet</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {getNavLinks().map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 font-medium transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-gray-900 font-medium hover:text-indigo-600">
                    Log in
                  </Link>
                  <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {getNavLinks().map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Join Us
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;