'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Users, Target, BookOpen, ChevronDown, CheckCircle2, Lightbulb, Wrench } from 'lucide-react';
import { bkData } from '@/lib/data';

const iconMap = {
  Brain,
  Users,
  Target,
  BookOpen
};

export default function BKApp() {
  const [activeTab, setActiveTab] = useState<string>('pribadi');
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    setActiveTab(id);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeCategory = bkData.find((c) => c.id === activeTab);

  return (
    <div className="min-h-screen bg-[#7c3aed] text-black font-sans p-4 md:p-8 flex flex-col gap-6 md:h-screen md:overflow-hidden box-border">
      {/* Header */}
      <header className="bg-[#facc15] p-5 md:p-6 mb-2 rounded-2xl border-4 border-black shadow-[6px_6px_0_0_#000] flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-[28px] md:text-[34px] text-black font-black m-0 uppercase tracking-wider" style={{ textShadow: '2px 2px 0 white' }}>
            Sahabat BK
          </h1>
          <p className="text-[13px] md:text-sm font-bold text-slate-800 m-0 mt-1 uppercase">
            Start Your Journey • Level Up Your Future!
          </p>
        </div>
        <div className="bg-white border-4 border-black text-black py-2 px-5 rounded-full text-sm font-black flex items-center gap-2 shadow-[4px_4px_0_0_#000] uppercase animate-pulse">
            <span>🎮</span> 16 Missions
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 flex-1 min-h-0">
        {/* Category Cards */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-2">
          {bkData.map((category) => {
            const Icon = iconMap[category.iconName as keyof typeof iconMap];
            const isActive = activeTab === category.id;
            
            const iconColors: Record<string, string> = {
              pribadi: 'bg-[#f472b6]', // pink-400
              sosial: 'bg-[#fbbf24]', // amber-400
              karir: 'bg-[#38bdf8]', // sky-400
              belajar: 'bg-[#a3e635]'  // lime-400
            };
            
            return (
              <div
                key={category.id}
                onClick={() => handleCardClick(category.id)}
                className={`cursor-pointer p-4 rounded-2xl border-4 border-black flex items-center gap-4 transition-all duration-200 active:translate-y-2 active:shadow-none
                  ${isActive ? 'bg-[#4ade80] shadow-[2px_2px_0_0_#000] translate-y-1' : 'bg-white shadow-[6px_6px_0_0_#000] hover:-translate-y-1'}`}
              >
                <div className={`w-[50px] h-[50px] rounded-xl border-4 border-black flex items-center justify-center shrink-0 text-black shadow-[2px_2px_0_0_#000] ${iconColors[category.id]}`}>
                  <Icon size={24} strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-lg font-black m-0 uppercase">{category.title}</h3>
                  <p className="text-xs font-bold opacity-80 m-0 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Questions Section */}
        <div ref={sectionRef} className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#000] flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4 border-b-4 border-black pb-4">
            {activeCategory && (() => {
              const ActiveIcon = iconMap[activeCategory.iconName as keyof typeof iconMap];
              return (
                <div className="bg-black text-white p-2 rounded-xl shadow-[2px_2px_0_0_#facc15]">
                  <ActiveIcon size={28} strokeWidth={3} />
                </div>
              );
            })()}
            <h2 className="text-xl md:text-2xl font-black text-black m-0 uppercase">
              Misi: {activeCategory?.title}
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {activeCategory?.questions.map((q, idx) => (
              <QuestionAccordion key={idx} index={idx} question={q} />
            ))}
          </div>
          
          <footer className="mt-auto pt-5 text-[11px] font-bold uppercase text-slate-500 border-t-4 border-dashed border-slate-300 flex flex-col md:flex-row justify-between items-center gap-2">
            <span>© {new Date().getFullYear()} Portal BK SMK Mandiri</span>
            <span>Bimbingan Konseling - Media Self-Help Siswa</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function QuestionAccordion({ question, index }: { question: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-4 border-black rounded-2xl overflow-hidden bg-white shadow-[6px_6px_0_0_#000] mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 transition-colors focus:outline-none ${isOpen ? 'bg-[#38bdf8] border-b-4 border-black' : 'bg-white hover:bg-slate-100'}`}
      >
        <span className="font-black text-[15px] text-black">
          {question.q}
        </span>
        <ChevronDown 
          className={`shrink-0 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={24} strokeWidth={3}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 md:p-6 bg-[#f8fafc] flex flex-col gap-8 border-t-0">
              
              {/* Jawaban BK */}
              <div className="relative border-4 border-black rounded-xl p-4 md:p-5 bg-[#fca5a5] text-black mt-2 shadow-[4px_4px_0_0_#000]">
                <span className="absolute -top-4 left-4 bg-white border-4 border-black px-3 py-1 rounded-full text-[11px] font-black uppercase shadow-[2px_2px_0_0_#000]">
                  🎯 Status
                </span>
                <p className="m-0 mt-1 text-[15px] font-bold leading-relaxed">{question.a}</p>
              </div>

              {/* Solusi */}
              <div className="relative border-4 border-black rounded-xl p-4 md:p-5 bg-[#fde047] text-black pt-5 shadow-[4px_4px_0_0_#000]">
                <span className="absolute -top-4 left-4 bg-white border-4 border-black px-3 py-1 rounded-full text-[11px] font-black uppercase shadow-[2px_2px_0_0_#000]">
                  💡 Buff / Solusi
                </span>
                <p className="m-0 mt-1 text-[15px] font-bold leading-relaxed">{question.sol}</p>
              </div>

              {/* Langkah-langkah */}
              <div className="relative border-4 border-black rounded-xl p-4 md:p-5 bg-[#86efac] text-black pt-5 shadow-[4px_4px_0_0_#000]">
                <span className="absolute -top-4 left-4 bg-white border-4 border-black px-3 py-1 rounded-full text-[11px] font-black uppercase shadow-[2px_2px_0_0_#000]">
                  ⚔️ Aksi Konkret
                </span>
                <ul className="m-0 pl-[24px] text-[14px] font-bold leading-[1.6] list-decimal mt-2 space-y-[10px]">
                  {question.steps.map((step: string, stepIdx: number) => (
                    <li key={stepIdx} className="pl-1 marker:text-black marker:font-black">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
