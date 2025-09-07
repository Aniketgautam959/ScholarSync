"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Plus,
  ArrowRight,
  BookOpen,
  Briefcase,
  UserPlus,
  Target,
  Link as LinkIcon,
  Bot,
  School,
  Award,
  Users,
  Star,
  ChevronDown,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { faker } from '@faker-js/faker';

// --- Header Component ---
const Header = () => {
  const router = useRouter();
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Internships', href: '/internships' },
    { name: 'Educators', href: '/educators' },
  ];

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
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
          onClick={() => router.push('/login')}
          className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-sm hover:bg-blue-600 transition-colors"
        >
          Log In
        </motion.button>
      </div>
    </header>
  );
};

// --- Hero Component ---
const Hero = () => {
  const router = useRouter();
  return (
    <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            onClick={() => router.push('/login')}
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
};

// --- HowItWorks Component ---
const HowItWorks = () => {
  const featureCards = [
    { icon: UserPlus, title: 'Profile Building', description: 'Create a dynamic profile that showcases your skills and aspirations.', color: 'bg-teal-50' },
    { icon: Target, title: 'AI Matching', description: 'Receive tailored recommendations for courses, colleges, and careers.', color: 'bg-orange-50' },
    { icon: LinkIcon, title: 'Community Connect', description: 'Engage with peers and mentors in our vibrant community forums.', color: 'bg-blue-50' },
  ];
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
};

// --- SocialProof Component ---
const SocialProof = () => {
  const logos = [
    { name: 'Stanford', src: 'https://logo.clearbit.com/stanford.edu' },
    { name: 'MIT', src: 'https://logo.clearbit.com/mit.edu' },
    { name: 'Google', src: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', src: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Harvard', src: 'https://logo.clearbit.com/harvard.edu' },
    { name: 'Coursera', src: 'https://logo.clearbit.com/coursera.org' },
  ];
  return (
    <div className="py-12 sm:py-16">
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
};

// --- Features Component ---
const Features = () => {
  const features = [
    { icon: Bot, title: 'AI-Powered Advisor', description: 'Get instant, personalized advice on courses, colleges, and career paths from our intelligent chatbot.' },
    { icon: Award, title: 'Personalized Recommendations', description: 'Discover opportunities perfectly matched to your profile, skills, and interests.' },
    { icon: School, title: 'Explore Colleges', description: 'Search and compare thousands of colleges and universities worldwide to find your perfect fit.' },
    { icon: Briefcase, title: 'Find Internships & Jobs', description: 'Access a curated list of internships and entry-level jobs from top companies.' },
    { icon: GraduationCap, title: 'Connect with Educators', description: 'Book sessions with verified career counselors and academic experts for one-on-one guidance.' },
    { icon: Users, title: 'Community Forum', description: 'Join discussions, ask questions, and share experiences with a community of peers and mentors.' },
  ];
  return (
    <section id="features" className="py-24 bg-gray-50/50">
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
};

// --- Testimonials Component ---
const Testimonials = () => {
  const testimonials = React.useMemo(() => Array.from({ length: 3 }, () => ({
    name: faker.person.fullName(),
    role: 'CS Student, ' + faker.location.city(),
    avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000000)}?w=60&h=60&fit=crop&crop=face`,
    quote: `"${faker.lorem.paragraph()}"`,
    rating: 5,
  })), []);

  return (
    <section id="testimonials" className="py-24">
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
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
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
};

// --- FAQ Component ---
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
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

const FAQ = () => {
  const faqs = [
    { question: 'Who is CareerPath for?', answer: 'CareerPath is designed for high school students, college students, and recent graduates who are looking for guidance in their academic and professional journeys. It\'s also a valuable tool for anyone considering a career change.' },
    { question: 'Is the AI advisor free to use?', answer: 'Yes, our core AI advisor feature is completely free. We believe everyone should have access to quality career guidance. We may offer premium features with advanced analytics and one-on-one coaching in the future.' },
    { question: 'How are the educators and counselors verified?', answer: 'We have a rigorous verification process for all educators and counselors on our platform. This includes checking their credentials, professional experience, and conducting interviews to ensure they meet our high standards of quality and expertise.' },
    { question: 'How does CareerPath personalize recommendations?', answer: 'Our platform uses a sophisticated AI algorithm that analyzes the data you provide in your profile—such as your academic records, skills, interests, and career goals—to match you with the most relevant opportunities and resources.' },
  ];
  return (
    <section id="faq" className="py-24 bg-gray-50/50">
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
};

// --- CTA Component ---
const CTA = () => {
  const router = useRouter();
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
            onClick={() => router.push('/login')}
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
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-transparent text-gray-600">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500 md:order-1">&copy; 2025 CareerPath, Inc. All rights reserved.</p>
          <div className="flex space-x-6 md:order-2 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">GitHub</span><Github className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main LandingPage Export ---
export default function LandingPage() {
  return (
    <div className="w-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800 antialiased">
      <div className="bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Header />
          <main>
            <Hero />
            <HowItWorks />
          </main>
        </div>
      </div>
      <SocialProof />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
