
export type Court = 'Supreme Court' | 'Delhi High Court' | 'Bombay High Court' | 'Madras High Court' | 'Calcutta High Court' | 'Others';

export type Subject = 
  | 'Constitutional Law' 
  | 'Criminal Law' 
  | 'Civil Law' 
  | 'Tax Law' 
  | 'Corporate Law' 
  | 'Environmental Law' 
  | 'IPR' 
  | 'Family Law' 
  | 'Labor Law'
  | 'Other';

export type LegalCase = {
  id: string;
  title: string;
  citation: string;
  court: Court;
  judges: string[];
  date: string;
  subject: Subject[];
  synopsis: string;
  fullText?: string;
  statutes: string[];
  precedents: string[];
  principles: string[];
  keywords: string[];
};

export type SimilarityReason = {
  type: 'legal_principle' | 'statute' | 'factual' | 'precedent' | 'citation';
  description: string;
  score: number; // 0-100
  evidence: string;
};

export type RecommendedCase = {
  case: LegalCase;
  similarityScore: number; // 0-100
  reasons: SimilarityReason[];
};

export const mockCases: LegalCase[] = [
  {
    id: "SC2023-001",
    title: "Rajesh Kumar vs State of Maharashtra",
    citation: "(2023) 5 SCC 112",
    court: "Supreme Court",
    judges: ["Justice D.Y. Chandrachud", "Justice Hima Kohli"],
    date: "2023-03-15",
    subject: ["Criminal Law", "Constitutional Law"],
    synopsis: "Case dealing with the interpretation of Section 304A of IPC in relation to death caused by negligence in a factory accident.",
    statutes: ["Indian Penal Code, Section 304A", "Factories Act, 1948"],
    precedents: ["Alister Anthony Pareira vs State of Maharashtra (2012) 2 SCC 648", "State of Karnataka vs Sharanabasappa (2013) 4 SCC 753"],
    principles: ["Criminal negligence", "Duty of care", "Industrial safety"],
    keywords: ["negligence", "industrial accident", "death", "factory", "criminal liability"]
  },
  {
    id: "SC2022-145",
    title: "Arjun Gopal vs Union of India",
    citation: "(2022) 7 SCC 338",
    court: "Supreme Court",
    judges: ["Justice N.V. Ramana", "Justice A.S. Bopanna", "Justice Hima Kohli"],
    date: "2022-10-28",
    subject: ["Environmental Law", "Constitutional Law"],
    synopsis: "PIL concerning air pollution in Delhi NCR and the regulation of firecrackers during the festival season.",
    statutes: ["Environment Protection Act, 1986", "Air (Prevention and Control of Pollution) Act, 1981", "Article 21 of Constitution"],
    precedents: ["M.C. Mehta vs Union of India (2020) 6 SCC 496"],
    principles: ["Right to clean environment", "Sustainable development", "Precautionary principle"],
    keywords: ["pollution", "environment", "right to clean air", "health", "regulation"]
  },
  {
    id: "DHC2023-562",
    title: "Priya Sharma vs Amit Sharma",
    citation: "2023 SCC OnLine Del 1423",
    court: "Delhi High Court",
    judges: ["Justice Manmohan", "Justice Saurabh Banerjee"],
    date: "2023-05-22",
    subject: ["Family Law"],
    synopsis: "Case involving custody rights of children in a divorce proceeding with international jurisdiction issues.",
    statutes: ["Hindu Marriage Act, 1955", "Guardians and Wards Act, 1890"],
    precedents: ["Roxann Sharma vs Arun Sharma (2015) 8 SCC 318", "Sheoli Hati vs Somnath Das (2019) 7 SCC 490"],
    principles: ["Best interest of child", "Parental rights", "International parental abduction"],
    keywords: ["custody", "divorce", "international", "children", "guardianship"]
  },
  {
    id: "SC2021-238",
    title: "ABC Ltd. vs Commissioner of Income Tax",
    citation: "(2021) 6 SCC 789",
    court: "Supreme Court",
    judges: ["Justice L. Nageswara Rao", "Justice B.R. Gavai"],
    date: "2021-08-10",
    subject: ["Tax Law", "Corporate Law"],
    synopsis: "Dispute regarding the interpretation of Section 80IA deductions under Income Tax Act for infrastructure development companies.",
    statutes: ["Income Tax Act, 1961, Section 80IA", "Companies Act, 2013"],
    precedents: ["CIT vs Orchev Pharma Pvt Ltd (2017) 4 SCC 379"],
    principles: ["Tax exemption interpretation", "Infrastructure development incentives", "Legislative intent"],
    keywords: ["tax deduction", "infrastructure", "corporate taxation", "exemptions", "statutory interpretation"]
  },
  {
    id: "BHC2022-847",
    title: "TechSoft India vs Innovative Solutions",
    citation: "2022 SCC OnLine Bom 2456",
    court: "Bombay High Court",
    judges: ["Justice G.S. Patel"],
    date: "2022-11-03",
    subject: ["IPR", "Corporate Law"],
    synopsis: "Dispute over software patent infringement and breach of confidentiality agreement between two technology companies.",
    statutes: ["Patents Act, 1970", "Copyright Act, 1957", "Indian Contract Act, 1872"],
    precedents: ["Telefonaktiebolaget LM Ericsson vs Intex Technologies (2015) 62 PTC 90"],
    principles: ["Software patentability", "Confidentiality obligations", "Innovation protection"],
    keywords: ["patent", "software", "confidentiality", "intellectual property", "technology"]
  },
  {
    id: "SC2020-421",
    title: "Workers Union of XYZ Factory vs Management of XYZ Ltd.",
    citation: "(2020) 3 SCC 524",
    court: "Supreme Court",
    judges: ["Justice S.A. Bobde", "Justice B.R. Gavai", "Justice Surya Kant"],
    date: "2020-01-30",
    subject: ["Labor Law", "Constitutional Law"],
    synopsis: "Dispute regarding the right to strike and collective bargaining in the context of essential services.",
    statutes: ["Industrial Disputes Act, 1947", "Essential Services Maintenance Act, 1968", "Article 19(1)(c) of Constitution"],
    precedents: ["T.K. Rangarajan vs State of Tamil Nadu (2003) 6 SCC 581"],
    principles: ["Right to strike", "Essential services", "Collective bargaining"],
    keywords: ["strike", "labor rights", "union", "essential services", "industrial dispute"]
  },
  {
    id: "MHC2023-327",
    title: "Vimal Constructions vs Chennai Municipal Corporation",
    citation: "2023 SCC OnLine Mad 746",
    court: "Madras High Court",
    judges: ["Justice N. Anand Venkatesh"],
    date: "2023-04-12",
    subject: ["Civil Law", "Environmental Law"],
    synopsis: "Challenge to municipal building regulations and environmental clearances for a commercial complex in Chennai.",
    statutes: ["Tamil Nadu Town and Country Planning Act, 1971", "Environment Protection Act, 1986", "Municipal Corporation Act"],
    precedents: ["Esha Ekta Apartments Co-operative Housing Society vs Municipal Corporation of Mumbai (2013) 5 SCC 357"],
    principles: ["Urban planning", "Environmental impact assessment", "Development regulations"],
    keywords: ["building regulations", "environmental clearance", "urban planning", "construction", "municipal law"]
  },
  {
    id: "SC2022-019",
    title: "People's Rights NGO vs Union of India",
    citation: "(2022) 2 SCC 147",
    court: "Supreme Court",
    judges: ["Justice Sanjay Kishan Kaul", "Justice M.M. Sundresh"],
    date: "2022-01-25",
    subject: ["Constitutional Law", "Criminal Law"],
    synopsis: "PIL challenging the constitutional validity of sedition law under Section 124A of IPC.",
    statutes: ["Indian Penal Code, Section 124A", "Article 19(1)(a) of Constitution"],
    precedents: ["Kedarnath Singh vs State of Bihar AIR 1962 SC 955", "Shreya Singhal vs Union of India (2015) 5 SCC 1"],
    principles: ["Freedom of speech", "Sedition law", "Constitutional validity"],
    keywords: ["sedition", "free speech", "constitutional rights", "criminal law", "fundamental rights"]
  },
  {
    id: "CHC2021-692",
    title: "Eastern Shipping Co. vs Port Authority of Kolkata",
    citation: "2021 SCC OnLine Cal 1205",
    court: "Calcutta High Court",
    judges: ["Justice Rajasekhar Mantha"],
    date: "2021-09-08",
    subject: ["Corporate Law", "Civil Law"],
    synopsis: "Dispute regarding port dues and contractual obligations between shipping company and port authority.",
    statutes: ["Indian Ports Act, 1908", "Indian Contract Act, 1872", "Major Port Trusts Act, 1963"],
    precedents: ["Shipping Corporation of India vs CEnT (2016) 2 SCC 100"],
    principles: ["Contractual obligations", "Maritime regulations", "Statutory dues"],
    keywords: ["maritime law", "port charges", "shipping", "contract", "statutory authority"]
  },
  {
    id: "SC2023-202",
    title: "State of Maharashtra vs Ravi Prakash Sharma",
    citation: "(2023) 8 SCC 456",
    court: "Supreme Court",
    judges: ["Justice D.Y. Chandrachud", "Justice P.S. Narasimha"],
    date: "2023-06-03",
    subject: ["Criminal Law"],
    synopsis: "Appeal against acquittal in a case involving culpable homicide not amounting to murder under Section 304 of IPC.",
    statutes: ["Indian Penal Code, Section 304", "Criminal Procedure Code, 1973, Section 378"],
    precedents: ["Babu vs State of Kerala (2010) 9 SCC 189", "State of UP vs Musheer Khan (2010) 2 SCC 315"],
    principles: ["Criminal intent", "Burden of proof in appeals against acquittal", "Culpable homicide"],
    keywords: ["culpable homicide", "criminal appeal", "acquittal", "homicide", "criminal intent"]
  }
];

