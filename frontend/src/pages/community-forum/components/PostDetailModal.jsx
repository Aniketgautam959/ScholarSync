import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostDetailModal = ({ post, isOpen, onClose, onUpvote, onDownvote, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replies, setReplies] = useState([
    {
      id: 1,
      content: "Great question! I faced a similar situation last year. What helped me was reaching out to alumni from my target companies through LinkedIn. They provided valuable insights about the company culture and interview process.",
      author: {
        name: "Sarah Chen",
        role: "Software Engineer at Google",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      upvotes: 15,
      downvotes: 1,
      userVote: null
    },
    {
      id: 2,
      content: "I'd also recommend checking out Glassdoor for company reviews and salary information. It's really helpful to understand what you're getting into before applying.",
      author: {
        name: "Michael Rodriguez",
        role: "Data Scientist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      upvotes: 8,
      downvotes: 0,
      userVote: 'up'
    }
  ]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date?.toLocaleDateString();
  };

  const handleSubmitReply = async (e) => {
    e?.preventDefault();
    if (!replyText?.trim()) return;

    setIsSubmittingReply(true);
    
    const newReply = {
      id: Date.now(),
      content: replyText,
      author: {
        name: "John Doe",
        role: "Computer Science Student",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      userVote: null
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setReplies(prev => [...prev, newReply]);
    setReplyText('');
    setIsSubmittingReply(false);
    onReply(post?.id);
  };

  const handleReplyVote = (replyId, voteType) => {
    setReplies(prev => prev?.map(reply => {
      if (reply?.id === replyId) {
        const currentVote = reply?.userVote;
        let newUpvotes = reply?.upvotes;
        let newDownvotes = reply?.downvotes;
        let newUserVote = null;

        if (voteType === 'up') {
          if (currentVote === 'up') {
            newUpvotes -= 1;
          } else {
            newUpvotes += 1;
            if (currentVote === 'down') newDownvotes -= 1;
            newUserVote = 'up';
          }
        } else {
          if (currentVote === 'down') {
            newDownvotes -= 1;
          } else {
            newDownvotes += 1;
            if (currentVote === 'up') newUpvotes -= 1;
            newUserVote = 'down';
          }
        }

        return {
          ...reply,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return reply;
    }));
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Image
              src={post?.author?.avatar}
              alt={post?.author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-foreground">{post?.author?.name}</h3>
              <p className="text-sm text-muted-foreground">{post?.author?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Post Content */}
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground mb-4">{post?.title}</h1>
            
            <div className="prose max-w-none text-foreground mb-6">
              <p className="whitespace-pre-wrap">{post?.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Voting */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpvote(post?.id)}
                    className={`w-8 h-8 ${post?.userVote === 'up' ? 'text-success bg-success/10' : 'text-muted-foreground'}`}
                  >
                    <Icon name="ChevronUp" size={16} />
                  </Button>
                  <span className="text-sm font-medium text-foreground min-w-[20px] text-center">
                    {post?.upvotes - post?.downvotes}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDownvote(post?.id)}
                    className={`w-8 h-8 ${post?.userVote === 'down' ? 'text-error bg-error/10' : 'text-muted-foreground'}`}
                  >
                    <Icon name="ChevronDown" size={16} />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">{replies?.length} replies</span>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Eye" size={16} />
                  <span className="text-sm">{post?.views} views</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Posted {formatTimeAgo(post?.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Replies Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {replies?.length} {replies?.length === 1 ? 'Reply' : 'Replies'}
            </h3>

            {/* Reply Form */}
            <form onSubmit={handleSubmitReply} className="mb-8">
              <div className="flex space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e?.target?.value)}
                    placeholder="Share your thoughts or provide helpful advice..."
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                  />
                  <div className="flex justify-end mt-3">
                    <Button
                      type="submit"
                      loading={isSubmittingReply}
                      disabled={!replyText?.trim()}
                      iconName="Send"
                      iconPosition="right"
                    >
                      {isSubmittingReply ? 'Posting...' : 'Post Reply'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Replies List */}
            <div className="space-y-6">
              {replies?.map((reply) => (
                <div key={reply?.id} className="flex space-x-4">
                  <Image
                    src={reply?.author?.avatar}
                    alt={reply?.author?.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{reply?.author?.name}</h4>
                          <p className="text-sm text-muted-foreground">{reply?.author?.role}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatTimeAgo(reply?.createdAt)}
                        </span>
                      </div>
                      <p className="text-foreground whitespace-pre-wrap">{reply?.content}</p>
                    </div>
                    
                    {/* Reply Actions */}
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReplyVote(reply?.id, 'up')}
                          className={`w-7 h-7 ${reply?.userVote === 'up' ? 'text-success bg-success/10' : 'text-muted-foreground'}`}
                        >
                          <Icon name="ChevronUp" size={14} />
                        </Button>
                        <span className="text-sm text-foreground min-w-[15px] text-center">
                          {reply?.upvotes - reply?.downvotes}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReplyVote(reply?.id, 'down')}
                          className={`w-7 h-7 ${reply?.userVote === 'down' ? 'text-error bg-error/10' : 'text-muted-foreground'}`}
                        >
                          <Icon name="ChevronDown" size={14} />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground text-sm h-7 px-2"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;