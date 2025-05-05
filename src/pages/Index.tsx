import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, Upload, Scale, Sparkles } from "lucide-react";
import DocumentUploader from "@/components/upload/DocumentUploader";
import { useState, useRef, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };

  // Focus the search input when component mounts for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-legal-primary via-legal-secondary to-legal-primary opacity-90"
        ></div>
        <div className="relative container mx-auto px-4 py-16 md:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight tracking-tight max-w-5xl mx-auto">
            Intelligent Case Search <span className="hidden xs:inline">&</span><br className="xs:hidden" /> Recommendation
          </h1>
          
          <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-6 md:space-y-8 mb-10 md:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mx-auto leading-relaxed px-2 sm:px-4 lg:px-8">
              Find relevant Indian legal precedents through our AI-powered search platform that understands the underlying legal principles, doctrine interpretations, and factual contexts — not just matching keywords.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mx-auto px-2 sm:px-4 lg:px-6">
              Access 70+ years of Supreme Court and High Court judgments, with intelligent connections between statutes, case law, and legal concepts.
            </p>
          </div>
          
          <div className="max-w-xl md:max-w-2xl mx-auto relative mb-10 md:mb-12 px-3 sm:px-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className={`relative ${isFocused ? 'after:opacity-100' : 'after:opacity-0'} after:absolute after:inset-0 after:-z-10 after:rounded-lg after:blur-md after:bg-amber-300/60 after:transition-all after:duration-500`}>
                <Input 
                  ref={searchInputRef}
                  className={`pl-5 pr-14 py-6 sm:py-7 md:py-8 text-base sm:text-lg md:text-xl bg-white/95 placeholder-gray-500 shadow-lg rounded-lg border-0 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:border-amber-400
                  focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:border-amber-400
                  hover:shadow-xl focus:shadow-amber-300/30 focus:shadow-xl focus:scale-[1.01]
                  ${isFocused ? 'ring-2 ring-amber-400/80 shadow-amber-300/30 shadow-xl scale-[1.01]' : ''}`}
                  placeholder="Describe your legal question or case facts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>
              <Button 
                type="submit"
                className={`absolute right-5 sm:right-3 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 p-0 rounded-full shadow-md transform hover:scale-105 transition-all duration-300
                ${isFocused ? 'bg-amber-400 hover:bg-amber-500' : 'bg-legal-accent hover:bg-legal-accent/90'}`}
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6 md:gap-8 px-3 sm:px-0">
            <Button 
              className="bg-white text-legal-primary hover:bg-white hover:text-legal-secondary shadow-lg hover:shadow-xl w-full sm:w-auto px-7 py-7 md:px-10 md:py-8 lg:px-12 rounded-lg text-base sm:text-lg md:text-xl font-medium flex items-center justify-center gap-3 border border-transparent hover:border-legal-accent/20 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate("/search")}
            >
              <Scale className="h-5 w-5 md:h-6 md:w-6 text-legal-accent" />
              <span>Advanced Search</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-legal-accent to-legal-accent/90 text-white hover:from-legal-accent/90 hover:to-legal-accent shadow-lg hover:shadow-xl w-full sm:w-auto px-7 py-7 md:px-10 md:py-8 lg:px-12 rounded-lg text-base sm:text-lg md:text-xl font-medium flex items-center justify-center gap-3 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Upload className="h-5 w-5 md:h-6 md:w-6" />
              <span>Upload Document</span>
            </Button>
          </div>

          <div className="mt-10 md:mt-14 flex justify-center items-center">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-5 py-3 gap-2">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-legal-accent" />
              <span className="text-white/90 text-sm md:text-base">Powered by AI and legal knowledge graphs</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-legal-primary">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-legal-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-legal-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-legal-primary">Input Your Case</h3>
              <p className="text-gray-600">
                Upload a judgment, enter case details, or describe your legal issue in natural language. Our system supports queries in English and Hindi.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-legal-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-legal-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-legal-primary">AI Analysis</h3>
              <p className="text-gray-600">
                Our system analyzes your input using a combination of legal knowledge graphs and advanced language models to understand legal concepts.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-legal-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-legal-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-legal-primary">Smart Recommendations</h3>
              <p className="text-gray-600">
                Get truly relevant precedents with explanations of why each case matters, based on legal principles, statutes, and factual similarities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upload Document Section - New Highlighted Section */}
      <section id="upload-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-legal-primary">Upload Your Document</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your legal document to get instant analysis and relevant case recommendations
            </p>
            
            <DocumentUploader 
              onDocumentProcessed={(text) => {
                console.log("Document processed:", text);
                navigate("/search");
              }} 
            />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-legal-primary">Transforming Legal Research in India</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Our platform combines advanced AI with deep legal domain knowledge to help legal professionals find the most relevant precedents and connections.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-6">
            <div className="flex items-start bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-10 w-10 rounded-full bg-legal-primary flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2 text-legal-primary">Explanatory Recommendations</h3>
                <p className="text-gray-600">
                  Understand exactly why each case is relevant with transparent explanations linking legal principles, statutes, and facts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-10 w-10 rounded-full bg-legal-primary flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2 text-legal-primary">Advanced Filtering</h3>
                <p className="text-gray-600">
                  Filter by jurisdiction, date, subject matter, and language. Prioritize binding precedents or cases from specific benches.
                </p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-10 w-10 rounded-full bg-legal-primary flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2 text-legal-primary">Interactive Knowledge Graph</h3>
                <p className="text-gray-600">
                  Visualize connections between cases, statutes, judges, and legal principles in an interactive knowledge graph.
                </p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              <div className="h-10 w-10 rounded-full bg-legal-primary flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2 text-legal-primary">Always Updated</h3>
                <p className="text-gray-600">
                  Our system automatically ingests new judgments from Indian courts, ensuring recommendations are based on the latest legal precedents.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-legal-primary hover:bg-legal-secondary shadow-md"
              size="lg"
              onClick={() => navigate("/search")}
            >
              Start Searching Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="py-10 md:py-16 bg-legal-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 md:mb-6 text-legal-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-base md:text-xl mb-4 md:mb-6">
              "Legal Nexus India has revolutionized how we approach legal research. The ability to find truly relevant precedents based on legal principles rather than just keywords has saved us countless hours and improved our case preparation immensely."
            </p>
            <div className="font-semibold">
              Justice (Retd.) Rajiv Sharma
              <span className="block text-legal-accent font-normal">Former Judge, Supreme Court of India</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-legal-primary">Ready to Transform Your Legal Research?</h2>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals across India who are using our platform to find better precedents faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button 
              className="bg-legal-primary hover:bg-legal-secondary shadow-md"
              size="lg"
              onClick={() => navigate("/search")}
            >
              Start Your Search Now
            </Button>
            <Button 
              variant="outline" 
              className="border-legal-primary text-legal-primary hover:bg-legal-primary/5"
              size="lg"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Upload Document
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
