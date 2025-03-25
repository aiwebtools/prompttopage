
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
}

export const ChatHeader = ({ title }: ChatHeaderProps) => {
  return (
    <div className="chat-header bg-cyber-blue/20 p-3 flex items-center border-b border-cyber-blue/30">
      <MessageSquare className="text-cyber-blue mr-2" size={20} />
      <h3 className="text-lg font-semibold text-white">{title} Assistant</h3>
    </div>
  );
};
