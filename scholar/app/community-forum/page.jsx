'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/app/components/ui/Header';
import ChatWidget from '@/app/components/ui/ChatWidget';
import Icon from '@/app/components/AppIcon';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import FilterSidebar from './components/FilterSidebar';
import PostDetailModal from './components/PostDetailModal';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'recent',
    category: 'all',
    selectedTag: '',
    myPosts: false,
    bookmarked: false
  });

  // Mock data
  const mockPosts = [
    {
      id: 1,
      title: "How to prepare for technical interviews at FAANG companies?",
      content: `I'm a final year computer science student and I've been applying to FAANG companies for new grad positions. I've been practicing on LeetCode but I'm still struggling with system design questions and behavioral interviews.\n\nCan anyone share their experience or tips for preparing for these interviews? What resources did you find most helpful?`,
      author: {
        id: 1,
        name: "Alex Johnson",
        role: "CS Student at MIT",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      category: "Career Advice",
      tags: ["interview", "faang", "technical", "career"],
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      upvotes: 24,
      downvotes: 2,
      replies: 8,
      views: 156,
      userVote: null,
      isBookmarked: false
    },
    {
      id: 2,
      title: "Best online courses for learning data science?",
      content: `I'm looking to transition into data science from a marketing background. I have some basic programming knowledge but need to learn statistics, machine learning, and data visualization.\n\nWhat are the best online courses or bootcamps you'd recommend? I'm particularly interested in hands-on projects and real-world applications.`,
      author: {
        id: 2,
        name: "Sarah Chen",
        role: "Marketing Professional",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      category: "Skill Development",
      tags: ["datascience", "courses", "career-change", "learning"],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      upvotes: 18,
      downvotes: 1,
      replies: 12,
      views: 203,
      userVote: 'up',
      isBookmarked: true
    },
    {
      id: 3,
      title: "Internship vs Full-time: Which path should I choose?",
      content: `I'm a junior in college and I have offers for both a summer internship at a startup and a full-time position at a mid-size company. The full-time role pays more but the internship might give me better learning opportunities.\n\nHas anyone been in a similar situation? What factors should I consider when making this decision?`,
      author: {
        id: 3,
        name: "Michael Rodriguez",
        role: "Business Student",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      category: "Internships",
      tags: ["internship", "career-decision", "advice"],
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      upvotes: 15,
      downvotes: 0,
      replies: 6,
      views: 89,
      userVote: null,
      isBookmarked: false
    },
    {
      id: 4,
      title: "How to build a strong professional network in college?",
      content: `I'm a sophomore and I keep hearing about how important networking is for career success. But I'm not sure how to start building professional relationships while still in college.\n\nWhat are some effective ways to network as a student? Should I focus on LinkedIn, attend industry events, or join professional organizations?`,
      author: {
        id: 4,
        name: "Emily Davis",
        role: "Engineering Student",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      category: "Networking",
      tags: ["networking", "college", "professional-development"],
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      upvotes: 22,
      downvotes: 1,
      replies: 9,
      views: 134,
      userVote: null,
      isBookmarked: false
    },
    {
      id: 5,
      title: "Remote work vs office: What's better for new graduates?",
      content: `I'm graduating next month and I have job offers for both remote and in-office positions. The remote job pays slightly more but I'm worried about missing out on mentorship and learning opportunities.\n\nFor those who started their careers remotely, how was your experience? Do you think it's better to start in-person for the first few years?`,
      author: {
        id: 5,
        name: "David Kim",
        role: "Recent Graduate",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      category: "Career Advice",
      tags: ["remote-work", "new-grad", "career-start"],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      upvotes: 31,
      downvotes: 3,
      replies: 15,
      views: 287,
      userVote: null,
      isBookmarked: false
    }
  ];

  const popularTags = [
    { name: "career", count: 45 },
    { name: "interview", count: 32 },
    { name: "internship", count: 28 },
    { name: "advice", count: 24 },
    { name: "college", count: 19 },
    { name: "networking", count: 16 },
    { name: "remote-work", count: 14 },
    { name: "datascience", count: 12 }
  ];

  const trendingTopics = [
    {
      title: "AI and Machine Learning Career Paths",
      tag: "ai-ml",
      posts: 23
    },
    {
      title: "Startup vs Big Tech Companies",
      tag: "startup-vs-bigtech",
      posts: 18
    },
    {
      title: "Work-Life Balance in Tech",
      tag: "work-life-balance",
      posts: 15
    },
    {
      title: "Salary Negotiation Tips",
      tag: "salary-negotiation",
      posts: 12
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(post =>
        post?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        post?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        post?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(post => post?.category === filters?.category);
    }

    // Tag filter
    if (filters?.selectedTag) {
      filtered = filtered?.filter(post => 
        post?.tags?.includes(filters?.selectedTag)
      );
    }

    // My posts filter
    if (filters?.myPosts) {
      filtered = filtered?.filter(post => post?.author?.name === 'John Doe');
    }

    // Bookmarked filter
    if (filters?.bookmarked) {
      filtered = filtered?.filter(post => post?.isBookmarked);
    }

    // Sort
    switch (filters?.sortBy) {
      case 'popular':
        filtered?.sort((a, b) => (b?.upvotes - b?.downvotes) - (a?.upvotes - a?.downvotes));
        break;
      case 'trending':
        filtered?.sort((a, b) => b?.views - a?.views);
        break;
      case 'unanswered':
        filtered = filtered?.filter(post => post?.replies === 0);
        break;
      default: // recent
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, filters]);

  const handleCreatePost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleUpvote = (postId) => {
    setPosts(prev => prev?.map(post => {
      if (post?.id === postId) {
        const currentVote = post?.userVote;
        let newUpvotes = post?.upvotes;
        let newDownvotes = post?.downvotes;
        let newUserVote = null;

        if (currentVote === 'up') {
          newUpvotes -= 1;
        } else {
          newUpvotes += 1;
          if (currentVote === 'down') newDownvotes -= 1;
          newUserVote = 'up';
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return post;
    }));
  };

  const handleDownvote = (postId) => {
    setPosts(prev => prev?.map(post => {
      if (post?.id === postId) {
        const currentVote = post?.userVote;
        let newUpvotes = post?.upvotes;
        let newDownvotes = post?.downvotes;
        let newUserVote = null;

        if (currentVote === 'down') {
          newDownvotes -= 1;
        } else {
          newDownvotes += 1;
          if (currentVote === 'up') newUpvotes -= 1;
          newUserVote = 'down';
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return post;
    }));
  };

  const handleReply = (postId) => {
    setPosts(prev => prev?.map(post => 
      post?.id === postId 
        ? { ...post, replies: post?.replies + 1 }
        : post
    ));
  };

  const handleBookmark = (postId, isBookmarked) => {
    setPosts(prev => prev?.map(post => 
      post?.id === postId 
        ? { ...post, isBookmarked }
        : post
    ));
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostDetailOpen(true);
    // Increment view count
    setPosts(prev => prev?.map(p => 
      p?.id === post?.id 
        ? { ...p, views: p?.views + 1 }
        : p
    ));
  };

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        sortBy: 'recent',
        category: 'all',
        selectedTag: '',
        myPosts: false,
        bookmarked: false
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
                <p className="text-muted-foreground mt-2">
                  Connect with peers, share experiences, and get career advice from the community
                </p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
                className="hidden sm:flex"
              >
                Create Post
              </Button>
            </div>

            {/* Search and Mobile Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </div>
              
              {/* Mobile Actions */}
              <div className="flex items-center space-x-2 sm:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFilterSidebarOpen(true)}
                >
                  <Icon name="Filter" size={18} />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Icon name="Plus" size={18} />
                </Button>
              </div>

              {/* Desktop Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                className="hidden md:flex"
                iconName="Filter"
                iconPosition="left"
              >
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPosts?.length} of {posts?.length} discussions
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Users" size={16} />
                  <span>1,247 members online</span>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-6">
                {filteredPosts?.length > 0 ? (
                  filteredPosts?.map((post) => (
                    <PostCard
                      key={post?.id}
                      post={post}
                      onUpvote={handleUpvote}
                      onDownvote={handleDownvote}
                      onReply={handleReply}
                      onBookmark={handleBookmark}
                      onPostClick={handlePostClick}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No discussions found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || filters?.selectedTag || filters?.category !== 'all' ? 'Try adjusting your search or filters' : 'Be the first to start a discussion!'}
                    </p>
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Post
                    </Button>
                  </div>
                )}
              </div>

              {/* Load More */}
              {filteredPosts?.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline">
                    Load More Discussions
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                popularTags={popularTags}
                trendingTopics={trendingTopics}
                isVisible={true}
                onClose={() => setIsFilterSidebarOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        popularTags={popularTags}
        trendingTopics={trendingTopics}
        isVisible={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
      />
      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
      <PostDetailModal
        post={selectedPost}
        isOpen={isPostDetailOpen}
        onClose={() => setIsPostDetailOpen(false)}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onReply={handleReply}
      />
      <ChatWidget />
    </div>
  );
};

export default CommunityForum;