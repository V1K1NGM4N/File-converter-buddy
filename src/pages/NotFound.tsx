import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileTypeNavigation } from "@/components/FileTypeNavigation";
import { Zap, AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-12 w-12 text-primary-foreground" />
              <AlertTriangle className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl font-bold text-primary-foreground">
              404 - Page Not Found
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. 
              Let's get you back to converting files.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/60">
              <span>• Check the URL</span>
              <span>• Use navigation menu</span>
              <span>• Return to home</span>
            </div>
            
            <FileTypeNavigation className="mt-8" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              What happened?
            </h2>
            <p className="text-muted-foreground">
              The page at <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code> 
              could not be found. This might be because:
            </p>
            <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
              <li>• The URL was mistyped</li>
              <li>• The page has been moved or deleted</li>
              <li>• You don't have permission to access this page</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hover:shadow-glow">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
