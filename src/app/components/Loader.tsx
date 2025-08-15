"use client";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        {/* Loading text */}
        <p className="mt-4 text-gray-700 text-lg font-medium">{text}</p>
      </div>
    </div>
  );
}