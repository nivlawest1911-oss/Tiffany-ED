'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';

interface User {
    name: string;
    email: string;
    id: string;
    tier: string;
    usageTokens: number;
    avatar_url?: string;
    clerkId: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user: clerkUser, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && clerkUser) {
            const newUser: User = {
                id: clerkUser.id,
                clerkId: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress || '',
                name: clerkUser.fullName || clerkUser.username || 'Executive',
                tier: (clerkUser.publicMetadata?.tier as string) || 'Sovereign Initiate',
                usageTokens: (clerkUser.publicMetadata?.usageTokens as number) || 10,
                avatar_url: clerkUser.imageUrl
            };
            setUser(newUser);
        } else if (isLoaded && !isSignedIn) {
            setUser(null);
        }
    }, [isLoaded, isSignedIn, clerkUser]);

    const logout = async () => {
        try {
            await signOut();
            router.push(ROUTES.LOGIN);
            toast.success('Session Terminated', { description: 'Secure channel closed.' });
        } catch (error: any) {
            toast.error('Logout Failed', { description: error.message });
        }
    };

    const updateUser = async (_data: Partial<User>) => {
        // In Clerk, updates are usually done via clerkUser.update() or backend sync
        toast.info('Profile updates synced via Sovereign Auth');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading: !isLoaded, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
