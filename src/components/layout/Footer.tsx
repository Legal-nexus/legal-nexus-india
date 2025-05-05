import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-legal-secondary text-white py-8 md:py-12 w-full">
      <div className="container px-4">
        {/* Logo and company information */}
        <div className="flex flex-col items-center mb-8 md:mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-legal-primary mr-3">
              <span className="font-bold text-lg md:text-2xl">LN</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold">
              Legal Nexus <span className="text-legal-accent">India</span>
            </h2>
          </div>
          <p className="max-w-xl text-center text-gray-300 mb-6">
            Pioneering AI-powered legal research in India, connecting professionals with the most relevant precedents through advanced knowledge graphs and natural language processing.
          </p>
          
          {/* Social links */}
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-legal-accent transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-legal-accent transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-legal-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-legal-accent transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      
        {/* Main footer links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-legal-accent">About Us</h4>
            <ul className="space-y-3">
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/about")}>Our Story</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/team")}>Our Team</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/careers")}>Careers</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/press")}>Press & Media</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/awards")}>Awards & Recognition</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-legal-accent">Resources</h4>
            <ul className="space-y-3">
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/tutorials")}>Tutorials</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/webinars")}>Webinars</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/guides")}>User Guides</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/apis")}>API Documentation</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/blog")}>Legal Blog</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-legal-accent">Legal</h4>
            <ul className="space-y-3">
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/terms")}>Terms of Service</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/privacy")}>Privacy Policy</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/disclaimer")}>Legal Disclaimer</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/copyright")}>Copyright Notice</button></li>
              <li><button className="hover:text-legal-accent transition-colors" onClick={() => navigate("/accessibility")}>Accessibility</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-legal-accent">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-legal-accent mt-0.5" />
                <span>info@legalnexus.in</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-legal-accent mt-0.5" />
                <span>+91 11 4567 8900</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-legal-accent mt-0.5" />
                <span>
                  Legal Nexus Tower, 24<br />
                  Connaught Place<br />
                  New Delhi, 110001
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Secondary links */}
        <div className="border-t border-gray-700 pt-6 md:pt-8 mt-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Legal Nexus India. All rights reserved.
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end text-sm text-gray-400">
              <button className="hover:text-white" onClick={() => navigate("/sitemap")}>Sitemap</button>
              <button className="hover:text-white" onClick={() => navigate("/cookies")}>Cookie Policy</button>
              <button className="hover:text-white" onClick={() => navigate("/preferences")}>Preferences</button>
              <button className="hover:text-white" onClick={() => navigate("/faq")}>FAQ</button>
              <button className="hover:text-white" onClick={() => navigate("/help")}>Help Center</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
