import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChatWidget from '../../components/ui/ChatWidget';
import JobCard from './components/JobCard';
import FilterPanel from './components/FilterPanel';
import JobDetailModal from './components/JobDetailModal';
import CategoryTabs from './components/CategoryTabs';
import SavedJobsPanel from './components/SavedJobsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const JobOpportunities = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const jobsPerPage = 12;

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
      location: "San Francisco, CA",
      type: "Full Time",
      salaryMin: 120000,
      salaryMax: 160000,
      description: "Join our dynamic team to build cutting-edge web applications using React, TypeScript, and modern development practices.",
      fullDescription: `We are seeking a Senior Frontend Developer to join our innovative team at TechCorp Solutions. You will be responsible for developing high-quality, scalable web applications using the latest technologies and best practices.\n\nIn this role, you will collaborate with cross-functional teams to deliver exceptional user experiences, mentor junior developers, and contribute to architectural decisions that shape our product's future.`,
      requirements: "5+ years React experience, TypeScript proficiency",
      detailedRequirements: [
        "5+ years of experience with React and modern JavaScript",
        "Strong proficiency in TypeScript and ES6+",
        "Experience with state management libraries (Redux, Zustand)",
        "Knowledge of testing frameworks (Jest, React Testing Library)",
        "Familiarity with build tools and CI/CD pipelines",
        "Strong understanding of responsive design and accessibility"
      ],
      skills: ["React", "TypeScript", "Redux", "Jest", "CSS3", "HTML5", "Git", "Webpack"],
      benefits: [
        "Comprehensive health insurance",
        "401(k) with company matching",
        "Flexible work arrangements",
        "Professional development budget",
        "Stock options",
        "Unlimited PTO"
      ],
      tags: ["React", "TypeScript", "Senior", "Remote"],
      applicationDeadline: "2025-01-15",
      domain: "technology",
      isUrgent: false,
      companyDescription: "TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprise clients. We pride ourselves on creating cutting-edge products that solve real-world problems.",
      companySize: "500-1000",
      companyFounded: "2015",
      companyIndustry: "Technology",
      companyRating: 4.5,
      companyCulture: ["Innovation", "Work-life balance", "Continuous learning", "Diversity & inclusion"],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: "Data Scientist Intern",
      company: "DataFlow Analytics",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      location: "New York, NY",
      type: "Internship",
      salaryMin: 25,
      salaryMax: 35,
      description: "Exciting internship opportunity to work with machine learning models and big data analytics in a fast-paced startup environment.",
      fullDescription: `Join DataFlow Analytics as a Data Science Intern and gain hands-on experience with cutting-edge machine learning technologies. You'll work alongside senior data scientists to develop predictive models, analyze large datasets, and contribute to real-world projects that impact our clients' business decisions.\n\nThis internship offers excellent learning opportunities and potential for full-time conversion based on performance.`,
      requirements: "Python, SQL, Machine Learning basics",
      detailedRequirements: [
        "Currently pursuing degree in Data Science, Statistics, or related field",
        "Proficiency in Python and SQL",
        "Basic understanding of machine learning algorithms",
        "Experience with data visualization tools",
        "Strong analytical and problem-solving skills",
        "Excellent communication skills"
      ],
      skills: ["Python", "SQL", "Machine Learning", "Pandas", "Scikit-learn", "Tableau", "Statistics"],
      benefits: [
        "Mentorship program",
        "Learning stipend",
        "Flexible hours",
        "Networking opportunities",
        "Potential full-time offer",
        "Free lunch"
      ],
      tags: ["Python", "ML", "Internship", "Entry Level"],
      applicationDeadline: "2025-01-20",
      domain: "technology",
      isUrgent: true,
      companyDescription: "DataFlow Analytics helps businesses make data-driven decisions through advanced analytics and machine learning solutions. We work with Fortune 500 companies to unlock insights from their data.",
      companySize: "50-100",
      companyFounded: "2018",
      companyIndustry: "Analytics",
      companyRating: 4.2,
      companyCulture: ["Data-driven", "Fast-paced", "Learning-focused", "Collaborative"],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Studio Inc",
      companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop&crop=center",
      location: "Austin, TX",
      type: "Full Time",
      salaryMin: 75000,
      salaryMax: 95000,
      description: "Create beautiful and intuitive user experiences for web and mobile applications. Work with cross-functional teams to bring designs to life.",
      fullDescription: `We're looking for a talented UX/UI Designer to join our creative team at Creative Studio Inc. You'll be responsible for designing user-centered digital experiences that are both beautiful and functional.\n\nYou'll work closely with product managers, developers, and stakeholders to understand user needs and translate them into compelling design solutions.`,
      requirements: "3+ years design experience, Figma proficiency",
      detailedRequirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Strong understanding of design systems and principles",
        "Experience with user research and testing",
        "Knowledge of responsive and mobile-first design",
        "Portfolio demonstrating design process and outcomes"
      ],
      skills: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
      benefits: [
        "Creative freedom",
        "Design conference budget",
        "Latest design tools",
        "Flexible schedule",
        "Health insurance",
        "Team retreats"
      ],
      tags: ["Design", "Figma", "UX", "UI"],
      applicationDeadline: "2025-01-25",
      domain: "design",
      isUrgent: false,
      companyDescription: "Creative Studio Inc is a full-service design agency that creates exceptional digital experiences for brands across various industries. We believe in the power of good design to solve complex problems.",
      companySize: "25-50",
      companyFounded: "2012",
      companyIndustry: "Design",
      companyRating: 4.7,
      companyCulture: ["Creativity", "Collaboration", "Quality", "Innovation"],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      company: "GrowthHack Marketing",
      companyLogo: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop&crop=center",
      location: "Remote",
      type: "Full Time",
      salaryMin: 50000,
      salaryMax: 65000,
      description: "Support marketing campaigns across digital channels. Analyze performance metrics and optimize strategies for client success.",
      fullDescription: `Join GrowthHack Marketing as a Marketing Coordinator and help drive growth for our diverse client portfolio. You'll support the execution of integrated marketing campaigns across multiple digital channels while analyzing performance data to optimize results.\n\nThis role offers excellent growth opportunities in a fast-paced marketing agency environment.`,
      requirements: "2+ years marketing experience, Google Analytics",
      detailedRequirements: [
        "2+ years of digital marketing experience",
        "Proficiency in Google Analytics and marketing tools",
        "Experience with social media marketing",
        "Strong analytical and reporting skills",
        "Excellent written and verbal communication",
        "Bachelor\'s degree in Marketing or related field"
      ],
      skills: ["Google Analytics", "Social Media", "Content Marketing", "SEO", "Email Marketing", "HubSpot"],
      benefits: [
        "Remote work",
        "Marketing tool access",
        "Professional development",
        "Performance bonuses",
        "Health benefits",
        "Flexible PTO"
      ],
      tags: ["Marketing", "Remote", "Analytics", "Digital"],
      applicationDeadline: "2025-01-30",
      domain: "marketing",
      isUrgent: false,
      companyDescription: "GrowthHack Marketing is a performance-driven marketing agency that helps businesses scale through data-driven strategies and innovative campaigns.",
      companySize: "100-200",
      companyFounded: "2016",
      companyIndustry: "Marketing",
      companyRating: 4.3,
      companyCulture: ["Results-driven", "Remote-first", "Growth mindset", "Transparency"],
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      title: "Financial Analyst",
      company: "InvestPro Financial",
      companyLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center",
      location: "Chicago, IL",
      type: "Full Time",
      salaryMin: 70000,
      salaryMax: 85000,
      description: "Analyze financial data and market trends to support investment decisions. Create detailed reports and presentations for stakeholders.",
      fullDescription: `InvestPro Financial is seeking a detail-oriented Financial Analyst to join our investment research team. You'll be responsible for analyzing financial statements, market trends, and economic indicators to support our investment decision-making process.\n\nThis role offers exposure to various asset classes and the opportunity to work with experienced investment professionals.`,
      requirements: "Finance degree, Excel proficiency, CFA preferred",
      detailedRequirements: [
        "Bachelor's degree in Finance, Economics, or related field",
        "Advanced Excel skills and financial modeling experience",
        "Knowledge of financial markets and investment principles",
        "Strong analytical and quantitative skills",
        "CFA designation or progress toward CFA preferred",
        "Excellent presentation and communication skills"
      ],
      skills: ["Excel", "Financial Modeling", "Bloomberg Terminal", "PowerPoint", "SQL", "Python"],
      benefits: [
        "Competitive salary",
        "Bonus structure",
        "CFA study support",
        "Health insurance",
        "401(k) matching",
        "Professional development"
      ],
      tags: ["Finance", "Analysis", "Excel", "CFA"],
      applicationDeadline: "2025-02-05",
      domain: "finance",
      isUrgent: false,
      companyDescription: "InvestPro Financial is a boutique investment management firm specializing in equity research and portfolio management for institutional and high-net-worth clients.",
      companySize: "200-500",
      companyFounded: "2008",
      companyIndustry: "Financial Services",
      companyRating: 4.4,
      companyCulture: ["Analytical excellence", "Client focus", "Integrity", "Continuous learning"],
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      title: "Registered Nurse",
      company: "City General Hospital",
      companyLogo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center",
      location: "Boston, MA",
      type: "Full Time",
      salaryMin: 75000,
      salaryMax: 90000,
      description: "Provide compassionate patient care in our medical-surgical unit. Work with a collaborative healthcare team to ensure optimal patient outcomes.",
      fullDescription: `City General Hospital is seeking a dedicated Registered Nurse to join our medical-surgical unit. You'll provide direct patient care, administer medications, and collaborate with physicians and other healthcare professionals to ensure the highest quality of patient care.\n\nWe offer a supportive work environment with opportunities for professional growth and specialization.`,
      requirements: "RN license, BSN preferred, 2+ years experience",
      detailedRequirements: [
        "Current RN license in Massachusetts",
        "BSN degree preferred",
        "2+ years of medical-surgical nursing experience",
        "BLS and ACLS certification",
        "Strong clinical assessment skills",
        "Excellent communication and teamwork abilities"
      ],
      skills: ["Patient Care", "Medication Administration", "Clinical Assessment", "Electronic Health Records", "IV Therapy"],
      benefits: [
        "Comprehensive health benefits",
        "Retirement plan",
        "Tuition reimbursement",
        "Shift differentials",
        "Professional development",
        "Employee wellness programs"
      ],
      tags: ["Healthcare", "Nursing", "Patient Care", "BSN"],
      applicationDeadline: "2025-02-10",
      domain: "healthcare",
      isUrgent: true,
      companyDescription: "City General Hospital is a leading healthcare institution committed to providing exceptional patient care, medical education, and community health services.",
      companySize: "1000+",
      companyFounded: "1925",
      companyIndustry: "Healthcare",
      companyRating: 4.1,
      companyCulture: ["Patient-centered", "Compassion", "Excellence", "Teamwork"],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, activeCategory, filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...jobs];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(job => job?.domain === activeCategory);
    }

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(job =>
        job?.title?.toLowerCase()?.includes(searchTerm) ||
        job?.company?.toLowerCase()?.includes(searchTerm) ||
        job?.description?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Location filter
    if (filters?.location) {
      const locationTerm = filters?.location?.toLowerCase();
      filtered = filtered?.filter(job =>
        job?.location?.toLowerCase()?.includes(locationTerm)
      );
    }

    // Job type filter
    if (filters?.jobType) {
      filtered = filtered?.filter(job => job?.type?.toLowerCase()?.includes(filters?.jobType?.toLowerCase()));
    }

    // Experience level filter
    if (filters?.experienceLevel) {
      filtered = filtered?.filter(job => {
        const title = job?.title?.toLowerCase();
        switch (filters?.experienceLevel) {
          case 'entry':
            return title?.includes('intern') || title?.includes('junior') || title?.includes('entry');
          case 'mid':
            return !title?.includes('senior') && !title?.includes('lead') && !title?.includes('intern');
          case 'senior':
            return title?.includes('senior') || title?.includes('lead');
          default:
            return true;
        }
      });
    }

    // Salary filter
    if (filters?.salaryMin) {
      filtered = filtered?.filter(job => job?.salaryMin >= parseInt(filters?.salaryMin));
    }
    if (filters?.salaryMax) {
      filtered = filtered?.filter(job => job?.salaryMax <= parseInt(filters?.salaryMax));
    }

    // Domain filter
    if (filters?.domains && filters?.domains?.length > 0) {
      filtered = filtered?.filter(job => filters?.domains?.includes(job?.domain));
    }

    // Work arrangement filter
    if (filters?.workArrangement && filters?.workArrangement?.length > 0) {
      filtered = filtered?.filter(job => {
        const location = job?.location?.toLowerCase();
        return filters?.workArrangement?.some(arrangement => {
          switch (arrangement) {
            case 'remote':
              return location?.includes('remote');
            case 'hybrid':
              return location?.includes('hybrid');
            case 'onsite':
              return !location?.includes('remote') && !location?.includes('hybrid');
            default:
              return true;
          }
        });
      });
    }

    // Posted date filter
    if (filters?.postedDate) {
      const now = new Date();
      filtered = filtered?.filter(job => {
        const postedDate = new Date(job.postedDate);
        const diffTime = now - postedDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (filters?.postedDate) {
          case '24h':
            return diffDays <= 1;
          case '7d':
            return diffDays <= 7;
          case '30d':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    // Sort results
    switch (sortBy) {
      case 'date':
        filtered?.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'salary':
        filtered?.sort((a, b) => (b?.salaryMax || 0) - (a?.salaryMax || 0));
        break;
      case 'company':
        filtered?.sort((a, b) => a?.company?.localeCompare(b?.company));
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const getJobCounts = () => {
    const counts = { all: jobs?.length };
    jobs?.forEach(job => {
      counts[job.domain] = (counts?.[job?.domain] || 0) + 1;
    });
    return counts;
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleApply = (job, applicationData = null) => {
    // Simulate application submission
    console.log('Applying to:', job?.title, 'with data:', applicationData);
    // Show success message or redirect
  };

  const handleSaveJob = (jobId) => {
    const job = jobs?.find(j => j?.id === jobId);
    if (job) {
      setSavedJobs(prev => {
        const isAlreadySaved = prev?.some(savedJob => savedJob?.id === jobId);
        if (isAlreadySaved) {
          return prev?.filter(savedJob => savedJob?.id !== jobId);
        } else {
          return [...prev, job];
        }
      });
    }
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(prev => prev?.filter(job => job?.id !== jobId));
  };

  const handleClearFilters = () => {
    setFilters({});
    setActiveCategory('all');
  };

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date', label: 'Most Recent' },
    { value: 'salary', label: 'Highest Salary' },
    { value: 'company', label: 'Company A-Z' }
  ];

  // Pagination
  const totalPages = Math.ceil(filteredJobs?.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Job Opportunities - CareerPath Advisor</title>
        <meta name="description" content="Discover internships and career opportunities across various domains. Find your perfect job match with our comprehensive job search platform." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Discover internships and career positions tailored to your skills and interests
            </p>
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            jobCounts={getJobCounts()}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
                isOpen={isFilterPanelOpen}
                onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <p className="text-muted-foreground">
                    {loading ? 'Loading...' : `${filteredJobs?.length} jobs found`}
                  </p>
                  {Object.keys(filters)?.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                    >
                      <Icon name="X" size={16} className="mr-1" />
                      Clear filters
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Sort by"
                    className="w-40"
                  />
                </div>
              </div>

              {/* Job Listings */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)]?.map((_, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="w-12 h-12 bg-muted rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-muted rounded mb-2"></div>
                          <div className="h-4 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-muted rounded w-20"></div>
                        <div className="h-8 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentJobs?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={handleClearFilters}>
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentJobs?.map((job) => (
                      <JobCard
                        key={job?.id}
                        job={job}
                        onViewDetails={handleViewDetails}
                        onApply={handleApply}
                        onSave={handleSaveJob}
                        isSaved={savedJobs?.some(savedJob => savedJob?.id === job?.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <Icon name="ChevronLeft" size={16} />
                        Previous
                      </Button>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(totalPages)]?.map((_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className="w-10"
                              >
                                {page}
                              </Button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-2 text-muted-foreground">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <Icon name="ChevronRight" size={16} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onApply={handleApply}
      />
      {/* Saved Jobs Panel */}
      <SavedJobsPanel
        savedJobs={savedJobs}
        onViewJob={handleViewDetails}
        onRemoveJob={handleRemoveSavedJob}
        isOpen={isSavedPanelOpen}
        onToggle={() => setIsSavedPanelOpen(!isSavedPanelOpen)}
      />
      <ChatWidget />
    </div>
  );
};

export default JobOpportunities;