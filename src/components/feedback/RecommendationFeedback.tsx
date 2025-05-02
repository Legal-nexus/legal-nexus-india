
import { useState } from "react";
import { ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FeedbackDialogProps {
  children: React.ReactNode;
  onSubmit: (helpful: boolean, comment: string) => void;
}

const FeedbackDialog = ({ children, onSubmit }: FeedbackDialogProps) => {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (helpful === null) {
      toast({
        title: "Please select an option",
        description: "Let us know if this recommendation was helpful.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(helpful, comment);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    setOpen(false);
    setHelpful(null);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recommendation Feedback</DialogTitle>
          <DialogDescription>
            Was this case recommendation helpful? Your feedback helps us improve our system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button 
            variant={helpful === true ? "default" : "outline"}
            className="flex items-center justify-center gap-2"
            onClick={() => setHelpful(true)}
          >
            <ThumbsUp className="h-4 w-4" />
            Helpful
          </Button>
          <Button 
            variant={helpful === false ? "default" : "outline"}
            className="flex items-center justify-center gap-2"
            onClick={() => setHelpful(false)}
          >
            <ThumbsDown className="h-4 w-4" />
            Not Helpful
          </Button>
        </div>
        
        <Textarea
          placeholder="Please provide any additional comments (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px]"
        />
        
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Submit Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface RecommendationFeedbackProps {
  caseId: string;
}

const RecommendationFeedback = ({ caseId }: RecommendationFeedbackProps) => {
  const { toast } = useToast();
  
  const handleFeedbackSubmit = (helpful: boolean, comment: string) => {
    console.log(`Feedback for case ${caseId}:`, { helpful, comment });
    // In a real implementation, this would send the feedback to the server
  };
  
  return (
    <div className="flex items-center space-x-2">
      <FeedbackDialog onSubmit={handleFeedbackSubmit}>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1 h-7"
        >
          <HelpCircle className="h-3 w-3" />
          Provide Feedback
        </Button>
      </FeedbackDialog>
    </div>
  );
};

export default RecommendationFeedback;
