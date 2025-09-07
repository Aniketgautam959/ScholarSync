import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-indigo-700">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to take control of your future?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands of students who are already building their dream careers with CareerPath.
          </p>
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get Started for Free
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
