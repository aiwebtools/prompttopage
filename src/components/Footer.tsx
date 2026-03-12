
import React from 'react';
import { Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cyber-black border-t border-cyber-blue/20 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold cyber-text">Prompt<span className="text-white">2</span>Page</h3>
            <p className="text-gray-400 max-w-xs">
              Turn AI product descriptions into stunning, 
              dark-themed, cyberpunk-style landing pages instantly.
            </p>
            <div className="pt-2">
              <Button 
                className="cyber-button rounded-full px-6"
                onClick={() => window.open('https://aiwebtools.lovable.app/?via=aiwebtools', '_blank')}
              >
                <span className="mr-2">More AI Tools</span>
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#top" className="text-gray-400 hover:text-cyber-blue transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-cyber-blue transition duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-gray-400 hover:text-cyber-blue transition duration-200">
                  Disclaimer
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.lovable.app/?via=aiwebtools" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-cyber-blue transition duration-200"
                >
                  More AI Tools
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <div className="space-y-2">
              <a 
                href="tel:+14758008096" 
                className="flex items-center text-gray-400 hover:text-cyber-blue transition duration-200"
              >
                <Phone size={16} className="mr-2" />
                (475) 800-8096
              </a>
              <a 
                href="mailto:Contact@ai-webtools.com" 
                className="flex items-center text-gray-400 hover:text-cyber-blue transition duration-200"
              >
                <Mail size={16} className="mr-2" />
                Contact@ai-webtools.com
              </a>
            </div>
            
            <div className="pt-4 space-y-2">
              <a 
                href="https://aiwebtools.ai/terms-of-services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-gray-400 hover:text-cyber-blue transition duration-200"
              >
                Terms of Service
              </a>
              <a 
                href="https://openai.com/policies/privacy-policy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-gray-400 hover:text-cyber-blue transition duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {currentYear} AI WEB TOOLS LLC. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-cyber-blue transition duration-200"
            >
              Presented by AiWebTools.Ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
