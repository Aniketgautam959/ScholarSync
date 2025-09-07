import React from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';
import Select from '@/app/components/ui/Select';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  popularTags, 
  trendingTopics,
  isVisible,
  onClose 
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' },
    { value: 'unanswered', label: 'Unanswered' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Career Advice', label: 'Career Advice' },
    { value: 'College Life', label: 'College Life' },
    { value: 'Job Search', label: 'Job Search' },
    { value: 'Internships', label: 'Internships' },
    { value: 'Skill Development', label: 'Skill Development' },
    { value: 'Networking', label: 'Networking' },
    { value: 'General Discussion', label: 'General Discussion' }
  ];

  const handleTagClick = (tag) => {
    onFilterChange('selectedTag', tag === filters?.selectedTag ? '' : tag);
  };

  const handleClearFilters = () => {
    onFilterChange('reset');
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Sort Options */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Sort By</h3>
        <Select
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
          placeholder="Select sorting"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Category</h3>
        <Select
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          placeholder="All Categories"
        />
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags?.map((tag) => (
            <button
              key={tag?.name}
              onClick={() => handleTagClick(tag?.name)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-micro ${
                filters?.selectedTag === tag?.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              #{tag?.name}
              <span className="ml-1.5 text-xs opacity-75">({tag?.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Trending Topics
        </h3>
        <div className="space-y-2">
          {trendingTopics?.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(topic?.tag)}
              className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-micro group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground group-hover:text-primary">
                  {topic?.title}
                </span>
                <Icon name="ArrowUpRight" size={14} className="text-muted-foreground group-hover:text-primary" />
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-primary">#{topic?.tag}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{topic?.posts} posts</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* My Activity */}
      <div>
        <h3 className="font-medium text-foreground mb-3">My Activity</h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('myPosts', !filters?.myPosts)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-micro ${
              filters?.myPosts 
                ? 'bg-primary/10 text-primary' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span className="text-sm">My Posts</span>
            </div>
            <span className="text-xs">12</span>
          </button>
          
          <button
            onClick={() => onFilterChange('bookmarked', !filters?.bookmarked)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-micro ${
              filters?.bookmarked 
                ? 'bg-primary/10 text-primary' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon name="Bookmark" size={16} />
              <span className="text-sm">Bookmarked</span>
            </div>
            <span className="text-xs">8</span>
          </button>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={handleClearFilters}
        className="w-full"
        iconName="RotateCcw"
        iconPosition="left"
      >
        Clear All Filters
      </Button>
    </div>
  );

  // Mobile overlay
  if (window.innerWidth < 768) {
    return (
      <>
        {isVisible && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        )}
        <div className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-8 h-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
          <div className="p-6 overflow-y-auto h-full pb-20">
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <Icon name="Filter" size={18} className="text-muted-foreground" />
      </div>
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;