import React from 'react';
import Icon from '@/app/components/AppIcon';
import Image from '@/app/components/AppImage';
import Button from '@/app/components/ui/Button';

const CollegeListView = ({ college, onViewDetails, onSaveFavorite, isFavorite }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={14} className="text-accent fill-current" />);
    }
    
    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={14} className="text-accent fill-current" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />);
    }
    
    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-tier-1 hover:shadow-tier-2 transition-panel p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* College Image and Logo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-full md:w-48 h-32 overflow-hidden rounded-lg">
              <Image
                src={college?.image}
                alt={college?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-lg border-2 border-white shadow-tier-1 overflow-hidden">
              <Image
                src={college?.logo}
                alt={`${college?.name} logo`}
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>
        </div>

        {/* College Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-foreground mb-1 truncate">
                {college?.name}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <Icon name="MapPin" size={14} className="mr-1 flex-shrink-0" />
                <span className="truncate">{college?.location}</span>
              </div>
            </div>
            <button
              onClick={() => onSaveFavorite(college?.id)}
              className="ml-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-micro"
            >
              <Icon 
                name={isFavorite ? "Heart" : "Heart"} 
                size={16} 
                className={isFavorite ? "text-error fill-current" : "text-muted-foreground"} 
              />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {renderStars(college?.rating)}
            </div>
            <span className="text-sm font-medium text-foreground mr-1">
              {college?.rating?.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({college?.reviewCount} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {college?.description}
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center space-x-1 text-sm">
              <Icon name="Users" size={14} className="text-primary" />
              <span className="text-muted-foreground">{college?.studentCount} students</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Icon name="TrendingUp" size={14} className="text-primary" />
              <span className="text-muted-foreground">{college?.acceptanceRate}% acceptance</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Icon name="BookOpen" size={14} className="text-primary" />
              <span className="text-muted-foreground">{college?.programs?.length} programs</span>
            </div>
          </div>

          {/* Programs */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {college?.programs?.slice(0, 4)?.map((program, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {program}
                </span>
              ))}
              {college?.programs?.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  +{college?.programs?.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex flex-col gap-2 md:w-32">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(college)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            fullWidth
          >
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            iconPosition="left"
            iconSize={14}
            fullWidth
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeListView;