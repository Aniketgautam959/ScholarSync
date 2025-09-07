'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/app/components/ui/Header';
import ChatWidget from '@/app/components/ui/ChatWidget';
import CollegeCard from './components/CollegeCard';
import CollegeListView from './components/CollegeListView';
import FilterPanel from './components/FilterPanel';
import SearchHeader from './components/SearchHeader';
import CollegeDetailModal from './components/CollegeDetailModal';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';



const CollegeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    domain: '',
    field: '',
    location: '',
    minRating: '',
    campusTypes: [],
    hasScholarships: false,
    acceptsInternational: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [favoriteColleges, setFavoriteColleges] = useState(new Set());

  // Mock college data
  const mockColleges = [
    {
      id: 1,
      name: "Stanford University",
      location: "Stanford, California",
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "A leading research university known for its entrepreneurial spirit and innovation in technology and business.",
      programs: ["Computer Science", "Engineering", "Business", "Medicine", "Law"],
      acceptanceRate: 4.3,
      studentCount: "17,249",
      domain: "engineering",
      field: "computer-science",
      campusType: "suburban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1885",
      facultyRatio: "1:7",
      fullDescription: `Stanford University is a private research university in Stanford, California. The campus occupies 8,180 acres, among the largest in the United States, and enrolls over 17,000 students. Stanford is ranked among the world's top universities.`,
      campusFeatures: [
        "Modern Library with 9.3M volumes",
        "150+ Research Centers",
        "World-class Sports Complex",
        "On-campus Housing for 12,000+",
        "24/7 Medical Center",
        "Career Services Center"
      ]
    },
    {
      id: 2,
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, Massachusetts",
      rating: 4.7,
      reviewCount: 3156,
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "World-renowned institute focusing on science, technology, engineering, and mathematics education and research.",
      programs: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Physics", "Mathematics"],
      acceptanceRate: 6.7,
      studentCount: "11,934",
      domain: "engineering",
      field: "electrical",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1861"
    },
    {
      id: 3,
      name: "Harvard University",
      location: "Cambridge, Massachusetts",
      rating: 4.6,
      reviewCount: 4521,
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "Prestigious Ivy League university offering comprehensive undergraduate and graduate programs across all disciplines.",
      programs: ["Medicine", "Law", "Business", "Liberal Arts", "Public Policy"],
      acceptanceRate: 3.4,
      studentCount: "23,731",
      domain: "medicine",
      field: "mbbs",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1636"
    },
    {
      id: 4,
      name: "University of California, Berkeley",
      location: "Berkeley, California",
      rating: 4.5,
      reviewCount: 2934,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "Top public research university known for academic excellence and groundbreaking research across multiple fields.",
      programs: ["Engineering", "Computer Science", "Business", "Psychology", "Environmental Science"],
      acceptanceRate: 16.3,
      studentCount: "45,057",
      domain: "engineering",
      field: "computer-science",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1868"
    },
    {
      id: 5,
      name: "Carnegie Mellon University",
      location: "Pittsburgh, Pennsylvania",
      rating: 4.4,
      reviewCount: 1876,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "Leading research university specializing in computer science, engineering, and interdisciplinary programs.",
      programs: ["Computer Science", "Robotics", "Engineering", "Drama", "Business"],
      acceptanceRate: 15.4,
      studentCount: "14,799",
      domain: "engineering",
      field: "computer-science",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1900"
    },
    {
      id: 6,
      name: "University of Pennsylvania",
      location: "Philadelphia, Pennsylvania",
      rating: 4.5,
      reviewCount: 3287,
      image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "Ivy League university with strong programs in business, medicine, and liberal arts.",
      programs: ["Business", "Medicine", "Engineering", "Liberal Arts", "Nursing"],
      acceptanceRate: 5.9,
      studentCount: "26,552",
      domain: "business",
      field: "mba",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1740"
    },
    {
      id: 7,
      name: "Georgia Institute of Technology",
      location: "Atlanta, Georgia",
      rating: 4.3,
      reviewCount: 2156,
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "Premier technological university known for engineering, computing, and innovation.",
      programs: ["Engineering", "Computer Science", "Business", "Architecture", "Sciences"],
      acceptanceRate: 20.5,
      studentCount: "36,489",
      domain: "engineering",
      field: "mechanical",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1885"
    },
    {
      id: 8,
      name: "University of Chicago",
      location: "Chicago, Illinois",
      rating: 4.4,
      reviewCount: 2743,
      image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      description: "Research university renowned for economics, social sciences, and liberal arts education.",
      programs: ["Economics", "Business", "Medicine", "Law", "Liberal Arts"],
      acceptanceRate: 6.2,
      studentCount: "17,834",
      domain: "business",
      field: "mba",
      campusType: "urban",
      hasScholarships: true,
      acceptsInternational: true,
      founded: "1890"
    }
  ];

  // Filter and sort colleges
  const filteredAndSortedColleges = useMemo(() => {
    let filtered = mockColleges?.filter(college => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery?.toLowerCase();
        const matchesName = college?.name?.toLowerCase()?.includes(query);
        const matchesLocation = college?.location?.toLowerCase()?.includes(query);
        const matchesPrograms = college?.programs?.some(program => 
          program?.toLowerCase()?.includes(query)
        );
        if (!matchesName && !matchesLocation && !matchesPrograms) {
          return false;
        }
      }

      // Domain filter
      if (filters?.domain && college?.domain !== filters?.domain) {
        return false;
      }

      // Field filter
      if (filters?.field && college?.field !== filters?.field) {
        return false;
      }

      // Location filter
      if (filters?.location) {
        const locationMatch = college?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase());
        if (!locationMatch) return false;
      }

      // Rating filter
      if (filters?.minRating && college?.rating < parseFloat(filters?.minRating)) {
        return false;
      }

      // Campus type filter
      if (filters?.campusTypes?.length > 0 && !filters?.campusTypes?.includes(college?.campusType)) {
        return false;
      }

      // Scholarships filter
      if (filters?.hasScholarships && !college?.hasScholarships) {
        return false;
      }

      // International students filter
      if (filters?.acceptsInternational && !college?.acceptsInternational) {
        return false;
      }

      return true;
    });

    // Sort colleges
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'location':
          return a?.location?.localeCompare(b?.location);
        case 'acceptance':
          return a?.acceptanceRate - b?.acceptanceRate;
        default: // relevance
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleViewDetails = (college) => {
    setSelectedCollege(college);
    setIsDetailModalOpen(true);
  };

  const handleSaveFavorite = (collegeId) => {
    const newFavorites = new Set(favoriteColleges);
    if (newFavorites?.has(collegeId)) {
      newFavorites?.delete(collegeId);
    } else {
      newFavorites?.add(collegeId);
    }
    setFavoriteColleges(newFavorites);
  };

  const handleClearFilters = () => {
    setFilters({
      domain: '',
      field: '',
      location: '',
      minRating: '',
      campusTypes: [],
      hasScholarships: false,
      acceptsInternational: false
    });
    setSearchQuery('');
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Find Your Perfect College
            </h1>
            <p className="text-muted-foreground">
              Discover and compare top educational institutions based on your preferences and goals.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
              isOpen={isFilterPanelOpen}
              onToggle={toggleFilterPanel}
              className="w-80 flex-shrink-0"
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search Header */}
              <SearchHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={filteredAndSortedColleges?.length}
                onToggleFilters={toggleFilterPanel}
              />

              {/* Results */}
              {filteredAndSortedColleges?.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" :"space-y-4"
                }>
                  {filteredAndSortedColleges?.map((college) => (
                    viewMode === 'grid' ? (
                      <CollegeCard
                        key={college?.id}
                        college={college}
                        onViewDetails={handleViewDetails}
                        onSaveFavorite={handleSaveFavorite}
                        isFavorite={favoriteColleges?.has(college?.id)}
                      />
                    ) : (
                      <CollegeListView
                        key={college?.id}
                        college={college}
                        onViewDetails={handleViewDetails}
                        onSaveFavorite={handleSaveFavorite}
                        isFavorite={favoriteColleges?.has(college?.id)}
                      />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No colleges found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more results.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* College Detail Modal */}
      <CollegeDetailModal
        college={selectedCollege}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCollege(null);
        }}
      />
      <ChatWidget />
    </div>
  );
};

export default CollegeSearch;