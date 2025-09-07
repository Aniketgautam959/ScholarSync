import React from 'react';
import Icon from '@/app/components/AppIcon';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-3 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="Bot" size={16} color="white" />
        </div>

        {/* Typing Animation */}
        <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;