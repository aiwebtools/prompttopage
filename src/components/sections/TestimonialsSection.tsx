
import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-cyber-grid bg-repeat opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-cyber-blue/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyber-blue/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="cyber-text">User</span> Testimonials
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What our users are saying about their experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="cyber-card border-cyber-blue/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple opacity-10 blur-xl"></div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < testimonial.rating ? 'text-cyber-blue' : 'text-gray-600'}`} 
                      fill={i < testimonial.rating ? '#00f0ff' : 'transparent'} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
                
                <div className="pt-4">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
