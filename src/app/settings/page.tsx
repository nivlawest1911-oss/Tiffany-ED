export default function SettingsPage() {
    if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
    }
    return null;
}
