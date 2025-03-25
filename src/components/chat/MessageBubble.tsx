
import React from 'react';
import { Zap, User } from 'lucide-react';

export interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-[80%] rounded-lg p-3 
        ${isUser 
          ? 'bg-cyber-magenta/20 border border-cyber-magenta/30 ml-auto' 
          : 'bg-cyber-blue/20 border border-cyber-blue/30 mr-auto'
        }
      `}>
        <div className="flex items-center mb-1">
          {isUser 
            ? <User size={16} className="text-cyber-magenta mr-1" />
            : <Zap size={16} className="text-cyber-blue mr-1" />
          }
          <span className={`text-xs ${isUser ? 'text-cyber-magenta' : 'text-cyber-blue'}`}>
            {isUser ? 'You' : 'Assistant'}
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
  );
};
