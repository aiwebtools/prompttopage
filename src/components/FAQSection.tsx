
import React from 'react';
import { Card } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently <span className="cyber-text">Asked</span> Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-cyber-blue/20">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-xl font-medium text-white mb-3 flex items-start">
                <span className="bg-cyber-blue/10 text-cyber-blue w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </span>
                {faq.question}
              </h3>
              <div className="pl-11">
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
