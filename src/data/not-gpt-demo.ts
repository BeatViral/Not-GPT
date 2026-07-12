import type { ClaimCluster, Contradiction, EvidenceMatch, SourceRecord } from "@/schemas/not-gpt";

export const demoQuestion =
  "My child is 12 years old. Could getting braces at this age affect her facial development?";

export const demoSources: SourceRecord[] = [
  {
    id: "src-growth-registry",
    url: "https://example.org/not-gpt-demo/orthodontic-growth-registry",
    title: "Illustrative Child Growth and Orthodontic Outcomes Registry",
    author: "Demo Methods Group",
    publisher: "Fictional North Coast University Methods Lab",
    organisation: "Fictional North Coast University",
    domain: "example.org",
    publicationDate: "2024-03-18",
    updatedDate: null,
    sourceCategory: "Observational study",
    incentiveCategory: "No material incentive detected",
    primarySource: true,
    claims: [
      "Routine fixed appliances were associated with changes in tooth alignment and bite measures.",
      "The registry did not directly measure long-term facial appearance after growth completion.",
      "No consistent long-term facial harm signal was detected in the outcomes it measured."
    ],
    citations: ["demo-protocol-12", "demo-growth-measurement-manual"],
    outgoingReferences: ["https://example.org/not-gpt-demo/measurement-manual"],
    fundingDisclosures: ["Public teaching grant in this fictional demonstration source."],
    conflictsOfInterest: [],
    ownership: {
      owner: "Fictional North Coast University",
      group: "Public research institution",
      observations: ["The publisher is presented as a university methods lab in the demo dataset."]
    },
    studyMetadata: {
      design: "Illustrative observational registry",
      sample: "Fictional cohort of children receiving mixed orthodontic care",
      measuredOutcomes: ["tooth alignment", "bite relationship", "selected skeletal proxy measures"],
      followUp: "Illustrative follow-up into late adolescence",
      limitations: [
        "Not randomised",
        "Treatment types are mixed",
        "Facial development is represented by proxy measures rather than direct long-term appearance outcomes"
      ]
    },
    classificationReasoning: {
      observations: [
        "Primary data source in the demo set",
        "Does not sell orthodontic treatment",
        "Includes limitations that narrow the conclusion"
      ],
      uncertainty: "Ownership and funding are illustrative and not independently verified."
    },
    classificationConfidence: 0.82,
    commercialCallsToAction: []
  },
  {
    id: "src-systematic-review",
    url: "https://example.org/not-gpt-demo/facial-growth-review",
    title: "Illustrative Review of Orthodontics and Facial Growth Endpoints",
    author: "Demo Evidence Synthesis Unit",
    publisher: "Fictional Journal of Applied Dental Evidence",
    organisation: "Fictional Evidence Press",
    domain: "example.org",
    publicationDate: "2023-09-02",
    updatedDate: null,
    sourceCategory: "Systematic review",
    incentiveCategory: "No material incentive detected",
    primarySource: false,
    claims: [
      "Evidence about long-term facial development is less direct than evidence about tooth alignment.",
      "Treatment subtype and growth stage materially affect applicability.",
      "Strong claims of routine facial harm are not supported by the reviewed illustrative studies."
    ],
    citations: ["src-growth-registry", "demo-case-series-04"],
    outgoingReferences: ["https://example.org/not-gpt-demo/orthodontic-growth-registry"],
    fundingDisclosures: ["No commercial funding stated in this fictional source."],
    conflictsOfInterest: [],
    ownership: {
      owner: "Fictional Evidence Press",
      group: "Independent scholarly publisher",
      observations: ["No treatment sales channel is visible in the demo metadata."]
    },
    studyMetadata: {
      design: "Illustrative systematic review",
      sample: "Fictional synthesis of mixed orthodontic outcome studies",
      measuredOutcomes: ["dental alignment", "skeletal proxies", "patient-reported appearance measures"],
      followUp: "Varied and often incomplete",
      limitations: [
        "Outcome definitions vary",
        "Some included sources rely on proxy outcomes",
        "Publication bias cannot be ruled out"
      ]
    },
    classificationReasoning: {
      observations: [
        "Secondary synthesis rather than a clinic marketing page",
        "Explicitly separates direct and indirect evidence"
      ],
      uncertainty: "The source is fictional demonstration material."
    },
    classificationConfidence: 0.86,
    commercialCallsToAction: []
  },
  {
    id: "src-professional-guideline",
    url: "https://example.org/not-gpt-demo/pediatric-orthodontic-guidance",
    title: "Illustrative Pediatric Orthodontic Timing Guidance",
    author: "Demo Guideline Panel",
    publisher: "Fictional Association of Orthodontic Care",
    organisation: "Fictional Association of Orthodontic Care",
    domain: "example.org",
    publicationDate: "2022-11-14",
    updatedDate: "2024-01-06",
    sourceCategory: "Professional guideline",
    incentiveCategory: "Professional alignment",
    primarySource: false,
    claims: [
      "Age 12 can be an ordinary time to evaluate braces because many children still have growth remaining.",
      "Guidance focuses mainly on occlusion, function and treatment timing.",
      "The guideline should not be read as direct proof about every long-term facial development outcome."
    ],
    citations: ["src-systematic-review"],
    outgoingReferences: ["https://example.org/not-gpt-demo/facial-growth-review"],
    fundingDisclosures: ["Professional association support in this fictional source."],
    conflictsOfInterest: ["Panel members are orthodontic professionals in this fictional source."],
    ownership: {
      owner: "Fictional Association of Orthodontic Care",
      group: "Professional association",
      observations: ["Represents a profession that benefits when orthodontic care is trusted."]
    },
    studyMetadata: {
      design: "Guidance document",
      measuredOutcomes: ["treatment timing", "occlusion", "function"],
      limitations: [
        "Professional alignment is present",
        "Guideline recommendations are not identical to direct evidence on facial development"
      ]
    },
    classificationReasoning: {
      observations: [
        "Guideline source type is separate from the professional alignment incentive",
        "Useful for ordinary practice context but not treated as primary proof"
      ],
      uncertainty: "Panel composition and conflict-management process are fictional."
    },
    classificationConfidence: 0.78,
    commercialCallsToAction: []
  },
  {
    id: "src-commercial-clinic",
    url: "https://example.org/not-gpt-demo/early-smile-growth",
    title: "Illustrative Clinic Page About Early Smile Growth",
    author: "Demo Clinic Editorial Team",
    publisher: "Fictional BrightArc Orthodontics",
    organisation: "Fictional BrightArc Orthodontics",
    domain: "example.org",
    publicationDate: "2024-05-21",
    updatedDate: null,
    sourceCategory: "Commercial service provider",
    incentiveCategory: "Direct financial incentive",
    primarySource: false,
    claims: [
      "Early braces can help guide facial growth.",
      "Treatment can improve bite relationships and smile appearance.",
      "A consultation is recommended."
    ],
    citations: ["src-professional-guideline"],
    outgoingReferences: ["https://example.org/not-gpt-demo/pediatric-orthodontic-guidance"],
    fundingDisclosures: [],
    conflictsOfInterest: ["The publisher sells orthodontic services in this fictional source."],
    ownership: {
      owner: "Fictional BrightArc Orthodontics",
      group: "Private clinic group",
      observations: ["The page invites readers to book treatment consultations."]
    },
    studyMetadata: {
      design: "Commercial explainer",
      measuredOutcomes: ["service benefits claimed by provider"],
      limitations: [
        "Not primary evidence",
        "Claim wording is broader than the cited guideline",
        "Contains a commercial call to action"
      ]
    },
    classificationReasoning: {
      observations: [
        "The source can contain useful practice context",
        "Its direct financial incentive means claims should be traced to independent evidence before being relied on"
      ],
      uncertainty: "The demo page does not provide real billing or ownership filings."
    },
    classificationConfidence: 0.91,
    commercialCallsToAction: ["Book a consultation"]
  },
  {
    id: "src-methods-critique",
    url: "https://example.org/not-gpt-demo/facial-endpoint-critique",
    title: "Illustrative Methods Note on Facial Development Endpoints",
    author: "Demo Critical Methods Author",
    publisher: "Fictional Methods Review",
    organisation: "Fictional Methods Review",
    domain: "example.org",
    publicationDate: "2021-06-10",
    updatedDate: null,
    sourceCategory: "Academic commentary",
    incentiveCategory: "Institutional alignment",
    primarySource: false,
    claims: [
      "Many orthodontic papers measure dental or skeletal proxies rather than the user's broader facial-development concern.",
      "Absence of reported harm is weaker than direct measurement of the relevant harm.",
      "Long-term follow-up through growth completion is often the missing test."
    ],
    citations: ["src-growth-registry", "src-systematic-review"],
    outgoingReferences: ["https://example.org/not-gpt-demo/facial-growth-review"],
    fundingDisclosures: ["Fictional university methods fellowship."],
    conflictsOfInterest: [],
    ownership: {
      owner: "Fictional Methods Review",
      group: "Academic publisher",
      observations: ["Publishes methodological criticism in the demo dataset."]
    },
    studyMetadata: {
      design: "Methodological commentary",
      measuredOutcomes: ["applicability and endpoint quality"],
      limitations: ["Commentary is not direct clinical outcome evidence"]
    },
    classificationReasoning: {
      observations: [
        "Useful for evidence-question matching",
        "Does not provide a direct estimate of treatment effect"
      ],
      uncertainty: "Institutional alignment is inferred only from the demo source context."
    },
    classificationConfidence: 0.74,
    commercialCallsToAction: []
  },
  {
    id: "src-parent-forum",
    url: "https://example.org/not-gpt-demo/parent-forum-thread",
    title: "Illustrative Parent Forum Thread About Facial Changes",
    author: "Multiple demo forum users",
    publisher: "Fictional Parent Exchange",
    organisation: "Fictional Parent Exchange",
    domain: "example.org",
    publicationDate: "2024-02-04",
    updatedDate: null,
    sourceCategory: "Forum or social discussion",
    incentiveCategory: "Unknown",
    primarySource: false,
    claims: [
      "Some parents describe perceived facial changes after orthodontic treatment.",
      "The thread does not establish whether braces caused the changes."
    ],
    citations: [],
    outgoingReferences: [],
    fundingDisclosures: [],
    conflictsOfInterest: [],
    ownership: {
      owner: "Fictional Parent Exchange",
      group: "Community platform",
      observations: ["Individual claims are not verified."]
    },
    studyMetadata: {
      design: "Personal testimony",
      measuredOutcomes: ["self-reported perception"],
      limitations: [
        "No clinical verification",
        "No comparator",
        "Cannot separate treatment from normal growth"
      ]
    },
    classificationReasoning: {
      observations: [
        "Relevant as a signal of concerns people raise",
        "Not strong evidence of causation"
      ],
      uncertainty: "User identity and experience cannot be verified from the fictional forum thread."
    },
    classificationConfidence: 0.66,
    commercialCallsToAction: []
  }
];

