import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BasicInfoSection = ({ data, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    location: data?.location || '',
    bio: data?.bio || '',
    dateOfBirth: data?.dateOfBirth || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Update each field
    Object.keys(formData)?.forEach(key => {
      onChange(key, formData?.[key]);
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      location: data?.location || '',
      bio: data?.bio || '',
      dateOfBirth: data?.dateOfBirth || ''
    });
    setIsEditing(false);
  };

  const infoFields = [
    {
      key: 'name',
      label: 'Full Name',
      icon: 'User',
      type: 'text',
      placeholder: 'Enter your full name'
    },
    {
      key: 'email',
      label: 'Email Address',
      icon: 'Mail',
      type: 'email',
      placeholder: 'Enter your email address'
    },
    {
      key: 'phone',
      label: 'Phone Number',
      icon: 'Phone',
      type: 'tel',
      placeholder: 'Enter your phone number'
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'MapPin',
      type: 'text',
      placeholder: 'City, State/Country'
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      icon: 'Calendar',
      type: 'date',
      placeholder: 'Select your date of birth'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          <p className="text-sm text-muted-foreground">
            Update your personal details and contact information
          </p>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
          >
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              iconName="X"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              iconName="Check"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Basic Info Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoFields?.map((field) => (
          <div key={field?.key} className="space-y-2">
            {isEditing ? (
              <Input
                label={field?.label}
                name={field?.key}
                type={field?.type}
                value={formData?.[field?.key]}
                onChange={handleInputChange}
                placeholder={field?.placeholder}
                className="w-full"
              />
            ) : (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {field?.label}
                </label>
                <div className="flex items-center space-x-2 mt-1 p-3 bg-muted/30 rounded-md">
                  <Icon name={field?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-foreground">
                    {data?.[field?.key] || 'Not provided'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bio Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Bio
        </label>
        {isEditing ? (
          <div>
            <textarea
              name="bio"
              value={formData?.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself, your interests, and career goals..."
              className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData?.bio?.length || 0}/500 characters
            </p>
          </div>
        ) : (
          <div className="p-3 bg-muted/30 rounded-md min-h-[100px]">
            <p className="text-foreground">
              {data?.bio || 'No bio provided. Add a brief description about yourself and your career goals.'}
            </p>
          </div>
        )}
      </div>

      {/* Contact Preferences */}
      {!isEditing && (
        <div className="border-t border-border pt-6 mt-6">
          <h4 className="font-medium text-foreground mb-4">Contact Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Bell" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates about opportunities and recommendations</p>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">SMS Alerts</p>
                  <p className="text-xs text-muted-foreground">Get urgent updates via text message</p>
                </div>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Profile Visibility</p>
                  <p className="text-xs text-muted-foreground">Allow educators and recruiters to find your profile</p>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection;