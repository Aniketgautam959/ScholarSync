"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Search,
  Filter,
  ExternalLink,
  Bookmark,
  Star,
} from "lucide-react";
import { faker } from "@faker-js/faker";

// Generate dummy internships
const generateInternships = () => {
  const domains = [
    "Engineering",
    "Computer Science",
    "Data Science",
    "Design",
    "Marketing",
    "Finance",
    "Business",
    "Research",
    "Healthcare",
    "Media",
  ];

  const companies = [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Meta",
    "Netflix",
    "Tesla",
    "Spotify",
    "Adobe",
    "Salesforce",
    "Uber",
    "Airbnb",
    "Twitter",
    "LinkedIn",
    "Intel",
    "NVIDIA",
    "IBM",
    "Oracle",
    "Cisco",
    "Samsung",
  ];

  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "Los Angeles, CA",
    "Chicago, IL",
    "Remote",
    "London, UK",
    "Toronto, CA",
  ];

  const workTypes = ["Remote", "On-site", "Hybrid"];
  const durations = ["Summer 2024", "3 months", "6 months", "Fall 2024"];

  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `${domains[Math.floor(Math.random() * domains.length)]} Intern`,
    company: companies[Math.floor(Math.random() * companies.length)],
    logo: `https://logo.clearbit.com/${companies[
      Math.floor(Math.random() * companies.length)
    ]
      .toLowerCase()
      .replace(" ", "")}.com`,
    location: locations[Math.floor(Math.random() * locations.length)],
    domain: domains[Math.floor(Math.random() * domains.length)],
    workType: workTypes[Math.floor(Math.random() * workTypes.length)],
    duration: durations[Math.floor(Math.random() * durations.length)],
    stipend: Math.random() > 0.3 ? Math.floor(Math.random() * 3000) + 1000 : 0,
    description: faker.lorem.paragraph(),
    requirements: faker.lorem
      .sentences(3)
      .split(".")
      .slice(0, 3)
      .map((req) => req.trim())
      .filter((req) => req),
    posted: `${Math.floor(Math.random() * 7) + 1} days ago`,
    applicants: Math.floor(Math.random() * 500) + 50,
    deadline: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString(),
    tags: faker.lorem
      .words(4)
      .split(" ")
      .map((word) => `#${word.charAt(0).toUpperCase() + word.slice(1)}`),
    featured: Math.random() > 0.7,
    rating: (4.0 + Math.random() * 1).toFixed(1),
    benefits: [
      "Learning Opportunities",
      "Mentorship",
      "Certificate",
      "Networking",
    ].slice(0, Math.floor(Math.random() * 4) + 1),
  }));
};

const domains = [
  "All",
  "Engineering",
  "Computer Science",
  "Data Science",
  "Design",
  "Marketing",
  "Finance",
  "Business",
];
const workTypes = ["All", "Remote", "On-site", "Hybrid"];

export default function Internships() {
  const [internships] = useState(generateInternships());
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedWorkType, setSelectedWorkType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInternships = internships
    .filter((internship) => {
      const matchesDomain =
        selectedDomain === "All" || internship.domain === selectedDomain;
      const matchesWorkType =
        selectedWorkType === "All" || internship.workType === selectedWorkType;
      const matchesSearch =
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.domain.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDomain && matchesWorkType && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return parseInt(a.posted) - parseInt(b.posted);
        case "stipend":
          return b.stipend - a.stipend;
        case "applicants":
          return a.applicants - b.applicants;
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
          Internship & Job Opportunities
        </h1>
        <p className="text-gray-600">
          Discover amazing internships and entry-level positions across various
          domains
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
              placeholder="Search internships by title, company, or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              {workTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="recent">Most Recent</option>
              <option value="stipend">Highest Stipend</option>
              <option value="applicants">Fewest Applicants</option>
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
          Showing {filteredInternships.length} internship
          {filteredInternships.length !== 1 ? "s" : ""}
          {selectedDomain !== "All" && ` in ${selectedDomain}`}
        </p>
      </motion.div>

      {/* Internships List */}
      <div className="space-y-6">
        {filteredInternships.map((internship, index) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-lg transition-all duration-300 ${
              internship.featured
                ? "border-indigo-200 bg-gradient-to-r from-indigo-50 to-white"
                : "border-gray-200"
            }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="relative">
                  <img
                    src={internship.logo}
                    alt={internship.company}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        internship.company
                      )}&background=6366f1&color=fff&size=48`;
                    }}
                  />
                  {internship.featured && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-2 h-2 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-xl text-gray-800">
                      {internship.title}
                    </h3>
                    {internship.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-indigo-600 font-semibold">
                    {internship.company}
                  </p>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{internship.location}</span>
                    <span className="mx-2">•</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        internship.workType === "Remote"
                          ? "bg-green-100 text-green-800"
                          : internship.workType === "Hybrid"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {internship.workType}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button className="text-gray-400 hover:text-gray-600 mb-2">
                  <Bookmark className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-500">
                  Posted {internship.posted}
                </p>
              </div>
            </div>

            {/* Domain and Duration */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {internship.domain}
              </span>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {internship.duration}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-2">
              {internship.description}
            </p>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Key Requirements:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {internship.requirements.slice(0, 2).map((req, reqIndex) => (
                  <li key={reqIndex} className="flex items-start">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {internship.tags.slice(0, 4).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Benefits */}
            {internship.benefits.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Benefits:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {internship.benefits.map((benefit, benefitIndex) => (
                    <span
                      key={benefitIndex}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {internship.stipend > 0
                      ? `$${internship.stipend}/month`
                      : "Unpaid"}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {internship.applicants} applicants
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    Deadline: {internship.deadline}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  <ExternalLink className="w-4 h-4 mr-1 inline" />
                  Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm">
                  Apply Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Opportunities
        </button>
      </div>
    </div>
  );
}
