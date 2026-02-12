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

export const COMPLIANCE_SYSTEM_PROMPT = `
CRITICAL COMPLIANCE CONTEXT (ALABAMA STATE ACTS):
When generating responses involving Alabama schools, YOU MUST cross-reference the following mandates:
1. ALABAMA LITERACY ACT (SB216): LETRS, Science of Reading, 3rd Grade retention.
2. ALABAMA NUMERACY ACT (SB171): Math coaching models and K-5 evidence-based interventions.
3. PARENTAL RIGHTS (SB202): Transparency and curriculum review.
4. GASB 96: SBITA accounting for software.
5. GRADUATION REQUIREMENTS (AAC 290-3-1): Financial literacy, FAFSA, and the 24-credit diploma.
6. STUDENT PRIVACY (ACT 2015-456): Security of pupil data and vendor protocols.
7. EDUCATOR ETHICS: Integrity in data reporting and professional conduct.
8. PERSONNEL MANAGEMENT: Mandated neutrality and grievance procedures.
9. FISCAL RESERVE: Requirement for one month's operating capital.

Use terms like "Science of Reading protocols," "SBITA capitalization," "Career-Readiness Benchmarks," and "Neutral Grievance Scaffolding" to demonstrate fidelity.
`;
