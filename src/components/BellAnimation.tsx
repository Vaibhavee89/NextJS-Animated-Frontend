
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

const BellAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start the animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    // Setup interval for periodic animations
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bell-container mx-auto my-8 animate-fade-in">
      <div className="bell-circle-1"></div>
      <div className="bell-circle-2"></div>
      <div className="bell-circle-3"></div>
      <div className="bell-waves"></div>
      <div className="bell-icon-container glass-morphism ring-glow">
        <Bell
          size={64}
          className={`text-notification-purple-light ${
            isAnimating ? 'animate-bell-ring' : ''
          }`}
          onAnimationEnd={() => setIsAnimating(false)}
        />
      </div>
    </div>
  );
};

export default BellAnimation;
