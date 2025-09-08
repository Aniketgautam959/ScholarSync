"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Users,
  DollarSign,
  GraduationCap,
  Search,
  Filter,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";
import { faker } from "@faker-js/faker";

// Generate dummy colleges
const generateColleges = () => {
  const fields = [
    "Computer Science",
    "Engineering",
    "Business",
    "Medicine",
    "Liberal Arts",
    "Design",
    "Finance",
    "Psychology",
    "Mathematics",
    "Physics",
  ];

  const locations = [
    "Boston, MA",
    "Palo Alto, CA",
    "Cambridge, MA",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Philadelphia, PA",
    "Washington, DC",
    "Atlanta, GA",
    "Seattle, WA",
  ];

  const collegeNames = [
    "Harvard University",
    "MIT",
    "Stanford University",
    "Yale University",
    "Princeton University",
    "Columbia University",
    "University of Pennsylvania",
    "Cornell University",
    "Brown University",
    "Dartmouth College",
    "Northwestern University",
    "Vanderbilt University",
    "Rice University",
    "Notre Dame",
    "Carnegie Mellon University",
    "University of California, Berkeley",
    "UCLA",
    "University of Michigan",
    "University of Virginia",
    "Georgia Tech",
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: collegeNames[i] || `${faker.company.name()} University`,
    image:
      "https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: locations[Math.floor(Math.random() * locations.length)],
    field: fields[Math.floor(Math.random() * fields.length)],
    rating: (4.0 + Math.random() * 1).toFixed(1),
    tuitionFee: Math.floor(Math.random() * 40000) + 20000,
    acceptanceRate: Math.floor(Math.random() * 30) + 10,
    studentCount: Math.floor(Math.random() * 20000) + 5000,
    description: faker.lorem.paragraph(),
    founded: Math.floor(Math.random() * 200) + 1800,
    ranking: Math.floor(Math.random() * 100) + 1,
    employmentRate: Math.floor(Math.random() * 20) + 80,
    avgSalary: Math.floor(Math.random() * 50000) + 50000,
    scholarships: Math.random() > 0.3,
    features: faker.lorem
      .words(5)
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
    deadline: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString(),
  }));
};

const fields = [
  "All",
  "Computer Science",
  "Engineering",
  "Business",
  "Medicine",
  "Liberal Arts",
  "Design",
];

const locations = [
  "All",
  "California",
  "Massachusetts",
  "New York",
  "Illinois",
  "Pennsylvania",
];

export default function Colleges() {
  const [colleges] = useState(generateColleges());
  const [selectedField, setSelectedField] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ranking");
  const [viewMode, setViewMode] = useState("grid");

  const filteredColleges = colleges
    .filter((college) => {
      const matchesField =
        selectedField === "All" || college.field === selectedField;
      const matchesLocation =
        selectedLocation === "All" ||
        college.location.includes(selectedLocation);
      const matchesSearch =
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesField && matchesLocation && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking;
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "tuition":
          return a.tuitionFee - b.tuitionFee;
        case "acceptance":
          return b.acceptanceRate - a.acceptanceRate;
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
          Explore Colleges & Universities
        </h1>
        <p className="text-gray-600">
          Find the perfect college for your field of interest and career goals
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges by name, field, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              {fields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="ranking">Sort by Ranking</option>
              <option value="rating">Sort by Rating</option>
              <option value="tuition">Sort by Tuition</option>
              <option value="acceptance">Sort by Acceptance Rate</option>
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
          Showing {filteredColleges.length} college
          {filteredColleges.length !== 1 ? "s" : ""}
          {selectedField !== "All" && ` for ${selectedField}`}
          {selectedLocation !== "All" && ` in ${selectedLocation}`}
        </p>
      </motion.div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredColleges.map((college, index) => (
          <motion.div
            key={college.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* College Image */}
            <div className="relative h-48">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                  #{college.ranking}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-semibold text-gray-900">
                    {college.rating}
                  </span>
                </div>
              </div>
              {college.scholarships && (
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                    Scholarships Available
                  </span>
                </div>
              )}
            </div>

            {/* College Content */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">
                  {college.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{college.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">Founded {college.founded}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {college.field}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {college.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="font-serif text-lg text-gray-800">
                    {college.studentCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="font-serif text-lg text-gray-800">
                    {college.acceptanceRate}%
                  </p>
                  <p className="text-xs text-gray-500">Acceptance</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className="font-serif text-lg text-gray-800">
                    ${college.tuitionFee.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Annual Tuition</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <p className="font-serif text-lg text-gray-800">
                    {college.employmentRate}%
                  </p>
                  <p className="text-xs text-gray-500">Employment</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-1">
                  {college.features.slice(0, 4).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      {feature}
                    </span>
                  ))}
                  {college.features.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      +{college.features.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Average Salary */}
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">
                    Average Starting Salary
                  </span>
                  <span className="text-lg font-bold text-green-900">
                    ${college.avgSalary.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Application Deadline */}
              <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-800">
                    Application Deadline
                  </span>
                  <span className="text-sm font-bold text-orange-900">
                    {college.deadline}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Learn More
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Save
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Colleges
        </button>
      </div>
    </div>
  );
}
