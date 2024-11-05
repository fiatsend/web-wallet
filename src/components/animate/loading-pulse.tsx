import React from "react";

const LoadingPulse: React.FC = () => {
  return (
    <div className="w-full h-full animate-pulse bg-slate-200 rounded-2xl">
      <div className="flex flex-col h-full justify-center space-y-4 p-4">
        <div className="h-4 bg-slate-300 rounded w-3/4"></div>
        <div className="h-4 bg-slate-300 rounded w-1/2"></div>
        <div className="h-4 bg-slate-300 rounded w-5/6"></div>
        <div className="h-4 bg-slate-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default LoadingPulse;
