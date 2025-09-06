import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onViewDetails, onApply, onSave, isSaved }) => {
  const formatSalary = (min, max, currency = 'USD') => {
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

  const getDeadlineStatus = (deadline) => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return { text: 'Expired', color: 'text-error', bg: 'bg-error/10' };
    if (days <= 3) return { text: `${days} days left`, color: 'text-warning', bg: 'bg-warning/10' };
    if (days <= 7) return { text: `${days} days left`, color: 'text-accent', bg: 'bg-accent/10' };
    return { text: `${days} days left`, color: 'text-success', bg: 'bg-success/10' };
  };

  const deadlineStatus = getDeadlineStatus(job?.applicationDeadline);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-tier-2 transition-micro">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {job?.companyLogo ? (
              <img 
                src={job?.companyLogo} 
                alt={job?.company}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="Building2" size={24} className="text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{job?.title}</h3>
            <p className="text-sm text-muted-foreground">{job?.company}</p>
          </div>
        </div>
        <button
          onClick={() => onSave(job?.id)}
          className="p-2 hover:bg-muted rounded-md transition-micro"
        >
          <Icon 
            name={isSaved ? "Bookmark" : "BookmarkPlus"} 
            size={20} 
            className={isSaved ? "text-primary" : "text-muted-foreground"} 
          />
        </button>
      </div>
      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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

        <p className="text-sm text-foreground line-clamp-2">{job?.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {job?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{job?.tags?.length - 3} more
            </span>
          )}
        </div>

        {/* Requirements */}
        <div className="text-sm">
          <span className="text-muted-foreground">Requirements: </span>
          <span className="text-foreground">{job?.requirements}</span>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 text-xs rounded-md ${deadlineStatus?.bg} ${deadlineStatus?.color}`}>
            {deadlineStatus?.text}
          </span>
          {job?.isUrgent && (
            <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-md">
              Urgent
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(job)}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onApply(job)}
            disabled={getDaysUntilDeadline(job?.applicationDeadline) < 0}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;