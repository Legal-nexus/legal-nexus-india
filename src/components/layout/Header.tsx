
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, User, Bell } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
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
        </div>

        <div className="hidden md:flex relative w-1/3 mx-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Quick search across cases..."
            className="pl-10 bg-gray-50"
            onClick={() => navigate("/search")}
          />
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
          </Button>

          <Button 
            className="hidden md:flex bg-legal-primary hover:bg-legal-secondary"
            onClick={() => navigate("/search")}
          >
            Advanced Search
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
