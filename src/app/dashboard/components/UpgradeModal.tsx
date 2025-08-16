import { Lock, X } from "lucide-react";

const UpgradeModal = ({ setShowUpgradeModal }: { setShowUpgradeModal: any }) => {

    return (
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
    );
};

export default UpgradeModal;