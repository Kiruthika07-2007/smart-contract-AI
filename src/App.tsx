/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContractForm } from './components/ContractForm';
import { ContractOutput } from './components/ContractOutput';
import { ContractInputs, LegalAnalysis } from './types';
import { generateLegalDocument } from './services/gemini';
import { Scale, Shield, Gavel, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState<LegalAnalysis | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = async (inputs: ContractInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateLegalDocument(inputs);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">LexiGuard <span className="text-blue-600">AI</span></h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 leading-none">Legal Intelligence Agent</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Templates</a>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
              <Shield className="w-3 h-3 text-green-500" />
              SECURE SESSION
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <ContractForm onSubmit={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-sm text-red-700"
              >
                <Info className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">AI Agent Status</h4>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-sm font-medium text-slate-600">Gemini 3 Flash Preview Active</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Output */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 xl:col-span-8 h-full"
          >
            <ContractOutput analysis={analysis} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 LexiGuard AI. Powered by Google Gemini.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Legal Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

