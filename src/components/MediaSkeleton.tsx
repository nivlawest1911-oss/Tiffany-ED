export default function MediaSkeleton() {
    const skeletonItems = Array.from({ length: 8 });

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {skeletonItems.map((_, i) => (
                <div
                    key={i}
                    className={`bg-slate-800/40 rounded-2xl animate-pulse border border-white/5
            ${i === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}
          `}
                >
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            ))}
        </div>
    );
}
