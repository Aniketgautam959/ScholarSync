'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I\'m your CareerPath AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "I understand you're looking for guidance. Let me help you explore your options. What specific area would you like to focus on - college planning, career exploration, or skill development?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Find colleges", icon: "GraduationCap" },
    { text: "Career advice", icon: "Briefcase" },
    { text: "Skill assessment", icon: "Target" },
    { text: "Job search tips", icon: "Search" }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-tier-3 transition-all duration-300 ${
            isOpen ? 'bg-muted hover:bg-muted/80' : 'bg-primary hover:bg-primary/90'
          }`}
          size="icon"
        >
          <Icon 
            name={isOpen ? "X" : "MessageCircle"} 
            size={24} 
            color={isOpen ? "var(--color-foreground)" : "white"} 
          />
        </Button>
      </div>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-lg shadow-tier-3 flex flex-col z-40 transition-panel">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">AI Assistant</h3>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8"
            >
              <Icon name="Minimize2" size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message?.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{message?.text}</p>
                  <p className={`text-xs mt-1 ${
                    message?.sender === 'user' ?'text-primary-foreground/70' :'text-muted-foreground/70'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages?.length === 1 && (
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions?.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(action?.text)}
                    className="flex items-center space-x-2 p-2 text-xs bg-muted hover:bg-muted/80 rounded-md transition-micro"
                  >
                    <Icon name={action?.icon} size={12} />
                    <span>{action?.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 resize-none border border-border rounded-md px-3 py-2 text-sm bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                rows="1"
                style={{ minHeight: '36px', maxHeight: '72px' }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue?.trim()}
                size="icon"
                className="w-9 h-9"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;