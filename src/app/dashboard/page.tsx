"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Loader from "../components/Loader";
import { Lock, X } from "lucide-react";
import { FiFolder, FiLock, FiRefreshCw, FiStar, FiTerminal, FiTrendingUp } from "react-icons/fi";
import { GiFizzingFlask } from "react-icons/gi";
import { useRouter } from "next/navigation";

const features = [
  {
    name: "Privacy-Focused",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiLock />,
  },
  {
    name: "Scalable",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiTrendingUp />,
  },
  {
    name: "Transition",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiRefreshCw />,
  },
  {
    name: "Project Coordination",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiFolder />,
  },
  {
    name: "CLI Support",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: true,
    icon: <FiTerminal />,
  },
  {
    name: "Experimental",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: true,
    icon: <GiFizzingFlask />,
  },
  {
    name: "Highly Flexible",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: true,
    icon: <FiStar />,
  },
  {
    name: "Privacy-Focused",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiLock />,
  },
  {
    name: "Scalable",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiTrendingUp />,
  },
  {
    name: "Transition",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiRefreshCw />,
  },
  {
    name: "Project Coordination",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: false,
    icon: <FiFolder />,
  },
  {
    name: "CLI Support",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: true,
    icon: <FiTerminal />,
  },
  {
    name: "Experimental",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: true,
    icon: <GiFizzingFlask />,
  },
  {
    name: "Highly Flexible",
    description:
      "We prioritize our customer experience, ensuring that every interaction with our platform is seamless and intuitive.",
    locked: true,
    icon: <FiStar />,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, checkingForLoginState } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleClickFeature = (feature: any) => {
    if(!feature.locked){
      router.push(`/dashboard/features/featureId`)
    } else {
      setShowUpgradeModal(true)
    }
  }

  if (checkingForLoginState) return <Loader text="Loading your dashboard..." />;

  return (
    <div className="p-8 px-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="text-gray-500 mt-2">
          Primary Attributes include essential features that define the core
          performance of our services, ensuring quality and reliability.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`relative bg-white border rounded-xl p-4 hover:shadow-md transition group`}
            onClick={() => handleClickFeature(feature)}
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-2 font-semibold mb-2">
              <span className="text-lg">{feature.icon}</span>
              <span>{feature.name}</span>
              {feature.locked && (
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition">
                  <button>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {showUpgradeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowUpgradeModal(false)}
          />

          {/* Modal */}
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 relative z-10 text-center">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowUpgradeModal(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lock Icon */}
            <div className="w-20 h-20 mx-auto bg-indigo-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <Lock className="w-10 h-10" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-3">
              Upgrade your plan to access this feature
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Unlock premium tools to improve your productivity and collaboration. Enjoy this feature along with many more benefits.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
                onClick={() => setShowUpgradeModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
                onClick={() => {
                  setShowUpgradeModal(false);
                }}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}