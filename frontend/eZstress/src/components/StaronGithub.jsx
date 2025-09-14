import { Star, Github } from "lucide-react";
import { useState } from "react";

export function StarOnGitHub({ 
  href = "https://github.com/", 
  children = "Star on GitHub", 
  showCount = false,
  starCount = 1337
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const githubUrl = href.startsWith('http') ? href : `https://github.com/${href}`;

  return (
    <a 
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative overflow-hidden text-xs px-3 py-1.5 gap-1.5
        inline-flex items-center justify-center rounded-md font-medium
        bg-gray-900 border border-gray-700 text-gray-100
        hover:bg-gray-800 transition-all duration-300 ease-out
        hover:shadow-lg hover:border-yellow-400/40 no-underline
        ${isHovered ? 'scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* GitHub icon */}
      <Github 
        size={14} 
        className="relative z-10 transition-transform duration-300 group-hover:scale-110" 
      />
      
      {/* Star icon */}
      <Star 
        size={14} 
        className={`
          relative z-10 transition-all duration-300 
          group-hover:fill-yellow-400 group-hover:text-yellow-400
          ${isHovered ? 'animate-pulse' : ''}
        `}
      />
      
      {/* Text */}
      <span className="relative z-10 font-medium">
        {children}
      </span>
      
      {/* Star count */}
      {showCount && (
        <span className="relative z-10 px-2 py-0.5 bg-gray-800 rounded-full text-xs border border-gray-700">
          {starCount.toLocaleString()}
        </span>
      )}
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg" />
    </a>
  );
}
