import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OverviewCard = ({ title, value, subtitle, icon, color, trend, actionText, onAction }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1 hover:shadow-tier-2 transition-micro">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend?.type === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={trend?.type === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{trend?.value}</span>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {actionText && onAction && (
        <Button variant="ghost" size="sm" onClick={onAction} className="w-full justify-start p-0 h-auto">
          <span className="text-primary hover:text-primary/80">{actionText}</span>
          <Icon name="ArrowRight" size={14} className="ml-1" />
        </Button>
      )}
    </div>
  );
};

export default OverviewCard;