
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerSectionProps {
  disclaimer: string;
}

export const DisclaimerSection = ({ disclaimer }: DisclaimerSectionProps) => {
  return (
    <section id="disclaimer" className="py-16 bg-cyber-black/60">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start mb-6">
            <AlertTriangle size={24} className="text-cyber-magenta flex-shrink-0 mr-4 mt-1" />
            <h2 className="text-2xl font-bold text-white">Legal Disclaimer</h2>
          </div>
          
          <div className="cyber-card">
            <p className="text-gray-400 leading-relaxed">
              {disclaimer}
            </p>
            
            <div className="mt-6 pt-6 border-t border-cyber-blue/20 flex flex-wrap gap-4">
              <a 
                href="https://aiwebtools.lovable.app/?via=aiwebtools" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyber-blue hover:underline"
              >
                Terms of Service
              </a>
              <span className="text-gray-600">•</span>
              <a 
                href="https://openai.com/policies/privacy-policy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyber-blue hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
