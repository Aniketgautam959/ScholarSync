import React from 'react';
import Icon from '../../components/AppIcon';

const WelcomeHeader = ({ userName = "John" }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date()?.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            {getCurrentGreeting()}, {userName}! 👋
          </h1>
          <p className="text-primary-foreground/80 mb-4">
            Ready to take the next step in your career journey?
          </p>
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/70">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{getCurrentDate()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>New York, NY</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-xs text-primary-foreground/70">Profile Complete</div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={32} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;