import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'college-admission',
      title: "College Admissions",
      description: "Get guidance on application process",
      icon: "GraduationCap",
      query: "I need help with college admissions. Can you guide me through the application process?"
    },
    {
      id: 'career-transition',
      title: "Career Transition",
      description: "Explore new career paths",
      icon: "TrendingUp",
      query: "I\'m considering a career change. What steps should I take to transition successfully?"
    },
    {
      id: 'skill-development',
      title: "Skill Development",
      description: "Learn about in-demand skills",
      icon: "Target",
      query: "What are the most in-demand skills I should develop for my career growth?"
    },
    {
      id: 'interview-prep',
      title: "Interview Preparation",
      description: "Tips for job interviews",
      icon: "MessageSquare",
      query: "Can you help me prepare for job interviews? I need tips and common questions."
    },
    {
      id: 'resume-review',
      title: "Resume Review",
      description: "Optimize your resume",
      icon: "FileText",
      query: "I\'d like feedback on my resume. What should I include to make it more effective?"
    },
    {
      id: 'salary-negotiation',
      title: "Salary Negotiation",
      description: "Learn negotiation strategies",
      icon: "DollarSign",
      query: "How should I approach salary negotiation for a new job offer?"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            className="h-auto p-4 text-left justify-start hover:bg-muted/50 transition-micro"
            onClick={() => onActionClick(action?.query)}
          >
            <div className="flex items-start space-x-3 w-full">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={action?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {action?.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;