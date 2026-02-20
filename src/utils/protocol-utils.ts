// No Lucide imports needed for the logic below

export const getCategoryForGenerator = (gen: any) => {
    // Explicit Category Priority
    if (gen.category) return gen.category;

    const id = gen.id.toLowerCase();

    if (id.includes('communication') || id.includes('newsletter') || id.includes('social') || id.includes('family') || id.includes('volunteer')) return "Community";
    if (id.includes('wellness') || id.includes('health') || id.includes('counselor') || id.includes('restorative') || id.includes('behavior') || id.includes('mental') || id.includes('healing')) return "Healing";
    if (id.includes('lesson') || id.includes('iep') || id.includes('curriculum') || id.includes('literacy') || id.includes('math') || id.includes('early') || id.includes('media') || id.includes('stem') || id.includes('arts')) return "Instructional";
    if (id.includes('facility') || id.includes('transport') || id.includes('substitute') || id.includes('procurement') || id.includes('safety') || id.includes('registrar') || id.includes('compliance') || id.includes('attendance')) return "Operational";
    if (id.includes('vision') || id.includes('data') || id.includes('grant') || id.includes('budget') || id.includes('board') || id.includes('labor') || id.includes('capital') || id.includes('hiring') || id.includes('human') || id.includes('fiscal') || id.includes('forge')) return "Strategic";

    // Wisdom mapping
    if (id.includes('philosophy') || id.includes('history') || id.includes('archive') || id.includes('trend')) return "Wisdom";

    return "Strategic"; // Default fallback
};
