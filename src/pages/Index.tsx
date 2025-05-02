import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, Upload } from "lucide-react";
import DocumentUploader from "@/components/upload/DocumentUploader";

const Index = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-legal-primary via-legal-secondary to-legal-primary opacity-90"
        ></div>
        <div className="relative container mx-auto px-4 py-12 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Intelligent Case Search and Recommendation
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto">
            Find relevant Indian legal precedents through AI-powered search that understands legal principles, not just keywords.
          </p>
          
          <div className="max-w-xl mx-auto relative mb-6 md:mb-8">
            <Input 
              className="pl-3 md:pl-4 pr-12 py-4 md:py-6 text-base md:text-lg bg-white/95 placeholder-gray-500 shadow-lg"
              placeholder="Describe your legal question or case facts..."
              onClick={handleSearchClick}
            />
            <Button 
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 p-0 bg-legal-accent hover:bg-legal-accent/90"
              onClick={handleSearchClick}
            >
              <Search className="h-4 md:h-5 w-4 md:w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-white text-legal-primary hover:bg-white/90 shadow-md"
              size="lg"
              onClick={() => navigate("/search")}
            >
              Advanced Search
            </Button>
            <Button 
              className="bg-legal-accent text-white hover:bg-legal-accent/90 shadow-md"
              size="lg"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Upload Document
            </Button>
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
