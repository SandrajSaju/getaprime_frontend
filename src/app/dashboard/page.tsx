"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Loader from "../components/Loader";
import { Lock } from "lucide-react";
import { FiFolder, FiLock, FiRefreshCw, FiStar, FiTerminal, FiTrendingUp } from "react-icons/fi";
import { GiFizzingFlask } from "react-icons/gi";
import { useRouter } from "next/navigation";
import UpgradeModal from "./components/UpgradeModal";

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
    if (!feature.locked) {
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
        <UpgradeModal setShowUpgradeModal={setShowUpgradeModal} />
      )}
    </div>
  );
}