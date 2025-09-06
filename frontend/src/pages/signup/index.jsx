import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Facebook, Linkedin, Chrome, Shield, CheckCircle, Check, X } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { id: 'length', text: 'At least 8 characters', test: (pwd) => pwd?.length >= 8 },
    { id: 'uppercase', text: 'One uppercase letter', test: (pwd) => /[A-Z]/?.test(pwd) },
    { id: 'lowercase', text: 'One lowercase letter', test: (pwd) => /[a-z]/?.test(pwd) },
    { id: 'number', text: 'One number', test: (pwd) => /\d/?.test(pwd) }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const failedRequirements = passwordRequirements?.filter(req => !req?.test(formData?.password));
      if (failedRequirements?.length > 0) {
        newErrors.password = 'Password does not meet requirements';
      }
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On successful registration, navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`);
    // Implement social signup logic here
  };

  const getPasswordStrength = () => {
    const passedRequirements = passwordRequirements?.filter(req => req?.test(formData?.password || ''));
    return passedRequirements?.length;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-yellow-500';
    if (strength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-tier-3 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl mb-4"
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Start your career journey with personalized guidance</p>
          </div>

          {/* Benefit Highlights */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">What you'll get:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
                Personalized career recommendations
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
                Access to top universities and courses
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
                AI-powered educational guidance
              </li>
            </ul>
          </div>

          {/* Error Message */}
          {errors?.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-600 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {errors?.general}
              </p>
            </motion.div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData?.firstName || ''}
                  onChange={handleInputChange}
                  placeholder="First name"
                  required
                  error={errors?.firstName}
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData?.lastName || ''}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  required
                  error={errors?.lastName}
                />
              </div>
            </div>

            <div>
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email || ''}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                error={errors?.email}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData?.password || ''}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                required
                error={errors?.password}
                className="pl-10 pr-10"
              />
              <Lock className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {/* Password Strength Indicator */}
              {formData?.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Password strength</span>
                    <span className={cn(
                      "font-medium",
                      getPasswordStrength() <= 1 && "text-red-600",
                      getPasswordStrength() <= 2 && getPasswordStrength() > 1 && "text-yellow-600",
                      getPasswordStrength() <= 3 && getPasswordStrength() > 2 && "text-blue-600",
                      getPasswordStrength() === 4 && "text-green-600"
                    )}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        getPasswordStrengthColor()
                      )}
                      style={{ width: `${(getPasswordStrength() / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {formData?.password && (
                <div className="mt-3 space-y-1">
                  {passwordRequirements?.map((requirement) => (
                    <div
                      key={requirement?.id}
                      className={cn(
                        "flex items-center text-xs transition-colors",
                        requirement?.test(formData?.password) ? "text-green-600" : "text-gray-400"
                      )}
                    >
                      {requirement?.test(formData?.password) ? (
                        <Check className="w-3 h-3 mr-2" />
                      ) : (
                        <X className="w-3 h-3 mr-2" />
                      )}
                      {requirement?.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData?.confirmPassword || ''}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                error={errors?.confirmPassword}
                className="pl-10 pr-10"
              />
              <Lock className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData?.acceptTerms || false}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {errors?.acceptTerms && (
              <p className="text-sm text-red-600 mt-1">{errors?.acceptTerms}</p>
            )}

            {/* Create Account Button */}
            <Button
              type="submit"
              loading={isLoading}
              fullWidth
              className="h-12 text-base font-medium"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              className="h-12 justify-center"
              onClick={() => handleSocialSignup('google')}
            >
              <Chrome className="w-5 h-5 mr-3 text-red-500" />
              Sign up with Google
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              className="h-12 justify-center"
              onClick={() => handleSocialSignup('linkedin')}
            >
              <Linkedin className="w-5 h-5 mr-3 text-blue-600" />
              Sign up with LinkedIn
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              className="h-12 justify-center"
              onClick={() => handleSocialSignup('facebook')}
            >
              <Facebook className="w-5 h-5 mr-3 text-blue-700" />
              Sign up with Facebook
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
              <div className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;