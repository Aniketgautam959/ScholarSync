import React from 'react';
import { motion } from 'framer-motion';
import { Bot, GraduationCap, Briefcase, Users, School, Award } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Advisor',
    description: 'Get instant, personalized advice on courses, colleges, and career paths from our intelligent chatbot.',
  },
  {
    icon: Award,
    title: 'Personalized Recommendations',
    description: 'Discover opportunities perfectly matched to your profile, skills, and interests.',
  },
  {
    icon: School,
    title: 'Explore Colleges',
    description: 'Search and compare thousands of colleges and universities worldwide to find your perfect fit.',
  },
  {
    icon: Briefcase,
    title: 'Find Internships & Jobs',
    description: 'Access a curated list of internships and entry-level jobs from top companies.',
  },
  {
    icon: GraduationCap,
    title: 'Connect with Educators',
    description: 'Book sessions with verified career counselors and academic experts for one-on-one guidance.',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Join discussions, ask questions, and share experiences with a community of peers and mentors.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            An All-in-One Career Guidance Platform
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Everything you need to plan your academic and professional future, all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
