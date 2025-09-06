import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const JobDetailModal = ({ job, isOpen, onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null,
    portfolio: '',
    additionalInfo: ''
  });

  if (!isOpen || !job) return null;

  const formatSalary = (min, max) => {
    if (min && max) {
      return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
    }
    return min ? `$${min?.toLocaleString()}+` : 'Competitive';
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleApplicationSubmit = () => {
    onApply(job, applicationData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'company', label: 'Company', icon: 'Building2' },
    { id: 'apply', label: 'Apply', icon: 'Send' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-tier-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {job?.companyLogo ? (
                <img 
                  src={job?.companyLogo} 
                  alt={job?.company}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="Building2" size={32} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{job?.title}</h2>
              <p className="text-lg text-muted-foreground">{job?.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{job?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>{job?.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={16} />
                  <span>{formatSalary(job?.salaryMin, job?.salaryMax)}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-micro ${
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
              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
                <p className="text-muted-foreground leading-relaxed">{job?.fullDescription}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {job?.detailedRequirements?.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-accent" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Deadline */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">
                    Application Deadline: {new Date(job.applicationDeadline)?.toLocaleDateString()}
                  </span>
                  <span className="text-sm text-warning">
                    ({getDaysUntilDeadline(job?.applicationDeadline)} days left)
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              {/* Company Overview */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">About {job?.company}</h3>
                <p className="text-muted-foreground leading-relaxed">{job?.companyDescription}</p>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{job?.companySize}</div>
                  <div className="text-sm text-muted-foreground">Employees</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{job?.companyFounded}</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{job?.companyIndustry}</div>
                  <div className="text-sm text-muted-foreground">Industry</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{job?.companyRating}/5</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>

              {/* Company Culture */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Company Culture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job?.companyCulture?.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Heart" size={16} className="text-error" />
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apply' && (
            <div className="space-y-6">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Application Information</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your profile information will be automatically included. Please provide additional details below.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    value={applicationData?.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e?.target?.value)}
                    placeholder="Tell us why you're interested in this position..."
                    className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <Input
                    label="Portfolio/Website"
                    type="url"
                    placeholder="https://your-portfolio.com"
                    value={applicationData?.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e?.target?.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={applicationData?.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e?.target?.value)}
                    placeholder="Any additional information you'd like to share..."
                    className="w-full h-24 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Pre-filled Information:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Personal details from your profile</li>
                    <li>• Education history</li>
                    <li>• Work experience</li>
                    <li>• Skills and certifications</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Deadline: {new Date(job.applicationDeadline)?.toLocaleDateString()}
            </span>
            {getDaysUntilDeadline(job?.applicationDeadline) <= 3 && (
              <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-md">
                Urgent
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            {activeTab === 'apply' ? (
              <Button
                variant="default"
                onClick={handleApplicationSubmit}
                disabled={!applicationData?.coverLetter?.trim()}
              >
                Submit Application
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => setActiveTab('apply')}
              >
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;