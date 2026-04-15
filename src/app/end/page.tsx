'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, Bot, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EndPageWrapper() {
  return (
    <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <EndPage />
    </Suspense>
  );
}

function EndPage() {
  const searchParams = useSearchParams();

  const firstName = searchParams.get('firstName') || 'User';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';  

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
              </div>
            </div>
          </div>
        </header>

        {/* Ending page message */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center text-center space-y-8">
          
          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot size={32} className="text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Thank you!</h2>
              <h3 className="text-lg font-bold text-white">{firstName} {lastName}</h3>
              <p className="text-slate-400 max-w-xs mx-auto text-md font-medium">
                {email}
              </p>
            </div>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 w-full text-left">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Bot Information</p>
              <div className="space-y-1">
                  <p className="text-sm text-slate-300 font-medium">Developer: Aidan Sommer</p>
                  <p className="text-xs text-slate-500 underline cursor-pointer hover:text-indigo-400 transition-colors">sommerab@mail.uc.edu</p>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}