import React from 'react';
import Icon from '@/app/components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange, jobCounts }) => {
  const categories = [
    { id: 'all', label: 'All Jobs', icon: 'Briefcase' },
    { id: 'technology', label: 'Technology', icon: 'Code' },
    { id: 'healthcare', label: 'Healthcare', icon: 'Heart' },
    { id: 'finance', label: 'Finance', icon: 'DollarSign' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'marketing', label: 'Marketing', icon: 'Megaphone' },
    { id: 'design', label: 'Design', icon: 'Palette' },
    { id: 'sales', label: 'Sales', icon: 'TrendingUp' },
    { id: 'operations', label: 'Operations', icon: 'Settings' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
            {jobCounts?.[category?.id] && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-primary/10 text-primary'
              }`}>
                {jobCounts?.[category?.id]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;