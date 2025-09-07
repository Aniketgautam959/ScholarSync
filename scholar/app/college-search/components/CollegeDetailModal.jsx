'use client';

import React, { useState } from 'react';
import Icon from '@/app/components/AppIcon';
import Image from '@/app/components/AppImage';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';

const CollegeDetailModal = ({ college, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });

  if (!isOpen || !college) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'programs', label: 'Programs', icon: 'BookOpen' },
    { id: 'facilities', label: 'Facilities', icon: 'Building' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'contact', label: 'Contact', icon: 'Mail' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={16} className="text-accent fill-current" />);
    }
    
    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={16} className="text-accent fill-current" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />);
    }
    
    return stars;
  };

  const handleInquirySubmit = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log('Inquiry submitted:', inquiryForm);
    // Reset form
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      program: '',
      message: ''
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">About {college?.name}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {college?.fullDescription || `${college?.name} is a prestigious institution known for its academic excellence and innovative research programs. With a rich history spanning decades, the college has consistently ranked among the top educational institutions in the region. Our commitment to providing quality education and fostering intellectual growth has made us a preferred choice for students worldwide.`}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Key Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded</span>
                    <span className="font-medium text-foreground">{college?.founded || '1965'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student Count</span>
                    <span className="font-medium text-foreground">{college?.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acceptance Rate</span>
                    <span className="font-medium text-foreground">{college?.acceptanceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Faculty Ratio</span>
                    <span className="font-medium text-foreground">{college?.facultyRatio || '1:12'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Campus Features</h4>
                <div className="space-y-2">
                  {(college?.campusFeatures || [
                    'Modern Library',
                    'Research Labs',
                    'Sports Complex',
                    'Student Housing',
                    'Career Center'
                  ])?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Academic Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(college?.detailedPrograms || [
                {
                  category: 'Engineering',
                  programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering']
                },
                {
                  category: 'Business',
                  programs: ['MBA', 'BBA', 'Finance', 'Marketing']
                },
                {
                  category: 'Sciences',
                  programs: ['Physics', 'Chemistry', 'Biology', 'Mathematics']
                },
                {
                  category: 'Arts & Humanities',
                  programs: ['English Literature', 'Psychology', 'History', 'Philosophy']
                }
              ])?.map((category, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3">{category?.category}</h4>
                  <div className="space-y-2">
                    {category?.programs?.map((program, pIndex) => (
                      <div key={pIndex} className="flex items-center space-x-2">
                        <Icon name="BookOpen" size={14} className="text-primary" />
                        <span className="text-sm text-muted-foreground">{program}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'facilities':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Campus Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(college?.facilities || [
                { name: 'Central Library', description: 'Modern library with 500,000+ books and digital resources' },
                { name: 'Research Labs', description: 'State-of-the-art laboratories for all engineering disciplines' },
                { name: 'Sports Complex', description: 'Indoor and outdoor sports facilities including gym and pool' },
                { name: 'Student Housing', description: 'On-campus accommodation for 2,000+ students' },
                { name: 'Medical Center', description: '24/7 healthcare services for students and staff' },
                { name: 'Career Center', description: 'Placement assistance and career counseling services' }
              ])?.map((facility, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Building" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{facility?.name}</h4>
                      <p className="text-sm text-muted-foreground">{facility?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Student Reviews</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(college?.rating)}
                </div>
                <span className="font-medium text-foreground">{college?.rating?.toFixed(1)}</span>
                <span className="text-muted-foreground">({college?.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              {(college?.reviews || [
                {
                  id: 1,
                  name: 'Sarah Johnson',
                  rating: 5,
                  program: 'Computer Science',
                  year: '2023',
                  review: `Excellent college with outstanding faculty and modern facilities. The computer science program is top-notch with great industry connections. Highly recommend for anyone looking to pursue engineering.`
                },
                {
                  id: 2,
                  name: 'Michael Chen',
                  rating: 4,
                  program: 'Mechanical Engineering',
                  year: '2022',
                  review: `Great academic environment and research opportunities. The campus is beautiful and well-maintained. Some administrative processes could be improved, but overall a fantastic experience.`
                },
                {
                  id: 3,
                  name: 'Emily Rodriguez',
                  rating: 5,
                  program: 'Business Administration',
                  year: '2023',
                  review: `The MBA program exceeded my expectations. Excellent professors, diverse student body, and strong alumni network. The career services team was incredibly helpful in securing internships.`
                }
              ])?.map((review) => (
                <div key={review?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{review?.name}</h4>
                      <p className="text-sm text-muted-foreground">{review?.program} • Class of {review?.year}</p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(review?.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review?.review}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Get in Touch</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-muted-foreground">{college?.fullAddress || `${college?.location}, United States`}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <span className="text-muted-foreground">{college?.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={16} className="text-primary" />
                    <span className="text-muted-foreground">{college?.email || 'admissions@college.edu'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Globe" size={16} className="text-primary" />
                    <span className="text-muted-foreground">{college?.website || 'www.college.edu'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Send Inquiry</h4>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    value={inquiryForm?.name}
                    onChange={(e) => setInquiryForm({...inquiryForm, name: e?.target?.value})}
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={inquiryForm?.email}
                    onChange={(e) => setInquiryForm({...inquiryForm, email: e?.target?.value})}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={inquiryForm?.phone}
                    onChange={(e) => setInquiryForm({...inquiryForm, phone: e?.target?.value})}
                  />
                  <Input
                    label="Program of Interest"
                    type="text"
                    value={inquiryForm?.program}
                    onChange={(e) => setInquiryForm({...inquiryForm, program: e?.target?.value})}
                  />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      rows="4"
                      placeholder="Tell us about your interests and questions..."
                      value={inquiryForm?.message}
                      onChange={(e) => setInquiryForm({...inquiryForm, message: e?.target?.value})}
                    />
                  </div>
                  <Button type="submit" fullWidth>
                    Send Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-tier-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={college?.logo}
              alt={`${college?.name} logo`}
              className="w-12 h-12 object-contain rounded-lg border border-border"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{college?.name}</h2>
              <div className="flex items-center text-muted-foreground text-sm">
                <Icon name="MapPin" size={14} className="mr-1" />
                <span>{college?.location}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailModal;