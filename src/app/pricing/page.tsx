
const plans = [
  { name: "Basic", price: "$0", features: ["Limited Resources", "1 AI Agent"] },
  { name: "Pro", price: "$29/mo", features: ["14-Day Free Trial", "All AI Agents", "Full Resource Hub"] },
  { name: "Team", price: "Custom", features: ["Institutional Access", "District-wide Data"] },
  { name: "Tokens", price: "$10+", features: ["Pay-per-Paperwork", "Add-on Intelligence"] }
];

export default function PricingPage() {
    return (
        <div>
            <h1>Pricing</h1>
            <ul>
                {plans.map(plan => (
                    <li key={plan.name}>
                        <h2>{plan.name}</h2>
                        <p>{plan.price}</p>
                        <ul>
                            {plan.features.map(feature => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}