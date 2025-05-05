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
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-legal-primary text-white mr-2">
              <span className="font-bold text-sm">LN</span>
            </div>
            <h1 className="text-lg font-bold text-legal-primary hidden md:block">
              Legal Nexus <span className="text-legal-accent">India</span>
            </h1>
          </div>
          {pageTitle && (
            <div className="hidden md:block pl-4 ml-4 border-l">
              <h2 className="text-lg font-medium text-gray-700">{pageTitle}</h2>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center p-0.5 bg-red-500 text-white text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
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
