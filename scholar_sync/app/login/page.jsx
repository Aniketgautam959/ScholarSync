"use client";

import { SignIn, SignUp } from '@clerk/nextjs';
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">SS</span>
          </motion.div>
          <h2 className="mt-6 font-serif text-3xl text-gray-800">
            {isSignIn ? "Sign in to ScholarSync" : "Create your ScholarSync account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8">
          {isSignIn ? (
            <SignIn 
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
                  card: 'shadow-xl border-0',
                  headerTitle: 'text-gray-800',
                  headerSubtitle: 'text-gray-600',
                  socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                  formFieldInput: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
                  footerActionLink: 'text-indigo-600 hover:text-indigo-500'
                }
              }}
            />
          ) : (
            <SignUp 
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
                  card: 'shadow-xl border-0',
                  headerTitle: 'text-gray-800',
                  headerSubtitle: 'text-gray-600',
                  socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                  formFieldInput: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
                  footerActionLink: 'text-indigo-600 hover:text-indigo-500'
                }
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
