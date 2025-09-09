"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  School,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  CheckCircle,
  Clock,
  Plus,
  User,
  TrendingUp,
  Users,
  Star,
  BookOpen,
} from "lucide-react";
import { faker } from "@faker-js/faker";
import DashboardCard from "../components/DashboardCard";
import OnboardingModal from "../components/OnboardingModal";

const stats = [
  {
    name: "Profile Completion",
    value: "78%",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    name: "Career Matches",
    value: "12",
    icon: Award,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    name: "Connections",
    value: "45",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    name: "Courses Completed",
    value: "8",
    icon: BookOpen,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const suggestedEducators = Array.from({ length: 2 }, () => ({
  name: faker.person.fullName(),
  specialty: faker.person.jobArea(),
  avatar: `https://images.unsplash.com/photo-${
    1500000000000 + Math.floor(Math.random() * 500000000)
  }?w=40&h=40&fit=crop&crop=face`,
}));

const internships = {
  suggested: [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TCS",
      logo: "https://logo.clearbit.com/tcs.com",
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Infosys",
      logo: "https://logo.clearbit.com/infosys.com",
    },
  ],
  applied: [
    {
      id: 3,
      title: "Government Digital India Intern",
      company: "Ministry of Electronics & IT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Government_of_India_logo.svg/200px-Government_of_India_logo.svg.png",
    },
  ],
};

const scholarships = {
  suggested: [
    {
      id: 1,
      name: "AICTE Pragati Scholarship for Girls",
      authority: "AICTE, Ministry of Education",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Government_of_India_logo.svg/200px-Government_of_India_logo.svg.png",
    },
    {
      id: 2,
      name: "National Means-cum-Merit Scholarship",
      authority: "Ministry of Education, Govt. of India",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Government_of_India_logo.svg/200px-Government_of_India_logo.svg.png",
    },
  ],
  applied: [
    {
      id: 3,
      name: "Ishan Uday Special Scholarship for NER",
      authority: "UGC, Ministry of Education",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Government_of_India_logo.svg/200px-Government_of_India_logo.svg.png",
    },
  ],
};

const recommendations = [
  {
    type: "Course",
    title: "Advanced Data Science with Python",
    provider: "IIT Madras Online",
    rating: 4.8,
    duration: "12 weeks",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
  },
  {
    type: "College",
    title: "Computer Science Program",
    provider: "IIT Delhi",
    rating: 4.9,
    duration: "4 years",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
  },
  {
    type: "Internship",
    title: "Software Engineering Intern",
    provider: "TCS Digital",
    rating: 4.7,
    duration: "3 months",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=100&h=100&fit=crop",
  },
];

const recentActivity = [
  {
    action: "Completed Python Fundamentals quiz",
    time: "2 hours ago",
    icon: BookOpen,
  },
  {
    action: "Connected with Dr. Priya Sharma (IIT Delhi)",
    time: "1 day ago",
    icon: Users,
  },
  {
    action: "Applied to IIT Delhi CS Program",
    time: "3 days ago",
    icon: Award,
  },
  {
    action: "Joined #GovernmentScholarships discussion",
    time: "1 week ago",
    icon: Users,
  },
];

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding when user first lands on dashboard
  useEffect(() => {
    // Check if user has completed onboarding (for now, always show it)
    // In a real app, you'd check localStorage or user profile
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    // Mark onboarding as completed
    localStorage.setItem("onboardingCompleted", "true");
  };

  const resetOnboarding = () => {
    localStorage.removeItem("onboardingCompleted");
    setShowOnboarding(true);
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl text-gray-800 mt-2">
                Welcome back, Priya!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your educational journey today.
              </p>
            </div>
            {/* Test button - remove in production */}
            <button
              onClick={resetOnboarding}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Reset Onboarding
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="font-serif text-2xl text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personalized Recommendations and Internships/Scholarships */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personalized Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-gray-800 mt-2">
                    Personalized Recommendations
                  </h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {recommendations.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                            {item.type}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600">{item.provider}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {item.duration}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Internships & Scholarships - Stacked Vertically */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6">
              <DashboardCard
                icon={Briefcase}
                title="Internships"
                viewAllLink="/internships">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Suggested for you
                  </h3>
                  {internships.suggested.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logo}
                          alt={item.company}
                          className="w-8 h-8 rounded-lg object-contain"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.company}
                          </p>
                        </div>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Applied
                  </h3>
                  {internships.applied.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logo}
                          alt={item.company}
                          className="w-8 h-8 rounded-lg object-contain"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.company}
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </DashboardCard>

              <DashboardCard
                icon={Award}
                title="Scholarships"
                viewAllLink="/scholarships">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Suggested for you
                  </h3>
                  {scholarships.suggested.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logo}
                          alt={item.authority}
                          className="w-8 h-8 rounded-lg object-contain bg-white p-1"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/32";
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.authority}
                          </p>
                        </div>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Applied
                  </h3>
                  {scholarships.applied.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logo}
                          alt={item.authority}
                          className="w-8 h-8 rounded-lg object-contain bg-white p-1"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/32";
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.authority}
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </motion.div>
          </div>

          {/* Right Column - Recent Activity and Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-serif text-2xl text-gray-800 mt-2 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h2 className="font-serif text-2xl text-gray-800 mt-2 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Complete Profile
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Add missing information to get better recommendations
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Take Assessment
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Discover your strengths and career preferences
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Book Consultation
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Schedule a session with our career experts
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* </div> */}
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
      />
    </>
  );
}
