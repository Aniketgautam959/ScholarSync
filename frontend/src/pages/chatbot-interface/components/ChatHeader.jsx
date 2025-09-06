import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onClearChat, onExportChat }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const menuItems = [
    {
      label: 'Clear Chat',
      icon: 'Trash2',
      action: onClearChat,
      variant: 'destructive'
    },
    {
      label: 'Export Chat',
      icon: 'Download',
      action: onExportChat,
      variant: 'default'
    },
    {
      label: 'Settings',
      icon: 'Settings',
      action: () => console.log('Settings clicked'),
      variant: 'default'
    }
  ];

  return (
    <div className="bg-card border-b border-border px-4 py-3 sticky top-16 z-10">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="w-8 h-8 md:hidden"
          >
            <Icon name="ArrowLeft" size={18} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">CareerPath AI</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExportChat}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="relative md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8"
            >
              <Icon name="MoreVertical" size={18} />
            </Button>

            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-tier-2 z-20">
                  <div className="py-1">
                    {menuItems?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item?.action();
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-2 text-sm text-left transition-micro hover:bg-muted ${
                          item?.variant === 'destructive' ? 'text-error hover:text-error' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Info Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => console.log('Info clicked')}
          >
            <Icon name="Info" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;