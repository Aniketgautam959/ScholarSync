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
  const categories = [
    "#Admissions",
    "#Scholarships",
    "#Engineering",
    "#PreMed",
    "#BusinessSchool",
    "#Internships",
    "#StudyAbroad",
    "#CareerAdvice",
  ];

  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    author: {
      name: faker.person.fullName(),
      avatar: `https://images.unsplash.com/photo-${
        1500000000000 + Math.floor(Math.random() * 500000000)
      }?w=40&h=40&fit=crop&crop=face`,
      verified: Math.random() > 0.7,
    },
    title: faker.lorem.sentence().slice(0, -1),
    content: faker.lorem.paragraphs(2),
    category: categories[Math.floor(Math.random() * categories.length)],
    type: postTypes[Math.floor(Math.random() * postTypes.length)],
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 25),
    timeAgo: `${Math.floor(Math.random() * 24)} hours ago`,
    tags: faker.lorem
      .words(3)
      .split(" ")
      .map((word) => `#${word}`),
    isLiked: Math.random() > 0.5,
  }));
};

const postTypes = ["Question", "Experience", "Resource", "Achievement"];

const trendingTopics = [
  { tag: "#Admissions", posts: 1243 },
  { tag: "#Scholarships", posts: 897 },
  { tag: "#Engineering", posts: 756 },
  { tag: "#PreMed", posts: 654 },
  { tag: "#BusinessSchool", posts: 543 },
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
          Community Discussions
        </h1>
        <p className="text-gray-600">
          Connect with peers, share experiences, and get advice from the
          community
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
                <span className="font-semibold text-gray-900">12,845</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posts Today</span>
                <span className="font-semibold text-gray-900">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Now</span>
                <span className="font-semibold text-gray-900">1,234</span>
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
                  placeholder="Search discussions..."
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
                Create New Post
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
