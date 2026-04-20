import { sleep } from "workflow";
// import { sendWelcomeEmail as officialWelcomeEmail } from "@/services/email-service";

// TODO: Replace with your actual database entity creation logic
async function createUser(email: string) {
  // Mock user creation for the workflow
  return { 
      id: crypto.randomUUID(), 
      email: email, 
      name: email.split("@")[0] 
  };
}

// TODO: Connect this to your email service provider
async function sendWelcomeEmail(user: { email: string; name: string; id: string }) {
  console.log(`[WORKFLOW] Sending Welcome Email to: ${user.email}`);
  // await officialWelcomeEmail(user.email, user.name);
}

// TODO: Connect this to your onboarding sequence
async function sendOnboardingEmail(user: { email: string; name: string; id: string }) {
  console.log(`[WORKFLOW] Sending Onboarding 5-Day Sequence Email to: ${user.email}`);
}

export async function handleUserSignup(email: string) {
  "use workflow";

  const user = await createUser(email);
  await sendWelcomeEmail(user);

  await sleep("5s");

  await sendOnboardingEmail(user);
  
  return { userId: user.id, status: "onboarded" };
}
