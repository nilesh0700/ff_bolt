"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, BarChart3, Target, TrendingUp, Menu, User, Bot, Sparkles } from 'lucide-react';
import Avatar from '@/components/Avatar';
import { mockApi } from '@/lib/mockApi';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'future_self' | 'ai_assistant';
  timestamp: Date;
  futureAge?: number;
}

interface ChatInterfaceProps {
  user: any;
  userProfile: any;
  connectedAccounts: string[];
  onNavigate: (screen: string) => void;
}

export default function ChatInterface({ user, userProfile, connectedAccounts, onNavigate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hey there! I'm your ${userProfile.futureAge}-year-old self. I've been looking at your Fi Money data and I'm excited to help you make some great financial decisions! What's on your mind?`,
      sender: 'future_self',
      timestamp: new Date(),
      futureAge: userProfile.futureAge
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsAnalyzing(true);

    try {
      // Simulate analyzing data
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAnalyzing(false);

      const response = await mockApi.sendChatMessage(inputMessage, userProfile);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: response.sender,
        timestamp: new Date(),
        futureAge: response.futureAge
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const getSenderInfo = (message: Message) => {
    switch (message.sender) {
      case 'user':
        return {
          name: 'You',
          avatar: user.avatar,
          bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
          textColor: 'text-white',
          bubbleColor: 'bg-gradient-to-r from-blue-500 to-indigo-600'
        };
      case 'future_self':
        return {
          name: `Future You (${message.futureAge})`,
          avatar: null,
          bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
          textColor: 'text-black',
          bubbleColor: 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30'
        };
      case 'ai_assistant':
        return {
          name: 'AI Assistant',
          avatar: null,
          bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600',
          textColor: 'text-white',
          bubbleColor: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30'
        };
      default:
        return {
          name: 'Unknown',
          avatar: null,
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          bubbleColor: 'bg-gray-100'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => onNavigate('landing')}
                variant="ghost"
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Future Self Chat</h1>
                  <p className="text-sm text-slate-600">Talking with your {userProfile.futureAge}-year-old self</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => onNavigate('scenarios')}
                variant="outline"
                className="hidden md:flex items-center space-x-2 rounded-2xl"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Scenarios</span>
              </Button>
              <Button 
                onClick={() => onNavigate('actions')}
                variant="outline"
                className="hidden md:flex items-center space-x-2 rounded-2xl"
              >
                <Target className="w-4 h-4" />
                <span>Actions</span>
              </Button>
              <Button 
                onClick={() => onNavigate('progress')}
                variant="outline"
                className="hidden md:flex items-center space-x-2 rounded-2xl"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Progress</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6 mb-6">
          {messages.map((message) => {
            const senderInfo = getSenderInfo(message);
            const isUser = message.sender === 'user';
            
            return (
              <div key={message.id} className={`flex items-start space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${senderInfo.bgColor}`}>
                  {message.sender === 'user' ? (
                    senderInfo.avatar ? (
                      <img src={senderInfo.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )
                  ) : message.sender === 'future_self' ? (
                    <div className="text-black font-bold text-sm">{message.futureAge}</div>
                  ) : (
                    <Bot className="w-6 h-6 text-white" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`max-w-2xl ${isUser ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold text-slate-700">{senderInfo.name}</span>
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className={`glass-effect rounded-3xl px-6 py-4 ${senderInfo.bubbleColor} ${senderInfo.textColor}`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Loading/Analyzing State */}
          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-black font-bold text-sm">{userProfile.futureAge}</div>
              </div>
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-semibold text-slate-700">Future You ({userProfile.futureAge})</span>
                </div>
                <div className="glass-effect rounded-3xl px-6 py-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30">
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-slate-700">Analyzing your {connectedAccounts.join(' & ')} data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-slate-700">Thinking...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your future self anything about money..."
                className="h-14 pr-16 rounded-3xl border-2 border-slate-200 focus:border-indigo-500 bg-white text-base"
                disabled={isLoading}
              />
              <Button
                onClick={toggleVoice}
                variant="ghost"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full ${
                  isVoiceActive ? 'bg-red-100 text-red-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <p className="text-xs text-slate-500 text-center max-w-2xl">
              Your future self has access to your {connectedAccounts.join(' & ')} data to provide personalized advice. 
              All conversations are private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}