export const getRecommendedCases = (caseId: string): RecommendedCase[] => {
  // This is a mock function that would be replaced with actual ML/algorithm in production
  // It returns mock recommendations based on the input case ID
  
  switch (caseId) {
    case "SC2023-001": // Rajesh Kumar vs State of Maharashtra
      return [
        {
          case: mockCases.find(c => c.id === "SC2023-202")!,
          similarityScore: 85,
          reasons: [
            {
              type: "statute",
              description: "Both cases deal with sections of IPC related to causing death",
              score: 90,
              evidence: "Section 304A in query case and Section 304 in recommended case"
            },
            {
              type: "legal_principle",
              description: "Both involve analysis of criminal negligence standards",
              score: 85,
              evidence: "Criminal negligence principle is central to both cases"
            },
            {
              type: "factual",
              description: "Both involve deaths caused by allegedly negligent actions",
              score: 80,
              evidence: "Factory accident in query case vs. conduct leading to death in recommended case"
            }
          ]
        },
        {
          case: mockCases.find(c => c.id === "SC2022-019")!,
          similarityScore: 65,
          reasons: [
            {
              type: "legal_principle",
              description: "Both involve interpretation of criminal provisions of IPC",
              score: 70,
              evidence: "Interpretation of IPC sections in both cases"
            },
            {
              type: "precedent",
              description: "Similar approach to statutory interpretation of criminal laws",
              score: 65,
              evidence: "Related precedents cited in Constitutional interpretation of criminal statutes"
            }
          ]
        },
        {
          case: mockCases.find(c => c.id === "DHC2023-562")!,
          similarityScore: 35,
          reasons: [
            {
              type: "citation",
              description: "Both cite Supreme Court cases establishing important legal tests",
              score: 40,
              evidence: "Similar pattern of reliance on established SC precedents to establish tests"
            },
            {
              type: "factual",
              description: "Low factual similarity but both deal with duty of care in different contexts",
              score: 30,
              evidence: "Industrial duty of care vs parental duty of care"
            }
          ]
        }
      ];
    
    // Add more mock recommendations for other case IDs if needed
    
    default:
      // Return random recommendations if specific case ID not handled
      const randomCases = [...mockCases]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      return randomCases.map(caseItem => ({
        case: caseItem,
        similarityScore: Math.floor(Math.random() * 70) + 30,
        reasons: [
          {
            type: Math.random() > 0.5 ? "legal_principle" : "statute",
            description: "Generic similarity based on legal domain",
            score: Math.floor(Math.random() * 60) + 40,
            evidence: "Similar legal domain and principles"
          }
        ]
      }));
  }
};
