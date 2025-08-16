// app/pricing/page.tsx or pages/pricing.tsx
'use client';
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchTiersWithFeatures, updateTier } from "../../../../redux/slices/profileSlice";
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

  const getTierIndex = (id: number) => tiers?.findIndex((tier: any) => tier.id === id);
  const currentTierIndex = getTierIndex(userTierId);

  const handlePayment = (tier: any) => {
    const options: any = {
      key: "rzp_test_R65f8oB3cMQSHX", // test key from Razorpay Dashboard
      amount: Math.round(tier.price) * 100, // in paisa      currency: "INR",
      name: "GETA PRIME",
      description: `Upgrade to ${tier.name}`,
      handler: async function (response: any) {
        console.log("Payment Success", response);

        // ✅ Call API to update tier after payment success
        try {
           await dispatch(updateTier(tier.id))
           dispatch(fetchTiersWithFeatures());
        } catch (err) {
          console.error(err);
          alert("Payment succeeded but failed to update plan!");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "6238947404",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

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
        {tiers?.map((tier: any, index: number) => {

          const isCurrent = userTierId === tier.id;
          const isLower = index < currentTierIndex;
          const isHigher = index > currentTierIndex;

          return (
            <div
              key={tier.id}
              className={`border rounded-lg p-6 flex flex-col ${userTierId === tier.id ? "bg-green-100 border-green-300" : "bg-white"
                }`}
            >
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="text-gray-500 text-sm">{tier.description}</p>

              <div className="mt-4">
                <span className="text-3xl font-bold">₹{Number(tier.price).toFixed(2)}</span>
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
              {!isLower && (
                <button
                  className={`mt-auto w-full py-2 px-4 rounded-lg font-medium ${isCurrent
                    ? "bg-gray-100 text-gray-800 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                    }`}
                  disabled={isCurrent}
                  onClick={() => !isCurrent && handlePayment(tier)}
                >
                  {isCurrent ? "Current Plan" : "Upgrade"}
                </button>
              )}
            </div>
          )
        }
        )}
      </div>
    </div>
  );
}