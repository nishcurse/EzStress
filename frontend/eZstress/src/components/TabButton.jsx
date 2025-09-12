import React from "react";
import { FileCode2 } from "lucide-react";

const TabButton = ({ title, isActive, onClick }) => {
  return (
    <button
      className={`
        relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ease-out
        border backdrop-blur-sm
        flex items-center gap-2 min-w-fit whitespace-nowrap
        ${!isActive ? 
          'bg-neutral-800/40 text-neutral-400 border-neutral-700/30 hover:bg-neutral-700/60 hover:text-neutral-200 hover:border-neutral-600/40 hover:shadow-lg hover:shadow-neutral-900/20 hover:scale-[1.02]' 
          : 
          'bg-white/80 text-blue border-neutral-500/40 shadow-lg shadow-blue-900/30 scale-[1.02] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-neutral-600/90 before:to-white-700/90 before:-z-10'
        }
      `}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <FileCode2 
          size={14} 
          className={`transition-colors duration-200 ${
            isActive ? "text-white" : "text-neutral-500"
          }`}
        />
        {title}
      </span>
    </button>
  );
};

export default TabButton;