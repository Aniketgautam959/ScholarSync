import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Who is CareerPath for?',
    answer: 'CareerPath is designed for high school students, college students, and recent graduates who are looking for guidance in their academic and professional journeys. It\'s also a valuable tool for anyone considering a career change.',
  },
  {
    question: 'Is the AI advisor free to use?',
    answer: 'Yes, our core AI advisor feature is completely free. We believe everyone should have access to quality career guidance. We may offer premium features with advanced analytics and one-on-one coaching in the future.',
  },
  {
    question: 'How are the educators and counselors verified?',
    answer: 'We have a rigorous verification process for all educators and counselors on our platform. This includes checking their credentials, professional experience, and conducting interviews to ensure they meet our high standards of quality and expertise.',
  },
  {
    question: 'How does CareerPath personalize recommendations?',
    answer: 'Our platform uses a sophisticated AI algorithm that analyzes the data you provide in your profile—such as your academic records, skills, interests, and career goals—to match you with the most relevant opportunities and resources.',
  },
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </p>
        </div>
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
