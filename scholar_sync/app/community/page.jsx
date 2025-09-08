"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Share2,
  Hash,
  Search,
  Filter,
  TrendingUp,
  Users,
  Plus,
  X,
} from "lucide-react";
import { faker } from "@faker-js/faker";

// Generate dummy posts
const generatePosts = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: "Dr. Rajesh Kumar",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "JEE Main 2024: Last Month Preparation Strategy for IIT Aspirants",
      content:
        "As we approach the final month before JEE Main 2024, here's a comprehensive strategy that has helped 1000+ students crack the exam. Focus on NCERT concepts, practice previous year papers, and maintain a healthy study routine. Remember, consistency beats intensity!",
      category: "#JEEPreparation",
      type: "Resource",
      likes: 234,
      comments: 45,
      shares: 12,
      timeAgo: "2 hours ago",
      tags: ["#JEE2024", "#IITPreparation", "#StudyTips"],
      isLiked: true,
    },
    {
      id: 2,
      author: {
        name: "Priya Sharma",
        avatar:
          "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        verified: false,
      },
      title: "My IIT Delhi Experience: From Kota to Campus Life",
      content:
        "After 2 years of rigorous preparation in Kota, I finally made it to IIT Delhi! The transition was challenging but incredibly rewarding. The professors are amazing, the peer group is diverse, and the opportunities are endless. Happy to answer any questions about campus life!",
      category: "#CollegeLife",
      type: "Experience",
      likes: 189,
      comments: 67,
      shares: 23,
      timeAgo: "5 hours ago",
      tags: ["#IITDelhi", "#CampusLife", "#StudentExperience"],
      isLiked: false,
    },
    {
      id: 3,
      author: {
        name: "Arjun Patel",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "Government Job vs Private Sector: Which Path to Choose?",
      content:
        "I'm confused between preparing for UPSC Civil Services and joining a tech company after my engineering. Both have their pros and cons. Government jobs offer job security and social impact, while private sector offers better pay and growth opportunities. What would you suggest?",
      category: "#CareerGuidance",
      type: "Question",
      likes: 156,
      comments: 89,
      shares: 18,
      timeAgo: "8 hours ago",
      tags: ["#UPSC", "#CareerChoice", "#GovernmentJobs"],
      isLiked: true,
    },
    {
      id: 4,
      author: {
        name: "Dr. Sneha Reddy",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title:
        "NEET 2024: Biology Preparation Tips from a Medical College Professor",
      content:
        "As a professor at AIIMS Delhi, I've seen many students struggle with Biology in NEET. The key is understanding concepts rather than rote learning. Focus on NCERT thoroughly, practice diagrams, and solve previous year papers. Remember, 50% of NEET is Biology!",
      category: "#NEETGuidance",
      type: "Resource",
      likes: 312,
      comments: 78,
      shares: 34,
      timeAgo: "12 hours ago",
      tags: ["#NEET2024", "#Biology", "#MedicalPreparation"],
      isLiked: false,
    },
    {
      id: 5,
      author: {
        name: "Rahul Kumar",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      title: "How I Got Selected for ISRO Scientist/Engineer Position",
      content:
        "After completing my B.Tech from NIT Trichy, I prepared for 6 months for ISRO recruitment. The written test focuses on core engineering subjects and general awareness. The interview panel was very friendly and asked about my projects. Hard work pays off!",
      category: "#GovernmentJobs",
      type: "Achievement",
      likes: 445,
      comments: 123,
      shares: 56,
      timeAgo: "1 day ago",
      tags: ["#ISRO", "#GovernmentJob", "#SuccessStory"],
      isLiked: true,
    },
    {
      id: 6,
      author: {
        name: "Ananya Singh",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      title: "Scholarship Opportunities for Indian Students: Complete Guide",
      content:
        "There are numerous scholarships available for Indian students - from government schemes like National Scholarship Portal to private foundations. I've compiled a comprehensive list with application deadlines and eligibility criteria. Education should never be limited by financial constraints!",
      category: "#Scholarships",
      type: "Resource",
      likes: 278,
      comments: 45,
      shares: 67,
      timeAgo: "1 day ago",
      tags: ["#Scholarships", "#EducationFunding", "#StudentSupport"],
      isLiked: false,
    },
    {
      id: 7,
      author: {
        name: "Vikram Joshi",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "UPSC Preparation: My Journey from Engineering to Civil Services",
      content:
        "After working as a software engineer for 3 years, I decided to pursue my dream of serving the nation through civil services. The preparation was challenging but fulfilling. Here's my strategy for Prelims, Mains, and Interview. Remember, it's a marathon, not a sprint!",
      category: "#UPSCPreparation",
      type: "Experience",
      likes: 389,
      comments: 156,
      shares: 89,
      timeAgo: "2 days ago",
      tags: ["#UPSC", "#CivilServices", "#CareerChange"],
      isLiked: true,
    },
    {
      id: 8,
      author: {
        name: "Kavya Nair",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      title: "IIT vs NIT vs IIIT: Which is Better for Computer Science?",
      content:
        "I've received offers from IIT Bombay CSE, NIT Trichy CSE, and IIIT Hyderabad CSE. All are great options but I'm confused about which one to choose. IIT has the brand value, NIT has good ROI, and IIIT has specialized focus. What factors should I consider?",
      category: "#IITAdmissions",
      type: "Question",
      likes: 167,
      comments: 98,
      shares: 23,
      timeAgo: "2 days ago",
      tags: ["#IIT", "#NIT", "#IIIT", "#ComputerScience"],
      isLiked: false,
    },
    {
      id: 9,
      author: {
        name: "Dr. Rohit Gupta",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "Mental Health and Academic Pressure: A Teacher's Perspective",
      content:
        "As an educator for 15 years, I've seen many bright students crumble under academic pressure. It's crucial to maintain a balance between studies and mental well-being. Parents and teachers must work together to create a supportive environment. Your health matters more than any exam!",
      category: "#CareerGuidance",
      type: "Resource",
      likes: 234,
      comments: 67,
      shares: 45,
      timeAgo: "3 days ago",
      tags: ["#MentalHealth", "#AcademicPressure", "#StudentWellbeing"],
      isLiked: true,
    },
    {
      id: 10,
      author: {
        name: "Divya Agarwal",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      title: "My Experience with GATE Preparation and PSU Recruitment",
      content:
        "After completing my M.Tech, I prepared for GATE and got selected in BHEL through PSU recruitment. The process was different from campus placements but equally rewarding. Here's how I prepared for both GATE and PSU interviews. Government sector offers great stability!",
      category: "#GovernmentJobs",
      type: "Experience",
      likes: 198,
      comments: 56,
      shares: 34,
      timeAgo: "3 days ago",
      tags: ["#GATE", "#PSU", "#BHEL", "#GovernmentSector"],
      isLiked: false,
    },
    {
      id: 11,
      author: {
        name: "Amit Shah",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "JEE Advanced 2024: Common Mistakes to Avoid in Physics",
      content:
        "Having taught Physics for 12 years, I've identified the most common mistakes students make in JEE Advanced. Conceptual clarity is key - don't just memorize formulas. Practice problem-solving under time pressure and focus on NCERT concepts. Physics can be your scoring subject!",
      category: "#JEEPreparation",
      type: "Resource",
      likes: 267,
      comments: 89,
      shares: 56,
      timeAgo: "4 days ago",
      tags: ["#JEEAdvanced", "#Physics", "#ExamStrategy"],
      isLiked: true,
    },
    {
      id: 12,
      author: {
        name: "Pooja Mehta",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      title: "How to Choose the Right Engineering Branch: A Student's Guide",
      content:
        "I was confused between CSE, ECE, and Mechanical Engineering. After talking to seniors and researching job prospects, I chose CSE and it was the best decision! Here's a comprehensive guide to help you choose the right branch based on your interests and career goals.",
      category: "#CareerGuidance",
      type: "Resource",
      likes: 189,
      comments: 78,
      shares: 45,
      timeAgo: "4 days ago",
      tags: ["#EngineeringBranches", "#CareerChoice", "#StudentAdvice"],
      isLiked: false,
    },
    {
      id: 13,
      author: {
        name: "Suresh Kumar",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "Banking Sector Jobs: IBPS vs SBI vs RBI - Which to Choose?",
      content:
        "As a banking professional with 10 years of experience, I often get asked about different banking exams. Each has its own advantages - IBPS offers more vacancies, SBI has better perks, and RBI has higher prestige. Choose based on your career aspirations and risk appetite.",
      category: "#GovernmentJobs",
      type: "Resource",
      likes: 156,
      comments: 67,
      shares: 34,
      timeAgo: "5 days ago",
      tags: ["#BankingJobs", "#IBPS", "#SBI", "#RBI"],
      isLiked: true,
    },
    {
      id: 14,
      author: {
        name: "Deepika Iyer",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      title: "My IIT Bombay Journey: From Small Town to Silicon Valley",
      content:
        "Coming from a small town in Kerala, IIT Bombay opened doors I never knew existed. The exposure, opportunities, and peer group were incredible. After graduation, I worked in India for 2 years before moving to Silicon Valley. IITs truly transform lives!",
      category: "#CollegeLife",
      type: "Achievement",
      likes: 423,
      comments: 134,
      shares: 78,
      timeAgo: "5 days ago",
      tags: ["#IITBombay", "#SuccessStory", "#InternationalCareer"],
      isLiked: false,
    },
    {
      id: 15,
      author: {
        name: "Rajesh Verma",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      title: "NEET 2024: Last Month Strategy for Medical Aspirants",
      content:
        "With NEET 2024 just around the corner, here's a proven strategy that has helped 500+ students get into top medical colleges. Focus on NCERT Biology, practice Chemistry numericals, and maintain accuracy in Physics. Remember, every mark counts in NEET!",
      category: "#NEETGuidance",
      type: "Resource",
      likes: 298,
      comments: 89,
      shares: 67,
      timeAgo: "6 days ago",
      tags: ["#NEET2024", "#MedicalPreparation", "#StudyStrategy"],
      isLiked: true,
    },
  ];

  return posts;
};

const postTypes = ["Question", "Experience", "Resource", "Achievement"];

const trendingTopics = [
  { tag: "#JEEPreparation", posts: 1243 },
  { tag: "#NEETGuidance", posts: 897 },
  { tag: "#IITAdmissions", posts: 756 },
  { tag: "#UPSCPreparation", posts: 654 },
  { tag: "#GovernmentJobs", posts: 543 },
];

export default function Community() {
  const [posts] = useState(generatePosts());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "#Admissions",
    type: "Question",
    tags: [],
    currentTag: "",
  });

  const categories = [
    "All",
    "Questions",
    "Experiences",
    "Resources",
    "Achievements",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.type === selectedCategory.slice(0, -1);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800 mb-2">
          Indian Education Community
        </h1>
        <p className="text-gray-600">
          Connect with students, teachers, and alumni for career guidance, exam
          preparation, and educational experiences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6">
          {/* New Post Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddPostModalOpen(true)}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            New Post
          </motion.button>

          {/* Trending Topics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Trending Topics
              </h2>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-indigo-600 font-medium text-sm">
                    {topic.tag}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {topic.posts} posts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Community Stats
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Members</span>
                <span className="font-semibold text-gray-900">2,45,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posts Today</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Now</span>
                <span className="font-semibold text-gray-900">8,456</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for JEE, NEET, UPSC, career advice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900">
                          {post.author.name}
                        </h3>
                        {post.author.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full ml-2 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.type === "Question"
                          ? "bg-blue-100 text-blue-800"
                          : post.type === "Experience"
                          ? "bg-green-100 text-green-800"
                          : post.type === "Resource"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-orange-100 text-orange-800"
                      }`}>
                      {post.type}
                    </span>
                    <span className="text-indigo-600 font-medium text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked
                          ? "text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      }`}>
                      <Heart
                        className={`w-5 h-5 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {post.comments}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Read more
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Posts
            </button>
          </div>
        </motion.div>
      </div>

      {/* Add Post Modal */}
      {isAddPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl text-gray-800">
                Share Your Educational Experience
              </h2>
              <button
                onClick={() => setIsAddPostModalOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Handle form submission
                setIsAddPostModalOpen(false);
              }}
              className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  placeholder="Enter your post title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Post Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Type
                </label>
                <select
                  value={newPost.type}
                  onChange={(e) =>
                    setNewPost({ ...newPost, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {postTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {categories.slice(1).map((category) => (
                    <option key={category} value={"#" + category.slice(0, -1)}>
                      {"#" + category.slice(0, -1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (press Enter to add)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newPost.currentTag || ""}
                    onChange={(e) =>
                      setNewPost({ ...newPost, currentTag: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        e.preventDefault();
                        const tag = e.target.value.trim();
                        const formattedTag = tag.startsWith("#")
                          ? tag
                          : "#" + tag;
                        if (!newPost.tags.includes(formattedTag)) {
                          setNewPost({
                            ...newPost,
                            tags: [...newPost.tags, formattedTag],
                            currentTag: "",
                          });
                        }
                      }
                    }}
                    placeholder="Type a tag and press Enter (e.g. #college)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            setNewPost({
                              ...newPost,
                              tags: newPost.tags.filter((_, i) => i !== index),
                            });
                          }}
                          className="ml-2 text-indigo-600 hover:text-indigo-800">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddPostModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Create Post
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
