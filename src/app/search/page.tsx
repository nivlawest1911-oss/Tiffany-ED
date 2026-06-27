'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Mock results (replace with real search logic later)
  const results = [
    {
      type: 'Student',
      title: 'Liam Thompson',
      subtitle: '4th Grade • Ms. Rivera',
      link: '/students/1',
    },
    {
      type: 'Lesson',
      title: 'Main Idea & Supporting Details',
      subtitle: '4th Grade ELA • Tiffany-ED',
      link: '/tiffany-ed',
    },
    {
      type: 'Class',
      title: '4th Grade ELA - Section A',
      subtitle: '28 students • Last activity today',
      link: '/classes/1',
    },
    {
      type: 'Report',
      title: 'Science of Reading Progress - May 2026',
      subtitle: 'District-wide report',
      link: '/reports',
    },
  ];

  const filteredResults = query
    ? results.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : results;

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Search Results</h1>
          {query && (
            <p className="text-white/70 mt-2">
              Showing results for <span className="text-[#C5A46E]">“{query}”</span>
            </p>
          )}
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-md">
          <Input
            placeholder="Search again..."
            defaultValue={query}
            className="bg-white/5 border-white/10 text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = `/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
              }
            }}
          />
        </div>

        {/* Results */}
        {filteredResults.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60">No results found for “{query}”.</p>
            <Button variant="outline" className="mt-4 border-white/20 hover:bg-white/5" onClick={() => window.location.href = '/dashboard'}>
              Back to Dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <Card 
                key={index} 
                className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer"
                onClick={() => window.location.href = result.link}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{result.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{result.subtitle}</p>
                  </div>
                  <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30">
                    {result.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0F1C] text-white p-8">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
