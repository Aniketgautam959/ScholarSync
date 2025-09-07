import React from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, color, onClick, badge }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1 hover:shadow-tier-2 transition-micro group cursor-pointer"
         onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:scale-105 transition-micro`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {badge && (
          <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
        Get Started
        <Icon name="ArrowRight" size={14} className="ml-2" />
      </Button>
    </div>
  );
};

export default QuickActionCard;