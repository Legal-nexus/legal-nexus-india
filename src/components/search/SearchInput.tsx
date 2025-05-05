import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, FileText, Upload } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string, type: string) => void;
  initialQuery?: string;
}

const SearchInput = ({ onSearch, initialQuery = "" }: SearchInputProps) => {
  const [queryText, setQueryText] = useState(initialQuery);
  const [caseTitle, setCaseTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseYear, setCaseYear] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("natural");

  // Update queryText if initialQuery changes
  useEffect(() => {
    setQueryText(initialQuery);
  }, [initialQuery]);

  const handleNaturalSearch = () => {
    if (queryText.trim()) {
      onSearch(queryText, "natural");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeTab === "natural" && queryText.trim()) {
        handleNaturalSearch();
      } else if (activeTab === "citation") {
        handleCitationSearch();
      } else if (activeTab === "document" && uploadedFile) {
        handleDocumentSearch();
      }
    }
  };

  const handleCitationSearch = () => {
    const citation = `${caseTitle} ${caseNumber} (${caseYear})`.trim();
    if (citation.trim()) {
      onSearch(citation, "citation");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDocumentSearch = () => {
    if (uploadedFile) {
      // In a real implementation, we would process the file
      onSearch(`Document: ${uploadedFile.name}`, "document");
    }
  };

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg border shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-legal-primary mb-3 sm:mb-4">Search Legal Cases</h2>
      
      <Tabs defaultValue="natural" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="natural" className="text-xs sm:text-sm px-1 sm:px-2">Search</TabsTrigger>
          <TabsTrigger value="citation" className="text-xs sm:text-sm px-1 sm:px-2">Citation</TabsTrigger>
          <TabsTrigger value="document" className="text-xs sm:text-sm px-1 sm:px-2">Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="natural">
          <div className="space-y-4">
            <div>
              <Label htmlFor="query" className="text-xs sm:text-sm">Describe your legal question</Label>
              <Textarea
                id="query"
                placeholder="Enter details about your legal issue or case facts..."
                className="min-h-24 sm:min-h-32 resize-none mt-1 text-sm"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button 
              className="w-full bg-legal-primary hover:bg-legal-secondary"
              onClick={handleNaturalSearch}
              disabled={!queryText.trim()}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="citation">
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2 sm:gap-4">
              <div className="col-span-6 sm:col-span-3 md:col-span-2">
                <Label htmlFor="case-title" className="text-xs sm:text-sm">Reporter</Label>
                <Input
                  id="case-title"
                  placeholder="AIR, SCC..."
                  className="text-sm"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="col-span-3 sm:col-span-1 md:col-span-2">
                <Label htmlFor="case-number" className="text-xs sm:text-sm">Number</Label>
                <Input
                  id="case-number"
                  placeholder="e.g., 566"
                  className="text-sm"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="col-span-3 sm:col-span-2 md:col-span-2">
                <Label htmlFor="case-year" className="text-xs sm:text-sm">Year</Label>
                <Input
                  id="case-year"
                  placeholder="e.g., 2021"
                  className="text-sm"
                  value={caseYear}
                  onChange={(e) => setCaseYear(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <Button 
              className="w-full bg-legal-primary hover:bg-legal-secondary"
              onClick={handleCitationSearch}
              disabled={!caseTitle.trim() && !caseNumber.trim() && !caseYear.trim()}
            >
              <FileText className="h-4 w-4 mr-2" />
              Search by Citation
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="document">
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-3 sm:p-6 text-center">
              {uploadedFile ? (
                <div>
                  <p className="text-legal-primary font-medium text-sm sm:text-base break-all">{uploadedFile.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setUploadedFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-gray-400 mb-1 sm:mb-2" />
                  <Label htmlFor="file-upload" className="block text-xs sm:text-sm font-medium">
                    Upload document
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOCX, TXT (max 10MB)
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                  <Button variant="outline" className="mt-2" onClick={() => document.getElementById('file-upload')?.click()}>
                    Select File
                  </Button>
                </div>
              )}
            </div>
            <Button 
              className="w-full bg-legal-primary hover:bg-legal-secondary"
              onClick={handleDocumentSearch}
              disabled={!uploadedFile}
            >
              <Search className="h-4 w-4 mr-2" />
              Analyze Document
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchInput;
