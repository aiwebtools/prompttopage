
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, User, Zap } from 'lucide-react';
import { toast } from "sonner";

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  apiKey: string;
  instructions: string;
  productInfo?: {
    name: string;
    description: string;
  };
}

export const ChatInterface = ({ apiKey, instructions, productInfo = { name: 'AI Assistant', description: 'An intelligent assistant ready to help you.' } }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial message from assistant
  useEffect(() => {
    setMessages([
      {
        content: `Hi there! I'm an AI assistant for ${productInfo.name}. How can I help you today?`,
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
  }, [productInfo.name]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      content: input.trim(),
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const systemPrompt = `You are an AI assistant for ${productInfo.name}. ${instructions}
      
Here is information about the product to help you answer questions:
Product Name: ${productInfo.name}
Product Description: ${productInfo.description}

Answer as helpfully and accurately as possible based on the above information. If you don't know something, admit it rather than making up information.`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get a response from the AI');
      }
      
      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      
      setMessages(prev => [
        ...prev,
        {
          content: assistantResponse,
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error("Failed to get a response. Please check your API key and try again.");
      
      setMessages(prev => [
        ...prev,
        {
          content: "I'm sorry, there was an error processing your request. Please try again later or check the API key.",
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div className="cyberpunk-chat-container glass-panel p-0 flex flex-col h-[500px]">
      <div className="chat-header bg-cyber-blue/20 p-3 flex items-center border-b border-cyber-blue/30">
        <MessageSquare className="text-cyber-blue mr-2" size={20} />
        <h3 className="text-lg font-semibold text-white">{productInfo.name} Assistant</h3>
      </div>
      
      <div className="chat-messages flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[80%] rounded-lg p-3 
              ${message.role === 'user' 
                ? 'bg-cyber-magenta/20 border border-cyber-magenta/30 ml-auto' 
                : 'bg-cyber-blue/20 border border-cyber-blue/30 mr-auto'
              }
            `}>
              <div className="flex items-center mb-1">
                {message.role === 'assistant' 
                  ? <Zap size={16} className="text-cyber-blue mr-1" />
                  : <User size={16} className="text-cyber-magenta mr-1" />
                }
                <span className={`text-xs ${message.role === 'user' ? 'text-cyber-magenta' : 'text-cyber-blue'}`}>
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
              <div className="text-white whitespace-pre-wrap">
                {message.content}
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-cyber-blue/20 border border-cyber-blue/30">
              <div className="flex items-center">
                <Zap size={16} className="text-cyber-blue mr-1" />
                <span className="text-xs text-cyber-blue">Assistant</span>
              </div>
              <div className="text-white mt-1">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input border-t border-cyber-blue/30 p-3">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow mr-2 cyber-input"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()} 
            className="cyber-button flex items-center justify-center"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
