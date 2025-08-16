// app/pricing/page.tsx or pages/pricing.tsx
'use client';
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchTiersWithFeatures } from "../../../../redux/slices/profileSlice";
import { RootState } from "../../../../redux/store";
import Loader from "@/app/components/Loader";

export default function PricingPage() {
  const dispatch = useAppDispatch();
  const { tiers, loading, error, userTierId } = useAppSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    dispatch(fetchTiersWithFeatures());
  }, [dispatch]);

  if (loading) return <Loader text="Loading Subscription Plans..." />;

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
        {tiers.map((tier: any) => (
          <div
            key={tier.id}
            className={`border rounded-lg p-6 flex flex-col ${
              userTierId === tier.id ? "bg-green-50 border-green-300" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="text-gray-500 text-sm">{tier.description}</p>

            <div className="mt-4">
              <span className="text-3xl font-bold">${Number(tier.price).toFixed(2)}</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>

            <ul className="mt-6 space-y-2">
              {tier.includesText && (
                <li className="text-gray-700 font-medium">
                  {tier.includesText}
                </li>
              )}
              {tier.features.map((feature: any) => (
                <li key={feature.id} className="flex items-center gap-2 text-gray-700">
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
                  {feature.name}
                </li>
              ))}
            </ul>
            <button
              className={`mt-auto w-full py-2 px-4 rounded-lg font-medium ${
                userTierId === tier.id
                  ? "bg-gray-100 text-gray-800"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {userTierId === tier.id ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}