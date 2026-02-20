import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GeneratorsIndexPage() {
    await cookies(); // Force dynamic rendering
    redirect("/ai-hub");
}
