"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { fetchFeatureDetailsbyId } from "../../../../../redux/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import Loader from "@/app/components/Loader";

export default function FeatureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { featureDetails, loading, error } = useAppSelector(
      (state: RootState) => state.profile
    );

  // Dummy feature (you will replace with API call using featureKey)
  const feature = {
    name: "Advanced Analytics",
    description:
      "Gain deep insights into your business performance with real-time dashboards, AI-powered insights, and customizable reporting tools.",
    category: "Analytics",
    unlocked: false, // Change to true to test unlocked state
    benefits: [
      "Real-time KPI tracking",
      "AI-powered trend predictions",
      "Customizable dashboards",
      "Exportable PDF & Excel reports",
    ],
    examples: [
      { title: "Sales Performance Dashboard", img: "/placeholder1.png" },
      { title: "Customer Retention Report", img: "/placeholder2.png" },
    ],
  };

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
      dispatch(fetchFeatureDetailsbyId(id));
    }, [dispatch]);

  if (loading) return <Loader text="Loading Feature Details..." />;

  return (
    <div className="p-8 space-y-10 px-10">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
        <div className="relative p-10 text-white">
          <span className="px-3 py-1 text-sm bg-white/20 rounded-full backdrop-blur-sm">
            {featureDetails.category}
          </span>
          <h1 className="text-4xl font-extrabold mt-4">{featureDetails.name}</h1>
          <p className="text-lg max-w-3xl mt-3">{featureDetails.description}</p>
        </div>
      </div>

      {/* Unlocked View */}
      {feature.unlocked ? (
        <div className="space-y-10">
          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Key Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition"
                >
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Usage Examples */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Usage Examples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {feature.examples.map((ex) => (
                <div
                  key={ex.title}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
                >
                  <div className="bg-gray-200 h-44 flex items-center justify-center">
                    <span className="text-gray-500">{ex.title}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{ex.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Locked View */
        <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <LockClosedIcon className="h-8 w-8 text-gray-500" />
            <h2 className="text-2xl font-bold">Unlock {feature.name}</h2>
          </div>
          <p className="text-gray-600">
            This premium feature helps you gain valuable insights and drive
            growth. Upgrade to access all the tools you need for success.
          </p>
          <h3 className="font-semibold mt-4">What you’ll get:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {feature.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg hover:from-purple-600 hover:to-indigo-700 transition"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 transform transition-all animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4">
              Upgrade to Unlock {feature.name}
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Get instant access to {feature.name} and other premium features
              with our Standard or Premium plans.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
              >
                Cancel
              </button>
              <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg hover:from-purple-600 hover:to-indigo-700 transition">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}