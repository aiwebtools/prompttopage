
import React from 'react';
import { Home, MessageSquare, AlertTriangle, ExternalLink, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-sm animate-pulse-glow">
              <div className="absolute inset-0.5 bg-cyber-black rounded-sm flex items-center justify-center">
                <span className="text-cyber-blue font-bold text-xs">P2P</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">Prompt<span className="cyber-text">2</span>Page</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Button 
              variant="ghost" 
              className="text-white hover:text-cyber-blue" 
              onClick={() => scrollToSection('top')}
            >
              <Home size={18} className="mr-2" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-cyber-blue" 
              onClick={() => scrollToSection('faq')}
            >
              <MessageSquare size={18} className="mr-2" />
              FAQ
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-cyber-blue" 
              onClick={() => scrollToSection('disclaimer')}
            >
              <AlertTriangle size={18} className="mr-2" />
              Disclaimer
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-cyber-blue"
              onClick={() => window.open('https://aiwebtools.lovable.app/?via=aiwebtools', '_blank')}
            >
              <ExternalLink size={18} className="mr-2" />
              More AI Tools
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-white active:scale-95 transition-transform duration-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-panel px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-cyber-blue active:scale-[0.98] transition-transform" 
            onClick={() => scrollToSection('top')}
          >
            <Home size={18} className="mr-2" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-cyber-blue active:scale-[0.98] transition-transform" 
            onClick={() => scrollToSection('faq')}
          >
            <MessageSquare size={18} className="mr-2" />
            FAQ
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-cyber-blue active:scale-[0.98] transition-transform" 
            onClick={() => scrollToSection('disclaimer')}
          >
            <AlertTriangle size={18} className="mr-2" />
            Disclaimer
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-cyber-blue active:scale-[0.98] transition-transform"
            onClick={() => window.open('https://aiwebtools.lovable.app/?via=aiwebtools', '_blank')}
          >
            <ExternalLink size={18} className="mr-2" />
            More AI Tools
          </Button>
        </div>
      </div>
    </header>
  );
};
