import { Metadata } from "next";
import { cookies } from "next/headers";
import AIHubClient from "./AIHubClient";

export const metadata: Metadata = {
    title: "Neural Grid | EdIntel",
    description: "Unified AI Command Center for Educational Leadership.",
};

export default async function AIHubPage() {
    await cookies(); // Force dynamic rendering
    return <AIHubClient />;
}
