
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle, Youtube } from 'lucide-react';
import { toast } from "sonner";

interface PromptFormProps {
  onGenerate: (prompt: string, youtubeUrl: string) => Promise<void>;
  isGenerating: boolean;
}

export const PromptForm = ({ onGenerate, isGenerating }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState('');
  
  const validateYoutubeUrl = (url: string) => {
    if (!url) return true; // Empty is valid
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return url.match(regExp);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a product description');
      return;
    }
    
    if (youtubeUrl && !validateYoutubeUrl(youtubeUrl)) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    onGenerate(prompt, youtubeUrl)
      .catch(err => {
        console.error('Generation error:', err);
        toast.error("Failed to generate page. Please try again.");
      });
  };
  
  return (
    <Card className="cyber-card max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-lg font-medium text-white">
            Describe your AI product or service
          </label>
          <Textarea
            id="prompt"
            placeholder="Enter a description of your AI tool (e.g. what it does, who it's for, key features)"
            className="cyber-input h-32"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-400">
            Be detailed for better results. Include target audience, key features, and benefits.
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="youtube" className="block text-lg font-medium text-white flex items-center">
            <Youtube size={18} className="mr-2 text-cyber-magenta" />
            YouTube Video URL (Optional)
          </label>
          <Input
            id="youtube"
            placeholder="https://www.youtube.com/watch?v=..."
            className="cyber-input"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-400">
            Add a demonstration video to showcase your AI tool in action
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded-md flex items-center">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full cyber-button text-lg py-6"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Your Page...
              </>
            ) : (
              'Generate Cyberpunk Landing Page'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
