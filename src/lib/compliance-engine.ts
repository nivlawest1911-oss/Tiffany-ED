/**
 * ALABAMA EDUCATIONAL COMPLIANCE ENGINE
 * Structured intelligence for state-specific educational mandates.
 */

export interface ComplianceStatute {
    id: string;
    name: string;
    code: string;
    summary: string;
    key_provisions: string[];
    fiscal_implications: string[];
    pedagogical_mandates: string[];
    last_updated: string;
}

export const ALABAMA_COMPLIANCE_DATA: Record<string, ComplianceStatute> = {
    LITERACY_ACT: {
        id: "SB216",
        name: "Alabama Literacy Act",
        code: "Ala. Code § 16-6G-1",
        summary: "Requires all 3rd-grade students to read at or above grade level for promotion, implementing intensive reading interventions.",
        key_provisions: [
            "K-3 science of reading instruction requirement",
            "Mandatory 3rd-grade retention for non-proficient readers (with good cause exemptions)",
            "Individual Reading Plans (IRPs) for at-risk students",
            "Summer reading camps provided by school systems",
            "LETRS training for all K-3 teachers and elementary principals"
        ],
        fiscal_implications: [
            "State funding for reading coaches",
            "Funding for summer reading camp curriculum and staffing",
            "Professional development (LETRS) cost coverage"
        ],
        pedagogical_mandates: [
            "Systematic, explicit phonics instruction",
            "Multisensory reading strategies",
            "Frequent universal screening and formative assessment"
        ],
        last_updated: "2024-05"
    },
    NUMERACY_ACT: {
        id: "SB171",
        name: "Alabama Numeracy Act",
        code: "Ala. Code § 16-6H-1",
        summary: "Establishes a framework for improving mathematics proficiency in K-5 through coaching and high-quality instructional materials.",
        key_provisions: [
            "Step-by-step math coaching model implementation",
            "K-5 math specialized professional development",
            "Prohibition of 'three-cuing' systems in math literacy",
            "Formation of the Alabama Mathematics Service (AMS)"
        ],
        fiscal_implications: [
            "Grants for math coaches",
            "Instructional material audit and replacement funding"
        ],
        pedagogical_mandates: [
            "Rigorous adherence to Alabama Course of Study: Mathematics",
            "Evidence-based math interventions",
            "Visual and conceptual modeling"
        ],
        last_updated: "2024-06"
    },
    PARENTAL_RIGHTS: {
        id: "SB202",
        name: "Parental Rights in Education",
        code: "Ala. Code § 16-1-52",
        summary: "Protects the fundamental right of parents to direct the upbringing and education of their children.",
        key_provisions: [
            "Notification of health or well-being changes",
            "Parental opt-out for specific instructional topics",
            "Transparency in curriculum and instructional materials"
        ],
        fiscal_implications: [
            "Administrative overhead for transparency reporting",
            "Potential litigation risk mitigation"
        ],
        pedagogical_mandates: [
            "Curriculum alignment with community standards",
            "Verified age-appropriate messaging"
        ],
        last_updated: "2024-04"
    },
    GASB_96: {
        id: "GASB96",
        name: "GASB Statement No. 96",
        code: "GASB 96",
        summary: "Standardizes accounting and financial reporting for Subscription-Based Information Technology Arrangements (SBITAs).",
        key_provisions: [
            "Recognition of subscription liabilities",
            "Capitalization of intangible 'right-to-use' assets",
            "Disclosure of significant SBITA commitments"
        ],
        fiscal_implications: [
            "Balance sheet impact for EdTech software contracts",
            "Audit scrutiny for multi-year software licenses"
        ],
        pedagogical_mandates: [],
        last_updated: "2023-12"
    },
    GRADUATION_REQS: {
        id: "AAC290-3-1",
        name: "Alabama High School Graduation Requirements",
        code: "Ala. Admin. Code r. 290-3-1-.02",
        summary: "Defines the 24-credit requirement for the Alabama High School Diploma, including career-readiness benchmarks.",
        key_provisions: [
            "4 English, 4 Math, 4 Science, 4 Social Studies credits",
            "Beginning with Class of 2026: Mandatory financial literacy course",
            "Mandatory FAFSA completion (with opt-out)",
            "Civics test requirement"
        ],
        fiscal_implications: [
            "Staffing for specialized math/science electives",
            "Tracking software for college/career readiness indicators"
        ],
        pedagogical_mandates: [
            "Integration of career-technical education (CTE) pathways",
            "Dual enrollment support"
        ],
        last_updated: "2024-01"
    },
    STUDENT_PRIVACY: {
        id: "ACT2015-456",
        name: "Alabama Student Data Privacy Act",
        code: "Ala. Code § 16-6D-1",
        summary: "Regulates the collection, security, and use of student data by schools and third-party vendors.",
        key_provisions: [
            "Prohibition on selling student data",
            "Requirements for operator security protocols",
            "Parental right to inspect and correct records"
        ],
        fiscal_implications: [
            "Cybersecurity insurance and infrastructure costs",
            "Compliance auditing for EdTech vendors"
        ],
        pedagogical_mandates: [],
        last_updated: "2023-09"
    },
    TEACHER_ETHICS: {
        id: "AAC290-040-040",
        name: "Alabama Educator Code of Ethics",
        code: "Ala. Admin. Code r. 290-4-4-.01",
        summary: "Defines the professional and ethical standards for all Alabama educators.",
        key_provisions: [
            "Professional conduct and trustworthiness",
            "Proper management of public funds",
            "Integrity in testing and data reporting"
        ],
        fiscal_implications: [
            "Professional training on ethical standards",
            "Potential legal costs related to certification reviews"
        ],
        pedagogical_mandates: [
            "Safe and supportive learning environment facilitation"
        ],
        last_updated: "2024-03"
    }
};