export const demoClaimClusters: ClaimCluster[] = [
  {
    id: "cluster-tooth-bite",
    canonicalClaim: "Braces at this age can change tooth alignment and bite relationships.",
    repetitionCount: 4,
    domainCount: 1,
    ownershipGroupCount: 4,
    originalEvidenceCount: 2,
    sourceIds: [
      "src-growth-registry",
      "src-systematic-review",
      "src-professional-guideline",
      "src-commercial-clinic"
    ],
    lineage: [
      { sourceId: "src-growth-registry", relationship: "Primary illustrative registry" },
      { sourceId: "src-systematic-review", relationship: "Synthesises the registry and related fictional studies" },
      { sourceId: "src-professional-guideline", relationship: "Uses the review for practice guidance" },
      { sourceId: "src-commercial-clinic", relationship: "Repeats broader wording from the guideline" }
    ]
  },
  {
    id: "cluster-facial-development",
    canonicalClaim:
      "Routine braces have not been shown here to reliably harm long-term facial development.",
    repetitionCount: 3,
    domainCount: 1,
    ownershipGroupCount: 3,
    originalEvidenceCount: 2,
    sourceIds: ["src-growth-registry", "src-systematic-review", "src-methods-critique"],
    lineage: [
      { sourceId: "src-growth-registry", relationship: "Primary source with limited facial proxy outcomes" },
      { sourceId: "src-systematic-review", relationship: "Secondary synthesis with applicability caveats" },
      { sourceId: "src-methods-critique", relationship: "Explains why proxy outcomes are not the same as direct facial development" }
    ]
  },
  {
    id: "cluster-amplified-growth",
    canonicalClaim: "Early braces can guide facial growth.",
    repetitionCount: 2,
    domainCount: 1,
    ownershipGroupCount: 2,
    originalEvidenceCount: 0,
    sourceIds: ["src-professional-guideline", "src-commercial-clinic"],
    lineage: [
      { sourceId: "src-professional-guideline", relationship: "Narrow timing guidance" },
      { sourceId: "src-commercial-clinic", relationship: "Amplifies the wording into a broader benefit claim" }
    ]
  }
];

