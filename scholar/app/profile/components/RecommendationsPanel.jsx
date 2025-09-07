'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import Icon from '@/app/components/AppIcon';

const RecommendationsPanel = ({ profileData, onRefresh }) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock recommendations based on profile data
  const generateRecommendations = () => {
    const recommendations = [
      // Course recommendations
      {
        id: 1,
        type: 'course',
        title: 'Advanced Machine Learning',
        provider: 'Stanford Online',
        description: 'Deep dive into neural networks and deep learning algorithms. Perfect for your current ML skills.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
        rating: 4.8,
        difficulty: 'Advanced',
        duration: '12 weeks',
        price: '$299',
        tags: ['Machine Learning', 'Python', 'AI'],
        matchReason: 'Based on your Machine Learning skill (70%)',
        confidence: 95
      },
      {
        id: 2,
        type: 'course',
        title: 'React Advanced Patterns',
        provider: 'Meta Learning',
        description: 'Master advanced React patterns, hooks, and performance optimization techniques.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
        rating: 4.7,
        difficulty: 'Intermediate',
        duration: '8 weeks',
        price: '$199',
        tags: ['React', 'JavaScript', 'Web Development'],
        matchReason: 'Matches your React skill (85%) and Web Development interest',
        confidence: 88
      },
      // College recommendations
      {
        id: 3,
        type: 'college',
        title: 'Carnegie Mellon - MS Computer Science',
        provider: 'Carnegie Mellon University',
        description: 'Top-ranked computer science graduate program with focus on AI and machine learning research.',
        image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=400&h=200&fit=crop',
        rating: 4.9,
        difficulty: 'Graduate',
        duration: '2 years',
        price: '$58,000/year',
        tags: ['Computer Science', 'AI Research', 'Graduate Program'],
        matchReason: 'Aligns with your CS background and AI interests',
        confidence: 92
      },
      // Job recommendations
      {
        id: 4,
        type: 'job',
        title: 'Frontend Developer Intern',
        provider: 'Google',
        description: 'Summer internship working on Google Search frontend with React and modern web technologies.',
        image: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg?w=400&h=200&fit=crop',
        rating: 4.8,
        difficulty: 'Intern',
        duration: '12 weeks',
        price: '$8,000/month',
        tags: ['Frontend', 'React', 'JavaScript'],
        matchReason: 'Perfect match for your React and JavaScript skills',
        confidence: 90
      },
      // Scholarship recommendations
      {
        id: 5,
        type: 'scholarship',
        title: 'AI Excellence Scholarship',
        provider: 'Tech for Good Foundation',
        description: '$10,000 scholarship for students pursuing AI and machine learning studies.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
        rating: 4.6,
        difficulty: 'Application',
        duration: 'Annual',
        price: '$10,000',
        tags: ['Scholarship', 'AI', 'Machine Learning'],
        matchReason: 'Based on your AI interests and academic performance',
        confidence: 85
      },
      // Mentor recommendations
      {
        id: 6,
        type: 'mentor',
        title: 'Dr. Sarah Chen',
        provider: 'AI Research Scientist at OpenAI',
        description: 'PhD in Computer Science, 10+ years in AI research. Specializes in mentoring CS students.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop',
        rating: 4.9,
        difficulty: 'Mentor',
        duration: 'Ongoing',
        price: 'Free',
        tags: ['AI Research', 'Mentorship', 'Career Guidance'],
        matchReason: 'Expertise matches your AI and ML interests',
        confidence: 88
      }
    ];

    return recommendations;
  };

  const [recommendations] = useState(generateRecommendations());

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setRefreshing(false);
    onRefresh();
  };

  const filterTypes = [
    { id: 'all', label: 'All Recommendations', icon: 'Grid' },
    { id: 'course', label: 'Courses', icon: 'BookOpen' },
    { id: 'college', label: 'Colleges', icon: 'GraduationCap' },
    { id: 'job', label: 'Jobs', icon: 'Briefcase' },
    { id: 'scholarship', label: 'Scholarships', icon: 'Award' },
    { id: 'mentor', label: 'Mentors', icon: 'Users' }
  ];

  const filteredRecommendations = activeFilter === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.type === activeFilter);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return 'BookOpen';
      case 'college': return 'GraduationCap';
      case 'job': return 'Briefcase';
      case 'scholarship': return 'Award';
      case 'mentor': return 'Users';
      default: return 'Star';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course': return 'bg-primary/10 text-primary';
      case 'college': return 'bg-secondary/10 text-secondary';
      case 'job': return 'bg-success/10 text-success';
      case 'scholarship': return 'bg-warning/10 text-warning';
      case 'mentor': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-primary';
    if (confidence >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleRecommendationClick = (recommendation) => {
    switch (recommendation?.type) {
      case 'course': case'college': router.push('/college');
        break;
      case 'job': router.push('/internships');
        break;
      case 'scholarship': case'mentor': router.push('/community');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Personalized Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered suggestions based on your profile and interests
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={handleRefresh}
          loading={refreshing}
          iconName="RefreshCw"
        >
          Refresh
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-card border border-border rounded-lg p-2">
        <div className="flex flex-wrap gap-1">
          {filterTypes?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setActiveFilter(filter?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                activeFilter === filter?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      {filteredRecommendations?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecommendations?.map((recommendation) => (
            <div key={recommendation?.id} className="bg-card border border-border rounded-lg shadow-tier-1 overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-muted">
                <img
                  src={recommendation?.image}
                  alt={recommendation?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(recommendation?.type)}`}>
                    <Icon name={getTypeIcon(recommendation?.type)} size={12} />
                    <span className="capitalize">{recommendation?.type}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium bg-background/90 ${getConfidenceColor(recommendation?.confidence)}`}>
                    <Icon name="Target" size={12} />
                    <span>{recommendation?.confidence}% match</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h4 className="font-semibold text-foreground mb-1">
                    {recommendation?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {recommendation?.provider}
                  </p>
                </div>

                <p className="text-sm text-foreground mb-4 line-clamp-3">
                  {recommendation?.description}
                </p>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} />
                    <span>{recommendation?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{recommendation?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BarChart" size={12} />
                    <span>{recommendation?.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={12} />
                    <span>{recommendation?.price}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {recommendation?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Match Reason */}
                <div className="bg-muted/30 rounded-md p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Lightbulb" size={14} className="text-primary" />
                    <span className="text-xs font-medium text-primary">Why this matches you:</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {recommendation?.matchReason}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleRecommendationClick(recommendation)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bookmark"
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">
            No {activeFilter === 'all' ? '' : activeFilter} recommendations found
          </h4>
          <p className="text-muted-foreground mb-4">
            Complete more sections of your profile to get personalized recommendations
          </p>
          <Button variant="outline" onClick={() => setActiveFilter('all')}>
            Show All Recommendations
          </Button>
        </div>
      )}

      {/* Recommendation Stats */}
      {recommendations?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
          <h4 className="font-medium text-foreground mb-4">Recommendation Summary</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filterTypes?.slice(1)?.map((type) => {
              const count = recommendations?.filter(rec => rec?.type === type?.id)?.length;
              return (
                <div key={type?.id} className="text-center">
                  <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-2 ${getTypeColor(type?.id)}`}>
                    <Icon name={type?.icon} size={20} />
                  </div>
                  <div className="text-lg font-semibold text-foreground">{count}</div>
                  <div className="text-xs text-muted-foreground">{type?.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;