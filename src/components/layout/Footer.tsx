
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-legal-secondary text-white py-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal Nexus India</h4>
            <p className="text-sm text-gray-300">
              Transforming legal research through AI and knowledge graphs, 
              providing unparalleled insights for Indian legal professionals.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-legal-accent" onClick={() => navigate("/tutorials")}>Tutorials</button></li>
              <li><button className="hover:text-legal-accent" onClick={() => navigate("/apis")}>API Documentation</button></li>
              <li><button className="hover:text-legal-accent" onClick={() => navigate("/guides")}>User Guides</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-legal-accent" onClick={() => navigate("/terms")}>Terms of Service</button></li>
              <li><button className="hover:text-legal-accent" onClick={() => navigate("/privacy")}>Privacy Policy</button></li>
              <li><button className="hover:text-legal-accent" onClick={() => navigate("/disclaimer")}>Legal Disclaimer</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@legalnexus.in</li>
              <li>Phone: +91 123 456 7890</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Legal Nexus India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
