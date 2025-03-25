
import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PromptForm } from '../components/PromptForm';
import { GeneratedPage } from '../components/GeneratedPage';
import { generateContent } from '../services/openai';
import { toast } from "sonner";

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

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const handleGenerate = async (prompt: string, ytUrl: string) => {
    setIsGenerating(true);
    setYoutubeUrl(ytUrl);
    
    try {
      const content = await generateContent(prompt);
      setGeneratedContent(content);
      toast.success("Landing page generated successfully!");
    } catch (error) {
      console.error('Generation error:', error);
      toast.error("Failed to generate landing page. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div id="top" className="min-h-screen flex flex-col bg-cyber-black text-white">
      <NavBar />
      
      <main className="flex-grow pt-16">
        {!generatedContent ? (
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
              <div className="inline-block mb-6">
                <span className="px-4 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full text-cyber-blue text-sm font-medium">
                  AI-Powered Landing Page Builder
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Prompt</span>
                <span className="cyber-text">2</span>
                <span className="text-white">Page</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform any AI product description into a stunning, 
                cyberpunk-styled landing page with just one prompt.
              </p>
              
              <div className="relative w-24 h-24 mx-auto mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-magenta rounded-full opacity-70 blur-md animate-pulse"></div>
                <div className="absolute inset-3 bg-cyber-black rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold cyber-text">P2P</span>
                </div>
              </div>
            </div>
            
            <PromptForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="glass-panel p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyber-blue">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Describe Your AI Tool</h3>
                <p className="text-gray-400">Enter details about what your AI product does and who it's for</p>
              </div>
              
              <div className="glass-panel p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyber-purple">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Add YouTube Video</h3>
                <p className="text-gray-400">Optionally include a demo video to showcase your product in action</p>
              </div>
              
              <div className="glass-panel p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-magenta/10 border border-cyber-magenta/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyber-magenta">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Your Landing Page</h3>
                <p className="text-gray-400">Preview, download, or copy the HTML code for your new page</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8 md:py-12">
            <GeneratedPage content={generatedContent} youtubeUrl={youtubeUrl} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
