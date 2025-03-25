
import React from 'react';
import { Zap } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg p-3 bg-cyber-blue/20 border border-cyber-blue/30">
        <div className="flex items-center">
          <Zap size={16} className="text-cyber-blue mr-1" />
          <span className="text-xs text-cyber-blue">Assistant</span>
        </div>
        <div className="text-white mt-1">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
