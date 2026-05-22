'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import Fuse from 'fuse.js';
import knowledgeBase from '@/lib/knowledge_base.json';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', role: 'assistant', content: 'Hello! I am the AI assistant for this portfolio. Ask me about the Brain Tumor Segmentation project, DRDO research, or my tech stack!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fuse = new Fuse(knowledgeBase, {
    keys: ['keywords', 'title', 'category'],
    threshold: 0.4,
    includeScore: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate network/thinking delay
    setTimeout(() => {
      const results = fuse.search(userMsg);
      let reply = "I'm not exactly sure about that. Try asking about the Brain Tumor Segmentation project, my work at DRDO, or my AI/ML tech stack!";
      
      if (results.length > 0) {
        reply = results[0].item.response;
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_var(--accent-glow-strong)] z-40 bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-cyan-500)] text-white ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-full max-w-[360px] h-[500px] max-h-[80vh] glass-strong rounded-2xl flex flex-col shadow-2xl z-50 border border-[var(--color-border-glow)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-base)]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-glow-strong)] flex items-center justify-center text-[var(--color-blue-400)]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">Portfolio AI</h3>
                  <p className="text-xs text-[var(--color-blue-400)]">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-blue-600)] text-white rounded-br-sm'
                      : 'bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-text-secondary rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl rounded-bl-sm p-4 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-400)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-400)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-400)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--color-border)] bg-[var(--color-bg-base)]/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills..."
                  className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full py-2.5 pl-4 pr-12 text-sm text-text-primary focus:outline-none focus:border-[var(--color-blue-500)] transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-blue-500)] text-white disabled:opacity-50 transition-opacity"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
