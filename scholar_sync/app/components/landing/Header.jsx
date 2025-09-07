import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Plus } from 'lucide-react';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Colleges', href: '/colleges' },
  { name: 'Internships', href: '/internships' },
  { name: 'Educators', href: '/educators' },
];

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <GraduationCap className="h-6 w-6 text-gray-800" />
        <span className="font-bold text-xl text-gray-800">CareerPath</span>
      </div>
      <nav className="hidden md:flex items-center gap-2">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100/80 rounded-full hover:bg-gray-200/80 transition-colors">
            {link.name}
            <Plus className="h-4 w-4" />
          </a>
        ))}
      </nav>
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-sm hover:bg-blue-600 transition-colors"
        >
          Log In
        </motion.button>
      </div>
    </header>
  );
}
