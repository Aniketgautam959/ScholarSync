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

const COLLEGE_IMAGE = "https://infra.iitd.ac.in/static/media/10.4b37a88fdbc685075e09.jpg";

// --- Header Component ---
const Header = () => {
  const router = useRouter();
  const navLinks = [
    { name: 'Services', href: '#features' },
    { name: 'Institutions', href: '/colleges' },
    { name: 'Opportunities', href: '/internships' },
    { name: 'Counselors', href: '/educators' },
  ];

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
        <GraduationCap className="h-6 w-6 text-gray-800" />
        <span className="font-bold text-xl text-gray-800">ScholarSync</span>
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
          src={COLLEGE_IMAGE}
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h2 className="font-serif text-4xl">
            — Your gateway to government scholarships and career advancement.
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
          — Empowering Indian students through government scholarships and career guidance
        </h1>
        <p className="mt-6 text-gray-600 text-lg">
          Access thousands of Indian government scholarships, skill development programs, and career opportunities designed to support your educational journey across India.
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
              <p className="text-sm font-bold text-gray-800">Government Verified</p>
              <p className="text-xs text-gray-500">AICTE & UGC Counselors</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-2xl">
            <Briefcase className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-bold text-gray-800">Indian Programs</p>
              <p className="text-xs text-gray-500">Central & State Schemes</p>
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
    { icon: UserPlus, title: 'Student Registration', description: 'Register with government scholarship programs and create your official student profile.', color: 'bg-teal-50' },
    { icon: Target, title: 'Scholarship Matching', description: 'Get matched with relevant government scholarships based on your eligibility criteria.', color: 'bg-orange-50' },
    { icon: LinkIcon, title: 'Government Connect', description: 'Connect with official government education counselors and support services.', color: 'bg-blue-50' },
  ];
  return (
    <section id="how-it-works" className="mt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm font-bold text-gray-500 tracking-widest">HOW IT WORKS</p>
          <h2 className="font-serif text-4xl text-gray-800 mt-2">
            Your complete government scholarship and career support platform.
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
    { name: 'IIT Delhi', text: 'IIT Delhi' },
    { name: 'IIT Bombay', text: 'IIT Bombay' },
    { name: 'IIT Madras', text: 'IIT Madras' },
    { name: 'UGC', text: 'UGC' },
    { name: 'AICTE', text: 'AICTE' },
    { name: 'NTA', text: 'NTA' },
  ];
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-600">
          Trusted by students across government institutions and programs
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
              <div className="h-10 flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-all">
                {logo.text}
              </div>
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
    { icon: Bot, title: 'Government Scholarship Advisor', description: 'Get instant guidance on government scholarship programs, eligibility criteria, and application processes.' },
    { icon: Award, title: 'Scholarship Matching', description: 'Discover government scholarships and financial aid programs perfectly matched to your academic profile.' },
    { icon: School, title: 'Explore Government Institutions', description: 'Search and compare government colleges, universities, and educational institutions across the country.' },
    { icon: Briefcase, title: 'Government Opportunities', description: 'Access official government internships, training programs, and career opportunities for students.' },
    { icon: GraduationCap, title: 'Connect with Officials', description: 'Book sessions with government education counselors and official academic advisors for guidance.' },
    { icon: Users, title: 'Student Support Network', description: 'Join official student forums and connect with peers in government scholarship programs.' },
  ];
  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Complete Government Scholarship & Career Support
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Everything you need to access government scholarships and build your career, all in one official platform.
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
                <h3 className="font-serif text-xl text-gray-800 mb-2">{feature.title}</h3>
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
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science, IIT Delhi',
      avatar: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face`,
      quote: '"CareerPath helped me discover the perfect government scholarship for my IIT studies. The platform made the application process so much easier and I received full financial support for my education."',
      rating: 5,
    },
    {
      name: 'Arjun Patel',
      role: 'Mechanical Engineering, IIT Bombay',
      avatar: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face`,
      quote: '"Through this platform, I found multiple government scholarship opportunities that I never knew existed. The guidance from official counselors was invaluable for my career planning."',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      role: 'Electrical Engineering, IIT Madras',
      avatar: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face`,
      quote: '"The government scholarship matching feature is incredible. It connected me with the right programs based on my academic profile and helped me secure funding for my research project."',
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Trusted by Students Across India
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
    { question: 'Who can use CareerPath?', answer: 'CareerPath is designed for students at all levels—from high school to postgraduate studies—who are seeking government scholarships and career guidance. It\'s also available for parents and educators supporting students in their educational journey.' },
    { question: 'Are government scholarship services free?', answer: 'Yes, all our government scholarship matching and guidance services are completely free. We are committed to making quality education accessible to all students through government programs and initiatives.' },
    { question: 'How are government counselors verified?', answer: 'All counselors and advisors on our platform are verified government officials or certified education professionals. We maintain strict verification processes including credential checks and official government clearance.' },
    { question: 'How does CareerPath match students with scholarships?', answer: 'Our platform uses official government databases and eligibility criteria to match students with relevant scholarship programs. We analyze academic records, financial background, and specific program requirements to provide accurate recommendations.' },
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
            <span className="block">Ready to access government scholarships?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands of students who are already accessing government scholarships and building their careers with CareerPath.
          </p>
          <motion.button
            onClick={() => router.push('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Register for Government Services
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
          <p className="text-base text-gray-500 md:order-1">&copy; 2025 CareerPath - Government Education Portal. All rights reserved.</p>
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
