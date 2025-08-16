// pages/AccessDenied.tsx
"use client";
import { useRouter } from "next/navigation";

export default function AccessDenied() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-700 mb-6">
                You don't have permission to view this page.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                    Go Back
                </button>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}