import { ResourceCard } from '@/components/ResourceCard';

export default function AlabamaResources() {
  const resources = [
    { title: "Alabama State Dept of Education (ALSDE)", link: "https://www.alabamaachieves.org/" },
    { title: "Mobile County Public Schools (MCPSS)", link: "https://www.mcpss.com/" },
    { title: "Alabama Insight (IDEA/Special Ed)", link: "https://insight.alsde.edu/" },
    { title: "Mobile Area Chamber of Commerce - Education", link: "https://mobilechamber.com/" }
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Alabama & Mobile County Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, i) => (
          <ResourceCard key={i} title={res.title} url={res.link} />
        ))}
      </div>
    </div>
  );
}