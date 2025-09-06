import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ data, onContinue }) => {
  const { percentage, completedSections, totalSections, completedItems, pendingItems } = data;

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'text-success';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 80) return 'bg-primary';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const getProgressMessage = (percentage) => {
    if (percentage >= 100) return "Outstanding! Your profile is complete.";
    if (percentage >= 80) return "Almost there! Just a few more details.";
    if (percentage >= 60) return "Good progress! Keep adding more information.";
    return "Let's get started on completing your profile.";
  };

  const getNextSteps = (percentage) => {
    if (percentage >= 100) return [];
    if (percentage >= 80) return ["Add professional experience", "Upload certificates"];
    if (percentage >= 60) return ["Complete skills section", "Add language preferences"];
    return ["Complete basic information", "Add academic history"];
  };

  const nextSteps = getNextSteps(percentage);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Completion</h3>
          <p className="text-sm text-muted-foreground">
            {getProgressMessage(percentage)}
          </p>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getProgressColor(percentage)}`}>
            {percentage}%
          </div>
          <div className="text-sm text-muted-foreground">
            {completedSections}/{totalSections} sections
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressBgColor(percentage)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Progress Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Completed Items */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="CheckCircle" size={18} className="text-success" />
            <span>Completed Sections</span>
          </h4>
          <div className="space-y-2">
            {completedItems?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name="Check" size={14} className="text-success" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Items */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Clock" size={18} className="text-warning" />
            <span>Pending Sections</span>
          </h4>
          <div className="space-y-2">
            {pendingItems?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name="Circle" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      {nextSteps?.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="ArrowRight" size={18} className="text-primary" />
            <span>Next Steps</span>
          </h4>
          <div className="space-y-2">
            {nextSteps?.map((step, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name="Target" size={14} className="text-primary" />
                <span className="text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits of Completion */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Star" size={18} className="text-primary" />
          <span>Complete Your Profile to Unlock</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-foreground">Better recommendations</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} className="text-primary" />
            <span className="text-foreground">Mentor connections</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={14} className="text-secondary" />
            <span className="text-foreground">Job opportunities</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={14} className="text-accent" />
            <span className="text-foreground">Scholarship alerts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Profile completion helps us provide personalized recommendations</span>
        </div>
        
        {percentage < 100 && (
          <Button
            onClick={onContinue}
            iconName="ArrowRight"
          >
            Continue Setup
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;