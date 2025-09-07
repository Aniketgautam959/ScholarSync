import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Image Card */}
      <motion.div 
        className="relative rounded-3xl overflow-hidden h-96 lg:h-[500px] shadow-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" 
          alt="Students collaborating" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h2 className="font-serif text-4xl">
            — The leading platform for personalized career guidance.
          </h2>
        </div>
      </motion.div>

      {/* Right Text Content */}
      <motion.div 
        className="text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-serif text-5xl lg:text-6xl font-bold text-gray-800">
          — The driving force behind more{' '}
          <span className="relative inline-block">
            <span className="absolute -inset-2 block">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-70 animate-glow"></span>
            </span>
            <span className="relative text-white">AI</span>
          </span>
          {' '}successful careers.
        </h1>
        <p className="mt-6 text-gray-600 text-lg">
          Streamline your career planning, discover opportunities, and grow your potential — all powered by an AI assistant built for your success.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          >
            <span className="pl-6 pr-4 py-3">Get Started</span>
            <span className="p-3 bg-gray-700 rounded-full">
              <ArrowRight className="h-5 w-5" />
            </span>
          </motion.button>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-2xl">
            <BookOpen className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-bold text-gray-800">Trusted by Top Educators</p>
              <p className="text-xs text-gray-500">Verified Professionals</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-2xl">
            <Briefcase className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-bold text-gray-800">Access Top Internships</p>
              <p className="text-xs text-gray-500">Leading Companies</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
