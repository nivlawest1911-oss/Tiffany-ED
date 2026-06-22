import { ScreenerCommand } from "@/components/assessment/ScreenerCommand";

export const metadata = {
  title: "Assessment Command Center | EdIntel Operations",
  description: "Closed-loop diagnostic screener ingestion and auto-intervention pipeline.",
};

export default function AssessmentPage() {
  return <ScreenerCommand />;
}
