import { useState } from "react";
import { Upload, File, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploaderProps {
  onDocumentProcessed?: (text: string) => void;
}

const DocumentUploader = ({ onDocumentProcessed }: DocumentUploaderProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type - only allow PDFs and text files
      if (
        selectedFile.type !== "application/pdf" && 
        selectedFile.type !== "text/plain"
      ) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or text file.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (limit to 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulate file upload process with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Mock successful upload
          setTimeout(() => {
            toast({
              title: "Document processed successfully",
              description: "Your document has been processed and is ready for analysis.",
            });
            
            // Generate mock extracted text and pass it to parent component
            const mockExtractedText = `
              IN THE SUPREME COURT OF INDIA
              CIVIL APPELLATE JURISDICTION
              
              CIVIL APPEAL NO. 6156 OF 2023
              
              M/S GANGA CONSTRUCTIONS                ... APPELLANT(S)
              VERSUS
              UNION OF INDIA & ORS.                  ... RESPONDENT(S)
              
              J U D G M E N T
              
              SANJIV KHANNA, J.
              
              This appeal challenges the judgment dated 22nd February, 2023
              passed by the High Court of Judicature at Allahabad in Writ Petition
              No. 1234 of 2022, which had rejected the appellant's claim...
            `;
            
            if (onDocumentProcessed) {
              onDocumentProcessed(mockExtractedText);
            }
          }, 1000);
          
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const clearFile = () => {
    setFile(null);
    setProgress(0);
  };

  return (
    <Card className="border border-dashed shadow-md hover:border-legal-primary transition-colors">
      <CardContent className="p-4 md:p-6">
        {!file ? (
          <div 
            className="flex flex-col items-center justify-center py-6 md:py-10 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-12 w-12 md:h-16 md:w-16 text-legal-accent mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2 text-legal-accent">Upload Legal Document</h3>
            <p className="text-sm text-gray-600 text-center max-w-xs mb-3 md:mb-4">
              Upload a case document in PDF or text format to analyze and find similar precedents
            </p>
            <Button 
              variant="default"
              className="mt-2 bg-legal-primary text-white hover:bg-legal-secondary font-semibold text-base"
            >
              Select File
            </Button>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              accept=".pdf,.txt" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <File className="h-10 w-10 text-legal-primary" />
                <div>
                  <p className="font-medium text-legal-primary">{file.name}</p>
                  <p className="text-xs text-gray-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                  </p>
                </div>
              </div>
              {!uploading && (
                <Button variant="ghost" size="icon" onClick={clearFile}>
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            {uploading ? (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Processing document...</span>
                  <span>{progress}%</span>
                </div>
              </div>
            ) : progress === 100 ? (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Check className="h-5 w-5" />
                <span>Document processed successfully</span>
              </div>
            ) : (
              <Button 
                onClick={handleUpload} 
                className="w-full bg-legal-primary hover:bg-legal-secondary"
              >
                Process Document
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