export const demoEvidenceMatches: EvidenceMatch[] = [
  {
    sourceId: "src-growth-registry",
    measuredQuestion:
      "Dental alignment, bite relationships and selected skeletal proxy measures after mixed orthodontic care.",
    userQuestionMatch: "partial",
    mismatchNotes: [
      "The user's concern is broader facial development.",
      "The source does not directly measure long-term facial appearance after all growth is complete."
    ]
  },
  {
    sourceId: "src-systematic-review",
    measuredQuestion: "Review of mixed orthodontic outcomes and some growth-related proxy endpoints.",
    userQuestionMatch: "partial",
    mismatchNotes: [
      "Treatment subtype and growth stage vary.",
      "Some included evidence is indirect for a 12-year-old child."
    ]
  },
  {
    sourceId: "src-commercial-clinic",
    measuredQuestion: "Commercial explanation of claimed benefits and consultation timing.",
    userQuestionMatch: "indirect",
    mismatchNotes: [
      "The page is not primary evidence.",
      "The page's broad facial-growth wording is stronger than the cited guidance supports."
    ]
  },
  {
    sourceId: "src-parent-forum",
    measuredQuestion: "Personal reports of perceived facial change.",
    userQuestionMatch: "mismatch",
    mismatchNotes: [
      "Personal testimony cannot establish causation.",
      "Normal growth, extractions, appliances and other treatment details are not separated."
    ]
  }
];

export const demoContradictions: Contradiction[] = [
  {
    claim: "Commercial pages imply early braces can guide facial growth in a broadly beneficial way.",
    sourceIds: ["src-commercial-clinic", "src-professional-guideline"],
    quality: "limited",
    interpretation:
      "The stronger commercial wording is not carried by equally strong direct evidence in the demo set."
  },
  {
    claim: "Some parents report facial changes after orthodontics.",
    sourceIds: ["src-parent-forum", "src-methods-critique"],
    quality: "limited",
    interpretation:
      "The concern is credible enough to ask about, but the available testimony does not prove braces caused harm."
  }
];
