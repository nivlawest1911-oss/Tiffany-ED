'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    id: string;
    tier: 'free' | 'professional' | 'enterprise';
    usage_count?: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (url: string, data: any) => Promise<void>;
    signup: (url: string, data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // MOCKED AUTHENTICATION - REMOVING EXTERNAL DEPENDENCIES AS REQUESTED
    useEffect(() => {
        // Mock init: Auto-login as guest/dev if needed, or just stop loading
        const mockUser: User = {
            id: 'mock_sovereign_user',
            name: 'Executive Director',
            email: 'director@edintel.ai',
            tier: 'enterprise',
            usage_count: 0
        };
        // Simulate a logged-in user for development stability
        setUser(mockUser);
        setIsLoading(false);
    }, []);

    const login = async (url: string, data: any) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockUser: User = {
            id: 'mock_sovereign_user',
            name: 'Executive Director',
            email: 'director@edintel.ai',
            tier: 'enterprise'
        };
        setUser(mockUser);
        router.push('/');
        setIsLoading(false);
    };

    const signup = async (url: string, data: any) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockUser: User = {
            id: 'mock_new_user',
            name: 'New Executive',
            email: data.email || 'user@example.com',
            tier: 'free'
        };
        setUser(mockUser);
        router.push('/');
        setIsLoading(false);
    };

    const logout = async () => {
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
