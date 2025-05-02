
import { LegalCase } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CaseCardProps {
  caseData: LegalCase;
  highlightText?: string;
}

const CaseCard = ({ caseData, highlightText }: CaseCardProps) => {
  const navigate = useNavigate();

  const highlightMatches = (text: string) => {
    if (!highlightText || highlightText.trim() === "") {
      return text;
    }

    const regex = new RegExp(`(${highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="highlighted-text">{part}</span> : part
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-legal-primary">
            {highlightMatches(caseData.title)}
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
          <p className="text-sm line-clamp-2">{highlightMatches(caseData.synopsis)}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {caseData.subject.map((subject, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {subject}
            </Badge>
          ))}
        </div>
        
        {caseData.statutes.length > 0 && (
          <div className="text-xs text-gray-600 mb-2">
            <span className="font-semibold">Key Statutes:</span>{' '}
            {caseData.statutes.slice(0, 2).join(', ')}
            {caseData.statutes.length > 2 && '...'}
          </div>
        )}
        
        <Button 
          variant="link" 
          className="p-0 h-auto text-legal-primary"
          onClick={() => navigate(`/case/${caseData.id}`)}
        >
          View Case Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
