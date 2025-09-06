import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onUpvote, onDownvote, onReply, onBookmark, onPostClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(post?.id, !isBookmarked);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-tier-2 transition-micro cursor-pointer">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={post?.author?.avatar}
            alt={post?.author?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-foreground">{post?.author?.name}</h4>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{post?.author?.role}</span>
              <span>•</span>
              <span>{formatTimeAgo(post?.createdAt)}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e?.stopPropagation();
            handleBookmark();
          }}
          className="w-8 h-8"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            color={isBookmarked ? "var(--color-primary)" : "var(--color-muted-foreground)"}
          />
        </Button>
      </div>
      {/* Post Content */}
      <div onClick={() => onPostClick(post)} className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-micro">
          {post?.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3 mb-3">
          {post?.content}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post?.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-micro cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          {/* Upvote/Downvote */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e?.stopPropagation();
                onUpvote(post?.id);
              }}
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
              onClick={(e) => {
                e?.stopPropagation();
                onDownvote(post?.id);
              }}
              className={`w-8 h-8 ${post?.userVote === 'down' ? 'text-error bg-error/10' : 'text-muted-foreground'}`}
            >
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>

          {/* Reply Count */}
          <Button
            variant="ghost"
            onClick={(e) => {
              e?.stopPropagation();
              onReply(post?.id);
            }}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="text-sm">{post?.replies}</span>
          </Button>

          {/* Views */}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Eye" size={16} />
            <span className="text-sm">{post?.views}</span>
          </div>
        </div>

        {/* Category Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          post?.category === 'Career Advice' ? 'bg-blue-100 text-blue-700' :
          post?.category === 'College Life' ? 'bg-green-100 text-green-700' :
          post?.category === 'Job Search' ? 'bg-purple-100 text-purple-700' :
          post?.category === 'Internships'? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {post?.category}
        </span>
      </div>
    </div>
  );
};

export default PostCard;