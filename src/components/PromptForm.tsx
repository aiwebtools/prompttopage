
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle, Youtube, Key, MessageSquare } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PromptFormProps {
  onGenerate: (prompt: string, youtubeUrl: string, userApiKey?: string, aiInstructions?: string, enableAiAgent?: boolean) => Promise<void>;
  isGenerating: boolean;
}

export const PromptForm = ({ onGenerate, isGenerating }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [userApiKey, setUserApiKey] = useState('');
  const [aiInstructions, setAiInstructions] = useState('');
  const [enableAiAgent, setEnableAiAgent] = useState(false);
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

    if (enableAiAgent && !userApiKey.trim()) {
      setError('Please enter your OpenAI API key to enable the AI agent');
      return;
    }
    
    setError('');
    onGenerate(prompt, youtubeUrl, userApiKey, aiInstructions, enableAiAgent)
      .catch(err => {
        console.error('Generation error:', err);
        toast.error("Failed to generate page. Please try again.");
      });
  };
  
  return (
    <Card className="cyber-card max-w-3xl mx-auto">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="basic">Basic Setup</TabsTrigger>
          <TabsTrigger value="advanced">Advanced AI Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
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
        </TabsContent>

        <TabsContent value="advanced">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-ai" 
                  checked={enableAiAgent} 
                  onCheckedChange={setEnableAiAgent}
                  disabled={isGenerating}
                />
                <Label htmlFor="enable-ai" className="text-lg font-medium text-white">
                  Enable Interactive AI Agent on Generated Page
                </Label>
              </div>
              <p className="text-xs text-gray-400 ml-8">
                This will add a chat interface to your landing page where visitors can interact with an AI agent powered by your OpenAI API key.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="api-key" className="block text-lg font-medium text-white flex items-center">
                <Key size={18} className="mr-2 text-cyber-blue" />
                Your OpenAI API Key
              </label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                className="cyber-input font-mono"
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
                disabled={isGenerating || !enableAiAgent}
              />
              <p className="text-xs text-gray-400">
                Your API key is only used in the generated page and isn't stored on our servers.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="ai-instructions" className="block text-lg font-medium text-white flex items-center">
                <MessageSquare size={18} className="mr-2 text-cyber-purple" />
                AI Agent Instructions
              </label>
              <Textarea
                id="ai-instructions"
                placeholder="Provide instructions for how your AI agent should behave (e.g. 'Act as a helpful assistant for our AI video editing tool. Answer questions about features, pricing, and help troubleshoot common issues.')"
                className="cyber-input h-32"
                value={aiInstructions}
                onChange={(e) => setAiInstructions(e.target.value)}
                disabled={isGenerating || !enableAiAgent}
              />
              <p className="text-xs text-gray-400">
                These instructions will guide how the AI responds to user queries on your landing page.
              </p>
            </div>

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
              <label htmlFor="youtube-advanced" className="block text-lg font-medium text-white flex items-center">
                <Youtube size={18} className="mr-2 text-cyber-magenta" />
                YouTube Video URL (Optional)
              </label>
              <Input
                id="youtube-advanced"
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
                    Generating Your Page with AI Agent...
                  </>
                ) : (
                  'Generate Interactive AI Landing Page'
                )}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
