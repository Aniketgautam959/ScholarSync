'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/ui/Header';
import ChatWidget from '@/app/components/ui/ChatWidget';
import Button from '@/app/components/ui/Button';

import Icon from '@/app/components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import BasicInfoSection from './components/BasicInfoSection';
import AcademicHistorySection from './components/AcademicHistorySection';
import SkillsInterestsSection from './components/SkillsInterestsSection';
import LanguagePreferencesSection from './components/LanguagePreferencesSection';
import ProgressTracker from './components/ProgressTracker';
import RecommendationsPanel from './components/RecommendationsPanel';

const Profile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    avatar: null,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate computer science student seeking opportunities in software development and AI.',
    dateOfBirth: '1995-06-15',
    // Academic history
    education: [
      {
        id: 1,
        institution: 'Massachusetts Institute of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2020-09-01',
        endDate: '2024-05-15',
        gpa: '3.8',
        achievements: ['Dean\'s List (3 semesters)', 'CS Department Honor Roll']
      },
      {
        id: 2,
        institution: 'Lincoln High School',
        degree: 'High School Diploma',
        startDate: '2016-09-01',
        endDate: '2020-06-15',
        gpa: '3.95',
        achievements: ['Valedictorian', 'National Honor Society']
      }
    ],
    // Skills and interests
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'Machine Learning', level: 70 }
    ],
    interests: ['Artificial Intelligence', 'Web Development', 'Data Science', 'Mobile Development'],
    // Languages
    languages: [
      { language: 'English', proficiency: 'Native', certified: false },
      { language: 'Spanish', proficiency: 'Intermediate', certified: true },
      { language: 'French', proficiency: 'Beginner', certified: false }
    ]
  });

  const [completionData, setCompletionData] = useState({
    percentage: 85,
    completedSections: 4,
    totalSections: 5,
    completedItems: ['Basic Info', 'Academic History', 'Skills & Interests', 'Languages'],
    pendingItems: ['Professional Experience']
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'academic', label: 'Academic', icon: 'GraduationCap' },
    { id: 'skills', label: 'Skills & Interests', icon: 'Brain' },
    { id: 'languages', label: 'Languages', icon: 'Globe' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Star' }
  ];

  const handleDataChange = (section, newData) => {
    setProfileData(prev => ({
      ...prev,
      [section]: newData
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasUnsavedChanges(false);
      
      // Show success message (could be a toast notification)
      console.log('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <BasicInfoSection 
              data={profileData} 
              onChange={handleDataChange}
            />
            <ProgressTracker 
              data={completionData}
              onContinue={() => setActiveTab('academic')}
            />
          </div>
        );
      case 'academic':
        return (
          <AcademicHistorySection 
            data={profileData?.education || []} 
            onChange={(newEducation) => handleDataChange('education', newEducation)}
          />
        );
      case 'skills':
        return (
          <SkillsInterestsSection 
            skills={profileData?.skills || []}
            interests={profileData?.interests || []}
            onSkillsChange={(newSkills) => handleDataChange('skills', newSkills)}
            onInterestsChange={(newInterests) => handleDataChange('interests', newInterests)}
          />
        );
      case 'languages':
        return (
          <LanguagePreferencesSection 
            data={profileData?.languages || []}
            onChange={(newLanguages) => handleDataChange('languages', newLanguages)}
          />
        );
      case 'recommendations':
        return (
          <RecommendationsPanel 
            profileData={profileData}
            onRefresh={() => console.log('Refreshing recommendations...')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <ProfileHeader 
            data={profileData}
            onChange={handleDataChange}
            completionPercentage={completionData?.percentage}
          />

          {/* Navigation Tabs */}
          <div className="bg-card border border-border rounded-lg shadow-tier-1 mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Profile tabs">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-micro ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Save Indicator */}
            {hasUnsavedChanges && (
              <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-warning" />
                    <span className="text-sm text-warning font-medium">
                      You have unsaved changes
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Reset changes
                        setHasUnsavedChanges(false);
                      }}
                    >
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveProfile}
                      iconName="Save"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Course Recommendations</h3>
                  <p className="text-sm text-muted-foreground">Based on your profile</p>
                </div>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => router.push('/college')}
              >
                Explore Courses
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Job Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Matching your skills</p>
                </div>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => router.push('/internships')}
              >
                Browse Jobs
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Career Guidance</h3>
                  <p className="text-sm text-muted-foreground">Get personalized advice</p>
                </div>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => router.push('/chatbot')}
              >
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
};

export default Profile;