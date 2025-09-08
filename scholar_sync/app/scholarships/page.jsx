"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faker } from "@faker-js/faker";
import {
  Search,
  Filter,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Award,
  Bell,
  Link as LinkIcon,
  ChevronDown,
  Info,
  Megaphone,
  Clock,
} from "lucide-react";

// --- Data Generation ---
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const categories = [
  "SC",
  "ST",
  "OBC",
  "Minority",
  "EWS",
  "Disability",
  "General",
];
const classYears = [
  "Pre-Matric (Class 1-10)",
  "Post-Matric (Class 11-12)",
  "Undergraduate",
  "Postgraduate",
  "PhD",
];

const generateScholarships = () => {
  return [
    {
      id: 1,
      name: "AICTE Pragati Scholarship for Girls",
      logo: "https://img.icons8.com/color/96/scholarship.png",
      authority: {
        type: "Central",
        name: "AICTE, Ministry of Education",
      },
      eligibility: {
        classYear: "Undergraduate/Diploma",
        income: "Up to ₹8 Lakh p.a.",
        category: "General",
        region: "All India",
        gender: "Girls Only",
      },
      benefit: "₹50,000 per year",
      deadline: "2025-10-31T00:00:00.000Z",
      applicationPeriod: "01/08/2025 - 31/10/2025",
      applyLink: "https://scholarships.gov.in/",
      howToApply: [
        "Visit the NSP Portal.",
        "Register as a new user with Aadhaar details.",
        "Log in and fill out the scholarship application form.",
        "Upload income and education certificates.",
        "Submit before the deadline.",
      ],
      howToApplyHindi: [
        "NSP पोर्टल पर जाएं।",
        "आधार विवरण के साथ नए उपयोगकर्ता के रूप में पंजीकरण करें।",
        "लॉग इन करें और छात्रवृत्ति आवेदन पत्र भरें।",
        "आय और शिक्षा प्रमाणपत्र अपलोड करें।",
        "अंतिम तिथि से पहले सबमिट करें।",
      ],
      sourceLink: "https://www.aicte-india.org/",
      postedDate: "2025-09-01T00:00:00.000Z",
    },
    {
      id: 2,
      name: "AICTE Saksham Scholarship for Differently Abled Students",
      logo: "https://img.icons8.com/color/96/wheelchair.png",
      authority: {
        type: "Central",
        name: "AICTE, Ministry of Education",
      },
      eligibility: {
        classYear: "Undergraduate/Postgraduate",
        income: "Up to ₹8 Lakh p.a.",
        category: "Disability",
        region: "All India",
        gender: "All",
      },
      benefit: "₹50,000 per year",
      deadline: "2025-10-31T00:00:00.000Z",
      applicationPeriod: "01/08/2025 - 31/10/2025",
      applyLink: "https://scholarships.gov.in/",
      howToApply: [
        "Visit the NSP portal.",
        "Register and log in.",
        "Fill in details and upload disability certificate.",
        "Upload income and other documents.",
        "Submit application.",
      ],
      howToApplyHindi: [
        "NSP पोर्टल पर जाएं।",
        "पंजीकरण करें और लॉगिन करें।",
        "विवरण भरें और विकलांगता प्रमाणपत्र अपलोड करें।",
        "आय और अन्य दस्तावेज़ अपलोड करें।",
        "आवेदन सबमिट करें।",
      ],
      sourceLink: "https://www.aicte-india.org/",
      postedDate: "2025-09-02T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Ishan Uday Special Scholarship for NER",
      logo: "https://img.icons8.com/color/96/education.png",
      authority: {
        type: "Central",
        name: "UGC, Ministry of Education",
      },
      eligibility: {
        classYear: "Undergraduate",
        income: "Up to ₹4.5 Lakh p.a.",
        category: "General",
        region: "North-East India",
        gender: "All",
      },
      benefit: "₹5,400–₹7,800 per month",
      deadline: "2025-11-15T00:00:00.000Z",
      applicationPeriod: "01/09/2025 - 15/11/2025",
      applyLink: "https://scholarships.gov.in/",
      howToApply: [
        "Apply on NSP portal.",
        "Upload domicile and income certificate.",
        "Submit application.",
      ],
      howToApplyHindi: [
        "NSP पोर्टल पर आवेदन करें।",
        "डोमिसाइल और आय प्रमाण पत्र अपलोड करें।",
        "आवेदन सबमिट करें।",
      ],
      sourceLink: "https://www.ugc.gov.in/",
      postedDate: "2025-08-25T00:00:00.000Z",
    },
    {
      id: 4,
      name: "West Bengal Kanyashree Prakalpa",
      logo: "https://img.icons8.com/color/96/student-female.png",
      authority: {
        type: "State",
        name: "Government of West Bengal",
      },
      eligibility: {
        classYear: "Class 8-12",
        income: "Up to ₹1.2 Lakh p.a.",
        category: "General",
        region: "West Bengal",
        gender: "Girls Only",
      },
      benefit: "₹1,000–₹25,000 one-time grant",
      deadline: "2025-12-31T00:00:00.000Z",
      applicationPeriod: "01/07/2025 - 31/12/2025",
      applyLink: "https://wbkanyashree.gov.in/",
      howToApply: [
        "Collect form from school/institution.",
        "Fill and attach income certificate.",
        "Submit through head of institution.",
      ],
      howToApplyHindi: [
        "विद्यालय/संस्थान से फॉर्म प्राप्त करें।",
        "फॉर्म भरें और आय प्रमाण पत्र संलग्न करें।",
        "संस्थान के प्रधानाचार्य के माध्यम से जमा करें।",
      ],
      sourceLink: "https://wbkanyashree.gov.in/",
      postedDate: "2025-08-20T00:00:00.000Z",
    },
    {
      id: 5,
      name: "National Means-cum-Merit Scholarship (NMMSS)",
      logo: "https://img.icons8.com/color/96/medal.png",
      authority: {
        type: "Central",
        name: "Ministry of Education",
      },
      eligibility: {
        classYear: "Class 9-12",
        income: "Up to ₹3.5 Lakh p.a.",
        category: "General",
        region: "All India",
        gender: "All",
      },
      benefit: "₹12,000 per year",
      deadline: "2025-09-30T00:00:00.000Z",
      applicationPeriod: "01/07/2025 - 30/09/2025",
      applyLink: "https://scholarships.gov.in/",
      howToApply: [
        "Apply via NSP portal.",
        "Pass selection test conducted by state/UT.",
      ],
      howToApplyHindi: [
        "NSP पोर्टल से आवेदन करें।",
        "राज्य/केंद्रशासित प्रदेश द्वारा आयोजित परीक्षा पास करें।",
      ],
      sourceLink: "https://www.education.gov.in/",
      postedDate: "2025-08-10T00:00:00.000Z",
    },
  ];
};


