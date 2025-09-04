import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import ChatWidget from '../../components/ui/ChatWidget';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import QuickActions from './components/QuickActions';
import ChatHistory from './components/ChatHistory';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(1);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Pre-populated Q&A pairs and conversation starters
  const initialMessages = [
    {
      id: 1,
      content: `Hello! I'm your CareerPath AI assistant. I'm here to help you with:\n\n• College admissions guidance\n• Career path exploration\n• Skill development recommendations\n• Interview preparation\n• Resume optimization\n• Salary negotiation tips\n\nWhat would you like to discuss today?`,
      isUser: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'delivered'
    }
  ];

  const sampleResponses = {
    'college': `Great question about college! Here are some key points to consider:\n\n🎓 **Application Process:**\n• Research deadlines and requirements\n• Prepare standardized test scores (SAT/ACT)\n• Write compelling personal essays\n• Gather strong letters of recommendation\n\n📚 **Choosing the Right Fit:**\n• Consider your academic interests and career goals\n• Evaluate campus culture and location\n• Review financial aid options and costs\n• Look at graduation rates and job placement statistics\n\nWould you like me to elaborate on any of these areas?`,
    
    'career': `Excellent! Career planning is crucial for your success. Here's a comprehensive approach:\n\n🎯 **Self-Assessment:**\n• Identify your interests, values, and strengths\n• Take career assessment tests\n• Consider your work-life balance preferences\n\n🔍 **Research & Exploration:**\n• Investigate different career paths\n• Network with professionals in your field of interest\n• Seek informational interviews\n• Consider job shadowing opportunities\n\n📈 **Skill Development:**\n• Identify required skills for your target career\n• Pursue relevant certifications or training\n• Build a portfolio of your work\n\nWhat specific career area interests you most?`,
    
    'skills': `Skills development is key to career success! Here are the most in-demand skills across industries:\n\n💻 **Technical Skills:**\n• Data analysis and visualization\n• Programming (Python, JavaScript, SQL)\n• Digital marketing and SEO\n• Cloud computing (AWS, Azure)\n• Artificial Intelligence and Machine Learning\n\n🧠 **Soft Skills:**\n• Critical thinking and problem-solving\n• Communication and presentation\n• Leadership and team collaboration\n• Adaptability and continuous learning\n• Emotional intelligence\n\n🎨 **Creative Skills:**\n• UX/UI design\n• Content creation and storytelling\n• Video editing and production\n\nWhich area would you like to focus on developing?`,
    
    'interview': `Interview preparation is essential! Here's a comprehensive guide:\n\n📋 **Before the Interview:**\n• Research the company thoroughly\n• Review the job description and requirements\n• Prepare specific examples using the STAR method\n• Practice common interview questions\n• Prepare thoughtful questions to ask\n\n💼 **During the Interview:**\n• Arrive 10-15 minutes early\n• Maintain good eye contact and body language\n• Listen actively and ask clarifying questions\n• Provide specific examples from your experience\n• Show enthusiasm for the role and company\n\n✅ **After the Interview:**\n• Send a thank-you email within 24 hours\n• Reiterate your interest in the position\n• Address any concerns that came up\n\nWould you like me to help you practice specific interview questions?`,
    
    'resume': `Let me help you create an outstanding resume! Here are the key elements:\n\n📄 **Resume Structure:**\n• Contact information and professional summary\n• Work experience with quantifiable achievements\n• Education and relevant coursework\n• Skills section (technical and soft skills)\n• Additional sections (certifications, projects, volunteer work)\n\n✨ **Best Practices:**\n• Use action verbs and quantify achievements\n• Tailor your resume for each job application\n• Keep it concise (1-2 pages for most professionals)\n• Use a clean, professional format\n• Proofread carefully for errors\n\n🎯 **Common Mistakes to Avoid:**\n• Generic objective statements\n• Listing job duties instead of achievements\n• Including irrelevant information\n• Using unprofessional email addresses\n\nWould you like specific feedback on any section of your resume?`,
    
    'salary': `Salary negotiation is an important skill! Here's how to approach it effectively:\n\n🔍 **Research Phase:**\n• Use sites like Glassdoor, PayScale, and LinkedIn Salary Insights\n• Consider location, experience level, and company size\n• Factor in total compensation (benefits, bonuses, equity)\n\n💪 **Preparation:**\n• Document your achievements and value proposition\n• Practice your negotiation conversation\n• Determine your minimum acceptable offer\n• Consider non-salary benefits you value\n\n🗣️ **Negotiation Tips:**\n• Express enthusiasm for the role first\n• Present your research and reasoning\n• Be collaborative, not confrontational\n• Consider the entire package, not just base salary\n• Be prepared to walk away if necessary\n\nWhat specific aspect of salary negotiation would you like to explore further?`
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage) => {
    const message = userMessage?.toLowerCase();
    
    // Check for keywords and return appropriate response
    if (message?.includes('college') || message?.includes('admission') || message?.includes('university')) {
      return sampleResponses?.college;
    } else if (message?.includes('career') || message?.includes('job') || message?.includes('profession')) {
      return sampleResponses?.career;
    } else if (message?.includes('skill') || message?.includes('learn') || message?.includes('develop')) {
      return sampleResponses?.skills;
    } else if (message?.includes('interview') || message?.includes('preparation')) {
      return sampleResponses?.interview;
    } else if (message?.includes('resume') || message?.includes('cv')) {
      return sampleResponses?.resume;
    } else if (message?.includes('salary') || message?.includes('negotiation') || message?.includes('pay')) {
      return sampleResponses?.salary;
    } else {
      // Default response for other queries
      return `Thank you for your question! I understand you're looking for guidance on "${userMessage}".\n\nBased on your query, I'd recommend:\n\n• Exploring our college search feature to find programs that match your interests\n• Connecting with verified educators in our directory for personalized advice\n• Joining relevant discussions in our community forum\n• Taking our career assessment to better understand your strengths\n\nIs there a specific aspect you'd like me to help you with in more detail?`;
    }
  };

  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      content: messageData?.content,
      isUser: true,
      timestamp: messageData?.timestamp,
      status: 'delivered',
      attachment: messageData?.attachment
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: generateAIResponse(messageData?.content),
        isUser: false,
        timestamp: new Date(),
        status: 'delivered'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleQuickAction = (query) => {
    handleSendMessage({
      content: query,
      timestamp: new Date()
    });
  };

  const handleSelectConversation = (conversation) => {
    setCurrentConversationId(conversation?.id);
    // In a real app, you would load the conversation messages here
    console.log('Selected conversation:', conversation);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this chat? This action cannot be undone.')) {
      setMessages(initialMessages);
    }
  };

  const handleExportChat = () => {
    const chatData = {
      conversationId: currentConversationId,
      timestamp: new Date()?.toISOString(),
      messages: messages?.map(msg => ({
        content: msg?.content,
        sender: msg?.isUser ? 'user' : 'ai',
        timestamp: msg?.timestamp
      }))
    };

    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `careerpath-chat-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <ChatHeader 
          onClearChat={handleClearChat}
          onExportChat={handleExportChat}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Chat History */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <ChatHistory 
                onSelectConversation={handleSelectConversation}
                currentConversationId={currentConversationId}
              />
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden shadow-tier-1">
                {/* Quick Actions - Show only when chat is empty or minimal */}
                {messages?.length <= 1 && (
                  <div className="p-6 border-b border-border">
                    <QuickActions onActionClick={handleQuickAction} />
                  </div>
                )}

                {/* Messages Area */}
                <div 
                  ref={chatContainerRef}
                  className="h-[60vh] overflow-y-auto p-6 space-y-4"
                >
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message}
                      isUser={message?.isUser}
                    />
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <MessageInput 
                  onSendMessage={handleSendMessage}
                  disabled={isTyping}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

export default ChatbotInterface;