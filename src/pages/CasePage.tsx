
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import KnowledgeGraph from "@/components/visualization/KnowledgeGraph";
import RecommendedCaseCard from "@/components/case/RecommendedCaseCard";
import { LegalCase, RecommendedCase, getRecommendedCases, mockCases } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

const CasePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<LegalCase | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    const timer = setTimeout(() => {
      if (id) {
        const foundCase = mockCases.find(c => c.id === id);
        setCaseData(foundCase || null);
        
        if (foundCase) {
          const recs = getRecommendedCases(foundCase.id);
          setRecommendations(recs);
        }
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="h-10 w-10 border-4 border-legal-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!caseData) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Case Not Found</h2>
          <p className="text-gray-600 mb-8">The case you are looking for could not be found.</p>
          <Button
            onClick={() => navigate("/search")}
            className="bg-legal-primary hover:bg-legal-secondary"
          >
            Return to Search
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Case Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-legal-primary">{caseData.title}</h1>
            <Badge variant="outline" className="w-fit text-sm md:text-base px-3 py-1 bg-legal-highlight text-legal-primary">
              {caseData.court}
            </Badge>
          </div>
          
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">{caseData.citation}</span> • {caseData.date}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {caseData.subject.map((subject, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
          
          <p className="text-gray-700">{caseData.synopsis}</p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Case Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Case Details</TabsTrigger>
                <TabsTrigger value="visualization">Knowledge Graph</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-legal-primary">Judges</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {caseData.judges.map((judge, index) => (
                        <li key={index}>{judge}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-legal-primary">Key Statutes</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {caseData.statutes.map((statute, index) => (
                        <li key={index}>{statute}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-legal-primary">Cited Precedents</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {caseData.precedents.map((precedent, index) => (
                        <li key={index}>{precedent}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-legal-primary">Legal Principles</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {caseData.principles.map((principle, index) => (
                        <li key={index}>{principle}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-legal-primary">Full Text</h3>
                    <div className="bg-gray-50 p-4 rounded border text-gray-600 text-sm">
                      {caseData.fullText || 
                        "Full text of judgment not available in this demo. In a production system, the complete judgment text would be displayed here."}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="visualization" className="bg-white border rounded-lg shadow-sm">
                <KnowledgeGraph caseData={caseData} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Recommended Cases */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-legal-primary">Similar Cases</h2>
            
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <RecommendedCaseCard key={index} recommendation={rec} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border text-center">
                <p className="text-gray-500">No similar cases found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CasePage;
