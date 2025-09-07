import React from 'react';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';

const RecommendationCard = ({ type, title, subtitle, description, image, rating, tags, onView, onSave }) => {
  const getTypeIcon = (type) => {
    const iconMap = {
      course: 'BookOpen',
      college: 'GraduationCap',
      job: 'Briefcase',
      skill: 'Target'
    };
    return iconMap?.[type] || 'Star';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      course: 'bg-primary',
      college: 'bg-secondary',
      job: 'bg-accent',
      skill: 'bg-success'
    };
    return colorMap?.[type] || 'bg-primary';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-tier-1 hover:shadow-tier-2 transition-micro">
      <div className="relative">
        <div className="h-32 overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(type)}`}>
          <Icon name={getTypeIcon(type)} size={16} color="white" />
        </div>
        {rating && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Icon name="Star" size={12} color="#F59E0B" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        {tags && tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{tags?.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Button variant="default" size="sm" onClick={onView} className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="icon" onClick={onSave}>
            <Icon name="Bookmark" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;