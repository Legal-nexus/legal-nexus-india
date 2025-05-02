
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SearchInput from "@/components/search/SearchInput";
import SearchFilters from "@/components/search/SearchFilters";
import CaseCard from "@/components/case/CaseCard";
import { Court, LegalCase, Subject, mockCases } from "@/lib/mockData";
import { Separator } from "@/components/ui/separator";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [filteredCases, setFilteredCases] = useState<LegalCase[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
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
            <SearchInput onSearch={handleSearch} />
            
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
              <div className="bg-white p-8 rounded-lg border text-center">
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
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
