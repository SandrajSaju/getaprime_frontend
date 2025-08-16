"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Loader from "../components/Loader";
import { Lock } from "lucide-react";
import {
  FiFolder,
  FiLock,
  FiRefreshCw,
  FiStar,
  FiTerminal,
  FiTrendingUp,
} from "react-icons/fi";
import { GiFizzingFlask } from "react-icons/gi";
import { useRouter } from "next/navigation";
import UpgradeModal from "./components/UpgradeModal";

// Mock user tier (you can replace with real data from Redux or API)
let userTier = "Free"; // "Free" | "Standard" | "Premium"

// Example features with categories + requiredTier
const features = [
  {
    key: "privacy",
    name: "Privacy-Focused",
    description: "End-to-end privacy for all users.",
    category: "Core",
    requiredTier: "Free",
    icon: <FiLock />,
  },
  {
    key: "scalable",
    name: "Scalable",
    description: "Handles growth seamlessly.",
    category: "Core",
    requiredTier: "Free",
    icon: <FiTrendingUp />,
  },
  {
    key: "transition",
    name: "Transition",
    description: "Smooth migration between environments.",
    category: "Core",
    requiredTier: "Free",
    icon: <FiRefreshCw />,
  },
  {
    key: "project-coordination",
    name: "Project Coordination",
    description: "Collaborate with your team efficiently.",
    category: "Collaboration",
    requiredTier: "Free",
    icon: <FiFolder />,
  },
  {
    key: "cli3",
    name: "CLI Support",
    description: "Access your data and tools via CLI.",
    category: "Developer Tools",
    requiredTier: "Standard",
    icon: <FiTerminal />,
  },
  {
    key: "experimental2",
    name: "Experimental",
    description: "Try beta features before release.",
    category: "Labs",
    requiredTier: "Premium",
    icon: <GiFizzingFlask />,
  },
  {
    key: "flexible2",
    name: "Highly Flexible",
    description: "Customize everything to your needs.",
    category: "Labs",
    requiredTier: "Premium",
    icon: <FiStar />,
  },
  {
    key: "privacy1",
    name: "Privacy-Focused",
    description: "End-to-end privacy for all users.",
    category: "Core",
    requiredTier: "Free",
    icon: <FiLock />,
  },
  {
    key: "scalable1",
    name: "Scalable",
    description: "Handles growth seamlessly.",
    category: "Core",
    requiredTier: "Free",
    icon: <FiTrendingUp />,
  },
  {
    key: "transition1",
    name: "Transition",
    description: "Smooth migration between environments.",
    category: "Core",
    requiredTier: "Free",
    icon: <FiRefreshCw />,
  },
  {
    key: "project-coordination1",
    name: "Project Coordination",
    description: "Collaborate with your team efficiently.",
    category: "Collaboration",
    requiredTier: "Free",
    icon: <FiFolder />,
  },
  {
    key: "cli",
    name: "CLI Support1",
    description: "Access your data and tools via CLI.",
    category: "Developer Tools",
    requiredTier: "Standard",
    icon: <FiTerminal />,
  },
  {
    key: "experimental1",
    name: "Experimental",
    description: "Try beta features before release.",
    category: "Labs",
    requiredTier: "Premium",
    icon: <GiFizzingFlask />,
  },
  {
    key: "flexible1",
    name: "Highly Flexible",
    description: "Customize everything to your needs.",
    category: "Labs",
    requiredTier: "Premium",
    icon: <FiStar />,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { checkingForLoginState } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleClickFeature = (feature: any, isAvailable: boolean) => {
    if (isAvailable) {
      router.push(`/dashboard/features/${feature.key}`);
    } else {
      setShowUpgradeModal(true);
    }
  };

  if (checkingForLoginState)
    return <Loader text="Loading your dashboard..." />;

  // Group features by category
  const categories = Array.from(new Set(features.map((f) => f.category)));

  // Define tier order for comparison
  const tierOrder = ["Free", "Standard", "Premium"];
  const userTierIndex = tierOrder.indexOf(userTier);

  return (
    <div className="p-8 px-10 space-y-10">
      {/* Current Plan */}
      <div className="border rounded-xl p-6 bg-gray-50 flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-white">
          <h2 className="text-2xl font-bold">Your Plan: {userTier}</h2>
          <p>
            {userTier === "Free"
              ? "Upgrade to unlock more features."
              : "Enjoy your premium benefits."}
          </p>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg hover:from-purple-600 hover:to-indigo-700 transition cursor-pointer"
        >
          {userTier === "Premium" ? "Manage Plan" : "Upgrade Plan"}
        </button>
      </div>

      {/* Features by Category */}
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features
              .filter((f) => f.category === category)
              .map((feature) => {
                const featureTierIndex = tierOrder.indexOf(feature.requiredTier);
                const isAvailable = featureTierIndex <= userTierIndex;

                return (
                  <div
                    key={feature.key}
                    onClick={() => handleClickFeature(feature, isAvailable)}
                    className={`relative border rounded-xl p-4 transition group cursor-pointer ${isAvailable
                      ? "bg-white hover:shadow-md"
                      : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {/* Icon + Title */}
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col gap-2 font-semibold">
                        <div className="flex flex-row items-center gap-2">
                          <span className="text-lg">{feature.icon}</span>
                          <span>{feature.name}</span>
                        </div>
                        {/* Description */}
                        <p className="text-sm">{feature.description}</p>
                      </div>
                      {!isAvailable && (
                        <div className="ml-auto"> 
                          <Lock className="w-8 h-8 text-gold-400" color={"indigo"} />
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
          </div>
        </div>
      ))}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal setShowUpgradeModal={setShowUpgradeModal} />
      )}
    </div>
  );
}