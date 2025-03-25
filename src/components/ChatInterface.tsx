
import React from 'react';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { ChatInput } from './chat/ChatInput';
import { useChat } from '@/hooks/useChat';

interface ChatInterfaceProps {
  apiKey: string;
  instructions: string;
  productInfo?: {
    name: string;
    description: string;
  };
}

export const ChatInterface = ({ 
  apiKey, 
  instructions, 
  productInfo = { name: 'AI Assistant', description: 'An intelligent assistant ready to help you.' } 
}: ChatInterfaceProps) => {
  const { messages, isLoading, sendMessage } = useChat({
    apiKey,
    instructions,
    productInfo
  });
  
  return (
    <div className="cyberpunk-chat-container glass-panel p-0 flex flex-col h-[500px]">
      <ChatHeader title={productInfo.name} />
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};
