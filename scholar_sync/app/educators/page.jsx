"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Calendar,
  Video,
  MessageCircle,
  Filter,
  Search,
  Award,
  BookOpen,
  X,
} from "lucide-react";

const COLLEGE_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Generate educators with specific data
const generateEducators = () => {
  return [
    {
      id: 1,
      name: "Dr. Anil Verma",
      title: "Associate Professor, Computer Science Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1682092105693-1a2566cf2ee1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Delhi",
      specialization: "Computer Science Engineering",
      rating: "4.9",
      reviews: 432,
      experience: 15,
      hourlyRate: 1200,
      bio: "Expert in computer science engineering with specialization in algorithms, data structures, and software development. Helping students excel in their engineering journey.",
      verified: true,
      available: true,
      responseTime: "4 hours",
      expertise: ["Algorithms", "Data Structures", "Software Engineering", "Programming"],
      totalStudents: 520,
      successRate: 87,
    },
    {
      id: 2,
      name: "Prof. Meena Sharma",
      title: "Assistant Professor, Mechanical Engineering",
      avatar: "https://images.unsplash.com/photo-1664382951821-8151535191e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwdGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D",
      university: "Indian Institute of Technology, Mumbai",
      specialization: "Mechanical Engineering",
      rating: "4.8",
      reviews: 278,
      experience: 12,
      hourlyRate: 950,
      bio: "Specialized in mechanical engineering with focus on thermodynamics, machine design, and manufacturing. Committed to student success in engineering.",
      verified: true,
      available: true,
      responseTime: "10 hours",
      expertise: ["Thermodynamics", "Machine Design", "Manufacturing", "CAD/CAM"],
      totalStudents: 310,
      successRate: 82,
    },
    {
      id: 3,
      name: "Dr. Rajesh Iyer",
      title: "Professor, Electrical Engineering",
      avatar: "https://images.unsplash.com/photo-1581125119293-4803aa54b372?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Chennai",
      specialization: "Electrical Engineering",
      rating: "5.0",
      reviews: 512,
      experience: 20,
      hourlyRate: 1500,
      bio: "Electrical engineering professor with extensive experience in power systems, control systems, and electronics. Making complex electrical concepts simple and understandable.",
      verified: true,
      available: true,
      responseTime: "8 hours",
      expertise: ["Power Systems", "Control Systems", "Electronics", "Circuit Analysis"],
      totalStudents: 610,
      successRate: 90,
    },
    {
      id: 4,
      name: "Prof. Kavita Deshmukh",
      title: "Associate Professor, Civil Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1682089949039-131eca5d7285?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Kanpur",
      specialization: "Civil Engineering",
      rating: "4.7",
      reviews: 198,
      experience: 11,
      hourlyRate: 800,
      bio: "Passionate about civil engineering with expertise in structural analysis, construction management, and environmental engineering. Helping students develop practical engineering skills.",
      verified: true,
      available: true,
      responseTime: "12 hours",
      expertise: ["Structural Analysis", "Construction Management", "Environmental Engineering", "Surveying"],
      totalStudents: 240,
      successRate: 79,
    },
    {
      id: 5,
      name: "Dr. Suresh Nair",
      title: "Professor, Chemical Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1691873264230-0ff72300185a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Guwahati",
      specialization: "Chemical Engineering",
      rating: "4.9",
      reviews: 385,
      experience: 18,
      hourlyRate: 1300,
      bio: "Chemical engineering professor specializing in process design, thermodynamics, and reaction engineering. Making chemical engineering concepts accessible and engaging for students.",
      verified: true,
      available: true,
      responseTime: "6 hours",
      expertise: ["Process Design", "Thermodynamics", "Reaction Engineering", "Mass Transfer"],
      totalStudents: 470,
      successRate: 85,
    },
    {
      id: 6,
      name: "Prof. Nidhi Chawla",
      title: "Assistant Professor, Electronics Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1682089949039-131eca5d7285?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Roorkee",
      specialization: "Electronics Engineering",
      rating: "4.8",
      reviews: 254,
      experience: 13,
      hourlyRate: 900,
      bio: "Electronics engineering expert with focus on digital systems, microprocessors, and communication systems. Building future electronics engineers.",
      verified: true,
      available: true,
      responseTime: "9 hours",
      expertise: ["Digital Systems", "Microprocessors", "Communication Systems", "VLSI Design"],
      totalStudents: 300,
      successRate: 83,
    },
    {
      id: 7,
      name: "Dr. Arvind Kumar",
      title: "Associate Professor, Aerospace Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1682092105693-1a2566cf2ee1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Kharagpur",
      specialization: "Aerospace Engineering",
      rating: "5.0",
      reviews: 442,
      experience: 16,
      hourlyRate: 1400,
      bio: "Aerospace engineering expert with specialization in aerodynamics, propulsion systems, and flight mechanics. Preparing students for the aerospace industry.",
      verified: true,
      available: true,
      responseTime: "5 hours",
      expertise: ["Aerodynamics", "Propulsion Systems", "Flight Mechanics", "Aircraft Design"],
      totalStudents: 530,
      successRate: 89,
    },
    {
      id: 8,
      name: "Prof. Rekha Gupta",
      title: "Assistant Professor, Environmental Engineering",
      avatar: "https://images.unsplash.com/photo-1664382951821-8151535191e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwdGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D",
      university: "Indian Institute of Technology, Hyderabad",
      specialization: "Environmental Engineering",
      rating: "4.7",
      reviews: 176,
      experience: 10,
      hourlyRate: 850,
      bio: "Environmental engineering professor specializing in water treatment, air pollution control, and sustainable engineering. Making environmental concepts practical and relevant.",
      verified: true,
      available: true,
      responseTime: "14 hours",
      expertise: ["Water Treatment", "Air Pollution Control", "Sustainable Engineering", "Waste Management"],
      totalStudents: 220,
      successRate: 78,
    },
    {
      id: 9,
      name: "Dr. Pradeep Joshi",
      title: "Professor, Biomedical Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1691873264230-0ff72300185a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Indore",
      specialization: "Biomedical Engineering",
      rating: "4.9",
      reviews: 395,
      experience: 19,
      hourlyRate: 1100,
      bio: "Biomedical engineering professor with expertise in medical devices, bioinstrumentation, and tissue engineering. Bringing engineering solutions to healthcare challenges.",
      verified: true,
      available: true,
      responseTime: "7 hours",
      expertise: ["Medical Devices", "Bioinstrumentation", "Tissue Engineering", "Biomechanics"],
      totalStudents: 460,
      successRate: 86,
    },
    {
      id: 10,
      name: "Prof. Shalini Menon",
      title: "Associate Professor, Materials Engineering",
      avatar: "https://plus.unsplash.com/premium_photo-1682089949039-131eca5d7285?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      university: "Indian Institute of Technology, Mumbai",
      specialization: "Materials Engineering",
      rating: "4.8",
      reviews: 268,
      experience: 14,
      hourlyRate: 1000,
      bio: "Materials engineering professor specializing in metallurgy, polymers, and nanomaterials. Making materials science concepts clear and helping students excel in engineering.",
      verified: true,
      available: true,
      responseTime: "11 hours",
      expertise: ["Metallurgy", "Polymers", "Nanomaterials", "Materials Characterization"],
      totalStudents: 340,
      successRate: 84,
    },
  ];
};

