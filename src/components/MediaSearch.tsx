'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export default function MediaSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Search media (e.g., 'classroom', 'student', 'observation')..."
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
        </div>
    );
}
