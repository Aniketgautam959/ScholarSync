import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateTestimonials = () => {
  return Array.from({ length: 3 }, () => ({
    name: faker.person.fullName(),
    role: 'CS Student, ' + faker.location.city(),
    avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000000)}?w=60&h=60&fit=crop&crop=face`,
    quote: `"${faker.lorem.paragraph()}"`,
    rating: 5,
  }));
};

const testimonials = generateTestimonials();

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Loved by Students Worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
