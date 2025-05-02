
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Court, Subject } from "@/lib/mockData";

interface SearchFiltersProps {
  courts: Court[];
  subjects: Subject[];
  onCourtsChange: (courts: Court[]) => void;
  onSubjectsChange: (subjects: Subject[]) => void;
  onSortChange: (sort: string) => void;
  onDateRangeChange: (range: { from: number, to: number }) => void;
}

const SearchFilters = ({
  courts,
  subjects,
  onCourtsChange,
  onSubjectsChange,
  onSortChange,
  onDateRangeChange
}: SearchFiltersProps) => {
  const [selectedCourts, setSelectedCourts] = useState<Court[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [dateRange, setDateRange] = useState({ from: 2010, to: 2023 });
  
  // All court options
  const courtOptions: Court[] = ["Supreme Court", "Delhi High Court", "Bombay High Court", "Madras High Court", "Calcutta High Court", "Others"];
  
  // All subject options
  const subjectOptions: Subject[] = [
    "Constitutional Law",
    "Criminal Law",
    "Civil Law",
    "Tax Law",
    "Corporate Law",
    "Environmental Law",
    "IPR",
    "Family Law",
    "Labor Law",
    "Other"
  ];

  const handleCourtChange = (court: Court) => {
    const newSelection = selectedCourts.includes(court)
      ? selectedCourts.filter(c => c !== court)
      : [...selectedCourts, court];
    
    setSelectedCourts(newSelection);
    onCourtsChange(newSelection);
  };

  const handleSubjectChange = (subject: Subject) => {
    const newSelection = selectedSubjects.includes(subject)
      ? selectedSubjects.filter(s => s !== subject)
      : [...selectedSubjects, subject];
    
    setSelectedSubjects(newSelection);
    onSubjectsChange(newSelection);
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold text-lg mb-4">Filter Results</h3>
      
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="courts">
          <AccordionTrigger className="text-sm font-medium">Courts</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {courtOptions.map((court) => (
                <div key={court} className="flex items-center space-x-2">
                  <Checkbox
                    id={`court-${court}`}
                    checked={selectedCourts.includes(court)}
                    onCheckedChange={() => handleCourtChange(court)}
                  />
                  <Label
                    htmlFor={`court-${court}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {court}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="subjects">
          <AccordionTrigger className="text-sm font-medium">Subjects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {subjectOptions.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subject-${subject}`}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => handleSubjectChange(subject)}
                  />
                  <Label
                    htmlFor={`subject-${subject}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="date">
          <AccordionTrigger className="text-sm font-medium">Time Period</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">From Year</Label>
                <input
                  type="range"
                  min="1950"
                  max="2023"
                  value={dateRange.from}
                  onChange={(e) => {
                    const newRange = { ...dateRange, from: Number(e.target.value) };
                    setDateRange(newRange);
                    onDateRangeChange(newRange);
                  }}
                  className="w-full"
                />
                <div className="text-xs text-right">{dateRange.from}</div>
              </div>
              
              <div>
                <Label className="text-sm">To Year</Label>
                <input
                  type="range"
                  min="1950"
                  max="2023"
                  value={dateRange.to}
                  onChange={(e) => {
                    const newRange = { ...dateRange, to: Number(e.target.value) };
                    setDateRange(newRange);
                    onDateRangeChange(newRange);
                  }}
                  className="w-full"
                />
                <div className="text-xs text-right">{dateRange.to}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="sort">
          <AccordionTrigger className="text-sm font-medium">Sort By</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="relevance" onValueChange={onSortChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="relevance" id="relevance" />
                <Label htmlFor="relevance" className="text-sm">Relevance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="date-desc" id="date-desc" />
                <Label htmlFor="date-desc" className="text-sm">Newest First</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="date-asc" id="date-asc" />
                <Label htmlFor="date-asc" className="text-sm">Oldest First</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="court-hierarchy" id="court-hierarchy" />
                <Label htmlFor="court-hierarchy" className="text-sm">Court Hierarchy</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="similarity">
          <AccordionTrigger className="text-sm font-medium">Similarity Criteria</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="balanced" onValueChange={(val) => console.log(val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="text-sm">Balanced</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="legal-principles" id="legal-principles" />
                <Label htmlFor="legal-principles" className="text-sm">Legal Principles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="factual" id="factual" />
                <Label htmlFor="factual" className="text-sm">Factual Similarity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="citations" id="citations" />
                <Label htmlFor="citations" className="text-sm">Citation Overlap</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SearchFilters;
