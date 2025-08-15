// app/pricing/page.tsx or pages/pricing.tsx
import React from "react";

const tiers = [
  {
    name: "Free",
    price: 0,
    description: "To introduce you to our tools.",
    features: ["Basic filters", "LinkedIn extension", "Gmail extension"],
    highlight: true,
  },
  {
    name: "Standard",
    price: 19.99,
    description: "To show basic services for your business.",
    features: [
      "Advanced filters",
      "Advanced reports & dashboards",
      "Integration with all email providers",
      "Custom fields",
    ],
    includesText: "Everything in Free plus:",
    highlight: false,
  },
  {
    name: "Premium",
    price: 39.99,
    description: "For professionals who want to scale business globally.",
    features: [
      "Data enrichment & job changes",
      "Call transcriptions",
      "Customizable reports",
      "Permission profiles",
      "API access",
    ],
    includesText: "Everything in Standard plus:",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Choose the Plan That Fits You Best
        </h1>
        <p className="text-gray-600">
          Start building for free and pay as you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tiers.map((tier, idx) => (
          <div
            key={tier.name}
            className={`border rounded-lg p-6 flex flex-col ${
              tier.highlight ? "bg-green-50 border-green-300" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="text-gray-500 text-sm">{tier.description}</p>

            <div className="mt-4">
              <span className="text-3xl font-bold">${tier.price.toFixed(2)}</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>

            <ul className="mt-6 space-y-2">
              {tier.includesText && (
                <li className="text-gray-700 font-medium">
                  {tier.includesText}
                </li>
              )}
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`mt-auto w-full py-2 px-4 rounded-lg font-medium ${
                tier.highlight
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }`}
            >
              Upgrade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}