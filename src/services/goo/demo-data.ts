import type { GooOpportunity, GooProject } from "@/schemas/goo";

const now = "2026-01-15T00:00:00.000Z";

export const gooProjects: GooProject[] = [
  {
    id: "proj-truth-sachet",
    slug: "truth-sachet",
    name: "Truth Sachet",
    shortDescription: "A portable evidence-label concept for claims that need ingredient-style disclosure.",
    fullDescription:
      "Truth Sachet packages a claim, its evidence basis, its incentive context and its uncertainty into a compact object that humans and AI agents can inspect.",
    category: "Evidence infrastructure",
    stage: "Prototype",
    projectUrl: "https://example.org/goo/truth-sachet",
    imageUrl: "",
    operator: "Founder Lab",
    tags: ["evidence", "claims", "public-interest"],
    published: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "proj-31-seats",
    slug: "31-seats",
    name: "31 Seats",
    shortDescription: "A structured pilot model for filling a precise set of founding participant roles.",
    fullDescription:
      "31 Seats turns early community formation into a transparent set of role objects with fit criteria, expectations and next steps.",
    category: "Participation infrastructure",
    stage: "Pilot design",
    projectUrl: "https://example.org/goo/31-seats",
    imageUrl: "",
    operator: "Founder Lab",
    tags: ["pilots", "community", "founding-roles"],
    published: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "proj-reverse-car-market",
    slug: "reverse-car-market",
    name: "Reverse Car Market",
    shortDescription: "A dealership-pilot concept where buyer intent becomes structured demand.",
    fullDescription:
      "Reverse Car Market lets buyers express precise demand first, then invites dealers and operators to respond to the actual market signal.",
    category: "Market design",
    stage: "Partner discovery",
    projectUrl: "https://example.org/goo/reverse-car-market",
    imageUrl: "",
    operator: "Founder Lab",
    tags: ["automotive", "dealership", "demand"],
    published: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "proj-law-on-demand",
    slug: "law-on-demand",
    name: "Law On Demand",
    shortDescription: "A legal-service access model seeking narrow expert and institution pilots.",
    fullDescription:
      "Law On Demand explores structured legal intake, triage and referral pathways where trust, boundaries and professional oversight matter.",
    category: "Legal access",
    stage: "Research partner discovery",
    projectUrl: "https://example.org/goo/law-on-demand",
    imageUrl: "",
    operator: "Founder Lab",
    tags: ["legal", "triage", "services"],
    published: true,
    createdAt: now,
    updatedAt: now
  }
];

