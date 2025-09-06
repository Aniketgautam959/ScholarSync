import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { cn } from '../../utils/cn';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      name: 'Microsoft',
      icon: 'Square',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/dashboard" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-foreground">CareerPath</span>
          </Link>
          
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue your career journey
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-card border border-border rounded-lg shadow-tier-1 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              error={errors?.email}
              className="w-full"
            />

            {/* Password Field */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                error={errors?.password}
                className="w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Error */}
            {errors?.submit && (
              <div className="text-center">
                <p className="text-sm text-destructive">{errors?.submit}</p>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 space-y-3">
            {socialProviders?.map((provider) => (
              <Button
                key={provider?.name}
                type="button"
                variant="outline"
                fullWidth
                onClick={() => handleSocialLogin(provider?.name?.toLowerCase())}
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center justify-center space-x-2",
                  provider?.bgColor,
                  provider?.textColor,
                  provider?.borderColor
                )}
              >
                <Icon name={provider?.icon} size={18} />
                <span>Continue with {provider?.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex-shrink-0">
                <Icon name="Shield" size={16} className="text-success" />
              </div>
              <span>Secure and encrypted authentication</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex-shrink-0">
                <Icon name="Zap" size={16} className="text-primary" />
              </div>
              <span>Access to personalized career recommendations</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex-shrink-0">
                <Icon name="Users" size={16} className="text-secondary" />
              </div>
              <span>Connect with educators and career experts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;