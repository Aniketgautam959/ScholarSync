"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const OnboardingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    educationLevel: "",
    boardType: "",
    mediumOfInstruction: "",
    location: {
      pincode: "",
      district: "",
      state: "",
    },
    subjectInterests: [],
    activityTypes: [],
    careerGoal: "",
    courseSelectionFactors: [],
    locationPreference: "",
    needsFinancialAid: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        educationLevel: "",
        boardType: "",
        mediumOfInstruction: "",
        location: {
          pincode: "",
          district: "",
          state: "",
        },
        subjectInterests: [],
        activityTypes: [],
        careerGoal: "",
        courseSelectionFactors: [],
        locationPreference: "",
        needsFinancialAid: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateCurrentStep = () => {
    let stepErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.educationLevel)
          stepErrors.educationLevel = "Please select your education level";
        if (!formData.boardType)
          stepErrors.boardType = "Please select your board";
        if (!formData.mediumOfInstruction)
          stepErrors.mediumOfInstruction =
            "Please select medium of instruction";
        if (!formData.location.pincode)
          stepErrors.pincode = "Please enter your pincode";
        break;
      case 2:
        if (formData.subjectInterests.length === 0)
          stepErrors.subjectInterests =
            "Please select at least one subject interest";
        if (formData.activityTypes.length === 0)
          stepErrors.activityTypes = "Please select at least one activity type";
        break;
      case 3:
        if (!formData.careerGoal)
          stepErrors.careerGoal = "Please select your career goal preference";
        if (formData.courseSelectionFactors.length === 0)
          stepErrors.courseSelectionFactors =
            "Please select at least one course selection factor";
        break;
      case 4:
        if (!formData.locationPreference)
          stepErrors.locationPreference =
            "Please select your location preference";
        if (!formData.needsFinancialAid)
          stepErrors.needsFinancialAid =
            "Please select if you need financial aid";
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    // Dummy submission - just log data and show success
    console.log("Onboarding completed with data:", formData);

    setTimeout(() => {
      alert(
        "Onboarding completed successfully! Check console for collected data."
      );
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-800">Basic Information</h2>

      {/* Education Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What is your current class/education level?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "CLASS_10", value: "class_10", label: "Class 10" },
            { key: "CLASS_12", value: "class_12", label: "Class 12" },
            {
              key: "COMPLETED_12TH",
              value: "completed_12th",
              label: "Completed 12th",
            },
            { key: "GAP_YEAR", value: "gap_year", label: "Gap Year" },
          ].map(({ key, value, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleInputChange("educationLevel", value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                formData.educationLevel === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.educationLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.educationLevel}</p>
        )}
      </div>

      {/* Board Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Which board/medium are you studying in?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["CBSE", "ICSE", "STATE_BOARD"].map((board) => (
            <button
              key={board}
              type="button"
              onClick={() =>
                handleInputChange("boardType", board.toLowerCase())
              }
              className={`p-3 text-center border rounded-lg transition-colors ${
                formData.boardType === board.toLowerCase()
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {board}
            </button>
          ))}
        </div>
        {errors.boardType && (
          <p className="mt-1 text-sm text-red-600">{errors.boardType}</p>
        )}
      </div>

      {/* Medium of Instruction */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Medium of instruction:
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["HINDI", "ENGLISH", "OTHER"].map((medium) => (
            <button
              key={medium}
              type="button"
              onClick={() =>
                handleInputChange("mediumOfInstruction", medium.toLowerCase())
              }
              className={`p-3 text-center border rounded-lg transition-colors ${
                formData.mediumOfInstruction === medium.toLowerCase()
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {medium.charAt(0).toUpperCase() + medium.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        {errors.mediumOfInstruction && (
          <p className="mt-1 text-sm text-red-600">
            {errors.mediumOfInstruction}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Where are you located? (So we can suggest nearby colleges)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Pin code"
              value={formData.location.pincode}
              onChange={(e) => handleLocationChange("pincode", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="District"
              value={formData.location.district}
              onChange={(e) => handleLocationChange("district", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              value={formData.location.state}
              onChange={(e) => handleLocationChange("state", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-800">
        Interests & Aptitude
      </h2>

      {/* Subject Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Which subjects do you enjoy the most in school? (Select multiple)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "science_experiments", label: "Science & Experiments" },
            { value: "mathematics", label: "Mathematics & Problem Solving" },
            { value: "arts", label: "Reading, Writing & Arts" },
            { value: "commerce", label: "Business & Commerce" },
            { value: "technology", label: "Computers & Technology" },
            {
              value: "social_service",
              label: "Social Service / Public Sector",
            },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleMultiSelect("subjectInterests", value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                formData.subjectInterests.includes(value)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.subjectInterests && (
          <p className="mt-1 text-sm text-red-600">{errors.subjectInterests}</p>
        )}
      </div>

      {/* Activity Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What type of activities excite you more?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "research_learning", label: "Research & Learning" },
            { value: "creative_artistic", label: "Creative & Artistic Work" },
            {
              value: "business_management",
              label: "Business & Money Management",
            },
            {
              value: "helping_people",
              label: "Helping People / Social Impact",
            },
            { value: "leadership", label: "Leadership / Management" },
            {
              value: "technology_innovation",
              label: "Technology & Innovation",
            },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleMultiSelect("activityTypes", value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                formData.activityTypes.includes(value)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.activityTypes && (
          <p className="mt-1 text-sm text-red-600">{errors.activityTypes}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-800">Career Awareness</h2>

      {/* Career Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Do you already have a career goal in mind?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "doctor", label: "Doctor" },
            { value: "engineer", label: "Engineer" },
            { value: "teacher", label: "Teacher" },
            { value: "civil_services", label: "Civil Services" },
            { value: "business", label: "Business" },
            { value: "not_sure", label: "Not sure yet" },
            { value: "explore_options", label: "Just want to explore options" },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleInputChange("careerGoal", value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                formData.careerGoal === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.careerGoal && (
          <p className="mt-1 text-sm text-red-600">{errors.careerGoal}</p>
        )}
      </div>

      {/* Course Selection Factors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What matters the most to you while choosing a course? (Select
          multiple)
        </label>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              value: "job_opportunities",
              label: "Good job opportunities after graduation",
            },
            {
              value: "government_exams",
              label: "Chance to prepare for government exams",
            },
            { value: "affordable_education", label: "Affordable education" },
            {
              value: "interest_passion",
              label: "Interest & passion in the subject",
            },
            {
              value: "higher_studies",
              label: "Opportunities for higher studies",
            },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleMultiSelect("courseSelectionFactors", value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                formData.courseSelectionFactors.includes(value)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.courseSelectionFactors && (
          <p className="mt-1 text-sm text-red-600">
            {errors.courseSelectionFactors}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-800">Practical Needs</h2>

      {/* Location Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Would you prefer a college close to home or are you open to hostels?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "nearby_only", label: "Nearby college only" },
            {
              value: "open_to_hostel",
              label: "Open to hostel / outside district",
            },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleInputChange("locationPreference", value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                formData.locationPreference === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.locationPreference && (
          <p className="mt-1 text-sm text-red-600">
            {errors.locationPreference}
          </p>
        )}
      </div>

      {/* Financial Aid */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Do you need scholarships or financial aid information?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleInputChange("needsFinancialAid", value)}
              className={`p-3 text-center border rounded-lg transition-colors ${
                formData.needsFinancialAid === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
        {errors.needsFinancialAid && (
          <p className="mt-1 text-sm text-red-600">
            {errors.needsFinancialAid}
          </p>
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] min-h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h1 className="font-serif text-2xl text-gray-800">
                  Complete Your Profile
                </h1>
                <p className="text-gray-600 mt-1">
                  Help us personalize your ScholarSync experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {renderCurrentStep()}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={onClose}
                    className="px-4 sm:px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
                    Skip for now
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg font-medium transition-colors ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-700"
                      }`}>
                      {isSubmitting ? "Completing..." : "Complete Setup"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
