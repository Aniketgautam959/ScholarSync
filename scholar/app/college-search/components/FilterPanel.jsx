import React from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Select from '@/app/components/ui/Select';
import { Checkbox } from '@/app/components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle,
  className = "" 
}) => {
  const domainOptions = [
    { value: '', label: 'All Domains' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'business', label: 'Business' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'science', label: 'Science' },
    { value: 'law', label: 'Law' },
    { value: 'education', label: 'Education' }
  ];

  const fieldOptions = [
    { value: '', label: 'All Fields' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'mbbs', label: 'MBBS' },
    { value: 'bds', label: 'BDS' },
    { value: 'mba', label: 'MBA' },
    { value: 'bba', label: 'BBA' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'english', label: 'English Literature' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'california', label: 'California' },
    { value: 'new-york', label: 'New York' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' },
    { value: 'illinois', label: 'Illinois' },
    { value: 'pennsylvania', label: 'Pennsylvania' },
    { value: 'ohio', label: 'Ohio' },
    { value: 'georgia', label: 'Georgia' }
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '3.0', label: '3.0+ Stars' }
  ];

  const campusTypeOptions = [
    { value: 'urban', label: 'Urban Campus' },
    { value: 'suburban', label: 'Suburban Campus' },
    { value: 'rural', label: 'Rural Campus' }
  ];

  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleCheckboxChange = (field, value, checked) => {
    const currentValues = filters?.[field] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    onFilterChange({ ...filters, [field]: newValues });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.domain) count++;
    if (filters?.field) count++;
    if (filters?.location) count++;
    if (filters?.minRating) count++;
    if (filters?.campusTypes?.length > 0) count++;
    if (filters?.hasScholarships) count++;
    if (filters?.acceptsInternational) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Input
          type="search"
          label="Search Colleges"
          placeholder="Search by name, location, or program..."
          value={filters?.search || ''}
          onChange={(e) => handleInputChange('search', e?.target?.value)}
        />
      </div>

      {/* Domain */}
      <div>
        <Select
          label="Domain"
          options={domainOptions}
          value={filters?.domain || ''}
          onChange={(value) => handleInputChange('domain', value)}
        />
      </div>

      {/* Field of Study */}
      <div>
        <Select
          label="Field of Study"
          options={fieldOptions}
          value={filters?.field || ''}
          onChange={(value) => handleInputChange('field', value)}
          searchable
        />
      </div>

      {/* Location */}
      <div>
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location || ''}
          onChange={(value) => handleInputChange('location', value)}
          searchable
        />
      </div>

      {/* Rating */}
      <div>
        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters?.minRating || ''}
          onChange={(value) => handleInputChange('minRating', value)}
        />
      </div>

      {/* Campus Type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Campus Type
        </label>
        <div className="space-y-2">
          {campusTypeOptions?.map((option) => (
            <Checkbox
              key={option?.value}
              label={option?.label}
              checked={(filters?.campusTypes || [])?.includes(option?.value)}
              onChange={(e) => handleCheckboxChange('campusTypes', option?.value, e?.target?.checked)}
            />
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Additional Criteria
        </label>
        <div className="space-y-2">
          <Checkbox
            label="Offers Scholarships"
            checked={filters?.hasScholarships || false}
            onChange={(e) => handleInputChange('hasScholarships', e?.target?.checked)}
          />
          <Checkbox
            label="Accepts International Students"
            checked={filters?.acceptsInternational || false}
            onChange={(e) => handleInputChange('acceptsInternational', e?.target?.checked)}
          />
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onClearFilters}
          fullWidth
          iconName="X"
          iconPosition="left"
          iconSize={14}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className={`hidden lg:block ${className}`}>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <FilterContent />
        </div>
      </div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="w-full mb-4"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>
      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onToggle}>
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;