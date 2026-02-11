/**
 * EdIntel Institutional Intelligence: Alabama State Registry
 * 
 * This file contains a structured database of Alabama-specific educational agencies, 
 * regulatory tools, legal codes, and operational resources. 
 * 
 * Use these constants to ground AI prompts in regional institutional context.
 */

export const ALABAMA_INSTITUTIONAL_KNOWLEDGE = {
    agencies: {
        alsde: {
            name: "Alabama State Department of Education (ALSDE)",
            website: "https://www.alabamaachieves.org",
            description: "Official site for department initiatives, resources, and state-wide education standards."
        },
        aplds: {
            name: "Alabama Principal Leadership Development System (APLDS)",
            website: "https://www.alabaprincipals.org",
            description: "Professional development and leadership standards for Alabama principals."
        },
        cognia: {
            name: "Cognia",
            website: "https://www.cognia.org",
            description: "Official accreditation body for Alabama schools."
        }
    },
    professional_associations: {
        clas: {
            name: "Council for Leaders in Alabama Schools (CLAS)",
            website: "https://www.clasleaders.org",
            description: "The premier association for Alabama school administrators. Manages professional development and legal support."
        },
        ssa: {
            name: "School Superintendents of Alabama (SSA)",
            website: "https://www.ssaonline.org",
            description: "Professional network and advocacy for Alabama district leaders."
        },
        aasb: {
            name: "Alabama Association of School Boards (AASB)",
            website: "https://www.alabamaschoolboards.org",
            description: "Resources for board governance and policy development."
        },
        aasps: {
            name: "Alabama Association of Secondary School Principals (AASSP)",
            website: "https://www.clasleaders.org/affiliates/alabama-association-of-secondary-school-principals",
            description: "Dedicated support for secondary education leadership."
        }
    },
    legal_and_policy: {
        cosa: {
            name: "Alabama Council of School Attorneys (COSA)",
            affiliation: "AASB",
            resource: "School Law Review",
            description: "Legal defense 'Think Tank' for school boards. Provides precedent on ed-tech legality and policy."
        },
        admin_code_ch290: {
            name: "Alabama Administrative Code (Chapter 290)",
            link: "https://www.alabamaachieves.org/state-board-of-education/administrative-code",
            description: "The primary regulatory framework for education in Alabama."
        },
        title_16: {
            name: "Code of Alabama, Title 16",
            link: "https://alison.legislature.state.al.us/code-of-alabama",
            description: "The body of law governing all educational operations in Alabama."
        },
        ethics: {
            name: "Alabama Ethics Commission",
            website: "https://www.ethics.alabama.gov",
            description: "Guidelines for public employee conduct and ethical standards."
        },
        student_data_privacy: {
            name: "Alabama National Data Privacy Agreement (NDPA)",
            consortium_link: "https://privacy.A4L.org/state-alliance-alabama",
            description: "Standardized privacy agreement (Exhibit E) for software vendors in Alabama schools."
        }
    },
    data_and_tech: {
        aim_portal: {
            name: "AIM (Alabama Identity Management)",
            url: "https://aim.alsde.edu",
            description: "Centralized login for PowerSchool, HireTrue, nSide, and state applications."
        },
        powerschool: {
            name: "PowerSchool SIS",
            description: "The mandated Student Information System for Alabama."
        },
        access_learning: {
            name: "ACCESS Virtual Learning",
            website: "https://access.ua.edu",
            description: "State-funded virtual education program."
        },
        ed_fi: {
            name: "Ed-Fi Alliance (Alabama Implementation)",
            description: "The data standard for interoperability between PowerSchool and 3rd party apps."
        },
        schoology: {
            name: "Schoology LMS",
            description: "The state-provided Learning Management System for Alabama teachers."
        }
    },
    hr_and_hiring: {
        hiretrue: {
            name: "HireTrue (formerly Teach in Alabama)",
            access: "Via AIM Portal",
            description: "The official portal for district job postings and applicant tracking."
        },
        kelly_education: {
            name: "Kelly Education",
            website: "https://www.kellyeducationalstaffing.us",
            description: "Third-party substitute teacher management used by many districts, including Mobile County."
        }
    },
    special_education: {
        ses: {
            name: "Alabama Special Education Services (SES)",
            website: "https://www.alabamaachieves.org/special-education",
            description: "State oversight for IDEA compliance and student support."
        },
        mastering_the_maze: {
            name: "The Process (Mastering the Maze)",
            description: "The definitive procedural guide for IEP meetings and special education law in Alabama."
        },
        focused_monitoring: {
            name: "Focused Monitoring",
            description: "The state audit system for special education compliance."
        }
    },
    safety_and_ops: {
        virtual_alabama: {
            name: "Virtual Alabama",
            website: "https://virtual.alabama.gov",
            description: "State-run geospatial platform for 3D school mapping and first responder coordination."
        },
        labor_dept_inspections: {
            name: "Alabama Dept of Labor - Inspections Division",
            website: "https://labor.alabama.gov/inspections",
            mandate: "Annual Boiler & Elevator certifications",
            description: "Critical physical plant safety compliance. Missing certificates can result in school closure."
        },
        nside: {
            name: "nSide School Safety Platform",
            access: "Via AIM Portal",
            description: "Mandated platform for school safety plans, floor plans, and drill logs."
        },
        ahsaa: {
            name: "Alabama High School Athletic Association (AHSAA)",
            website: "https://www.ahsaa.com",
            tools: ["DragonFly Platform (Eligibility verification)"]
        },
        safety_specialist: {
            name: "TAASRO School Safety Specialist",
            website: "https://www.taasro.org",
            description: "Certification for SROs and Assistant Principals in school security."
        }
    },
    curriculum_and_literacy: {
        amsti: {
            name: "Alabama Math, Science, and Technology Initiative (AMSTI)",
            website: "https://www.amsti.org",
            tools: ["Walkthrough Tools for Principals"]
        },
        ari: {
            name: "Alabama Reading Initiative (ARI)",
            website: "https://ari.alsde.edu",
            mandate: "Alabama Literacy Act",
            key_doc: "Literacy Act Implementation Guide"
        },
        alex: {
            name: "Alabama Learning Exchange (ALEX)",
            website: "https://alex.state.al.us",
            description: "Repository for the Alabama Course of Study (Standards)."
        },
        acap: {
            name: "Alabama Comprehensive Assessment Program (ACAP)",
            platform: "DRC INSIGHT Portal",
            practice_link: "https://wbte.drcedirect.com/AL/portals/al"
        }
    },
    finance_and_grants: {
        erate_usac: {
            name: "E-Rate / USAC",
            website: "https://www.usac.org/e-rate",
            portal: "EPC (E-Rate Productivity Center)",
            description: "Federal funding for 80-90% of school internet/infrastructure (Mobile County priority)."
        },
        adeca_surplus: {
            name: "ADECA Surplus Property",
            website: "https://adeca.alabama.gov/surplus",
            role: "Registered Donee status",
            description: "State market for local schools to acquire furniture and vehicles at pennies on the dollar."
        },
        aljp: {
            name: "Alabama Joint Purchasing (ALJP)",
            description: "State-approved vendor list for technology bypasses public bidding."
        },
        egap: {
            name: "eGAP (Electronic Grant Application Process)",
            access: "Via AIM Portal",
            description: "Financial hub for Title I, II, and III federal funds."
        },
        purchasing_coops: {
            names: ["Omnia Partners", "Sourcewell", "NCPA"],
            description: "External cooperatives allowed by Alabama law to bypass local bidding."
        },
        aasbo: {
            name: "Alabama Association of School Business Officials (AASBO)",
            website: "https://www.aasbo.com"
        }
    },
    risk_and_accountability: {
        atbe: {
            name: "Alabama Trust for Boards of Education (ATBE)",
            focus: "Liability coverage and risk management specialized for Alabama schools."
        },
        arms: {
            name: "Alabama Risk Management Solutions (ARMS)",
            description: "Risk assessment and safety audits."
        },
        red_book: {
            name: "The Red Book (Alabama Financial Accounting Manual)",
            link: "https://www.alabamaachieves.org/finance/accounting-manual",
            description: "Mandated financial accounting and federal compliance guidelines."
        },
        accountability_reports: {
            name: "Alabama School Report Cards",
            portal: "https://schoolreportcard.alsde.edu",
            description: "Performance metrics and state accountability ratings."
        }
    },
    cyber_and_data_privacy: {
        ascte: {
            name: "Alabama School of Cyber Technology and Engineering (ASCTE)",
            description: "State resource for cybersecurity curriculum and best practices."
        },
        asa: {
            name: "Alabama Supercomputer Authority (ASA)",
            description: "Provides state-wide connectivity and firewalls for public school districts."
        },
        edtech_privacy: {
            name: "Alabama NDPA (National Data Privacy Agreement)",
            key_protocol: "Exhibit E implementation for vendor compliance."
        }
    },
    specialized_markets: {
        charter: {
            name: "Alabama Public Charter School Commission (APCSC)",
            compliance: "Act 2015-3 (Alabama School Choice and Student Opportunity Act)"
        },
        private_school_choice: {
            name: "CHOOSE Act (2024)",
            focus: "Alabama Education Savings Account (ESA) program management."
        }
    },
    subject_leadership_and_science: {
        stem_council: {
            name: "Alabama STEM Council",
            website: "https://stemcouncil.alabama.gov",
            program: "Scale-Up Program (Vetted curriculum)",
            description: "Governor-created council for STEM workforce development."
        },
        actm: { name: "Alabama Council of Teachers of Mathematics", affiliate: "CLAS" },
        asta: { name: "Alabama Science Teachers Association", affiliate: "CLAS" },
        asite: { name: "Alabama Science In Motion (ASIM)", focus: "High school lab equipment and specialist support" },
        outdoor_classroom: {
            name: "Alabama Outdoor Classroom Program",
            partner: "Alabama Wildlife Federation",
            award: "Green Ribbon School (US Dept of Ed)",
            description: "Blueprints for outdoor labs, gardens, and weather stations."
        },
        arts_compliance: {
            name: "Alabama Music Performance Assessment (MPA) Database",
            focus: "Repertoire Tracker & Band ratings"
        }
    },
    workforce_and_higher_ed: {
        aidt: { name: "AIDT (Alabama Industrial Development Training)", focus: "Workforce development and industrial training" },
        swapte: { name: "Southwest Alabama Partnership for Training and Employment", region: "Mobile/Coastal" },
        alacte: { name: "Alabama Association of Colleges for Teacher Education", focus: "Licensure pipelines" },
        nccer: { name: "NCCER Alabama", focus: "Construction and trade certifications" }
    },
    community_and_trauma: {
        handle_with_care: {
            name: "Alabama 'Handle With Care' Protocol",
            description: "Law enforcement notification system for students exposed to trauma."
        },
        altapointe: {
            name: "AltaPointe Health",
            focus: "Mental health and behavioral support (Central to Mobile County)."
        }
    },
    school_improvement: {
        osi: {
            name: "Office of School Improvement (OSI)",
            framework: "Alabama System of Support",
            diagnostics: ["Cognia iLEAD", "Focus/Priority status"]
        },
        turnaround: {
            name: "Alabama Four Domains of Rapid School Improvement",
            source: "Center on School Turnaround"
        }
    },
    mobile_county_specific: {
        military_families_mic3: {
            name: "MIC3 (Military Interstate Children's Compact Commission) - Alabama",
            website: "https://mic3.net/alabama",
            mandate: "Interstate Compact for Military Children",
            description: "Overrides local rules for military student graduations and transfers (Coast Guard hub focus)."
        },
        asms: {
            name: "Alabama School of Mathematics and Science (ASMS)",
            location: "Mobile, AL",
            role: "State Agency Outreach",
            description: "State-wide outreach programs and PhD-level faculty support for local schools."
        },
        disl: {
            name: "Dauphin Island Sea Lab (DISL)",
            arm: "Discovery Hall (K-12 Education)",
            description: "Primary environmental science and field trip partner for Mobile County schools."
        },
        saric: {
            name: "South Alabama Regional Inservice Center (SARIC)",
            website: "https://www.southalabama.edu/colleges/ceps/saric",
            description: "Free professional development resource located at USA in Mobile."
        },
        maef: {
            name: "Mobile Area Education Foundation (MAEF)",
            website: "https://maef.net",
            description: "Local partner for grants and STEM initiatives in Mobile County."
        },
        kronos: {
            name: "Kronos",
            description: "Timekeeping system used by support staff in Mobile County."
        }
    },
    specialized_services: {
        humanities_alliance: {
            name: "Alabama Humanities Alliance",
            website: "https://alabamahumanities.org",
            focus: "Civics Labs, Oral Histories, and Local History grants."
        },
        teacher_stipends_nbct: {
            name: "Alabama NBCT Network",
            website: "https://alabamanbctnetwork.org",
            stipend: "$5,000/year",
            audit_note: "Principals лично liable for overpayments if certification lapses."
        },
        retirement_rsa1: {
            name: "RSA-1 (Deferred Compensation)",
            plan: "457(b) for Alabama teachers",
            website: "https://www.rsa-al.gov/rsa-1"
        },
        textbook_logistics: {
            name: "Alabama Book Depository",
            role: "State textbook warehousing and distribution."
        },
        adult_ed: {
            name: "Alabama Community College System (ACCS) - Adult Education",
            option: "HSDO (High School Diploma Option)",
            description: "Real high school diploma pathway for adults via community colleges."
        },
        support_staff_unions: {
            name: "Alabama School Bus Drivers Association",
            focus: "Transportation advocacy and operational continuity."
        }
    }
};
