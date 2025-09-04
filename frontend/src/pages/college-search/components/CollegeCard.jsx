import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollegeCard = ({ college, onViewDetails, onSaveFavorite, isFavorite }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={16} className="text-accent fill-current" />);
    }
    
    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={16} className="text-accent fill-current" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />);
    }
    
    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-tier-1 hover:shadow-tier-2 transition-panel overflow-hidden">
      {/* College Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={college?.image}
          alt={college?.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onSaveFavorite(college?.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-micro"
        >
          <Icon 
            name={isFavorite ? "Heart" : "Heart"} 
            size={16} 
            className={isFavorite ? "text-error fill-current" : "text-muted-foreground"} 
          />
        </button>
      </div>
      {/* College Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {college?.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <Icon name="MapPin" size={14} className="mr-1" />
              <span>{college?.location}</span>
            </div>
          </div>
          <div className="ml-3 flex-shrink-0">
            <Image
              src={college?.logo}
              alt={`${college?.name} logo`}
              className="w-12 h-12 object-contain rounded-lg border border-border"
            />
          </div>
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

        {/* Programs */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Popular Programs:</h4>
          <div className="flex flex-wrap gap-1">
            {college?.programs?.slice(0, 3)?.map((program, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {program}
              </span>
            ))}
            {college?.programs?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{college?.programs?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">{college?.acceptanceRate}%</div>
            <div className="text-xs text-muted-foreground">Acceptance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">{college?.studentCount}</div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(college)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            iconName="Send"
            iconPosition="left"
            iconSize={14}
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;