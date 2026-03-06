import SettingsClient from './SettingsClient';

export const metadata = {
    title: 'Settings | EdIntel Sovereign',
    description: 'Manage your EdIntel identity, subscription, and neural node configurations.',
};

export default function SettingsPage() {
    return <SettingsClient />;
}
