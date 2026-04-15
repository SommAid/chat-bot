'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageSquare, Send, User, Bot, ChevronLeft, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName') || 'User';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';
  
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi ${firstName}! I'm the system assistant. How can I help you navigate the platform today?` }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const faqs = [
    { q: "Does the college have a football team?", a: "Yes! The University of Cincinnati has a strong football program." },
    { q: "Does it offer a Computer Science major?", a: "Absolutely. The computer science program is a staple of our engineering school (CEAS)." },
    { q: "What is the best dining hall?", a: "Center Couter. While commonly scrutinized, it remains a popular choice among students." },
    { q: "Does it provide on-campus housing?", a: "Yes, on campus housing is available to students." }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      let response = "That's a great question. You might find more details on our website. https://www.uc.edu/";
      const lowerText = text.toLowerCase();

      if (faqs.some(faq => faq.q.toLowerCase() === lowerText)) {
        response = faqs.find(faq => faq.q.toLowerCase() === lowerText)?.a || response;
      }else if (lowerText.includes("hello") || lowerText.includes("hi")) {
        response = `Hey there, ${firstName}! How can I assist you?`;
      } 
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 600);
  };

    const handleExit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      firstName: firstName,
      lastName: lastName,
      email: email
    });
  
    
    router.push(`/end?${params.toString()}`);
    
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex justify-center overflow-hidden">
      <div className="h-full w-full max-w-xl bg-slate-900 flex flex-col border-x border-slate-800 shadow-2xl">
        {/* Header with Exit Button */}
        <header className="bg-indigo-600 p-4 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageSquare size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-none">AI Assistant</h1>
                <p className="text-[10px] text-indigo-100 uppercase tracking-widest mt-1 font-medium italic">
                  Session active: {firstName}
                </p>
              </div>
            </div>
          </div>

          {/* Quick End Session Header Button */}
          <button 
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors flex items-center gap-2"
          >
            <LogOut size={14} />
            End
          </button>
        </header>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex items-end gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                m.role === 'user' ? 'bg-indigo-500' : 'bg-slate-800 border border-slate-700'
              }`}>
                {m.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
              </div>
              
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Footer Area */}
        <footer className="p-4 bg-slate-900 border-t border-slate-800 space-y-4">
          {/* FAQ Labels */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Frequently Asked</span>
            <div className="flex flex-wrap gap-2">
              {faqs.map((faq, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    handleSendMessage(faq.q);
                  }} 
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-all whitespace-nowrap"
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Field */}
          <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-700 focus-within:border-indigo-500/50 transition-all shadow-inner">
            <input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Ask me something..." 
              className="flex-1 bg-transparent px-3 py-2 text-slate-200 text-sm outline-none" 
            />
            <button 
              onClick={() => handleSendMessage(inputValue)} 
              className="bg-indigo-600 hover:bg-indigo-500 p-2.5 rounded-lg text-white transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}