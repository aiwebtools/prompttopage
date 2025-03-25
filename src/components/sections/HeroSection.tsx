
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { YouTubeEmbed } from '../YouTubeEmbed';
import { Logo } from '../Logo';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  callToAction: string;
  youtubeUrl: string;
}

export const HeroSection = ({ title, subtitle, description, callToAction, youtubeUrl }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-cyber-grid bg-repeat opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyber-purple/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyber-black to-transparent"></div>
        
        {/* Shooting stars background */}
        <div className="stars-container">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index} 
              className="shooting-star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${6 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-cyber-purple text-sm">
                AI-Powered Tool
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">{title}</span>
              <span className="cyber-text"> {subtitle}</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="cyber-button text-lg py-6 px-8">
                {callToAction}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 max-w-2xl mx-auto">
            {youtubeUrl ? (
              <YouTubeEmbed url={youtubeUrl} />
            ) : (
              <Logo name={title} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
