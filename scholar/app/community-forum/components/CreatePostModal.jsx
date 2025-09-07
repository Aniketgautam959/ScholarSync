'use client';

import React, { useState } from 'react';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import Select from '@/app/components/ui/Select';

const CreatePostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'Career Advice', label: 'Career Advice' },
    { value: 'College Life', label: 'College Life' },
    { value: 'Job Search', label: 'Job Search' },
    { value: 'Internships', label: 'Internships' },
    { value: 'Skill Development', label: 'Skill Development' },
    { value: 'Networking', label: 'Networking' },
    { value: 'General Discussion', label: 'General Discussion' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData?.title?.trim() || !formData?.content?.trim() || !formData?.category) {
      return;
    }

    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now(),
      title: formData?.title,
      content: formData?.content,
      category: formData?.category,
      tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
      author: {
        id: 'current-user',
        name: 'John Doe',
        role: 'Computer Science Student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      views: 0,
      userVote: null,
      isBookmarked: false
    };

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    onCreatePost(newPost);
    setFormData({ title: '', content: '', category: '', tags: '' });
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create New Post</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Post Title"
            type="text"
            placeholder="What's your question or topic?"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
            className="mb-4"
          />

          {/* Category */}
          <Select
            label="Category"
            placeholder="Select a category"
            options={categories}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            required
            className="mb-4"
          />

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Content <span className="text-error">*</span>
            </label>
            <textarea
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              value={formData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              required
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical min-h-[120px]"
            />
          </div>

          {/* Tags */}
          <Input
            label="Tags (Optional)"
            type="text"
            placeholder="career, advice, college (separate with commas)"
            description="Add relevant tags to help others find your post"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            className="mb-4"
          />

          {/* Posting Guidelines */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Posting Guidelines
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be respectful and constructive in your discussions</li>
              <li>• Use clear, descriptive titles for better visibility</li>
              <li>• Add relevant tags to help categorize your post</li>
              <li>• Search existing posts before creating duplicates</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!formData?.title?.trim() || !formData?.content?.trim() || !formData?.category}
              iconName="Send"
              iconPosition="right"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;