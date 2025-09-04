import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EducatorModal = ({ educator, isOpen, onClose, onBookConsultation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    topic: '',
    notes: ''
  });

  if (!isOpen || !educator) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  const handleBookingSubmit = (e) => {
    e?.preventDefault();
    onBookConsultation(educator, bookingData);
    onClose();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'book', label: 'Book Session', icon: 'Calendar' }
  ];

  const mockReviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2025-08-15",
      comment: "Excellent guidance on college applications. Dr. Smith helped me identify the perfect programs for my interests and provided invaluable essay feedback."
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 5,
      date: "2025-08-10",
      comment: "Very knowledgeable about career transitions in tech. The session was well-structured and I left with a clear action plan."
    },
    {
      id: 3,
      author: "Emily Davis",
      rating: 4,
      date: "2025-08-05",
      comment: "Great insights into graduate school preparation. Would definitely recommend for anyone considering advanced degrees."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={educator?.photo}
                  alt={educator?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {educator?.isVerified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{educator?.name}</h2>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(educator?.rating)}
                <span className="text-sm text-muted-foreground ml-2">
                  {educator?.rating} ({educator?.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-micro ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
                  <p className="text-muted-foreground mb-4">{educator?.bio}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="GraduationCap" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">{educator?.education}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Briefcase" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">{educator?.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">{educator?.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {educator?.specializations?.map((spec, index) => (
                      <span
                        key={index}
                        className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">Consultation Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Session Duration:</span>
                      <span className="text-sm text-foreground">60 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fee:</span>
                      <span className="text-sm text-foreground">${educator?.consultationFee}/session</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Time:</span>
                      <span className="text-sm text-foreground">Within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Client Reviews</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(educator?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {educator?.rating} out of 5 ({educator?.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockReviews?.map((review) => (
                  <div key={review?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{review?.author}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review?.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review?.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review?.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'book' && (
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-foreground mb-4">Book a Consultation</h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <Input
                  label="Preferred Date"
                  type="date"
                  value={bookingData?.date}
                  onChange={(e) => setBookingData({...bookingData, date: e?.target?.value})}
                  required
                />
                
                <Input
                  label="Preferred Time"
                  type="time"
                  value={bookingData?.time}
                  onChange={(e) => setBookingData({...bookingData, time: e?.target?.value})}
                  required
                />
                
                <Input
                  label="Session Topic"
                  type="text"
                  placeholder="e.g., College application guidance"
                  value={bookingData?.topic}
                  onChange={(e) => setBookingData({...bookingData, topic: e?.target?.value})}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    rows="3"
                    placeholder="Any specific questions or topics you'd like to discuss..."
                    value={bookingData?.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e?.target?.value})}
                  />
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Session Fee:</span>
                    <span className="text-sm font-medium text-foreground">${educator?.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="text-sm font-medium text-foreground">60 minutes</span>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Book Consultation
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducatorModal;