
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-gradient flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold text-notification-purple mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-8">Oops! Page not found</p>
          <a href="/" className="inline-flex items-center gap-2 text-notification-purple-light hover:text-notification-purple transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="underline">Return to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
