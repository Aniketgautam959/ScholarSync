import React from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';

const SavedJobsPanel = ({ savedJobs, onViewJob, onRemoveJob, isOpen, onToggle }) => {
  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex-col h-auto py-3 px-2"
      >
        <Icon name="Bookmark" size={20} />
        <span className="text-xs mt-1">Saved</span>
        {savedJobs?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {savedJobs?.length}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-card border border-border rounded-lg shadow-tier-3 z-40 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Saved Jobs</h3>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {savedJobs?.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Content */}
      <div className="overflow-y-auto max-h-80">
        {savedJobs?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="BookmarkPlus" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No saved jobs yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the bookmark icon on job cards to save them here
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {savedJobs?.map((job) => (
              <div
                key={job?.id}
                className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-micro"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {job?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {job?.company}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {job?.location}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {job?.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => onViewJob(job)}
                      className="p-1 hover:bg-muted rounded transition-micro"
                    >
                      <Icon name="Eye" size={14} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => onRemoveJob(job?.id)}
                      className="p-1 hover:bg-muted rounded transition-micro"
                    >
                      <Icon name="Trash2" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPanel;