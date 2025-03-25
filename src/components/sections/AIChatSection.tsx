
import React from 'react';
import { Card } from "@/components/ui/card";
import { ChatInterface } from '../ChatInterface';

interface AIChatSectionProps {
  title: string;
  description: string;
  apiKey: string;
  instructions: string;
}

export const AIChatSection = ({ title, description, apiKey, instructions }: AIChatSectionProps) => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="cyber-text">AI</span> Assistant
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Chat with our intelligent assistant to learn more
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="cyber-card h-[500px] border-cyber-blue/20">
            <ChatInterface 
              apiKey={apiKey} 
              instructions={instructions} 
              productInfo={{
                name: title,
                description: description
              }}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};
