
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Download } from 'lucide-react';
import { toast } from "sonner";
import { downloadPageAsZip } from '../utils/downloadUtils';
import { HeroSection } from './sections/HeroSection';
import { AIChatSection } from './sections/AIChatSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FAQSection } from './FAQSection';
import { DisclaimerSection } from './DisclaimerSection';
import { Footer } from './Footer';

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
  
  const handleDownload = async () => {
    const pageElement = document.getElementById('generated-page');
    const success = await downloadPageAsZip(pageElement, content.title, userApiKey, aiInstructions);
    
    if (success) {
      toast.success("Downloaded landing page as ZIP! All configurations included.");
    } else {
      toast.error("Failed to download. Please try again.");
    }
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
        <HeroSection 
          title={content.title}
          subtitle={content.subtitle}
          description={content.description}
          callToAction={content.callToAction}
          youtubeUrl={youtubeUrl}
        />
        
        {/* AI Chat Interface Section (if API key is provided) */}
        {userApiKey && (
          <AIChatSection
            title={content.title}
            description={content.description}
            apiKey={userApiKey}
            instructions={aiInstructions || ''}
          />
        )}
        
        {/* Features Section */}
        <FeaturesSection features={content.features} />
        
        {/* Testimonials Section */}
        <TestimonialsSection testimonials={content.testimonials} />
        
        {/* FAQ Section */}
        <FAQSection faqs={content.faqs} />
        
        {/* Disclaimer Section */}
        <DisclaimerSection disclaimer={content.disclaimer} />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
