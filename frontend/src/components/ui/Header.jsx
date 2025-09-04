import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { 
      label: 'Explore', 
      path: '/college-search', 
      icon: 'Search',
      subItems: [
        { label: 'College Search', path: '/college-search' },
        { label: 'Job Opportunities', path: '/job-opportunities' }
      ]
    },
    { 
      label: 'Community', 
      path: '/community-forum', 
      icon: 'Users',
      subItems: [
        { label: 'Community Forum', path: '/community-forum' },
        { label: 'Educator Directory', path: '/educator-directory' }
      ]
    },
    { label: 'Chat', path: '/chatbot-interface', icon: 'MessageCircle' }
  ];

  const isActiveRoute = (path, subItems = []) => {
    if (location?.pathname === path) return true;
    return subItems?.some(item => location?.pathname === item?.path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">CareerPath</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Link
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                    isActiveRoute(item?.path, item?.subItems)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                  {item?.subItems && (
                    <Icon name="ChevronDown" size={14} className="ml-1" />
                  )}
                </Link>

                {/* Dropdown for Explore and Community */}
                {item?.subItems && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-tier-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-micro">
                    <div className="py-1">
                      {item?.subItems?.map((subItem) => (
                        <Link
                          key={subItem?.path}
                          to={subItem?.path}
                          className={`block px-4 py-2 text-sm transition-micro ${
                            location?.pathname === subItem?.path
                              ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          {subItem?.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-micro"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-tier-2">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/preferences"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
                    >
                      Preferences
                    </Link>
                    <div className="border-t border-border">
                      <button className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-micro">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navigationItems?.map((item) => (
                <div key={item?.path}>
                  <Link
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-micro ${
                      isActiveRoute(item?.path, item?.subItems)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </Link>
                  
                  {/* Mobile Sub-items */}
                  {item?.subItems && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item?.subItems?.map((subItem) => (
                        <Link
                          key={subItem?.path}
                          to={subItem?.path}
                          className={`block px-4 py-2 text-sm rounded-md transition-micro ${
                            location?.pathname === subItem?.path
                              ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem?.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;