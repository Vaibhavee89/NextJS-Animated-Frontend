import { useState } from 'react';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationButtonProps {
  className?: string;
}

const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support notifications');
      showToastNotification(); // Show toast notification as fallback
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        toast.success('Notification permission granted!');
        sendNotification();
      } else if (permission === 'denied') {
        toast.error('Notification permission denied');
        showToastNotification(); // Show toast notification as fallback
      } else {
        toast.info('Notification permission request was dismissed');
        showToastNotification(); // Show toast notification as fallback
      }
    } catch (error) {
      toast.error('Error requesting notification permission');
      console.error('Error requesting notification permission:', error);
      showToastNotification(); // Show toast notification as fallback
    }
  };

  // Function to show a toast notification as fallback
  const showToastNotification = () => {
    toast('New Notification!', {
      description: 'This is a test notification from our PWA',
      duration: 5000,
      icon: <Bell className="h-5 w-5 text-notification-purple" />
    });
  };

  const sendNotification = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    let notificationSent = false;

    // Check if service worker is registered and ready
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then(registration => {
          // Since we don't have a real push server, we'll simulate a push event
          // by directly displaying a notification
          registration.showNotification('Hello!', {
            body: 'This is a test notification from our PWA',
            icon: '/icons/icon-192x192.png'
          });
          notificationSent = true;
        })
        .catch(error => {
          console.error('Error showing notification:', error);
          // Fallback for when service worker isn't ready
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Hello!', {
              body: 'This is a test notification from our PWA'
            });
            notificationSent = true;
          }
        })
        .finally(() => {
          // If no notification was sent through service worker or Notification API
          if (!notificationSent) {
            showToastNotification();
          }
        });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      // Fallback if service worker not supported
      new Notification('Hello!', {
        body: 'This is a test notification from our PWA'
      });
    } else {
      // Ultimate fallback - always show a toast notification
      showToastNotification();
    }
  };

  const handleClick = () => {
    // Animate the bell in all cases
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (Notification.permission === 'granted') {
      sendNotification();
    } else {
      requestNotificationPermission();
    }
    
    // Always show a toast notification when the button is clicked
    showToastNotification();
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} w-[327px] h-[42px] rounded-lg border-2 border-notification-purple text-notification-purple font-medium transition-all duration-300 hover:bg-notification-purple/10 active:scale-[0.98] relative overflow-hidden`}
    >
      <div className="relative z-10 flex items-center justify-center" style={{ gap: '8px' }}>
        <span>Send Notification</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`absolute rounded-full bg-notification-purple/40 scale-0 ${isAnimating ? 'animate-ripple' : ''}`} />
      </div>
    </button>
  );
};

export default NotificationButton;