const specializations = [
  "All",
  "Computer Science Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Electronics Engineering",
  "Aerospace Engineering",
  "Environmental Engineering",
  "Biomedical Engineering",
  "Materials Engineering",
];

export default function Educators() {
  const [educators] = useState(generateEducators());
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEducator, setSelectedEducator] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredEducators = educators
    .filter((educator) => {
      const matchesSpecialization =
        selectedSpecialization === "All" ||
        educator.specialization === selectedSpecialization;
      const matchesSearch =
        educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        educator.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        educator.university.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSpecialization && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "experience":
          return b.experience - a.experience;
        case "price":
          return a.hourlyRate - b.hourlyRate;
        default:
          return 0;
      }
    });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800 mb-2">
          Verified Educators & Counselors
        </h1>
        <p className="text-gray-600">
          Connect with expert educators and career counselors to guide your
          journey
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search educators by name, specialization, or university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6">
        <p className="text-gray-600">
          Showing {filteredEducators.length} educator
          {filteredEducators.length !== 1 ? "s" : ""}
          {selectedSpecialization !== "All" && ` in ${selectedSpecialization}`}
        </p>
      </motion.div>

      {/* Educators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEducators.map((educator, index) => (
          <motion.div
            key={educator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => {
              setSelectedEducator(educator);
              setActiveTab("overview");
            }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
            {/* Educator Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="relative">
                  <img
                    src={educator.avatar}
                    alt={educator.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {educator.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {educator.available && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {educator.name}
                  </h3>
                  <p className="text-sm text-gray-600">{educator.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {educator.university}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {educator.rating}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  ({educator.reviews})
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600">
                  ₹{educator.hourlyRate}/hr
                </p>
                <p className="text-xs text-gray-500">
                  {educator.experience} years exp.
                </p>
              </div>
            </div>

            {/* Specialization */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {educator.specialization}
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {educator.bio}
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {educator.expertise.slice(0, 3).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  {skill}
                </span>
              ))}
              {educator.expertise.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  +{educator.expertise.length - 3} more
                </span>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
              <div>
                <p className="font-serif text-lg text-gray-800">
                  {educator.totalStudents}
                </p>
                <p className="text-xs text-gray-500">Students Helped</p>
              </div>
              <div>
                <p className="font-serif text-lg text-gray-800">
                  {educator.successRate}%
                </p>
                <p className="text-xs text-gray-500">Success Rate</p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center justify-center mb-4 text-sm text-gray-600">
              <MessageCircle className="w-4 h-4 mr-1" />
              Responds in {educator.responseTime}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Book Slot
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Educators
        </button>
      </div>

      {/* Educator Info Modal */}
      {selectedEducator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={selectedEducator.avatar}
                    alt={selectedEducator.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {selectedEducator.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="font-serif text-2xl text-gray-800">
                    {selectedEducator.name}
                  </h2>
                  <p className="text-gray-600">{selectedEducator.title}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {selectedEducator.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({selectedEducator.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEducator(null)}
                className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {["overview", "reviews", "book session"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      About
                    </h3>
                    <p className="text-gray-600">{selectedEducator.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEducator.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Education
                      </h3>
                      <p className="text-gray-600">
                        {selectedEducator.university}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Experience
                      </h3>
                      <p className="text-gray-600">
                        {selectedEducator.experience} years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Success Metrics
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">
                          {selectedEducator.totalStudents}
                        </p>
                        <p className="text-sm text-gray-600">Students Helped</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">
                          {selectedEducator.successRate}%
                        </p>
                        <p className="text-sm text-gray-600">Success Rate</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">
                          {selectedEducator.reviews}
                        </p>
                        <p className="text-sm text-gray-600">Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Student Reviews
                      </h3>
                      <p className="text-gray-600">
                        {selectedEducator.reviews} reviews from verified
                        students
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-8 h-8 text-yellow-400 fill-current" />
                      <div className="ml-2">
                        <p className="font-serif text-3xl text-gray-800">
                          {selectedEducator.rating}
                        </p>
                        <p className="text-sm text-gray-500">Average Rating</p>
                      </div>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  {[
                    {
                      name: "Priya Singh",
                      rating: 5,
                      daysAgo: 5,
                      review: "Excellent teacher! Dr. Anil Verma made accounting concepts so clear and easy to understand. Highly recommended for commerce students."
                    },
                    {
                      name: "Rahul Kumar",
                      rating: 4,
                      daysAgo: 12,
                      review: "Great teaching methodology and very patient with students. The sessions are well-structured and informative."
                    },
                    {
                      name: "Anita Sharma",
                      rating: 5,
                      daysAgo: 8,
                      review: "Outstanding educator who goes above and beyond to help students succeed. The practical examples really help in understanding complex topics."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <img
                            src={[
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            ][index]}
                            alt="Student"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">
                              {review.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.daysAgo} days ago
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600">
                        {review.review}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "book session" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Book a Session
                      </h3>
                      <p className="text-gray-600">
                        Select your preferred date and time
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">
                        ₹{selectedEducator.hourlyRate}
                      </p>
                      <p className="text-sm text-gray-500">per hour</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 border-2 border-indigo-600 rounded-lg text-center hover:bg-indigo-50 transition-colors">
                        <Video className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                        <p className="font-medium text-gray-900">Video Call</p>
                        <p className="text-sm text-gray-500">
                          Face to face session
                        </p>
                      </button>
                      <button className="p-4 border-2 border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <p className="font-medium text-gray-900">
                          Chat Session
                        </p>
                        <p className="text-sm text-gray-500">
                          Text-based session
                        </p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Topic
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe what you'd like to discuss..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Book Session (₹{selectedEducator.hourlyRate})
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
