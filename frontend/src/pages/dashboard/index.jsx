import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatWidget from '../../components/ui/ChatWidget';
import WelcomeHeader from './components/WelcomeHeader';
import OverviewCard from './components/OverviewCard';
import QuickActionCard from './components/QuickActionCard';
import NotificationPanel from './components/NotificationPanel';
import RecommendationCard from './components/RecommendationCard';
import ProgressCard from './components/ProgressCard';
import ActivityFeed from './components/ActivityFeed';

const Dashboard = () => {
  const navigate = useNavigate();

  const overviewData = [
    {
      title: 'Recommended Courses',
      value: '12',
      subtitle: 'Based on your interests',
      icon: 'BookOpen',
      color: 'bg-primary',
      trend: { type: 'up', value: '+3' },
      actionText: 'View all courses',
      onAction: () => navigate('/college-search')
    },
    {
      title: 'Top Colleges',
      value: '8',
      subtitle: 'Matching your profile',
      icon: 'GraduationCap',
      color: 'bg-secondary',
      trend: { type: 'up', value: '+2' },
      actionText: 'Explore colleges',
      onAction: () => navigate('/college-search')
    },
    {
      title: 'Active Discussions',
      value: '24',
      subtitle: 'Community conversations',
      icon: 'MessageCircle',
      color: 'bg-accent',
      actionText: 'Join discussions',
      onAction: () => navigate('/community-forum')
    },
    {
      title: 'Upcoming Deadlines',
      value: '5',
      subtitle: 'Applications & scholarships',
      icon: 'Clock',
      color: 'bg-warning',
      trend: { type: 'down', value: '-2' },
      actionText: 'View deadlines',
      onAction: () => {}
    }
  ];

  const quickActions = [
    {
      title: 'Aptitude Quiz',
      description: 'Discover your strengths and ideal career paths through our comprehensive assessment',
      icon: 'Target',
      color: 'bg-success',
      badge: 'Popular',
      onClick: () => navigate('/chatbot-interface')
    },
    {
      title: 'College Finder',
      description: 'Find the perfect college based on your preferences, budget, and academic goals',
      icon: 'Search',
      color: 'bg-primary',
      onClick: () => navigate('/college-search')
    },
    {
      title: 'Career Questions',
      description: 'Get personalized answers to your career-related questions from our AI assistant',
      icon: 'HelpCircle',
      color: 'bg-secondary',
      onClick: () => navigate('/chatbot-interface')
    },
    {
      title: 'Job Search',
      description: 'Explore internships and job opportunities that match your skills and interests',
      icon: 'Briefcase',
      color: 'bg-accent',
      badge: 'New',
      onClick: () => navigate('/job-opportunities')
    }
  ];

  const recommendations = [
    {
      type: 'course',
      title: 'Introduction to Machine Learning',
      subtitle: 'Stanford University',
      description: 'Learn the fundamentals of machine learning algorithms and their applications in real-world scenarios.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
      rating: '4.8',
      tags: ['AI', 'Python', 'Data Science'],
      onView: () => {},
      onSave: () => {}
    },
    {
      type: 'college',
      title: 'MIT Computer Science',
      subtitle: 'Massachusetts Institute of Technology',
      description: 'World-renowned program in computer science with cutting-edge research opportunities.',
      image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=400&h=200&fit=crop',
      rating: '4.9',
      tags: ['Computer Science', 'Research', 'Innovation'],
      onView: () => navigate('/college-search'),
      onSave: () => {}
    },
    {
      type: 'job',
      title: 'Software Engineering Intern',
      subtitle: 'Google',
      description: 'Summer internship opportunity for computer science students with competitive compensation.',
      image: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg?w=400&h=200&fit=crop',
      rating: '4.7',
      tags: ['Internship', 'Software', 'Tech'],
      onView: () => navigate('/job-opportunities'),
      onSave: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <WelcomeHeader userName="John" />
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewData?.map((item, index) => (
              <OverviewCard key={index} {...item} />
            ))}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quickActions?.map((action, index) => (
                    <QuickActionCard key={index} {...action} />
                  ))}
                </div>
              </div>
              
              {/* Recommendations */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Personalized Recommendations</h2>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recommendations?.map((rec, index) => (
                    <RecommendationCard key={index} {...rec} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Notifications & Progress */}
            <div className="space-y-8">
              <NotificationPanel />
              <ProgressCard
                title="Profile Setup"
                description="Complete your profile for better recommendations"
                currentStep={3}
                totalSteps={5}
                completedItems={['Basic Info', 'Academic History']}
                onContinue={() => navigate('/profile')}
              />
            </div>
          </div>
          
          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityFeed />
            
            {/* Stats Overview */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
              <h3 className="text-lg font-semibold text-foreground mb-6">Your Progress</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-semibold">85%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Profile Completion</p>
                      <p className="text-xs text-muted-foreground">Almost there!</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <span className="text-secondary font-semibold">12</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Colleges Saved</p>
                      <p className="text-xs text-muted-foreground">In your wishlist</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <span className="text-success font-semibold">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Applications Submitted</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-accent font-semibold">7</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Forum Posts</p>
                      <p className="text-xs text-muted-foreground">Community engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
};

export default Dashboard;