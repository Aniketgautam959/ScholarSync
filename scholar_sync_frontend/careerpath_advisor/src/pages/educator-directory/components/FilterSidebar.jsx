import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const specializations = [
    'Career Counseling',
    'College Admissions',
    'Academic Planning',
    'Skill Development',
    'Interview Preparation',
    'Resume Writing',
    'Entrepreneurship',
    'Graduate School',
    'Scholarship Guidance',
    'Industry Transition'
  ];

  const availabilityOptions = [
    { value: 'available', label: 'Available Now' },
    { value: 'this-week', label: 'This Week' },
    { value: 'flexible', label: 'Flexible Schedule' }
  ];

  const consultationTypes = [
    { value: 'video', label: 'Video Call' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'in-person', label: 'In-Person' },
    { value: 'chat', label: 'Text Chat' }
  ];

  const handleSpecializationChange = (specialization, checked) => {
    const updatedSpecializations = checked
      ? [...filters?.specializations, specialization]
      : filters?.specializations?.filter(s => s !== specialization);
    
    onFilterChange({ ...filters, specializations: updatedSpecializations });
  };

  const handleAvailabilityChange = (availability, checked) => {
    const updatedAvailability = checked
      ? [...filters?.availability, availability]
      : filters?.availability?.filter(a => a !== availability);
    
    onFilterChange({ ...filters, availability: updatedAvailability });
  };

  const handleConsultationTypeChange = (type, checked) => {
    const updatedTypes = checked
      ? [...filters?.consultationTypes, type]
      : filters?.consultationTypes?.filter(t => t !== type);
    
    onFilterChange({ ...filters, consultationTypes: updatedTypes });
  };

  return (
    <div className="w-80 bg-card border border-border rounded-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>
      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            label="Search Educators"
            type="search"
            placeholder="Search by name or expertise..."
            value={filters?.search}
            onChange={(e) => onFilterChange({ ...filters, search: e?.target?.value })}
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Minimum Rating
          </label>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0]?.map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters?.minRating === rating}
                  onChange={(e) => onFilterChange({ ...filters, minRating: parseFloat(e?.target?.value) })}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={14}
                      color={index < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
                      className={index < Math.floor(rating) ? "fill-current" : ""}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceRange?.min}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: { ...filters?.priceRange, min: e?.target?.value }
              })}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceRange?.max}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: { ...filters?.priceRange, max: e?.target?.value }
              })}
            />
          </div>
        </div>

        {/* Specializations */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Specializations
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {specializations?.map((specialization) => (
              <Checkbox
                key={specialization}
                label={specialization}
                checked={filters?.specializations?.includes(specialization)}
                onChange={(e) => handleSpecializationChange(specialization, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Availability
          </label>
          <div className="space-y-2">
            {availabilityOptions?.map((option) => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={filters?.availability?.includes(option?.value)}
                onChange={(e) => handleAvailabilityChange(option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Consultation Type
          </label>
          <div className="space-y-2">
            {consultationTypes?.map((type) => (
              <Checkbox
                key={type?.value}
                label={type?.label}
                checked={filters?.consultationTypes?.includes(type?.value)}
                onChange={(e) => handleConsultationTypeChange(type?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Verified Only */}
        <div>
          <Checkbox
            label="Verified Educators Only"
            checked={filters?.verifiedOnly}
            onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e?.target?.checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;