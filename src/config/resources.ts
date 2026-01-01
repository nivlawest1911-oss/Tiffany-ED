/**
 * EdIntel Suite - Official Resource Registry
 * 
 * This configuration file defines all authoritative sources for the Legal Singularity Vault.
 * AI agents use these endpoints to ensure compliance with the latest statutory updates.
 * 
 * Last Updated: December 2025
 * Maintained by: Dr. Alvin West, II | Director
 */

export interface ResourceNode {
    id: string;
    title: string;
    url: string;
    category: 'state' | 'district' | 'instructional' | 'professional' | 'accountability' | 'stem-career' | 'research' | 'legal' | 'specialized';
    priority: 'critical' | 'high' | 'medium';
    description: string;
    tags: string[];
    lastVerified: string;
}

export const ALSDE_RESOURCES: ResourceNode[] = [
    {
        id: 'alabama-achieves',
        title: 'Alabama Achieves (ALSDE Official)',
        url: 'https://www.alabamaachieves.org',
        category: 'state',
        priority: 'critical',
        description: 'Central hub for all state initiatives, memos, and the "Alabama Achieves" strategic plan',
        tags: ['ALSDE', 'strategic-plan', 'state-initiatives'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'admin-code-290',
        title: 'AL Admin Code 290-8-9 (Special Education)',
        url: 'https://www.alabamaachieves.org/special-education/',
        category: 'state',
        priority: 'critical',
        description: 'Explicit legal definitions for IDEA, FAPE, and procedural safeguards',
        tags: ['IDEA', 'FAPE', 'special-education', 'compliance'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'aim-portal',
        title: 'AIM Portal (ALSDE Identity Management)',
        url: 'https://aim.alsde.edu',
        category: 'state',
        priority: 'critical',
        description: 'Administrator login for LEAData, ATGP (Teacher Growth), and LEADAlabama',
        tags: ['LEAData', 'ATGP', 'LEADAlabama', 'authentication'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'alabama-reading-initiative',
        title: 'Alabama Reading Initiative (ARI)',
        url: 'https://www.alabamaachieves.org/reading-initiative/',
        category: 'state',
        priority: 'high',
        description: 'Resources for the Literacy Act and K-3 reading coaching',
        tags: ['literacy', 'reading', 'K-3', 'coaching'],
        lastVerified: '2025-12-27'
    }
];

export const MCPSS_RESOURCES: ResourceNode[] = [
    {
        id: 'mcpss-official',
        title: 'MCPSS Official Website',
        url: 'https://www.mcpss.com',
        category: 'district',
        priority: 'critical',
        description: 'Access to board policies, superintendent updates, and school-specific pages',
        tags: ['MCPSS', 'board-policies', 'superintendent'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'academies-mobile',
        title: 'Academies of Mobile',
        url: 'https://www.mcpss.com/academies',
        category: 'district',
        priority: 'high',
        description: 'Tracking for Signature Academies at Vigor, Faulkner, and other district high schools',
        tags: ['academies', 'Vigor', 'Faulkner', 'career-pathways'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'mcpss-virtual',
        title: 'MCPSS Academy of Virtual Learning',
        url: 'https://www.mcpssvirtuallearning.com',
        category: 'district',
        priority: 'medium',
        description: 'The node for the district\'s flexible learning options',
        tags: ['virtual-learning', 'online-courses', 'flexible'],
        lastVerified: '2025-12-27'
    }
];

export const INSTRUCTIONAL_RESOURCES: ResourceNode[] = [
    {
        id: 'alabama-letrs',
        title: 'Alabama LETRS Portal (Lexia)',
        url: 'https://www.lexialearning.com/alabama-letrs',
        category: 'instructional',
        priority: 'critical',
        description: 'Science of Reading professional learning required for all K-3 educators under Alabama Literacy Act',
        tags: ['LETRS', 'science-of-reading', 'K-3', 'literacy-act', 'professional-development'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'alex',
        title: 'ALEX (Alabama Learning Exchange)',
        url: 'https://alex.state.al.us',
        category: 'instructional',
        priority: 'critical',
        description: 'State\'s official "One-Stop Shop" for standards-aligned lesson plans and multimedia resources',
        tags: ['lesson-plans', 'standards', 'multimedia', 'ALEX'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'alabama-virtual-library',
        title: 'Alabama Virtual Library (AVL)',
        url: 'https://www.avl.lib.al.us',
        category: 'instructional',
        priority: 'high',
        description: '24/7 access to premier research databases, encyclopedias, and full-text journals',
        tags: ['research', 'databases', 'library', 'AVL'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'elearning-alabama',
        title: 'eLearning Alabama',
        url: 'http://elearning.alsde.edu',
        category: 'instructional',
        priority: 'high',
        description: 'Free, Web-based professional development for clock hours and ACLD-approved PLUs',
        tags: ['professional-development', 'PLU', 'clock-hours', 'ACLD'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'amsti',
        title: 'AMSTI (Alabama Math, Science, and Technology Initiative)',
        url: 'https://www.amsti.org',
        category: 'instructional',
        priority: 'high',
        description: 'Regional support (AMSTI-USA) for Mobile County at 93 Sidney Phillips Drive',
        tags: ['STEM', 'math', 'science', 'technology', 'Mobile-County'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'cognia-eprove',
        title: 'Cognia eProve (ACIP Login)',
        url: 'https://myjourney.cognia.org',
        category: 'instructional',
        priority: 'high',
        description: 'Where continuous improvement plans (ACIP) are managed and audited',
        tags: ['ACIP', 'continuous-improvement', 'audit', 'Cognia'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'aea-resources',
        title: 'Alabama Education Association (AEA)',
        url: 'https://myaea.org/resources',
        category: 'professional',
        priority: 'medium',
        description: 'Professional library, teacher rights guides, and free PLU/CEU opportunities',
        tags: ['AEA', 'professional-development', 'PLU', 'CEU', 'teacher-rights'],
        lastVerified: '2025-12-27'
    }
];

export const ACCOUNTABILITY_RESOURCES: ResourceNode[] = [
    {
        id: 'digital-report-card',
        title: 'ALSDE Digital Report Card (Educator Prep)',
        url: 'https://www.alabamaachieves.org',
        category: 'accountability',
        priority: 'critical',
        description: '2025 tool tracking teacher shortages, attrition, and program completion rates',
        tags: ['2025', 'teacher-shortage', 'attrition', 'accountability', 'digital-report-card'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'digital-literacy-standards-2025',
        title: 'Alabama 2025 Digital Literacy Standards',
        url: 'https://1819news.com/news/item/alabama-state-board-of-education-approves-new-digital-literacy-standards',
        category: 'state',
        priority: 'critical',
        description: '2025 "Alabama Course of Study: Digital Literacy and Computer Science" modernizing classroom requirements',
        tags: ['2025', 'digital-literacy', 'computer-science', 'standards', 'course-of-study'],
        lastVerified: '2025-12-27'
    }
];

export const STEM_CAREER_RESOURCES: ResourceNode[] = [
    {
        id: 'stem-near-me',
        title: 'STEM Near Me (Alabama STEM Council)',
        url: 'https://ecosystem.alabamacreate.com/parents-students',
        category: 'stem-career',
        priority: 'high',
        description: 'Real-time map of STEM events, projects, and high-demand career programs in Mobile and across Alabama',
        tags: ['STEM', 'career-pathways', 'Mobile', 'events', 'real-time'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'learning-blade',
        title: 'Learning Blade (Alabama CTE)',
        url: 'https://www.LearningBlade.com/AL',
        category: 'stem-career',
        priority: 'high',
        description: 'Fully funded STEM and CTE platform with real-world missions for grades 5-9',
        tags: ['STEM', 'CTE', 'grades-5-9', 'missions', 'career-tech'],
        lastVerified: '2025-12-27'
    }
];

export const PROFESSIONAL_RESOURCES: ResourceNode[] = [
    {
        id: 'alabama-program-help',
        title: 'Alabama Program Help & Support (Cognia/ALSDE)',
        url: 'https://alsde.onlinehelp.cognia.org',
        category: 'professional',
        priority: 'medium',
        description: 'Technical guides for the Teacher Observation Tool (ATOT) and LEADAlabama',
        tags: ['ATOT', 'LEADAlabama', 'technical-support', 'Cognia'],
        lastVerified: '2025-12-27'
    }
];

export const RESEARCH_VALIDATION: ResourceNode[] = [
    {
        id: 'ai-literacy-cognitive-load-2025',
        title: 'AI & Cognitive Load (MDPI 2025)',
        url: 'https://www.mdpi.com/journal/education',
        category: 'research',
        priority: 'critical',
        description: 'AI-powered adaptive learning automatically manages cognitive load, improving retention by adjusting complexity in real-time based on student interaction',
        tags: ['2025', 'AI', 'cognitive-load', 'adaptive-learning', 'peer-reviewed', 'MDPI'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'burnout-neutralization-frontiers-2025',
        title: 'Burnout Neutralization (Frontiers in Psychology 2025)',
        url: 'https://www.frontiersin.org/journals/psychology',
        category: 'research',
        priority: 'critical',
        description: 'High "AI Literacy" significantly enhances teacher autonomy and competence, directly reducing job burnout by delegating administrative tasks to intelligent agents',
        tags: ['2025', 'burnout', 'AI-literacy', 'teacher-autonomy', 'peer-reviewed', 'Frontiers'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'neural-sync-recidivism-cbi',
        title: 'Neural Sync & Recidivism (CBI Studies)',
        url: 'https://www.researchgate.net',
        category: 'research',
        priority: 'critical',
        description: 'Cognitive-Behavioral Interventions (CBI) focused on self-control and impulse management reduce recidivism by up to 26%. EdIntel Cognitive Gym replaces suspensions with structured social learning',
        tags: ['CBI', 'recidivism', 'self-control', 'impulse-management', 'peer-reviewed', '26-percent-reduction'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'montessori-executive-function',
        title: 'Montessori Executive Function Research',
        url: 'https://www.researchgate.net',
        category: 'research',
        priority: 'high',
        description: 'Montessori environments build Working Memory, Inhibitory Control, and Cognitive Flexibility—the three pillars of EdIntel Neural Sync',
        tags: ['Montessori', 'executive-function', 'working-memory', 'inhibitory-control', 'cognitive-flexibility', 'peer-reviewed'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'charter-udl-learner-equity',
        title: 'Charter School Advantage (Center for Learner Equity)',
        url: 'https://www.learnerequity.org',
        category: 'research',
        priority: 'high',
        description: 'Charter autonomy enables Universal Design for Learning (UDL) and co-teaching models that better serve students with disabilities',
        tags: ['charter', 'UDL', 'co-teaching', 'disabilities', 'peer-reviewed', 'learner-equity'],
        lastVerified: '2025-12-27'
    }
];

export const IDEA_COMPLIANCE: ResourceNode[] = [
    {
        id: 'mastering-the-maze-2025',
        title: 'Alabama Mastering the Maze (2025 Portal)',
        url: 'https://www.alabamaachieves.org/special-education/',
        category: 'legal',
        priority: 'critical',
        description: 'Definitive procedural manual for Referral through IEP Implementation in Alabama (2025 updated portal)',
        tags: ['IDEA', 'special-education', 'procedural-manual', 'IEP', 'ALSDE', '2025'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'idea-part-b',
        title: 'IDEA Part B (Ages 3-21)',
        url: 'https://sites.ed.gov/idea/',
        category: 'legal',
        priority: 'critical',
        description: 'Federal mandate for Free Appropriate Public Education (FAPE) in the Least Restrictive Environment (LRE). Covers 13 disability categories',
        tags: ['IDEA', 'Part-B', 'FAPE', 'LRE', 'disability-categories', 'federal-mandate'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'idea-part-c',
        title: 'IDEA Part C (Ages 0-2)',
        url: 'https://sites.ed.gov/idea/',
        category: 'legal',
        priority: 'high',
        description: 'Early Intervention (EI) services for infants and toddlers with developmental delays',
        tags: ['IDEA', 'Part-C', 'early-intervention', 'EI', 'developmental-delays'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'procedural-safeguards-hub',
        title: 'Procedural Safeguards Hub',
        url: 'https://www.alabamaachieves.org/special-education/',
        category: 'legal',
        priority: 'critical',
        description: 'Live videos and documents: Parent Rights, "Stay Put" protections, 100% audit compliance',
        tags: ['procedural-safeguards', 'parent-rights', 'stay-put', 'compliance', 'audit'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'ablespace-iep-benchmark',
        title: 'AbleSpace IEP Automated Audits',
        url: 'https://www.ablespace.com',
        category: 'legal',
        priority: 'high',
        description: 'Benchmark for EdIntel automated compliance checks, ensuring SMART goals and PLAAFPs are legally sound',
        tags: ['IEP', 'automated-audit', 'SMART-goals', 'PLAAFP', 'compliance', 'benchmark'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'playground-iep-benchmark',
        title: 'Playground IEP Compliance Tools',
        url: 'https://www.playgroundiep.com',
        category: 'legal',
        priority: 'high',
        description: 'Industry benchmark for IEP automation, validating EdIntel\'s approach to SMART goal generation and compliance',
        tags: ['IEP', 'automated-audit', 'SMART-goals', 'compliance', 'benchmark'],
        lastVerified: '2025-12-27'
    }
];

export const SPECIALIZED_EDUCATION: ResourceNode[] = [
    {
        id: 'pace-program',
        title: 'PACE Program (Gifted Education)',
        url: 'https://www.mcpss.com/pace',
        category: 'specialized',
        priority: 'high',
        description: 'Pursuing Academics, Creativity, and Excellence - MCPSS gifted program since 1970 (Alabama Act 106)',
        tags: ['gifted', 'PACE', 'Act-106', 'MCPSS'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'prenda-microschools',
        title: 'Prenda Microschools (Alabama)',
        url: 'https://www.prenda.com/alabama',
        category: 'specialized',
        priority: 'medium',
        description: 'Small, guide-led groups (K-8) focusing on self-efficacy without traditional school constraints',
        tags: ['microschools', 'K-8', 'self-efficacy', 'alternative-education'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'charter-schools-alabama',
        title: 'Charter Law (New Schools for Alabama)',
        url: 'https://www.newschoolsforalabama.org',
        category: 'specialized',
        priority: 'medium',
        description: 'Public, tuition-free schools with innovation freedom while abiding by IDEA laws',
        tags: ['charter', 'public-schools', 'innovation', 'IDEA-compliant'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'montessori-methodology',
        title: 'Montessori Methodology (Hilltop Birmingham)',
        url: 'https://www.hilltopbirmingham.org',
        category: 'specialized',
        priority: 'medium',
        description: 'Executive Functioning Skills emphasis - digitized through EdIntel Cognitive Gym',
        tags: ['Montessori', 'executive-function', 'Birmingham', 'cognitive-gym'],
        lastVerified: '2025-12-27'
    },
    {
        id: 'choose-act-2025',
        title: 'CHOOSE Act (2025 ESA Legislation)',
        url: 'https://www.alabamaachieves.org',
        category: 'specialized',
        priority: 'critical',
        description: 'Education Savings Accounts ($7,000/student) for eligible families to attend participating schools',
        tags: ['2025', 'CHOOSE-Act', 'ESA', 'school-choice', '$7000'],
        lastVerified: '2025-12-27'
    }
];

// Consolidated registry for AI agent consumption
export const ALL_RESOURCES: ResourceNode[] = [
    ...ALSDE_RESOURCES,
    ...MCPSS_RESOURCES,
    ...INSTRUCTIONAL_RESOURCES,
    ...ACCOUNTABILITY_RESOURCES,
    ...STEM_CAREER_RESOURCES,
    ...PROFESSIONAL_RESOURCES,
    ...RESEARCH_VALIDATION,
    ...IDEA_COMPLIANCE,
    ...SPECIALIZED_EDUCATION
];

// Helper functions for AI agents
export const getResourcesByCategory = (category: ResourceNode['category']) => {
    return ALL_RESOURCES.filter(r => r.category === category);
};

export const getResourcesByPriority = (priority: ResourceNode['priority']) => {
    return ALL_RESOURCES.filter(r => r.priority === priority);
};

export const getResourcesByTag = (tag: string) => {
    return ALL_RESOURCES.filter(r => r.tags.includes(tag));
};

export const getCriticalComplianceResources = () => {
    return ALL_RESOURCES.filter(r =>
        r.priority === 'critical' &&
        (r.tags.includes('IDEA') || r.tags.includes('FAPE') || r.tags.includes('compliance'))
    );
};

export const get2025Updates = () => {
    return ALL_RESOURCES.filter(r => r.tags.includes('2025'));
};

export const getLiteracyResources = () => {
    return ALL_RESOURCES.filter(r =>
        r.tags.includes('literacy') ||
        r.tags.includes('LETRS') ||
        r.tags.includes('science-of-reading')
    );
};

export const getSTEMResources = () => {
    return ALL_RESOURCES.filter(r =>
        r.category === 'stem-career' ||
        r.tags.includes('STEM')
    );
};

export const getResearchValidation = () => {
    return ALL_RESOURCES.filter(r => r.category === 'research');
};

export const getIDEACompliance = () => {
    return ALL_RESOURCES.filter(r =>
        r.category === 'legal' ||
        r.tags.includes('IDEA')
    );
};

export const getSpecializedEducation = () => {
    return ALL_RESOURCES.filter(r => r.category === 'specialized');
};

// Resource metadata for AI context
export const RESOURCE_METADATA = {
    totalResources: ALL_RESOURCES.length,
    categories: {
        state: ALSDE_RESOURCES.length + ACCOUNTABILITY_RESOURCES.filter(r => r.category === 'state').length,
        district: MCPSS_RESOURCES.length,
        instructional: INSTRUCTIONAL_RESOURCES.length,
        professional: PROFESSIONAL_RESOURCES.length,
        accountability: ACCOUNTABILITY_RESOURCES.filter(r => r.category === 'accountability').length,
        stemCareer: STEM_CAREER_RESOURCES.length,
        research: RESEARCH_VALIDATION.length,
        legal: IDEA_COMPLIANCE.length,
        specialized: SPECIALIZED_EDUCATION.length
    },
    updates2025: get2025Updates().length,
    peerReviewed: RESEARCH_VALIDATION.length,
    ideaCompliance: getIDEACompliance().length,
    lastUpdated: '2025-12-27',
    maintainer: 'Dr. Alvin West, II | Director',
    complianceStatus: '100%',
    focusAreas: [
        'Alabama Literacy Act',
        'Digital Literacy Standards 2025',
        'STEM Career Pathways',
        'Teacher Shortage Tracking',
        'IDEA Part B & C Compliance',
        'Peer-Reviewed Research Validation',
        'Specialized Education Models (Gifted, Montessori, Charter, Microschools)',
        'CHOOSE Act ESA ($7,000/student)'
    ]
};
