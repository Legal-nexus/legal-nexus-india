import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SearchInput from "@/components/search/SearchInput";
import SearchFilters from "@/components/search/SearchFilters";
import CaseCard from "@/components/case/CaseCard";
import { Court, LegalCase, Subject, mockCases } from "@/lib/mockData";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Scale, BookOpen, Award } from "lucide-react";
import { useLocation } from "react-router-dom";

// Function to get query parameters
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const queryParams = useQueryParams();
  const queryFromUrl = queryParams.get('q') || "";
  
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [searchType, setSearchType] = useState("");
  const [filteredCases, setFilteredCases] = useState<LegalCase[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Execute search when component mounts if query parameter exists
  useEffect(() => {
    if (queryFromUrl) {
      handleSearch(queryFromUrl, "natural");
    }
  }, [queryFromUrl]);

  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would be an API call to the backend
      let results = mockCases;
      
      if (query) {
        // Simple filtering for demonstration
        const lowercaseQuery = query.toLowerCase();
        results = mockCases.filter(
          c => 
            c.title.toLowerCase().includes(lowercaseQuery) ||
            c.synopsis.toLowerCase().includes(lowercaseQuery) ||
            c.statutes.some(statute => statute.toLowerCase().includes(lowercaseQuery)) ||
            c.principles.some(principle => principle.toLowerCase().includes(lowercaseQuery)) ||
            c.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
        );
      }
      
      setFilteredCases(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  const handleCourtsFilter = (courts: Court[]) => {
    if (courts.length === 0) {
      handleSearch(searchQuery, searchType);
      return;
    }
    
    const filtered = mockCases.filter(c => courts.includes(c.court));
    setFilteredCases(filtered);
  };

  const handleSubjectsFilter = (subjects: Subject[]) => {
    if (subjects.length === 0) {
      handleSearch(searchQuery, searchType);
      return;
    }
    
    const filtered = mockCases.filter(c => 
      c.subject.some(subject => subjects.includes(subject))
    );
    setFilteredCases(filtered);
  };

  const handleSortChange = (sortType: string) => {
    let sorted = [...filteredCases];
    
    switch (sortType) {
      case "date-desc":
        sorted = sorted.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "date-asc":
        sorted = sorted.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "court-hierarchy":
        const courtOrder: Record<Court, number> = {
          "Supreme Court": 1,
          "Delhi High Court": 2,
          "Bombay High Court": 2,
          "Madras High Court": 2,
          "Calcutta High Court": 2,
          "Others": 3
        };
        sorted = sorted.sort((a, b) => courtOrder[a.court] - courtOrder[b.court]);
        break;
      default: // relevance - no additional sorting needed for mock data
        break;
    }
    
    setFilteredCases([...sorted]);
  };

  const handleDateRangeChange = (range: { from: number, to: number }) => {
    const filtered = mockCases.filter(c => {
      const caseYear = new Date(c.date).getFullYear();
      return caseYear >= range.from && caseYear <= range.to;
    });
    setFilteredCases(filtered);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-legal-primary">Advanced Legal Case Search</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Search & Filters */}
          <div className="lg:col-span-1 space-y-6">
            <SearchInput onSearch={handleSearch} initialQuery={searchQuery} />
            
            <SearchFilters
              courts={[]}
              subjects={[]}
              onCourtsChange={handleCourtsFilter}
              onSubjectsChange={handleSubjectsFilter}
              onSortChange={handleSortChange}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
          
          {/* Right Column - Results */}
          <div className="lg:col-span-3">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="h-10 w-10 border-4 border-legal-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-legal-primary font-medium">Searching for relevant cases...</p>
              </div>
            ) : hasSearched ? (
              <>
                <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">
                      {filteredCases.length} {filteredCases.length === 1 ? 'Result' : 'Results'}
                      {searchQuery && (
                        <span className="font-normal"> for "{searchQuery}"</span>
                      )}
                    </h2>
                    <div className="text-sm text-gray-500">
                      Sorted by: Relevance
                    </div>
                  </div>
                </div>
                
                {filteredCases.length > 0 ? (
                  <div className="grid gap-6">
                    {filteredCases.map(caseItem => (
                      <CaseCard 
                        key={caseItem.id} 
                        caseData={caseItem}
                        highlightText={searchQuery}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border">
                    <svg 
                      className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No cases found</h3>
                    <p className="text-gray-500">
                      Try adjusting your search terms or filters to find more results.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="bg-white p-8 rounded-lg border text-center mb-10">
                  <svg 
                    className="h-16 w-16 mx-auto text-legal-primary opacity-80 mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-legal-primary mb-2">
                    Search for Legal Cases
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Use the search tools on the left to find relevant legal cases. 
                    You can search using natural language, case citations, or upload a document.
                  </p>
                </div>
                
                {/* Additional content to fill space */}
                <div className="mt-8 mb-12">
                  <h3 className="text-xl font-semibold text-legal-primary mb-6 text-center">Advanced Search Features</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Lightbulb className="h-5 w-5 text-legal-primary" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium mb-2 text-legal-primary">Natural Language Search</h4>
                          <p className="text-gray-600">
                            Enter your query in plain language. Our AI understands legal terminology and concepts to find the most relevant cases.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Scale className="h-5 w-5 text-legal-primary" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium mb-2 text-legal-primary">Legal Principle Matching</h4>
                          <p className="text-gray-600">
                            Our system identifies the legal principles in your query and matches them with cases that apply those principles.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <BookOpen className="h-5 w-5 text-legal-primary" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium mb-2 text-legal-primary">Citation Analysis</h4>
                          <p className="text-gray-600">
                            Search by citation or see how cases cite each other to understand precedent development and authority.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Award className="h-5 w-5 text-legal-primary" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium mb-2 text-legal-primary">Precedent Ranking</h4>
                          <p className="text-gray-600">
                            Results are ranked by relevance, taking into account court hierarchy, recency, and citation frequency.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-legal-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-legal-primary mb-4">Search Tips</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Include specific legal terms and concepts relevant to your case</li>
                    <li>Reference statutes, sections, or acts that apply to your matter</li>
                    <li>Be specific about the jurisdiction you're interested in</li>
                    <li>Use the filters to narrow down results by court, date, or subject matter</li>
                    <li>Try different search terms if you don't find what you're looking for</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
