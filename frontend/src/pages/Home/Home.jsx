import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Be the Hero They <br/>
                <span className="text-indigo-600">Desperately Need</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with local NGOs, report animals in danger, or open your home to a new best friend. Join the fastest growing animal rescue network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/report" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                  Report Emergency
                  <Shield className="w-5 h-5" />
                </Link>
                <Link to="/adopt" className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                  Adopt a Pet
                  <Heart className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Happy rescued dogs" 
                className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">5,000+</p>
                    <p className="text-sm font-medium text-gray-500">Lives Saved</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Making Real Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our network relies on passionate volunteers, dedicated NGOs, and compassionate adopters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="w-8 h-8 text-amber-500" />, count: "24/7", label: "Emergency Response" },
              { icon: <Users className="w-8 h-8 text-blue-500" />, count: "1,200+", label: "Active Volunteers" },
              { icon: <Shield className="w-8 h-8 text-green-500" />, count: "150+", label: "Partner NGOs" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg transition">
                <div className="inline-flex justify-center items-center bg-white p-4 rounded-full shadow-sm mb-6">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-2">{stat.count}</h3>
                <p className="text-lg font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section CTA */}
      <section className="py-24 bg-indigo-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to make a difference?</h2>
            <p className="text-xl text-indigo-100 mb-10">
              Whether you want to volunteer on the field, foster an animal, or represent an NGO, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                Create an Account
              </Link>
              <Link to="/volunteer" className="px-8 py-4 bg-indigo-500 text-white rounded-xl font-bold text-lg hover:bg-indigo-400 transition flex items-center justify-center gap-2 border border-indigo-400">
                Learn About Volunteering
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;