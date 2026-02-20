import { Construction, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/routes';

interface NodePlaceholderProps {
    nodeName: string;
    description: string;
    icon?: React.ReactNode;
    dashboardRoute?: string;
}

export function NodePlaceholder({
    nodeName,
    description,
    icon,
    dashboardRoute = ROUTES.DASHBOARD
}: NodePlaceholderProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
            <Card className="w-full max-w-md border-zinc-200 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                        {icon ? (
                            <div className="h-6 w-6 text-indigo-600 dark:text-indigo-400">
                                {icon}
                            </div>
                        ) : (
                            <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {nodeName}
                    </CardTitle>
                    <CardDescription className="text-zinc-500 dark:text-zinc-400">
                        Sovereign Node Initialized
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {description}
                    </p>

                    <div className="flex items-center justify-center space-x-2 rounded-lg bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                        <Construction className="h-4 w-4" />
                        <span className="text-xs font-medium">Under Construction</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Link
                                href={dashboardRoute}
                                className="inline-flex items-center justify-center font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-500 w-full px-4 py-2"
                            >
                                Return to Dashboard
                            </Link>
                            <Link
                                href={ROUTES.TIFFANY_ED}
                                className="inline-flex items-center justify-center font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 w-full px-4 py-2"
                            >
                                Visit Tiffany-ED
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
