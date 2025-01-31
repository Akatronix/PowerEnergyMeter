import React from "react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg bg-opacity-50 flex flex-col items-center w-[200px]">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
