import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Bell, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  
  // Mock notification count - in a real app, this would come from a state or API
  const notificationCount = 2;

  // Determine if we're on the homepage
  const isHomePage = location.pathname === "/";
  
  // Set page title based on current route
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("");
        break;
      case "/search":
        setPageTitle("Search");
        break;
      case "/profile":
        setPageTitle("My Profile");
        break;
      case "/notifications":
        setPageTitle("Notifications");
        break;
      default:
        if (location.pathname.includes("/case/")) {
          setPageTitle("Case Details");
        } else {
          setPageTitle("");
        }
    }
  }, [location.pathname]);

  return (
    <header className="fixed top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20 lg:h-24 px-0 sm:px-2 lg:px-4 mx-auto">
        {/* Logo and Title - Aligned to the far left */}
        <div className="flex items-center space-x-2 md:space-x-3 pl-4 sm:pl-0">
          <div 
            className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/")}
          >
            <img 
              src="/assets/images/logo.png" 
              alt="Legal Nexus India Logo" 
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-2 md:mr-3 object-contain bg-legal-accent p-1 rounded-full"
            />
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-legal-primary hidden md:block tracking-tight whitespace-nowrap">
              Legal Nexus <span className="text-legal-accent">India</span>
            </h1>
          </div>
          {pageTitle && (
            <div className="hidden md:block pl-4 ml-4 md:pl-5 md:ml-5 lg:pl-6 lg:ml-6 border-l">
              <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-700">{pageTitle}</h2>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Navigation - Aligned to the far right */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-5 lg:space-x-6 pr-4 sm:pr-0">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative md:h-12 md:w-12 lg:h-14 lg:w-14 hover:bg-gray-100 transition-colors"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 min-w-5 h-5 md:min-w-6 md:h-6 flex items-center justify-center p-0.5 bg-red-500 text-white text-xs md:text-sm"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:h-12 md:w-12 lg:h-14 lg:w-14 hover:bg-gray-100 transition-colors"
            onClick={() => navigate("/profile")}
          >
            <User className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-50" 
              onClick={() => {
                navigate("/notifications");
                setIsOpen(false);
              }}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {notificationCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {notificationCount}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-50"
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
