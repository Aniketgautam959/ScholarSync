'use client';

import React, { useState } from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';

const ChatHistory = ({ onSelectConversation, currentConversationId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const conversations = [
    {
      id: 1,
      title: "College Application Guidance",
      lastMessage: "Thank you for the detailed information about application deadlines.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messageCount: 15
    },
    {
      id: 2,
      title: "Career Path in Data Science",
      lastMessage: "What programming languages should I focus on for data science?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      messageCount: 8
    },
    {
      id: 3,
      title: "MBA vs Masters Comparison",
      lastMessage: "Can you help me compare MBA programs with specialized masters?",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      messageCount: 12
    },
    {
      id: 4,
      title: "Interview Preparation Tips",
      lastMessage: "These behavioral interview questions are very helpful.",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      messageCount: 6
    },
    {
      id: 5,
      title: "Skill Development Roadmap",
      lastMessage: "I\'ll start with the Python course you recommended.",
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      messageCount: 10
    }
  ];

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  };

  const displayedConversations = isExpanded ? conversations : conversations?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={18} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Chat History</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Show Less' : 'Show All'}
        </Button>
      </div>
      <div className="space-y-2">
        {displayedConversations?.map((conversation) => (
          <button
            key={conversation?.id}
            onClick={() => onSelectConversation(conversation)}
            className={`w-full text-left p-3 rounded-lg border transition-micro hover:bg-muted/50 ${
              currentConversationId === conversation?.id
                ? 'border-primary bg-primary/5' :'border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm text-foreground truncate flex-1 mr-2">
                {conversation?.title}
              </h4>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatRelativeTime(conversation?.timestamp)}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {conversation?.lastMessage}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {conversation?.messageCount} messages
                </span>
              </div>
              
              {currentConversationId === conversation?.id && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
      {conversations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No previous conversations</p>
          <p className="text-xs text-muted-foreground mt-1">Start a new chat to see your history here</p>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;