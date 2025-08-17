'use client';
import { Lock, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { fetchFeaturesByAvailability, updateTier } from "../../../../redux/slices/profileSlice";
import { useRouter } from "next/navigation";

const UpgradeSubscriptionModal = ({ setShowUpgradeModal }: { setShowUpgradeModal: any }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { tiers, loading, error, userTierId } = useAppSelector(
        (state: RootState) => state.profile
    );

    const getTierIndex = (id: number) => tiers.findIndex((tier: any) => tier.id === id);
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
                    await dispatch(fetchFeaturesByAvailability())
                    setShowUpgradeModal(false)
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

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowUpgradeModal(false)}
            />

            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-8 relative z-10 text-center h-[90vh]">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowUpgradeModal(false)}
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold mb-2">
                            Choose the Plan That Fits You Best
                        </h1>
                        <p className="text-gray-600">
                            Start building for free and pay as you grow.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {tiers.map((tier: any, index: number) => {

                            const isCurrent = userTierId === tier.id;
                            const isLower = index < currentTierIndex;
                            const isHigher = index > currentTierIndex;

                            return (
                                <div
                                    key={tier.id}
                                    className={`border h-[60vh] rounded-lg p-6 flex flex-col ${userTierId === tier.id ? "bg-green-100 border-green-300" : "bg-white"
                                        }`}
                                >
                                    {/* Plan Header */}
                                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                                    <p className="text-gray-500 text-sm">{tier.description}</p>

                                    {/* Price */}
                                    <div className="mt-4">
                                        <span className="text-3xl font-bold">₹{Number(tier.price).toFixed(2)}</span>
                                        <span className="text-gray-500 text-sm"> / month</span>
                                    </div>

                                    {/* ✅ Scrollable Features */}
                                    <ul className="mt-4 space-y-2 overflow-y-auto flex-1">
                                        {tier.includesText && (
                                            <li className="text-gray-700 font-medium">{tier.includesText}</li>
                                        )}
                                        {tier.features.map((feature: any) => (
                                            <li
                                                key={feature.id}
                                                className="flex items-center gap-2 text-gray-700 text-sm"
                                            >
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

                                    {/* Action Button */}
                                    {!isLower && (
                                        <button
                                            className={`mt-4 w-full py-2 px-4 rounded-lg font-medium ${isCurrent
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

            </div>
        </div>
    );
};

export default UpgradeSubscriptionModal;