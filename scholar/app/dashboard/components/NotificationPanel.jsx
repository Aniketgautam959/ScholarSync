'use client';

import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deadline',
      title: 'MIT Application Deadline',
      message: 'Application deadline for MIT Computer Science program is in 5 days',
      time: '2 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'scholarship',
      title: 'Merit Scholarship Available',
      message: 'You qualify for the National Merit Scholarship. Apply before Dec 15th',
      time: '1 day ago',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'update',
      title: 'Profile Completion',
      message: 'Complete your profile to get better recommendations',
      time: '2 days ago',
      priority: 'low',
      read: true
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Counselor Meeting',
      message: 'Your session with Dr. Sarah Johnson is scheduled for tomorrow at 3 PM',
      time: '3 days ago',
      priority: 'medium',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    const iconMap = {
      deadline: 'Clock',
      scholarship: 'Award',
      update: 'Bell',
      reminder: 'Calendar'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colorMap?.[priority] || 'text-muted-foreground';
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== id));
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-tier-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">All caught up! No new notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-micro ${
                  !notification?.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification?.priority === 'high' ? 'bg-error/10' :
                    notification?.priority === 'medium' ? 'bg-warning/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                      className={getPriorityColor(notification?.priority)}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification?.time}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification?.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification?.id)}
                            className="w-6 h-6"
                          >
                            <Icon name="Check" size={12} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => dismissNotification(notification?.id)}
                          className="w-6 h-6"
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {notifications?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full">
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;