const latestUpdates = [
  {
    id: 1,
    text: "Deadline for National Merit Scholarship extended to Oct 31, 2025.",
    date: "2 days ago",
  },
  {
    id: 2,
    text: "Maharashtra State Government announces new scheme for EWS students.",
    date: "5 days ago",
  },
  {
    id: 3,
    text: "Verification process for Post-Matric scholarships has begun.",
    date: "1 week ago",
  },
];

// --- Helper Components ---
const Countdown = ({ deadline }) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [color, setColor] = useState("text-green-600");

  useEffect(() => {
    const calculateDaysLeft = () => {
      const diff = new Date(deadline).getTime() - new Date().getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
      if (days <= 7) setColor("text-red-600");
      else if (days <= 30) setColor("text-orange-600");
      else setColor("text-green-600");
    };
    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <span className={`font-bold ${color}`}>
      {daysLeft > 0 ? `${daysLeft} days left` : "Deadline Passed"}
    </span>
  );
};

const ScholarshipCard = ({ scholarship }) => {
  const [isHowToApplyOpen, setIsHowToApplyOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={scholarship.logo}
            alt={scholarship.authority.name}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            }}
          />
          <div>
            <h3 className="font-serif text-lg text-gray-800">
              {scholarship.name}
            </h3>
            <p className="text-sm text-gray-600">
              {scholarship.authority.name}
            </p>
          </div>
        </div>
        <button
          onClick={() => alert("Reminder set for this scholarship!")}
          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Core Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-gray-500">Benefit</p>
            <p className="font-semibold text-gray-800">{scholarship.benefit}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Users className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-semibold text-gray-800">
              {scholarship.eligibility.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
          <Calendar className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-gray-500">Deadline</p>
            <Countdown deadline={scholarship.deadline} />
          </div>
        </div>
      </div>

      {/* Eligibility Details */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Eligibility</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <Award className="w-3 h-3" /> {scholarship.eligibility.classYear}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <DollarSign className="w-3 h-3" /> {scholarship.eligibility.income}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <MapPin className="w-3 h-3" /> {scholarship.eligibility.region}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <Users className="w-3 h-3" /> Gender:{" "}
            {scholarship.eligibility.gender}
          </span>
        </div>
      </div>

      {/* How to Apply Accordion */}
      <div className="mb-4">
        <button
          onClick={() => setIsHowToApplyOpen(!isHowToApplyOpen)}
          className="w-full flex justify-between items-center py-2 text-left font-semibold text-gray-800">
          <span>How to Apply</span>
          <motion.div animate={{ rotate: isHowToApplyOpen ? 180 : 0 }}>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isHowToApplyOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden">
              <div className="pt-2 text-sm text-gray-600 space-y-2">
                <ol className="list-decimal list-inside space-y-1">
                  {scholarship.howToApply.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
                <div className="mt-2 p-2 bg-indigo-50 rounded-md">
                  <h5 className="font-semibold text-indigo-800">हिंदी में</h5>
                  <ol className="list-decimal list-inside space-y-1 text-indigo-700">
                    {scholarship.howToApplyHindi.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <a
          href={scholarship.sourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600">
          <Info className="w-3 h-3" /> Source
        </a>
        <a
          href={scholarship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm flex items-center gap-2">
          Apply Now <LinkIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
export default function Scholarships() {
  const [scholarships] = useState(generateScholarships());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    state: "All",
    deadline: "All",
  });
  const [sortBy, setSortBy] = useState("deadline");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAndSortedScholarships = useMemo(() => {
    return scholarships
      .filter((s) => {
        const searchMatch = s.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const categoryMatch =
          filters.category === "All" ||
          s.eligibility.category === filters.category;
        const stateMatch =
          filters.state === "All" ||
          s.authority.name.includes(filters.state) ||
          s.eligibility.region === "All India";

        const deadlineDate = new Date(s.deadline);
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.setDate(now.getDate() + 30));
        now.setDate(now.getDate() - 30); // Reset date

        let deadlineMatch = true;
        if (filters.deadline === "soon") {
          deadlineMatch = deadlineDate <= thirtyDaysFromNow;
        } else if (filters.deadline === "passed") {
          deadlineMatch = deadlineDate < new Date();
        }

        return searchMatch && categoryMatch && stateMatch && deadlineMatch;
      })
      .sort((a, b) => {
        if (sortBy === "deadline")
          return new Date(a.deadline) - new Date(b.deadline);
        if (sortBy === "postedDate")
          return new Date(b.postedDate) - new Date(a.postedDate);
        return 0;
      });
  }, [scholarships, searchTerm, filters, sortBy]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800 mb-2">
          Scholarships, Subsidies & Aid
        </h1>
        <p className="text-gray-600">
          Your central hub for all government financial aid opportunities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="All">All States</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                name="deadline"
                value={filters.deadline}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="All">All Deadlines</option>
                <option value="soon">Ending Soon</option>
                <option value="passed">Deadline Passed</option>
              </select>
            </div>
          </div>

          {/* Scholarship List */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredAndSortedScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                />
              ))}
            </AnimatePresence>
            {filteredAndSortedScholarships.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="font-semibold">
                  No scholarships match your criteria.
                </p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Megaphone className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Latest Updates
              </h2>
            </div>
            <div className="space-y-4">
              {latestUpdates.map((update) => (
                <div key={update.id} className="text-sm">
                  <p className="text-gray-800">{update.text}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {update.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sort By
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option value="deadline">Deadline</option>
              <option value="postedDate">Recently Posted</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
