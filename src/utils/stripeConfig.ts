export const stripeConfig = {
  plans: [
    {
      id: "price_district_node",
      name: "District Node",
      price: 999,
      interval: "month",
      features: ["Single site monitoring", "Basic literacy tracking", "Daily restorative logs"]
    },
    {
      id: "price_sovereign_state",
      name: "Sovereign State",
      price: 4999,
      interval: "month",
      features: ["Full District Mesh", "GDP ROI Oracle", "Senator's Legislative HUD"]
    }
  ],
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};
