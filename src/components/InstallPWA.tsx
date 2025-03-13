
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsVisible(false);
    } else {
      // For desktop browsers that don't trigger beforeinstallprompt
      // Make button visible anyway for browsers like Chrome on desktop
      if (!isMobile) {
        setIsVisible(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast.success('Thank you for installing our app!');
        setIsVisible(false);
      } else {
        toast.info('App installation cancelled');
      }
      
      setInstallPrompt(null);
    } else {
      // For desktop browsers that don't support installPrompt
      toast.info('Installation Instructions', {
        description: 'On desktop: Click the install icon in your browser address bar or use the browser menu to install this application.',
        duration: 6000
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-notification-purple/20 text-white hover:bg-notification-purple/30 transition-all duration-300 glass-morphism animate-scale-in"
      aria-label="Install App"
    >
      <Download className="h-6 w-6" />
    </button>
  );
};

export default InstallPWA;
