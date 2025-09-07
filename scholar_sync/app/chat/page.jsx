"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Clock, Trash2 } from "lucide-react";

const chatHistory = [
  {
    id: 1,
    title: "Python Course Recommendations",
    date: "2024-01-15",
    messages: 5,
  },
  {
    id: 2,
    title: "MIT Computer Science Program",
    date: "2024-01-14",
    messages: 8,
  },
  {
    id: 3,
    title: "Software Engineering Internships",
    date: "2024-01-12",
    messages: 12,
  },
];

const sampleQuestions = [
  "What programming languages should I learn first?",
  "How do I prepare for computer science college?",
  "What are the best tech internships for beginners?",
  "Which online courses are most valuable for my career?",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm your personal career advisor. I can help you with course recommendations, college selection, career planning, and internship opportunities. What would you like to know?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatResponses = {
    "programming languages":
      "For beginners, I recommend starting with Python - it's beginner-friendly and versatile. JavaScript is also great for web development. If you're interested in mobile apps, consider learning Swift (iOS) or Kotlin (Android).",
    python:
      'Excellent choice! Python is perfect for beginners and used in data science, AI, web development, and automation. I recommend these courses: 1) "Python for Everybody" by University of Michigan, 2) "Complete Python Bootcamp" on Udemy, 3) "Learn Python" on Codecademy.',
    college:
      "For computer science, top schools include MIT, Stanford, Carnegie Mellon, and UC Berkeley. Consider factors like location, cost, research opportunities, and industry connections. Would you like specific information about any of these schools?",
    internship:
      "Great tech internships for beginners: 1) Google STEP Program, 2) Microsoft Explore, 3) Facebook University, 4) Amazon Future Engineer. Also check local startups and mid-size companies - they often provide more hands-on experience!",
    courses:
      "Based on current industry demands, I recommend: 1) Data Science & AI courses, 2) Cloud Computing (AWS/Azure), 3) Cybersecurity fundamentals, 4) Mobile app development, 5) UI/UX design. What field interests you most?",
    "career planning":
      "Career planning involves: 1) Self-assessment (skills, interests, values), 2) Exploring career options, 3) Setting short and long-term goals, 4) Building relevant skills, 5) Networking. What stage are you currently at?",
    default:
      "That's a great question! Could you be more specific? I can help with programming languages, college selection, internship opportunities, course recommendations, or career planning strategies.",
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      type: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const lowerInput = inputText.toLowerCase();
      let response = chatResponses.default;

      Object.keys(chatResponses).forEach((keyword) => {
        if (lowerInput.includes(keyword)) {
          response = chatResponses[keyword];
        }
      });

      const botMessage = {
        type: "bot",
        text: response,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);

    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const askSampleQuestion = (question) => {
    setInputText(question);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 border-b">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ask the Advisor
          </h1>
          <p className="text-gray-600">
            Get personalized guidance for your career and education journey
          </p>
        </motion.div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 h-[calc(100vh-132px)]">
        {/* Chat History Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 border-r">
          <div className="h-full p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Chat History
            </h2>
            <div className="space-y-3">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    {chat.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{chat.date}</span>
                    <span>{chat.messages} messages</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All Conversations
            </button>
          </div>
        </motion.div>

        {/* Main Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3">
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Career Advisor AI</h2>
                    <p className="text-sm opacity-90">
                      Ready to help with your career questions
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`flex items-start max-w-3xl ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-indigo-600 text-white ml-3"
                          : "bg-gray-200 text-gray-600 mr-3"
                      }`}>
                      {message.type === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-xl ${
                        message.type === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-900 rounded-bl-none"
                      }`}>
                      <p className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-2 flex items-center ${
                          message.type === "user"
                            ? "text-indigo-200"
                            : "text-gray-500"
                        }`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {message.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start">
                  <div className="flex items-start max-w-3xl">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 mr-3">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-900 rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sample Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-3">Try asking:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => askSampleQuestion(question)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors">
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your career, courses, colleges, or internships..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    rows="1"
                    style={{ minHeight: "44px", maxHeight: "120px" }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
