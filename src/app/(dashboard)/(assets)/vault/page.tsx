
import VaultDashboard from '@/components/vault/VaultDashboard';
import { Shield } from 'lucide-react';
import { SmartHover } from '@/components/ui/SmartHover';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sovereign Vault | EdIntel',
    description: 'Secure, encrypted storage for sensitive institutional documents.',
};

export default function VaultPage() {
    // If we prefer the NodePlaceholder for now until fully ready:
    // return <NodePlaceholder nodeName="Sovereign Vault" icon={Shield} />;

    // But we want to implement the dashboard:
    return (
        <div className="p-6 md:p-8 space-y-8 min-h-screen bg-slate-950 text-slate-200">
            <SmartHover message="Sovereign Vault: Encrypted, audit-logged institutional repository for highly sensitive educational assets.">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-indigo-500" />
                            Sovereign Vault
                        </h1>
                        <p className="text-slate-400">Secure, encrypted, and audit-logged institutional storage.</p>
                    </div>
                </div>
            </SmartHover>

            <VaultDashboard />
        </div>
    );
}
