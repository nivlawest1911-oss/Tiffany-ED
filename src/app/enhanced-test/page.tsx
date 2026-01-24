export default function EnhancedTestPage() {
    if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
    }
    return null;
}
