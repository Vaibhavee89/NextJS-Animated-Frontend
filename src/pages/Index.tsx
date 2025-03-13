import { useEffect, useState } from 'react';
import BellAnimation from '@/components/BellAnimation';
import NotificationButton from '@/components/NotificationButton';
import InstallPWA from '@/components/InstallPWA';
import { toast } from 'sonner';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if browser supports service workers and notifications
    if ('serviceWorker' in navigator && 'Notification' in window) {
      // Check if service worker is already registered
      navigator.serviceWorker.getRegistration()
        .then(registration => {
          if (!registration) {
            toast.info("App is ready to use! Click 'Send Notification' to try it out.");
          }
        });
    } else if (!('Notification' in window)) {
      toast.error('This browser does not support notifications');
    }

    // Show animation after a slight delay for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient flex flex-col items-center justify-center p-6">
      <div className={`max-w-md w-full mx-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2 animate-fade-in">
          <h1 className="text-white text-2xl font-medium">Hola!</h1>
        </div>
        
        <BellAnimation />
        
        <div className="mt-8 space-y-4 text-center">
          <h2 className="text-white text-3xl font-bold animate-fade-in" style={{ animationDelay: '100ms' }}>
            Lorem Ipsum...
          </h2>
          <p className="text-gray-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        
        <div className="mt-16 flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <NotificationButton className="border border-notification-purple/30" />
        </div>
      </div>
      
      <InstallPWA />
    </div>
  );
};

export default Index;
