import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, Target, Link as LinkIcon } from 'lucide-react';

const featureCards = [
  {
    icon: UserPlus,
    title: 'Profile Building',
    description: 'Create a dynamic profile that showcases your skills and aspirations.',
    color: 'bg-teal-50'
  },
  {
    icon: Target,
    title: 'AI Matching',
    description: 'Receive tailored recommendations for courses, colleges, and careers.',
    color: 'bg-orange-50'
  },
  {
    icon: LinkIcon,
    title: 'Community Connect',
    description: 'Engage with peers and mentors in our vibrant community forums.',
    color: 'bg-blue-50'
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm font-bold text-gray-500 tracking-widest">HOW IT WORKS</p>
          <h2 className="font-serif text-4xl text-gray-800 mt-2">
            All your goals. Every opportunity. One platform.
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors hidden md:block"
        >
          <ArrowRight className="h-6 w-6" />
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              className={`p-8 rounded-3xl ${card.color}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Icon className="h-8 w-8 text-gray-800 mb-4" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
