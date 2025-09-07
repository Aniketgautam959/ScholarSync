import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Stanford', src: 'https://logo.clearbit.com/stanford.edu' },
  { name: 'MIT', src: 'https://logo.clearbit.com/mit.edu' },
  { name: 'Google', src: 'https://logo.clearbit.com/google.com' },
  { name: 'Microsoft', src: 'https://logo.clearbit.com/microsoft.com' },
  { name: 'Harvard', src: 'https://logo.clearbit.com/harvard.edu' },
  { name: 'Coursera', src: 'https://logo.clearbit.com/coursera.org' },
];

export default function SocialProof() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-600">
          Trusted by students from top universities and companies
        </h2>
        <motion.div 
          className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              className="col-span-1 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img className="h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" src={logo.src} alt={logo.name} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
