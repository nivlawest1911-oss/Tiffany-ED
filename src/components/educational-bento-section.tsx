import IEPGenerator from "./bento/IEPGenerator"
import LessonPlanGenerator from "./bento/LessonPlanGenerator"
import AutomatedIEPAudit from "./bento/AutomatedIEPAudit"
import ExecutiveDashboard from "./bento/ExecutiveDashboard"
import AvatarStudio from "./bento/AvatarStudio"

const BentoCard = ({ title, description, Component, fullWidth = false }) => (
    <div className={`overflow-hidden rounded-3xl border border-white/10 flex flex-col justify-start items-start relative bg-zinc-900/50 backdrop-blur-xl group hover:border-indigo-500/50 transition-all duration-500 ${fullWidth ? 'md:col-span-2' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="self-stretch p-8 flex flex-col justify-start items-start gap-4 relative z-10">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <h3 className="text-white text-2xl font-black tracking-tight uppercase">
                    {title}
                </h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
        <div className="self-stretch flex-grow relative z-10 p-4 pt-0">
            <div className="rounded-2xl overflow-hidden h-full">
                <Component />
            </div>
        </div>
    </div>
)

export function EducationalBentoSection() {
    const cards = [
        {
            title: "IEP Generation Hub",
            description: "Create legally sound, data-driven IEP goals and accommodations in real-time.",
            Component: IEPGenerator,
            fullWidth: true
        },
        {
            title: "Smart Lesson Architect",
            description: "Standards-aligned, adaptive curriculum generation for every classroom scenario.",
            Component: LessonPlanGenerator,
        },
        {
            title: "Compliance Audit Center",
            description: "Automated IDEA Part B verification and procedural safeguard auditing.",
            Component: AutomatedIEPAudit,
        },
        {
            title: "Executive Intelligence",
            description: "Real-time updates on legislative shifts and district-level mandates.",
            Component: ExecutiveDashboard,
        },
        {
            title: "Identity Synthesis",
            description: "Develop your professional AI avatar with cultural and visual authenticity.",
            Component: AvatarStudio,
        }
    ]

    return (
        <section id="features" className="w-full px-4 md:px-8 py-24 bg-transparent">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-4 text-center">
                    <div className="inline-flex mx-auto items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase tracking-widest">
                        Executive Feature Suite
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                        Integrated <span className="text-indigo-500">Intelligence.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
                        The most comprehensive AI ecosystem ever built for educational leadership. Every tool is designed to save time, mitigate risk, and empower your educators.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {cards.map((card) => (
                        <BentoCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    )
}
