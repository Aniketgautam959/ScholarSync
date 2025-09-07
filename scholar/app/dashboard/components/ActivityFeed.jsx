'use client';

import React, { useState } from 'react';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';

const ActivityFeed = () => {
  const [activities] = useState([
    {
      id: 1,
      type: 'college_saved',
      title: 'Saved Stanford University',
      description: 'Added to your college wishlist',
      time: '2 hours ago',
      icon: 'Bookmark',
      color: 'bg-secondary'
    },
    {
      id: 2,
      type: 'discussion_joined',
      title: 'Joined discussion',
      description: 'Computer Science Career Paths - What should I expect?',
      time: '5 hours ago',
      icon: 'MessageCircle',
      color: 'bg-primary'
    },
    {
      id: 3,
      type: 'consultation_booked',
      title: 'Consultation Scheduled',
      description: 'Meeting with Dr. Sarah Johnson on Dec 8th at 3:00 PM',
      time: '1 day ago',
      icon: 'Calendar',
      color: 'bg-accent'
    },
    {
      id: 4,
      type: 'quiz_completed',
      title: 'Aptitude Quiz Completed',
      description: 'Engineering Aptitude Assessment - Score: 85/100',
      time: '2 days ago',
      icon: 'Target',
      color: 'bg-success'
    },
    {
      id: 5,
      type: 'job_applied',
      title: 'Applied for Internship',
      description: 'Software Development Intern at TechCorp',
      time: '3 days ago',
      icon: 'Briefcase',
      color: 'bg-warning'
    }
  ]);

  const getActivityAction = (type) => {
    const actionMap = {
      college_saved: 'View College',
      discussion_joined: 'View Discussion',
      consultation_booked: 'View Details',
      quiz_completed: 'View Results',
      job_applied: 'View Application'
    };
    return actionMap?.[type] || 'View';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-tier-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <Icon name="ArrowRight" size={14} className="ml-1" />
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity to show.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-micro">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity?.color}`}>
                    <Icon name={activity?.icon} size={18} color="white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {activity?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity?.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {activity?.time}
                        </p>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="ml-2">
                        {getActivityAction(activity?.type)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;