import React from 'react';
import { ResearchReport } from '../types';
import { SectionHeader, Card } from './UIComponents';

interface ReportViewProps {
  report: ResearchReport;
}

const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Section 1: Convergence Points */}
      <section>
        <SectionHeader 
          title="Current SOTA Convergence" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.convergencePoints.map((point, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-white to-blue-50/30 border-l-4 border-l-neon-purple">
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{point}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Deep Think Hypotheses */}
      <section>
        <SectionHeader 
          title="Deep Think Synergies" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          }
        />
        <div className="space-y-12">
          {report.hypotheses.map((hypothesis, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple opacity-20 group-hover:opacity-40 blur transition duration-500 rounded-lg"></div>
              <Card className="relative bg-white overflow-hidden shadow-xl border-slate-100">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Index & Image Column */}
                    <div className="flex flex-col gap-4 md:w-1/3 min-w-[200px]">
                      <div className="flex items-baseline gap-4 border-b border-slate-100 pb-2">
                         <span className="text-5xl font-mono font-bold text-slate-100">0{idx + 1}</span>
                         <span className="text-xs font-mono text-neon-blue tracking-widest uppercase font-bold">Hypothesis</span>
                      </div>
                      
                      {hypothesis.imageUrl && (
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm group-hover:border-neon-blue/30 transition-colors duration-500">
                          <img 
                            src={hypothesis.imageUrl} 
                            alt={hypothesis.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                      )}

                      {/* Data Sources / Links */}
                      {hypothesis.references && hypothesis.references.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2 font-bold">
                             <span className="w-1.5 h-1.5 bg-neon-blue rounded-full"></span> Data Sources
                          </h4>
                          <ul className="space-y-2">
                            {hypothesis.references.map((ref, rIdx) => (
                              <li key={rIdx} className="truncate">
                                <a 
                                  href={ref.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-slate-500 hover:text-neon-blue transition-colors flex items-center gap-2 group/link"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                  </svg>
                                  <span className="truncate max-w-[200px] font-medium">{ref.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6 font-mono">
                          {hypothesis.title}
                      </h3>
                      <div className="text-slate-700 leading-relaxed font-normal whitespace-pre-line text-justify space-y-4">
                        {hypothesis.analysis}
                      </div>
                    </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Challenges & Ethics */}
      <section>
        <SectionHeader 
          title="Implications & Barriers" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-red-100 bg-red-50/50 shadow-none">
            <h3 className="text-red-600 font-mono font-bold mb-4 uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]"></span>
                Technical Hurdles
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line font-medium">
              {report.challenges.technical}
            </p>
          </Card>
          
          <Card className="border-amber-100 bg-amber-50/50 shadow-none">
            <h3 className="text-amber-700 font-mono font-bold mb-4 uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]"></span>
                Ethical Implications
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line font-medium">
              {report.challenges.ethical}
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ReportView;