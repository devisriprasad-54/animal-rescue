import React from 'react';
import { PawPrint, Mail, Phone, MapPin, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="h-8 w-8 text-indigo-400" />
              <span className="font-bold text-xl text-white tracking-tight">RescueNet</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting heroes to animals in need. Together we can make a difference in their lives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Heart className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Share2 className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/report" className="hover:text-white">Report Rescue</Link></li>
              <li><Link to="/adopt" className="hover:text-white">Adopt an Animal</Link></li>
              <li><Link to="/volunteer" className="hover:text-white">Become a Volunteer</Link></li>
              <li><Link to="/ngos" className="hover:text-white">Partner NGOs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <span>123 Rescue Street, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span>support@rescuenet.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Animal Rescue Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;