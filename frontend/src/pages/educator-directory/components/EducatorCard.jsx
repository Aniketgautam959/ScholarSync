import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EducatorCard = ({ educator, onViewProfile, onBookConsultation }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-tier-2 transition-micro">
      {/* Header with Photo and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={educator?.photo}
              alt={educator?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {educator?.isVerified && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {educator?.name}
            </h3>
            {educator?.isVerified && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(educator?.rating)}
            <span className="text-sm text-muted-foreground ml-2">
              {educator?.rating} ({educator?.reviewCount} reviews)
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {educator?.experience} years experience
          </p>
        </div>
      </div>
      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {educator?.specializations?.slice(0, 3)?.map((spec, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
          {educator?.specializations?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{educator?.specializations?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Bio */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {educator?.bio}
      </p>
      {/* Availability and Pricing */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon 
            name="Clock" 
            size={14} 
            color={educator?.isAvailable ? "var(--color-success)" : "var(--color-muted-foreground)"} 
          />
          <span className={`text-sm ${educator?.isAvailable ? 'text-success' : 'text-muted-foreground'}`}>
            {educator?.isAvailable ? 'Available' : 'Busy'}
          </span>
        </div>
        
        {educator?.consultationFee && (
          <div className="text-sm font-medium text-foreground">
            ${educator?.consultationFee}/session
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(educator)}
          className="flex-1"
        >
          View Profile
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onBookConsultation(educator)}
          disabled={!educator?.isAvailable}
          className="flex-1"
        >
          Book Session
        </Button>
      </div>
    </div>
  );
};

export default EducatorCard;