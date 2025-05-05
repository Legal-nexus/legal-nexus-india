import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // Pages where footer should not be displayed
  const noFooterPages = ['/notifications', '/profile'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);
  
  // Disable body scroll effects
  useEffect(() => {
    // Prevent any potential scroll issues
    document.body.style.overflow = "auto";
    document.body.style.position = "relative";
    document.documentElement.style.overflow = "hidden visible";
    document.documentElement.style.overscrollBehavior = "none";
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <Header />
      <main className={`flex-1 animate-fadeIn pt-16 md:pt-20 lg:pt-24 ${shouldShowFooter ? 'min-h-[calc(100vh-64px-350px)] md:min-h-[calc(100vh-80px-350px)] lg:min-h-[calc(100vh-96px-350px)]' : 'min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)]'}`}>
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
