
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, FileText, Upload } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string, type: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [queryText, setQueryText] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseYear, setCaseYear] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("natural");

  const handleNaturalSearch = () => {
    onSearch(queryText, "natural");
  };

  const handleCitationSearch = () => {
    const citation = `${caseTitle} ${caseNumber} (${caseYear})`.trim();
    onSearch(citation, "citation");
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
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-bold text-legal-primary mb-4">Search Legal Cases</h2>
      
      <Tabs defaultValue="natural" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="natural">Natural Language</TabsTrigger>
          <TabsTrigger value="citation">Citation</TabsTrigger>
          <TabsTrigger value="document">Upload Document</TabsTrigger>
        </TabsList>
        
        <TabsContent value="natural">
          <div className="space-y-4">
            <div>
              <Label htmlFor="query">Describe your legal question or case facts</Label>
              <Textarea
                id="query"
                placeholder="Enter a detailed description of your legal issue or the facts of your case..."
                className="min-h-32 resize-none mt-1"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
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
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1">
                <Label htmlFor="case-title">Case Title/Reporter</Label>
                <Input
                  id="case-title"
                  placeholder="e.g., AIR, SCC, SCR"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                />
              </div>
              <div className="col-span-3 md:col-span-1">
                <Label htmlFor="case-number">Case Number</Label>
                <Input
                  id="case-number"
                  placeholder="e.g., 1, 566"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                />
              </div>
              <div className="col-span-3 md:col-span-1">
                <Label htmlFor="case-year">Year</Label>
                <Input
                  id="case-year"
                  placeholder="e.g., 2021"
                  value={caseYear}
                  onChange={(e) => setCaseYear(e.target.value)}
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
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              {uploadedFile ? (
                <div>
                  <p className="text-legal-primary font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
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
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <Label htmlFor="file-upload" className="block text-sm font-medium">
                    Upload a judgment or legal document
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOCX or TXT files up to 10MB
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
