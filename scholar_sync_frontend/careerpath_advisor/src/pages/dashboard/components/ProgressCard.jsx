import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressCard = ({ title, description, currentStep, totalSteps, completedItems, onContinue }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  const steps = [
    { id: 1, title: 'Basic Information', completed: true },
    { id: 2, title: 'Academic History', completed: true },
    { id: 3, title: 'Interests & Skills', completed: currentStep >= 3 },
    { id: 4, title: 'Career Preferences', completed: currentStep >= 4 },
    { id: 5, title: 'Upload Documents', completed: currentStep >= 5 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="User" size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-foreground">{Math.round(progressPercentage)}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{completedItems?.length} items completed</span>
        </div>
      </div>
      {/* Steps List */}
      <div className="space-y-3 mb-6">
        {steps?.map((step) => (
          <div key={step?.id} className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step?.completed 
                ? 'bg-success text-success-foreground' 
                : step?.id === currentStep 
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
            }`}>
              {step?.completed ? (
                <Icon name="Check" size={14} />
              ) : (
                <span className="text-xs font-medium">{step?.id}</span>
              )}
            </div>
            <span className={`text-sm ${
              step?.completed 
                ? 'text-foreground' 
                : step?.id === currentStep
                  ? 'text-primary font-medium' :'text-muted-foreground'
            }`}>
              {step?.title}
            </span>
          </div>
        ))}
      </div>
      <Button 
        variant="default" 
        onClick={onContinue}
        className="w-full"
        iconName="ArrowRight"
        iconPosition="right"
      >
        Continue Setup
      </Button>
    </div>
  );
};

export default ProgressCard;