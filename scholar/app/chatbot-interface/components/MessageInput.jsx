'use client';

import React, { useState, useRef } from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || attachedFile) {
      onSendMessage({
        content: message?.trim(),
        attachment: attachedFile,
        timestamp: new Date(),
        type: 'text'
      });
      setMessage('');
      setAttachedFile(null);
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes?.includes(file?.type)) {
        alert('Please select a PDF, Word document, or text file.');
        return;
      }

      if (file?.size > maxSize) {
        alert('File size must be less than 5MB.');
        return;
      }

      setAttachedFile({
        name: file?.name,
        size: file?.size,
        type: file?.type,
        file: file
      });
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would be implemented here
  };

  const suggestedQuestions = [
    "What career paths are available in technology?",
    "How do I choose the right college major?",
    "What skills should I develop for my career?",
    "How can I improve my resume?"
  ];

  const handleSuggestedQuestion = (question) => {
    setMessage(question);
    if (textareaRef?.current) {
      textareaRef?.current?.focus();
    }
  };

  return (
    <div className="bg-card border-t border-border p-4">
      {/* Suggested Questions */}
      {message === '' && !attachedFile && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions?.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1 rounded-full transition-micro"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* File Attachment Display */}
      {attachedFile && (
        <div className="mb-3 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Paperclip" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{attachedFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(attachedFile?.size / 1024)?.toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeAttachment}
              className="w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      )}
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* File Upload Button */}
        <div className="flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef?.current?.click()}
            className="w-10 h-10"
            disabled={disabled}
          >
            <Icon name="Paperclip" size={18} />
          </Button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            disabled={disabled}
            className="w-full resize-none border border-border rounded-lg px-4 py-3 pr-12 text-sm bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            rows={1}
          />
          
          {/* Voice Recording Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={`absolute right-2 top-2 w-8 h-8 ${
              isRecording ? 'text-error' : 'text-muted-foreground'
            }`}
            disabled={disabled}
          >
            <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
          </Button>
        </div>

        {/* Send Button */}
        <div className="flex-shrink-0">
          <Button
            type="submit"
            disabled={disabled || (!message?.trim() && !attachedFile)}
            className="w-10 h-10"
            size="icon"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </form>
      {/* Character Count */}
      {message?.length > 0 && (
        <div className="flex justify-end mt-2">
          <span className={`text-xs ${
            message?.length > 500 ? 'text-warning' : 'text-muted-foreground'
          }`}>
            {message?.length}/1000
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;