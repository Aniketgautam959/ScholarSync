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

const indianColleges = [
  {
    id: 1,
    name: "Indian Institute of Science (IISc), Bangalore",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEruxbXKNm6CiV-4pZryr7230BbDbn-THjA&s",
    location: "Bangalore, Karnataka",
    field: "Science & Engineering",
    rating: "4.9",
    tuitionFee: 250000,
    acceptanceRate: 15,
    studentCount: 4000,
    description:
      "India's premier institute for advanced scientific and technological research.",
    founded: 1909,
    ranking: 1,
    employmentRate: 95,
    avgSalary: 1600000,
    scholarships: true,
    features: ["Hostel", "Research Labs", "Library", "Sports Complex", "Clubs"],
    deadline: "30/04/2025",
  },
  {
    id: 2,
    name: "Indian Institute of Technology Bombay (IIT Bombay)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThzS9I0pJjvHxG1f0CJ9ziBmyQXNVG71lhGQ&s",
    location: "Mumbai, Maharashtra",
    field: "Engineering",
    rating: "4.8",
    tuitionFee: 300000,
    acceptanceRate: 10,
    studentCount: 11000,
    description:
      "A top-ranked IIT known for engineering, technology, and research excellence.",
    founded: 1958,
    ranking: 2,
    employmentRate: 93,
    avgSalary: 1500000,
    scholarships: true,
    features: [
      "Hostel",
      "Research Labs",
      "Library",
      "Incubation Center",
      "Sports",
    ],
    deadline: "15/05/2025",
  },
  {
    id: 3,
    name: "Indian Institute of Technology Delhi (IIT Delhi)",
    image: "https://infra.iitd.ac.in/static/media/10.4b37a88fdbc685075e09.jpg",
    location: "New Delhi",
    field: "Engineering",
    rating: "4.8",
    tuitionFee: 290000,
    acceptanceRate: 12,
    studentCount: 9000,
    description:
      "One of India’s top IITs with a strong focus on engineering, innovation, and research.",
    founded: 1961,
    ranking: 3,
    employmentRate: 92,
    avgSalary: 1450000,
    scholarships: true,
    features: [
      "Hostel",
      "Research Labs",
      "Innovation Hub",
      "Library",
      "Sports Complex",
    ],
    deadline: "20/05/2025",
  },
  {
    id: 4,
    name: "Indian Institute of Technology Madras (IIT Madras)",
    image:
      "https://generic.wordpress.soton.ac.uk/webscience/wp-content/uploads/sites/117/2019/04/madras.jpg",
    location: "Chennai, Tamil Nadu",
    field: "Engineering",
    rating: "4.9",
    tuitionFee: 280000,
    acceptanceRate: 11,
    studentCount: 10000,
    description:
      "A globally recognized institute excelling in engineering, technology, and applied sciences.",
    founded: 1959,
    ranking: 4,
    employmentRate: 93,
    avgSalary: 1400000,
    scholarships: true,
    features: [
      "Hostel",
      "Library",
      "Research Labs",
      "Startup Incubation",
      "Sports",
    ],
    deadline: "25/05/2025",
  },
  {
    id: 5,
    name: "Jawaharlal Nehru University (JNU)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/JNU_Admin.JPG/1280px-JNU_Admin.JPG",
    location: "New Delhi",
    field: "Liberal Arts",
    rating: "4.6",
    tuitionFee: 60000,
    acceptanceRate: 20,
    studentCount: 8000,
    description:
      "Leading university in social sciences, humanities, and international studies.",
    founded: 1969,
    ranking: 10,
    employmentRate: 85,
    avgSalary: 900000,
    scholarships: true,
    features: [
      "Hostel",
      "Library",
      "Cultural Clubs",
      "Sports",
      "Research Centers",
    ],
    deadline: "15/06/2025",
  },
  {
    id: 6,
    name: "Delhi University",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/dc/Delhi_University_North_Campus.jpg",
    location: "Delhi",
    field: "Multidisciplinary",
    rating: "4.5",
    tuitionFee: 40000,
    acceptanceRate: 30,
    studentCount: 60000,
    description:
      "India’s largest and most prestigious public university offering diverse programs.",
    founded: 1922,
    ranking: 12,
    employmentRate: 80,
    avgSalary: 800000,
    scholarships: true,
    features: ["Hostel", "Library", "Cultural Societies", "Sports", "Clubs"],
    deadline: "30/06/2025",
  },
  {
    id: 7,
    name: "Banaras Hindu University (BHU)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/BHU_Varanasi.jpg",
    location: "Varanasi, Uttar Pradesh",
    field: "Multidisciplinary",
    rating: "4.6",
    tuitionFee: 70000,
    acceptanceRate: 25,
    studentCount: 35000,
    description:
      "A historic central university known for diverse courses and research facilities.",
    founded: 1916,
    ranking: 14,
    employmentRate: 82,
    avgSalary: 850000,
    scholarships: true,
    features: ["Hostel", "Library", "Research Centers", "Sports", "Festivals"],
    deadline: "10/07/2025",
  },
  {
    id: 8,
    name: "BITS Pilani",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/BITS_Pilani_Campus.jpg",
    location: "Pilani, Rajasthan",
    field: "Engineering & Science",
    rating: "4.7",
    tuitionFee: 350000,
    acceptanceRate: 18,
    studentCount: 17000,
    description:
      "A top private university excelling in science, engineering, and entrepreneurship.",
    founded: 1964,
    ranking: 9,
    employmentRate: 90,
    avgSalary: 1200000,
    scholarships: true,
    features: ["Hostel", "Library", "Research Labs", "Clubs", "Sports Complex"],
    deadline: "20/06/2025",
  },
  {
    id: 9,
    name: "Jamia Millia Islamia",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Jamia_Millia_Islamia_Campus.jpg",
    location: "New Delhi",
    field: "Multidisciplinary",
    rating: "4.4",
    tuitionFee: 50000,
    acceptanceRate: 28,
    studentCount: 20000,
    description:
      "A central university with strengths in liberal arts, engineering, and research.",
    founded: 1920,
    ranking: 15,
    employmentRate: 83,
    avgSalary: 850000,
    scholarships: true,
    features: [
      "Hostel",
      "Library",
      "Cultural Clubs",
      "Sports",
      "Research Centers",
    ],
    deadline: "25/06/2025",
  },
  {
    id: 10,
    name: "University of Hyderabad",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/UoH_Campus_Hyderabad.jpg",
    location: "Hyderabad, Telangana",
    field: "Science & Arts",
    rating: "4.5",
    tuitionFee: 60000,
    acceptanceRate: 22,
    studentCount: 5000,
    description:
      "A leading research university with a focus on science, arts, and social sciences.",
    founded: 1974,
    ranking: 18,
    employmentRate: 84,
    avgSalary: 900000,
    scholarships: true,
    features: [
      "Hostel",
      "Library",
      "Sports Complex",
      "Research Centers",
      "Clubs",
    ],
    deadline: "05/07/2025",
  },
];

const fields = [
  "All",
  "Engineering",
  "Science & Engineering",
  "Liberal Arts",
  "Multidisciplinary",
  "Science & Arts",
];

const locations = [
  "All",
  "Bangalore",
  "Mumbai",
  "New Delhi",
  "Chennai",
  "Delhi",
  "Varanasi",
  "Pilani",
  "Hyderabad",
];

export default function Colleges() {
  const [colleges] = useState(indianColleges);
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
