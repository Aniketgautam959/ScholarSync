import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ data, onChange, completionPercentage }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(data?.name || '');
  const fileInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange('avatar', event?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleNameSave = () => {
    onChange('name', tempName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(data?.name || '');
    setIsEditingName(false);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-tier-1 p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        {/* Left Section - Avatar and Basic Info */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
              {data?.avatar ? (
                <img
                  src={data?.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} color="white" />
              )}
            </div>
            
            {/* Upload Button Overlay */}
            <button
              onClick={() => fileInputRef?.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-tier-2 hover:bg-primary/90 transition-micro"
            >
              <Icon name="Camera" size={16} color="white" />
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-2">
            {/* Name */}
            <div className="flex items-center space-x-2">
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e?.target?.value)}
                    className="text-lg font-semibold"
                    placeholder="Enter your name"
                  />
                  <Button
                    size="sm"
                    onClick={handleNameSave}
                    iconName="Check"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleNameCancel}
                    iconName="X"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-foreground">
                    {data?.name || 'Your Name'}
                  </h1>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    iconName="Edit2"
                  />
                </>
              )}
            </div>

            {/* Email and Location */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={14} />
                <span>{data?.email || 'No email provided'}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>{data?.location || 'No location provided'}</span>
              </div>
            </div>

            {/* Bio */}
            {data?.bio && (
              <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                {data?.bio}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Progress and Actions */}
        <div className="flex flex-col space-y-4">
          {/* Profile Completion */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Profile Completion</span>
              <span className={`text-sm font-semibold ${getProgressColor(completionPercentage)}`}>
                {completionPercentage}%
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(completionPercentage)}`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              {completionPercentage >= 100 
                ? 'Profile completed! You\'ll get better recommendations.'
                : 'Complete your profile to get personalized recommendations'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
            >
              Share Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;