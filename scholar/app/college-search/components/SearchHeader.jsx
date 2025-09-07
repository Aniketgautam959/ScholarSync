import React from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Select from '@/app/components/ui/Select';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultsCount,
  onToggleFilters 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'location', label: 'Location' },
    { value: 'acceptance', label: 'Acceptance Rate' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Main Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search colleges by name, location, or program..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-48"
          />
          
          {/* View Mode Toggle */}
          <div className="hidden md:flex border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none border-l"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="lg:hidden"
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Filters
          </Button>
        </div>
      </div>
      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {resultsCount > 0 ? (
            <>Showing {resultsCount} college{resultsCount !== 1 ? 's' : ''}</>
          ) : (
            'No colleges found'
          )}
        </span>
        
        <div className="hidden md:flex items-center space-x-4">
          <span>View:</span>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-micro ${
              viewMode === 'grid' ?'text-primary bg-primary/10' :'hover:text-foreground'
            }`}
          >
            <Icon name="Grid3X3" size={14} />
            <span>Grid</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-micro ${
              viewMode === 'list' ?'text-primary bg-primary/10' :'hover:text-foreground'
            }`}
          >
            <Icon name="List" size={14} />
            <span>List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;