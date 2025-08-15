"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";

const featuresData = [
  {
    name: "Unlimited downloads for Music, Intros & SFX",
    category: "Downloads",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "Content cleared forever",
    category: "Licensing",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "All online platforms",
    category: "Platforms",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "Channel monetization",
    category: "Monetization",
    tiers: { Premium: "Up to 5 channels", Business: "Up to 15 channels", Enterprise: "Unlimited" },
  },
  {
    name: "Valid for streaming and VoDs",
    category: "Licensing",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "Loops and shorter edits/versions included",
    category: "Editing",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "Use videos, shorts, podcasts and anywhere online",
    category: "Usage",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "Video clearance tool for clients",
    category: "Tools",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "High quality WAV and MP3 files",
    category: "Audio Quality",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "AI Studio® minutes per month",
    category: "AI",
    tiers: { Premium: "25 minutes", Business: "100 minutes", Enterprise: "Unlimited" },
  },
  {
    name: "No PRO/CMO payments",
    category: "Licensing",
    tiers: { Premium: true, Business: true, Enterprise: true },
  },
  {
    name: "Number of team members",
    category: "Teams",
    tiers: { Premium: 1, Business: 50, Enterprise: "Unlimited" },
  },
  {
    name: "Use in digital ads, video game and app",
    category: "Usage",
    tiers: { Premium: false, Business: true, Enterprise: true },
  },
];

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(featuresData.map((f) => f.category))];

  const filteredFeatures =
    selectedCategory === "All"
      ? featuresData
      : featuresData.filter((f) => f.category === selectedCategory);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-2">Features</h1>
      <p className="text-gray-500 text-center mb-8">
        Compare plans and find the one that fits your needs.
      </p>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/3 text-left p-4"></th>
              <th className="text-center p-4 font-semibold">Premium</th>
              <th className="text-center p-4 font-semibold">Business</th>
              <th className="text-center p-4 font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature: any, idx: number) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-4 text-gray-800">{feature.name}</td>
                {["Premium", "Business", "Enterprise"].map((tier) => (
                  <td key={tier} className="text-center p-4">
                    {feature.tiers[tier] === true ? (
                      <Check className="w-5 h-5 mx-auto text-green-500" />
                    ) : feature.tiers[tier] === false ? (
                      <X className="w-5 h-5 mx-auto text-gray-400" />
                    ) : (
                      <span className="text-gray-600">
                        {feature.tiers[tier]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}