import { RecommendedCase, SimilarityReason } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface RecommendedCaseCardProps {
  recommendation: RecommendedCase;
}

const SimilarityBadge = ({ type }: { type: SimilarityReason['type'] }) => {
  let color = "";
  let label = "";

  switch (type) {
    case "legal_principle":
      color = "bg-blue-100 text-blue-800";
      label = "Legal Principle";
      break;
    case "statute":
      color = "bg-green-100 text-green-800";
      label = "Statute";
      break;
    case "factual":
      color = "bg-purple-100 text-purple-800";
      label = "Factual";
      break;
    case "precedent":
      color = "bg-amber-100 text-amber-800";
      label = "Precedent";
      break;
    case "citation":
      color = "bg-pink-100 text-pink-800";
      label = "Citation";
      break;
  }

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${color}`}>
      {label}
    </span>
  );
};

const RecommendedCaseCard = ({ recommendation }: RecommendedCaseCardProps) => {
  const navigate = useNavigate();
  const { case: caseData, similarityScore, reasons } = recommendation;

  const handleViewCase = () => {
    // Navigate to case page
    navigate(`/case/${caseData.id}`);
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-legal-primary">
            {caseData.title}
          </CardTitle>
          <Badge variant="outline" className="bg-legal-highlight text-legal-primary">
            {caseData.court}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">
          {caseData.citation} • {caseData.date}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <div className="mb-1 flex justify-between items-center">
            <span className="text-sm font-medium">Similarity Score</span>
            <span className="text-sm font-semibold">{similarityScore}%</span>
          </div>
          <Progress value={similarityScore} className="h-2" />
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-2">Why this case is relevant:</h4>
          <ul className="space-y-2">
            {reasons.map((reason, idx) => (
              <li key={idx} className="text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <SimilarityBadge type={reason.type} />
                  <span className="text-gray-500">{reason.score}%</span>
                </div>
                <p className="text-gray-700">{reason.description}</p>
                <p className="text-gray-500 italic mt-1">"{reason.evidence}"</p>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          variant="link" 
          className="p-0 h-auto text-legal-primary"
          onClick={handleViewCase}
        >
          View Case Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedCaseCard;
