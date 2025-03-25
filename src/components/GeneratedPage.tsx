
import React from 'react';
import { YouTubeEmbed } from './YouTubeEmbed';
import { Logo } from './Logo';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Download, Copy, MessageSquare, Users, Zap, AlertTriangle, Star } from 'lucide-react';
import { toast } from "sonner";
import { ChatInterface } from './ChatInterface';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface GeneratedContent {
  title: string;
  subtitle: string;
  description: string;
  callToAction: string;
  features: {
    title: string;
    description: string;
  }[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  disclaimer: string;
}

interface GeneratedPageProps {
  content: GeneratedContent;
  youtubeUrl: string;
  userApiKey?: string;
  aiInstructions?: string;
}

export const GeneratedPage = ({ content, youtubeUrl, userApiKey, aiInstructions }: GeneratedPageProps) => {
  const handleCopyHtml = () => {
    const pageElement = document.getElementById('generated-page');
    
    if (pageElement) {
      const htmlContent = pageElement.outerHTML;
      navigator.clipboard.writeText(htmlContent)
        .then(() => toast.success("HTML copied to clipboard!"))
        .catch(() => toast.error("Failed to copy HTML"));
    }
  };
  
  const handleDownload = () => {
    toast("Download feature coming soon!");
  };
  
  return (
    <div className="w-full">
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <Button 
          onClick={handleCopyHtml} 
          className="cyber-button rounded-full shadow-neon-blue"
          aria-label="Copy HTML"
        >
          <Copy size={18} className="mr-2" />
          Copy HTML
        </Button>
        <Button 
          onClick={handleDownload} 
          className="cyber-button rounded-full shadow-neon-blue"
          aria-label="Download"
        >
          <Download size={18} className="mr-2" />
          Download
        </Button>
      </div>
      
      <div id="generated-page" className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-cyber-grid bg-repeat opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyber-blue/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyber-black to-transparent"></div>
            
            {/* Animated elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyber-blue rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-cyber-purple rounded-full filter blur-[120px] opacity-15 animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyber-magenta rounded-full filter blur-[80px] opacity-20 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 py-16 z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 space-y-8 animate-fade-in">
                <div className="inline-block">
                  <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full text-cyber-blue text-sm">
                    AI-Powered Tool
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">{content.title}</span>
                  <span className="cyber-text"> {content.subtitle}</span>
                </h1>
                
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
                  {content.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="cyber-button text-lg py-6 px-8">
                    {content.callToAction}
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-1/2 max-w-2xl mx-auto">
                {youtubeUrl ? (
                  <YouTubeEmbed url={youtubeUrl} />
                ) : (
                  <Logo name={content.title} />
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Chat Interface Section (if API key is provided) */}
        {userApiKey && (
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
                    apiKey={userApiKey} 
                    instructions={aiInstructions || ''} 
                    productInfo={{
                      name: content.title,
                      description: content.description
                    }}
                  />
                </Card>
              </div>
            </div>
          </section>
        )}
        
        {/* Features Section */}
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
              {content.features.map((feature, index) => (
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
        
        {/* Testimonials Section */}
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
              {content.testimonials.map((testimonial, index) => (
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
        
        {/* FAQ Section */}
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
              {content.faqs.map((faq, index) => (
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
        
        {/* Disclaimer Section */}
        <section id="disclaimer" className="py-16 bg-cyber-black/60">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start mb-6">
                <AlertTriangle size={24} className="text-cyber-magenta flex-shrink-0 mr-4 mt-1" />
                <h2 className="text-2xl font-bold text-white">Legal Disclaimer</h2>
              </div>
              
              <div className="cyber-card">
                <p className="text-gray-400 leading-relaxed">
                  {content.disclaimer}
                </p>
                
                <div className="mt-6 pt-6 border-t border-cyber-blue/20 flex flex-wrap gap-4">
                  <a 
                    href="https://aiwebtools.ai/terms-of-services" 
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
      </div>
    </div>
  );
};
