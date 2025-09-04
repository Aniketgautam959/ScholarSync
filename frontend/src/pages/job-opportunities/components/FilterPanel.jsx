import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}) => {
  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' }
  ];

  const companySizes = [
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Small (51-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' }
  ];

  const domains = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleCheckboxChange = (key, value, checked) => {
    const currentValues = filters?.[key] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    
    handleFilterChange(key, newValues);
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => {
    if (Array.isArray(value)) return value?.length > 0;
    return value && value !== '';
  })?.length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg p-6 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Search Jobs"
              type="search"
              placeholder="Job title, company, or keywords"
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
            />
          </div>

          {/* Location */}
          <div>
            <Input
              label="Location"
              type="text"
              placeholder="City, state, or remote"
              value={filters?.location || ''}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
          </div>

          {/* Job Type */}
          <div>
            <Select
              label="Job Type"
              options={jobTypes}
              value={filters?.jobType || ''}
              onChange={(value) => handleFilterChange('jobType', value)}
              placeholder="Select job type"
            />
          </div>

          {/* Experience Level */}
          <div>
            <Select
              label="Experience Level"
              options={experienceLevels}
              value={filters?.experienceLevel || ''}
              onChange={(value) => handleFilterChange('experienceLevel', value)}
              placeholder="Select experience level"
            />
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Salary Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={filters?.salaryMin || ''}
                onChange={(e) => handleFilterChange('salaryMin', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters?.salaryMax || ''}
                onChange={(e) => handleFilterChange('salaryMax', e?.target?.value)}
              />
            </div>
          </div>

          {/* Company Size */}
          <div>
            <Select
              label="Company Size"
              options={companySizes}
              value={filters?.companySize || ''}
              onChange={(value) => handleFilterChange('companySize', value)}
              placeholder="Select company size"
            />
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Domain
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {domains?.map((domain) => (
                <Checkbox
                  key={domain?.value}
                  label={domain?.label}
                  checked={(filters?.domains || [])?.includes(domain?.value)}
                  onChange={(e) => handleCheckboxChange('domains', domain?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Work Arrangement */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Work Arrangement
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Remote"
                checked={(filters?.workArrangement || [])?.includes('remote')}
                onChange={(e) => handleCheckboxChange('workArrangement', 'remote', e?.target?.checked)}
              />
              <Checkbox
                label="Hybrid"
                checked={(filters?.workArrangement || [])?.includes('hybrid')}
                onChange={(e) => handleCheckboxChange('workArrangement', 'hybrid', e?.target?.checked)}
              />
              <Checkbox
                label="On-site"
                checked={(filters?.workArrangement || [])?.includes('onsite')}
                onChange={(e) => handleCheckboxChange('workArrangement', 'onsite', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Posted Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Posted Date
            </label>
            <div className="space-y-2">
              {[
                { value: '24h', label: 'Last 24 hours' },
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: 'any', label: 'Any time' }
              ]?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.postedDate === option?.value}
                  onChange={(e) => handleFilterChange('postedDate', e?.target?.checked ? option?.value : '')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;