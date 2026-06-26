'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Mock search results (replace with real API later)
  const mockResults = [
    { type: 'Student', title: 'Liam Thompson', subtitle: '4th Grade • Ms. Rivera', path: '/students/123' },
    { type: 'Student', title: 'Sophia Patel', subtitle: '2nd Grade • Mr. Chen', path: '/students/456' },
    { type: 'Class', title: '4th Grade ELA - Ms. Rivera', subtitle: '28 students', path: '/classes/1' },
    { type: 'Report', title: 'Science of Reading Report - March 2026', subtitle: 'District-wide', path: '/reports/89' },
    { type: 'AI Activity', title: 'Tiffany-ED: Lesson Scaffold', subtitle: 'Generated for 12 students', path: '/tiffany-ed' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    // Filter mock results
    const filtered = mockResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Search</h1>
          <p className="text-white/70 mt-1">Search across students, classes, reports, and AI activity</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <Input
            type="text"
            placeholder="Search students, classes, reports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white/5 border-white/10 py-6 text-lg"
          />
        </form>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Card 
                key={index} 
                className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {result.type}
                      </Badge>
                      <h3 className="text-xl font-semibold">{result.title}</h3>
                    </div>
                    <p className="text-white/70 mt-1">{result.subtitle}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12 text-white/60">
            No results found for “{query}”.
          </div>
        ) : (
          <div className="text-center py-12 text-white/50">
            Start typing to search across the platform.
          </div>
        )}
      </div>
    </div>
  );
}
