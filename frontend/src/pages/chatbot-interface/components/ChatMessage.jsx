import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary ml-3' : 'bg-secondary mr-3'
        }`}>
          <Icon 
            name={isUser ? "User" : "Bot"} 
            size={16} 
            color="white" 
          />
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary text-primary-foreground rounded-br-md' 
              : 'bg-muted text-muted-foreground rounded-bl-md'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message?.content}</p>
            
            {/* Attachments */}
            {message?.attachment && (
              <div className="mt-2 p-2 bg-background/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={14} />
                  <span className="text-xs">{message?.attachment?.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Timestamp and Status */}
          <div className={`flex items-center space-x-2 mt-1 ${
            isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
          }`}>
            <span className="text-xs text-muted-foreground">
              {formatTime(message?.timestamp)}
            </span>
            {isUser && (
              <Icon 
                name={message?.status === 'delivered' ? "Check" : "CheckCheck"} 
                size={12} 
                className={message?.status === 'read' ? 'text-primary' : 'text-muted-foreground'} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;