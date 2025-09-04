import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChatWidget from '../../components/ui/ChatWidget';
import EducatorCard from './components/EducatorCard';
import EducatorModal from './components/EducatorModal';
import FilterSidebar from './components/FilterSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EducatorDirectory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEducator, setSelectedEducator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    minRating: null,
    priceRange: { min: '', max: '' },
    specializations: [],
    availability: [],
    consultationTypes: [],
    verifiedOnly: false
  });

  // Mock educators data
  const mockEducators = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 127,
      experience: 12,
      specializations: ["Career Counseling", "College Admissions", "Academic Planning"],
      bio: `Dr. Johnson is a seasoned career counselor with over 12 years of experience helping students navigate their educational and professional journeys. She specializes in college admissions strategy, career exploration, and academic planning.\n\nWith a Ph.D. in Educational Psychology and certifications in career counseling, she has successfully guided over 500 students to their dream colleges and careers.`,
      education: "Ph.D. Educational Psychology, Harvard University",
      location: "Boston, MA",
      isVerified: true,
      isAvailable: true,
      consultationFee: 150,
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 89,
      experience: 8,
      specializations: ["Skill Development", "Interview Preparation", "Resume Writing"],
      bio: `Michael is a professional career coach and former HR executive with extensive experience in talent development and recruitment. He helps professionals at all stages of their careers develop essential skills and land their dream jobs.\n\nHis practical approach combines industry insights with proven coaching methodologies to deliver measurable results for his clients.`,
      education: "MBA Business Administration, Stanford University",
      location: "San Francisco, CA",
      isVerified: true,
      isAvailable: true,
      consultationFee: 120,
      addedDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 156,
      experience: 15,
      specializations: ["Graduate School", "Research Guidance", "Academic Writing"],
      bio: `Dr. Chen is a distinguished academic advisor and former university professor who specializes in graduate school preparation and research mentorship. She has helped hundreds of students gain admission to top graduate programs.\n\nWith publications in leading academic journals and years of experience in higher education, she provides invaluable insights into the academic world.`,
      education: "Ph.D. Computer Science, MIT",
      location: "Cambridge, MA",
      isVerified: true,
      isAvailable: false,
      consultationFee: 180,
      addedDate: "2023-11-10"
    },
    {
      id: 4,
      name: "James Thompson",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 73,
      experience: 10,
      specializations: ["Entrepreneurship", "Business Planning", "Startup Guidance"],
      bio: `James is a serial entrepreneur and business mentor who has founded three successful startups and now dedicates his time to helping aspiring entrepreneurs turn their ideas into reality.\n\nHis hands-on experience in building companies from the ground up provides unique insights into the challenges and opportunities of entrepreneurship.`,
      education: "MBA Entrepreneurship, Wharton School",
      location: "New York, NY",
      isVerified: true,
      isAvailable: true,
      consultationFee: 200,
      addedDate: "2024-03-05"
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 201,
      experience: 18,
      specializations: ["Scholarship Guidance", "Financial Aid", "College Planning"],
      bio: `Dr. Park is a financial aid expert and college planning specialist who has helped students secure over $50 million in scholarships and grants. Her comprehensive approach to college financing makes higher education accessible to all.\n\nWith deep knowledge of financial aid systems and scholarship opportunities, she guides families through the complex process of funding education.`,
      education: "Ed.D. Higher Education Administration, Columbia University",
      location: "Los Angeles, CA",
      isVerified: true,
      isAvailable: true,
      consultationFee: 160,
      addedDate: "2023-09-18"
    },
    {
      id: 6,
      name: "Robert Kim",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 4.5,
      reviewCount: 94,
      experience: 7,
      specializations: ["Industry Transition", "Tech Careers", "Professional Development"],
      bio: `Robert is a career transition specialist who helps professionals pivot into the technology industry. As a former software engineer turned career coach, he understands both the technical and soft skills needed for success in tech.\n\nHis structured approach to career transitions has helped over 300 professionals successfully change careers and increase their earning potential.`,
      education: "MS Computer Science, Carnegie Mellon University",
      location: "Seattle, WA",
      isVerified: false,
      isAvailable: true,
      consultationFee: 100,
      addedDate: "2024-04-12"
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Educators', icon: 'Users' },
    { id: 'top-rated', label: 'Top Rated', icon: 'Star' },
    { id: 'recent', label: 'Recently Added', icon: 'Clock' }
  ];

  const getFilteredEducators = () => {
    let filtered = [...mockEducators];

    // Filter by tab
    if (activeTab === 'top-rated') {
      filtered = filtered?.filter(educator => educator?.rating >= 4.7);
    } else if (activeTab === 'recent') {
      filtered = filtered?.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    }

    // Apply filters
    if (filters?.search) {
      filtered = filtered?.filter(educator =>
        educator?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        educator?.specializations?.some(spec => 
          spec?.toLowerCase()?.includes(filters?.search?.toLowerCase())
        )
      );
    }

    if (filters?.minRating) {
      filtered = filtered?.filter(educator => educator?.rating >= filters?.minRating);
    }

    if (filters?.priceRange?.min) {
      filtered = filtered?.filter(educator => educator?.consultationFee >= parseInt(filters?.priceRange?.min));
    }

    if (filters?.priceRange?.max) {
      filtered = filtered?.filter(educator => educator?.consultationFee <= parseInt(filters?.priceRange?.max));
    }

    if (filters?.specializations?.length > 0) {
      filtered = filtered?.filter(educator =>
        educator?.specializations?.some(spec => filters?.specializations?.includes(spec))
      );
    }

    if (filters?.availability?.includes('available')) {
      filtered = filtered?.filter(educator => educator?.isAvailable);
    }

    if (filters?.verifiedOnly) {
      filtered = filtered?.filter(educator => educator?.isVerified);
    }

    return filtered;
  };

  const handleViewProfile = (educator) => {
    setSelectedEducator(educator);
    setIsModalOpen(true);
  };

  const handleBookConsultation = (educator, bookingData = null) => {
    if (bookingData) {
      // Handle booking submission
      console.log('Booking consultation:', { educator, bookingData });
      alert(`Consultation booked with ${educator?.name}! You will receive a confirmation email shortly.`);
    } else {
      // Open booking modal
      setSelectedEducator(educator);
      setIsModalOpen(true);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      minRating: null,
      priceRange: { min: '', max: '' },
      specializations: [],
      availability: [],
      consultationTypes: [],
      verifiedOnly: false
    });
  };

  const filteredEducators = getFilteredEducators();

  return (
    <>
      <Helmet>
        <title>Educator Directory - CareerPath Advisor</title>
        <meta name="description" content="Connect with verified career counselors and educational experts for personalized guidance on your career journey." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Expert Career Guidance
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Connect with verified career counselors and educational experts who can help you navigate your academic and professional journey with confidence.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} color="var(--color-success)" />
                    <span>Verified Experts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} color="var(--color-success)" />
                    <span>Flexible Scheduling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageCircle" size={16} color="var(--color-success)" />
                    <span>Multiple Consultation Types</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <div className="hidden lg:block">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Header with Tabs and Mobile Filter Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div className="flex space-x-1 mb-4 sm:mb-0">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {filteredEducators?.length} educators found
                    </span>
                    
                    {/* Mobile Filter Toggle */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <Icon name="Filter" size={16} />
                      Filters
                    </Button>
                  </div>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                  <div className="lg:hidden mb-6">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={setFilters}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                )}

                {/* Educators Grid */}
                {filteredEducators?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredEducators?.map((educator) => (
                      <EducatorCard
                        key={educator?.id}
                        educator={educator}
                        onViewProfile={handleViewProfile}
                        onBookConsultation={handleBookConsultation}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No educators found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria to find more educators.
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Educator Detail Modal */}
        <EducatorModal
          educator={selectedEducator}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEducator(null);
          }}
          onBookConsultation={handleBookConsultation}
        />

        <ChatWidget />
      </div>
    </>
  );
};

export default EducatorDirectory;