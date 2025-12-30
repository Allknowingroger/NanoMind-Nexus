import React, { useState } from 'react';
import { generateResearchReport } from './services/geminiService';
import { ResearchReport } from './types';
import ReportView from './components/ReportView';
import { NeonButton, LoadingSpinner, Card } from './components/UIComponents';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [focusArea, setFocusArea] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const suggestions = [
    'Medical Nanobots', 
    'Quantum Computing Materials', 
    'AI-driven Drug Discovery', 
    'Self-assembling Structures',
    'Neuromorphic Interfaces',
    'Molecular Data Storage'
  ];

  const fetchReport = async (topic: string) => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const data = await generateResearchReport(topic);
      setReport(data);
    } catch (err) {
      console.error(err);
      setError("Failed to initialize neural link with Gemini Grid. Please check API Key and connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    fetchReport(focusArea || "Medical Nanobots & Neuromorphic Interfaces");
  };

  const handleRandomize = () => {
    const randomTopic = suggestions[Math.floor(Math.random() * suggestions.length)];
    setFocusArea(randomTopic);
    fetchReport(randomTopic);
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(focusArea.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-bg text-slate-800 selection:bg-neon-blue selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-neon-blue to-neon-purple rounded shadow-[0_0_10px_rgba(14,165,233,0.3)]"></div>
              <span className="font-mono font-bold text-xl tracking-tighter text-slate-900">
                NANOMIND<span className="text-neon-blue">_NEXUS</span>
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400 hidden md:block uppercase tracking-widest font-bold">
              SYSTEM: GEMINI-3-PRO // STATUS: <span className="text-emerald-500">ONLINE</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Intro / Controls */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            Forecasting the Convergence
          </h1>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">
            Predicting synergistic breakthroughs at the intersection of AI and Nanotechnology 
            using the Deep Thinking architecture of Gemini 3.
          </p>

          <Card className="bg-white/50 backdrop-blur-sm max-w-xl mx-auto p-6 border-slate-200 shadow-xl">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start relative z-20">
                <div className="relative flex-1 w-full group">
                  <input
                    type="text"
                    placeholder="Enter focus (e.g., 'Targeted Oncology')"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/10 transition-all font-mono text-sm pr-10"
                    autoComplete="off"
                  />
                  {/* Chevron Icon */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-neon-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  {(showDropdown && filteredSuggestions.length > 0) && (
                    <ul className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-200">
                      {filteredSuggestions.map((topic) => (
                        <li 
                          key={topic}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setFocusArea(topic);
                            setShowDropdown(false);
                          }}
                          className="px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 hover:text-neon-blue cursor-pointer transition-colors border-b border-slate-100 last:border-0 font-mono flex items-center gap-2 group/item font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/item:bg-neon-blue transition-colors"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <NeonButton onClick={handleGenerate} disabled={loading}>
                    {loading ? 'Processing...' : 'Initialize'}
                  </NeonButton>
                  
                  <button
                    onClick={handleRandomize}
                    disabled={loading}
                    className="px-3.5 py-3 border border-slate-200 bg-white text-neon-purple hover:bg-neon-purple/5 hover:border-neon-purple/50 transition-all duration-300 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group/rnd"
                    title="Random Protocol"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover/rnd:rotate-180 transition-transform duration-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="text-xs font-mono text-slate-400 text-left pl-1 font-bold">
                <span className="text-neon-blue">TIP:</span> SELECT PROTOCOL OR INITIALIZE CUSTOM EXTRAPOLATION.
              </div>
            </div>
          </Card>
        </div>

        {/* Output Area */}
        <div className="min-h-[400px]">
          {error && (
             <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center font-mono text-sm shadow-sm">
               <span className="font-bold">SYSTEM ERROR:</span> {error}
             </div>
          )}

          {loading && <LoadingSpinner />}

          {!loading && report && (
            <ReportView report={report} />
          )}

          {!loading && !report && !error && (
            <div className="text-center mt-20 opacity-20">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-48 h-48 mx-auto mb-4 text-slate-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
              </svg>
              <p className="font-mono text-lg text-slate-400 font-bold tracking-widest">AWAITING INPUT PARAMETERS</p>
            </div>
          )}
        </div>

      </main>

      <footer className="border-t border-slate-200 mt-20 py-10 bg-white text-center">
        <p className="text-slate-400 text-xs font-mono font-bold tracking-widest">
          POWERED BY GEMINI 3 PRO PREVIEW &bull; ARCHITECTED FOR R&D EXTRAPOLATION &bull; MMXXV
        </p>
      </footer>
    </div>
  );
};

export default App;