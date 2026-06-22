import { VIGIAppDashboard } from "@/components/vigiapp/VIGIAppDashboard";

export const metadata = {
  title: "VIGIApp Operations Console | EdIntel Operations",
  description: "Surveillance, thermal tolerances, and real-time alerts for the database facilities.",
};

export default function VIGIAppPage() {
  return <VIGIAppDashboard />;
}