export const gooOpportunities: GooOpportunity[] = [
  {
    id: "opp-truth-sachet-research",
    projectId: "proj-truth-sachet",
    schemaVersion: "1.0.0",
    slug: "truth-sachet-research-institution-pilot",
    title: "Research institution pilot for Truth Sachet",
    shortSummary: "Seeking one research institution to test evidence-label workflows on public claims.",
    fullDescription:
      "This opportunity seeks a research institution that can help test structured evidence labels for claims where source incentives, repetition and uncertainty matter.",
    opportunityType: "research-institution",
    roleName: "Pilot research partner",
    problemStatement:
      "Claims often travel faster than their evidence context. Truth Sachet needs an institution to test whether compact evidence labels are understandable and useful.",
    status: "open",
    placesTotal: 1,
    placesRemaining: 1,
    geography: {
      regions: ["Australia", "United States", "United Kingdom", "Remote"],
      remote: true,
      notes: "Remote collaboration is acceptable; public-interest research experience is preferred."
    },
    organisationTypes: ["university", "research institute", "public-interest lab"],
    individualRoles: ["research lead", "evidence synthesis lead", "public policy researcher"],
    requiredCapabilities: ["evidence synthesis", "study design", "public communication"],
    preferredCapabilities: ["human factors research", "AI evaluation", "health or finance evidence"],
    excludedFits: ["paid ranking network", "undisclosed sponsor", "claim marketing agency"],
    commitment: {
      time: "2-4 hours per week",
      duration: "8-10 weeks",
      decisionWindow: "Human review within 10 business days"
    },
    commercialModel: {
      model: "Non-binding pilot discussion",
      fees: "No placement fee and no paid ranking",
      sponsorship: "No hidden sponsorship"
    },
    terms: {
      requiresHumanApproval: true,
      bindingTermsAllowedByAgent: false,
      summary: "Any pilot agreement requires human review and written approval by both parties."
    },
    risks: ["Evidence labels may be misunderstood without careful testing.", "Research scope must stay narrow."],
    limitations: ["This is not a grant offer.", "No role is awarded automatically."],
    intellectualProperty: {
      disclosureLevel: "Concept-level details only until mutual approval",
      ownership: "Each party keeps pre-existing IP unless a later written agreement says otherwise."
    },
    agentPermissions: {
      discoverable: true,
      maySubmitInterest: true,
      requiresHumanConfirmation: true,
      mayAcceptTerms: false
    },
    applicationQuestions: [
      "What evidence-synthesis work has your team done?",
      "Which public claim domain would you test first?",
      "Who would approve participation?"
    ],
    whyExists:
      "Truth Sachet needs independent testing before it can be trusted as evidence infrastructure.",
    afterInterest:
      "Founder Lab reviews fit, asks for any missing details and schedules a human conversation before any agreement.",
    published: true,
    opensAt: now,
    closesAt: null,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "opp-31-seats-founder-pilots",
    projectId: "proj-31-seats",
    schemaVersion: "1.0.0",
    slug: "31-seats-founding-pilot-participants",
    title: "Five founding pilot participants for 31 Seats",
    shortSummary: "Opening five early participant seats for structured role testing.",
    fullDescription:
      "31 Seats needs participants who can test the clarity, fairness and usefulness of structured founding-role objects.",
    opportunityType: "founding-pilot",
    roleName: "Founding pilot participant",
    problemStatement:
      "Early projects often ask for generic interest. 31 Seats needs to prove that precise roles create better fit and better expectations.",
    status: "open",
    placesTotal: 5,
    placesRemaining: 5,
    geography: {
      regions: ["Remote", "Australia"],
      remote: true,
      notes: "Remote participants are eligible."
    },
    organisationTypes: ["individual", "micro-business", "community organisation"],
    individualRoles: ["operator", "community builder", "creator", "founder"],
    requiredCapabilities: ["clear communication", "feedback", "pilot participation"],
    preferredCapabilities: ["community design", "early-stage operations"],
    excludedFits: ["spam lead generation", "fake scarcity marketer"],
    commitment: {
      time: "90 minutes per week",
      duration: "4 weeks",
      decisionWindow: "Human review within 7 business days"
    },
    commercialModel: {
      model: "Unpaid discovery pilot",
      fees: "No fees required",
      sponsorship: "No sponsorship"
    },
    terms: {
      requiresHumanApproval: true,
      bindingTermsAllowedByAgent: false,
      summary: "Participation terms are confirmed by humans before the pilot begins."
    },
    risks: ["Pilot may not continue.", "Participant feedback may lead to role changes."],
    limitations: ["No employment or equity is implied.", "Places are limited to keep feedback manageable."],
    intellectualProperty: {
      disclosureLevel: "Pilot concept and workflow only",
      ownership: "Feedback may inform product design; participant pre-existing IP remains theirs."
    },
    agentPermissions: {
      discoverable: true,
      maySubmitInterest: true,
      requiresHumanConfirmation: true,
      mayAcceptTerms: false
    },
    applicationQuestions: [
      "Which role would you naturally test?",
      "What would make the opportunity object clearer?",
      "Can you join feedback sessions during the pilot window?"
    ],
    whyExists:
      "31 Seats needs real participant feedback to test whether precise opportunity roles are more useful than generic calls for interest.",
    afterInterest:
      "A human reviews fit, confirms expectations and sends a pilot outline before participation starts.",
    published: true,
    opensAt: now,
    closesAt: null,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "opp-reverse-car-dealer",
    projectId: "proj-reverse-car-market",
    schemaVersion: "1.0.0",
    slug: "reverse-car-market-dealership-pilot",
    title: "Dealership pilot for Reverse Car Market",
    shortSummary: "Seeking a dealership operator willing to test buyer-demand-first workflows.",
    fullDescription:
      "Reverse Car Market needs one dealership pilot to test how structured buyer intent can be reviewed and responded to without paid placement.",
    opportunityType: "dealership-pilot",
    roleName: "Dealership pilot operator",
    problemStatement:
      "Car buyers often search around inventory. This pilot tests whether structured buyer demand can create a clearer marketplace signal.",
    status: "open",
    placesTotal: 1,
    placesRemaining: 1,
    geography: {
      regions: ["Australia", "United States"],
      remote: false,
      notes: "Dealership must operate in a region where local compliance can be reviewed."
    },
    organisationTypes: ["dealership", "automotive group"],
    individualRoles: ["dealer principal", "sales operations lead", "marketplace operator"],
    requiredCapabilities: ["automotive retail", "pilot operations", "customer response process"],
    preferredCapabilities: ["used car operations", "CRM integration", "consumer compliance"],
    excludedFits: ["paid placement broker", "undisclosed advertising network"],
    commitment: {
      time: "3 hours per week",
      duration: "6 weeks",
      decisionWindow: "Human review within 10 business days"
    },
    commercialModel: {
      model: "Pilot conversation; no paid ranking",
      fees: "No paid search placement",
      sponsorship: "Any commercial relationship must be disclosed before launch"
    },
    terms: {
      requiresHumanApproval: true,
      bindingTermsAllowedByAgent: false,
      summary: "Compliance and commercial terms require human approval."
    },
    risks: ["Buyer demand data may be incomplete.", "Compliance review may stop the pilot."],
    limitations: ["Not a dealership endorsement.", "No lead volume is guaranteed."],
    intellectualProperty: {
      disclosureLevel: "Workflow-level information",
      ownership: "Reverse Car Market concept remains with Founder Lab."
    },
    agentPermissions: {
      discoverable: true,
      maySubmitInterest: true,
      requiresHumanConfirmation: true,
      mayAcceptTerms: false
    },
    applicationQuestions: [
      "Which region does your dealership operate in?",
      "How do you currently review buyer intent?",
      "Who can approve a pilot?"
    ],
    whyExists:
      "Reverse Car Market needs a real dealership workflow to test whether buyer-demand-first matching is operationally useful.",
    afterInterest:
      "Founder Lab checks geography, compliance and operator fit before scheduling a pilot discussion.",
    published: true,
    opensAt: now,
    closesAt: null,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "opp-law-demand-legal-research",
    projectId: "proj-law-on-demand",
    schemaVersion: "1.0.0",
    slug: "law-on-demand-legal-research-partner",
    title: "Legal research partner for Law On Demand",
    shortSummary: "Seeking a legal research partner to define safe triage boundaries.",
    fullDescription:
      "Law On Demand needs a legal research partner to help define what the system may classify, what requires a lawyer and what must be refused.",
    opportunityType: "research-partner",
    roleName: "Legal research partner",
    problemStatement:
      "Legal access tools can overstep boundaries. This opportunity exists to define safe, human-approved triage and referral rules.",
    status: "open",
    placesTotal: 1,
    placesRemaining: 1,
    geography: {
      regions: ["Australia", "United Kingdom", "Remote"],
      remote: true,
      notes: "Jurisdiction expertise must be stated."
    },
    organisationTypes: ["law school", "legal clinic", "research institute"],
    individualRoles: ["legal researcher", "clinical legal educator", "access-to-justice lead"],
    requiredCapabilities: ["legal research", "professional boundaries", "risk review"],
    preferredCapabilities: ["access to justice", "legal triage", "AI policy"],
    excludedFits: ["unauthorised legal practice promoter", "undisclosed referral network"],
    commitment: {
      time: "2 hours per week",
      duration: "8 weeks",
      decisionWindow: "Human review within 10 business days"
    },
    commercialModel: {
      model: "Research collaboration discussion",
      fees: "No referral fee or paid placement",
      sponsorship: "No hidden sponsorship"
    },
    terms: {
      requiresHumanApproval: true,
      bindingTermsAllowedByAgent: false,
      summary: "Any collaboration terms require written human approval."
    },
    risks: ["Jurisdiction rules may block some workflows.", "User safety boundaries may narrow the product."],
    limitations: ["Not a request for legal advice.", "No client referral relationship is created automatically."],
    intellectualProperty: {
      disclosureLevel: "Boundary and workflow discussion only",
      ownership: "Research contributions require a later written agreement."
    },
    agentPermissions: {
      discoverable: true,
      maySubmitInterest: true,
      requiresHumanConfirmation: true,
      mayAcceptTerms: false
    },
    applicationQuestions: [
      "Which jurisdiction do you understand best?",
      "What legal triage boundaries would you test first?",
      "What approval process would your organisation require?"
    ],
    whyExists:
      "Law On Demand needs safe boundaries before any public workflow can be responsibly tested.",
    afterInterest:
      "Founder Lab reviews jurisdiction fit and schedules a human conversation before any research collaboration.",
    published: true,
    opensAt: now,
    closesAt: null,
    createdAt: now,
    updatedAt: now
  }
];
