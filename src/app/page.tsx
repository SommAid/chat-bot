'use client';

import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
/**
 * @description The home page of the application with a registration/contact form.
 * @returns {React.ReactElement} The home page component.
 */
export default function Home() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const validForm = formData.firstName && formData.lastName && formData.email;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validForm) {
      const params = new URLSearchParams({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
    
      
      router.push(`/chat?${params.toString()}`);
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <main className="flex justify-center min-h-[calc(100vh-4rem)] p-8 relative overflow-hidden bg-slate-950">
        {/* Subtle Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-950 -z-20"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-200 h-200 bg-slate-900/30 rounded-full blur-3xl -z-10"></div>

        {/* Main Content Grid */}
        <div className="flex flex-col items-center justify-center w-full max-w-5xl z-10 pr-16 md:pr-0">
          <div className="flex flex-col items-center gap-12 w-full">
            
            {/* New Input Section */}
            <div className="w-full max-w-md bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="text-indigo-500 w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-100">User Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Jane"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane.doe@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className={validForm ? "w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition-colors shadow-lg shadow-indigo-900/20" : "w-full mt-2 bg-slate-600 text-slate-400 font-semibold py-2 rounded-lg transition-colors"}
                >
                  Continue
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}