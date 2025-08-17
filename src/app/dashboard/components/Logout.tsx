// components/SideNav.tsx
import React, { useEffect, useState } from "react";

interface LogoutModalProps {
    handleLogout: () => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ handleLogout, setIsModalOpen }) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setIsModalOpen(false)}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside it
            >
                <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <p className="mb-4">Are you sure you want to logout?</p>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;