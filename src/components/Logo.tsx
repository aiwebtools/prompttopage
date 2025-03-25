
import React from 'react';

interface LogoProps {
  name: string;
}

export const Logo = ({ name }: LogoProps) => {
  // Extract the first letter of each word for the logo
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2); // Limit to 2 characters
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 animate-float">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-magenta rounded-md opacity-70 blur-sm animate-pulse-glow"></div>
        
        {/* Inner cube */}
        <div className="absolute inset-1 bg-cyber-black rounded-md flex items-center justify-center border border-cyber-blue/30">
          <span className="text-3xl font-bold cyber-text">{initials}</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xl font-bold text-white">{name}</p>
        <a 
          href="https://www.aiwebtools.ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-gray-400 hover:text-cyber-blue transition duration-200"
        >
          Presented by AiWebTools.Ai
        </a>
      </div>
    </div>
  );
};
