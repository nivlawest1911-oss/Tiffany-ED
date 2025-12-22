export function ResourceCard({ title, url }: { title: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
    </a>
  );
}
