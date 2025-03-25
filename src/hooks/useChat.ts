
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatOptions {
  apiKey: string;
  instructions: string;
  productInfo: {
    name: string;
    description: string;
  };
}

export const useChat = ({ apiKey, instructions, productInfo }: ChatOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  const sendMessage = async (userMessage: string) => {
    const userMessageObj = {
      content: userMessage,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessageObj]);
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
            { role: 'user', content: userMessage }
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
  
  return {
    messages,
    isLoading,
    sendMessage
  };
};
