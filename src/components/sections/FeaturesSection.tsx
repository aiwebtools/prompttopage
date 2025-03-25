
import React from 'react';
import { Card } from "@/components/ui/card";
import { MessageSquare, Users, Zap } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="cyber-text">Key</span> Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your workflow with these powerful capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="cyber-card h-full border-cyber-blue/20 transition-all duration-300 hover:border-cyber-blue/50 hover:-translate-y-1">
              <div className="p-6 h-full flex flex-col">
                <div className="mb-6">
                  {index % 3 === 0 && <Zap size={32} className="text-cyber-blue" />}
                  {index % 3 === 1 && <MessageSquare size={32} className="text-cyber-purple" />}
                  {index % 3 === 2 && <Users size={32} className="text-cyber-magenta" />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 flex-grow">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
