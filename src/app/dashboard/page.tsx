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
import { useRouter } from "next/navigation";
import UpgradeModal from "./components/UpgradeModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchFeaturesByAvailability, fetchTiersWithFeatures } from "../../../redux/slices/profileSlice";
import { RootState } from "../../../redux/store";
import UpgradeSubscriptionModal from "./components/UpgradeSubscriptionModal";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { checkingForLoginState } = useAuth();
  const { availableFeatures, userTierName, loading, error } = useAppSelector(
      (state: RootState) => state.profile
    );
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleClickFeature = (feature: any) => {
    if (feature.isAvailable) {
      router.push(`/dashboard/features/${feature.id}`);
    } else {
      dispatch(fetchTiersWithFeatures());
      setShowUpgradeModal(true);
    }
  };

  useEffect(()=>{
    dispatch(fetchFeaturesByAvailability())
  }, []);

  console.log(availableFeatures);

  if (checkingForLoginState) return <Loader text="Loading your dashboard..." />;
  if (loading) return <Loader text="Fetching the dashboard contents" />;

  // Group features by category
  const categories: string[] = Array.from(new Set(availableFeatures?.map((f: any) => f.category)));

  return (
    <div className="p-8 px-10 space-y-10">
      {/* Current Plan */}
      <div className="border rounded-xl p-6 bg-gray-50 flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-white">
          <h2 className="text-2xl font-bold">Your Plan: {userTierName}</h2>
          <p>
            {userTierName === "Free"
              ? "Upgrade to unlock more features."
              : "Enjoy your premium benefits."}
          </p>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg hover:from-purple-600 hover:to-indigo-700 transition cursor-pointer"
        >
          {userTierName === "Premium" ? "Manage Plan" : "Upgrade Plan"}
        </button>
      </div>

      {/* Features by Category */}
      {categories.map((category, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableFeatures
              ?.filter((f: any) => f.category === category)
              ?.map((feature:any) => {
                return (
                  <div
                    key={feature.id}
                    onClick={() => handleClickFeature(feature)}
                    className={`relative border rounded-xl p-4 transition group cursor-pointer ${feature.isAvailable
                      ? "bg-white hover:shadow-md"
                      : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {/* Icon + Title */}
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col gap-2 font-semibold">
                        <div className="flex flex-row items-center gap-2">
                          <span className="text-lg"><FiTrendingUp /></span>
                          <span>{feature.name}</span>
                        </div>
                        {/* Description */}
                        <p className="text-sm">{feature.description}</p>
                      </div>
                      {!feature.isAvailable && (
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
        <UpgradeSubscriptionModal setShowUpgradeModal={setShowUpgradeModal} />
      )}
    </div>
  );
}