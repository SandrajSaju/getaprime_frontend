import React, { useState, useEffect } from "react";

interface ToastSuccessProps {
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastSuccessProps> = ({ type, title, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation before closing
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const typeClasses = {
    success: "border-green-500 text-green-500",
    error: "border-red-500 text-red-500",
    info: "border-blue-500 text-blue-500",
    warning: "border-yellow-500 text-yellow-500",
  };

  const iconClasses = {
    success: (
      <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938-5.972a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
      </svg>
    )
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed top-4 right-4 transition-all duration-300 ease-in-out transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`flex items-center justify-center p-4 mb-4 bg-white rounded-lg shadow border-l-4 ${typeClasses[type]} w-96 h-24 relative`}>
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 ${typeClasses[type]} rounded-full bg-white border border-solid`}>
          {iconClasses[type]}
          <span className="sr-only">{type} icon</span>
        </div>
        <div className="ml-4 flex-1 overflow-hidden flex flex-col">
          <p className="font-medium text-gray-900 truncate w-full">{title}</p>
          <p className="text-sm text-gray-500 h-12 overflow-y-auto pr-2 w-full">
            {message}
          </p>
        </div>
        <div className="absolute top-2 right-2">
          <button
            type="button"
            className="bg-transparent text-gray-400 hover:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 p-1.5 transition-colors duration-200"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;