export const FEDERAL_COMPLIANCE_DATA: Record<string, ComplianceStatute> = {
    FERPA: {
        id: "FERPA",
        name: "Family Educational Rights and Privacy Act",
        code: "20 U.S.C. § 1232g",
        summary: "Federal law that protects the privacy of student education records.",
        key_provisions: [
            "Right to inspect and review education records",
            "Right to request amendment of records",
            "Written consent required for disclosure (with exceptions)",
            "Directory information opt-out rights"
        ],
        fiscal_implications: [
            "Risk of federal funding withdrawal for non-compliance",
            "Administrative costs for record access management"
        ],
        pedagogical_mandates: [],
        last_updated: "2024-01"
    },
    COPPA: {
        id: "COPPA",
        name: "Children's Online Privacy Protection Act",
        code: "15 U.S.C. §§ 6501-6506",
        summary: "Regulates the collection of personal information from children under 13 by online services.",
        key_provisions: [
            "Verifiable parental consent required",
            "Strict data retention and deletion policies",
            "Notice of information collection practices",
            "Confidentiality and security requirements"
        ],
        fiscal_implications: [
            "Hefty FTC fines for non-compliance",
            "Vendor vetting and contract overhead"
        ],
        pedagogical_mandates: [],
        last_updated: "2023-11"
    },
    IDEA: {
        id: "IDEA",
        name: "Individuals with Disabilities Education Act",
        code: "20 U.S.C. § 1400",
        summary: "Ensures students with a disability are provided with Free Appropriate Public Education (FAPE).",
        key_provisions: [
            "Free Appropriate Public Education (FAPE)",
            "Least Restrictive Environment (LRE)",
            "Individualized Education Program (IEP)",
            "Procedural safeguards and due process"
        ],
        fiscal_implications: [
            "Part B and Part C federal grant funding",
            "Maintenance of Effort (MOE) requirements",
            "Legal costs for due process hearings"
        ],
        pedagogical_mandates: [
            "Individualized instruction and scaffolds",
            "Evidence-based interventions",
            "Regular progress monitoring"
        ],
        last_updated: "2024-02"
    },
    SECTION_504: {
        id: "SECTION_504",
        name: "Section 504 of the Rehabilitation Act",
        code: "29 U.S.C. § 794",
        summary: "Civil rights law that prohibits discrimination on the basis of disability.",
        key_provisions: [
            "Broad definition of disability",
            "Provision of reasonable accommodations",
            "Equal access to non-academic services",
            "Evaluation and placement procedures"
        ],
        fiscal_implications: [
            "Cost of physical and digital accessibility",
            "Staff training and coordination"
        ],
        pedagogical_mandates: [
            "Accommodations without curriculum modification",
            "Environmental adjustments"
        ],
        last_updated: "2023-08"
    },
    CIPA: {
        id: "CIPA",
        name: "Children's Internet Protection Act",
        code: "47 U.S.C. § 254",
        summary: "Requires schools to implement internet safety policies and filtering to receive E-rate discounts.",
        key_provisions: [
            "Internet filtering and blocking",
            "Monitoring online activities of minors",
            "Internet safety policy requirements",
            "Educating minors on digital citizenship"
        ],
        fiscal_implications: [
            "Eligibility for E-rate discounts",
            "Filtering software and hardware costs"
        ],
        pedagogical_mandates: [
            "Digital citizenship curriculum integration"
        ],
        last_updated: "2024-03"
    }
};

export const COMPLIANCE_SYSTEM_PROMPT = `
CRITICAL COMPLIANCE CONTEXT (FEDERAL & STATE LAYERED):

1. FEDERAL BASELINE (MANDATORY):
- FERPA (Privacy): Ensure no PII exposure; mention "FERPA-compliant redaction" in data pipelines.
- COPPA (Under 13): Verify parental consent for digital tools.
- IDEA/504 (Special Education): Mandate FAPE, LRE, and IEP fidelity.
- CIPA (Internet Safety): Enforce content filtering and digital citizenship.

2. STATE SPECIFIC (ALABAMA ALIGNMENT):
- ALABAMA LITERACY ACT (SB216): LETRS, Science of Reading, 3rd Grade retention.
- ALABAMA NUMERACY ACT (SB171): Math coaching models and K-5 evidence-based interventions.
- PARENTAL RIGHTS (SB202): Transparency and curriculum review.
- GASB 96: SBITA accounting for software.
- GRADUATION REQUIREMENTS (AAC 290-3-1): Financial literacy, FAFSA, and the 24-credit diploma.
- STUDENT PRIVACY (ACT 2015-456): Security of pupil data and vendor protocols.

Synthesize these layers. Use terms like "FERPA-shielded sync," "IDEA-aligned scaffolds," "Science of Reading protocols," and "SBITA capitalization" to demonstrate fidelity.
`;
