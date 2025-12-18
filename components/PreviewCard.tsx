
import React from 'react';
import { StructuredEducationContent } from '../types';
import { Pencil, BookOpen, Sparkles, GraduationCap } from 'lucide-react';

interface PreviewCardProps {
  data: StructuredEducationContent;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ data }) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'pink': return 'text-pink-500 border-pink-200';
      case 'blue': return 'text-blue-500 border-blue-200';
      case 'green': return 'text-emerald-500 border-emerald-200';
      case 'orange': return 'text-orange-500 border-orange-200';
      default: return 'text-blue-500 border-blue-200';
    }
  };

  const getBgClass = (color: string) => {
    switch (color) {
      case 'pink': return 'bg-pink-50';
      case 'blue': return 'bg-blue-50';
      case 'green': return 'bg-emerald-50';
      case 'orange': return 'bg-orange-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-blue-100/50 p-6 md:p-10 rounded-[3rem] shadow-inner relative overflow-hidden min-h-[800px]">
      {/* Decorative Top Elements */}
      <div className="absolute top-10 right-10 opacity-20 animate-float">
        <GraduationCap size={80} className="text-blue-400" />
      </div>
      
      {/* Main Cloud Container */}
      <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-xl relative z-10 flex flex-col items-center">
        
        {/* Title Area */}
        <div className="relative mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10 font-sans tracking-tight">
            {data.mainTitle}
          </h1>
          {/* Yellow Arc Decoration */}
          <div className="absolute -bottom-2 -right-4 w-24 h-6 border-b-8 border-yellow-300 rounded-[100%] z-0"></div>
        </div>

        {/* Subtitle / Intro Area */}
        <div className="flex items-center gap-4 mb-10 w-full justify-center">
          <Pencil className="text-emerald-400 w-8 h-8 hidden md:block" />
          <div className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full font-happy text-xl md:text-2xl shadow-sm border border-emerald-200">
            {data.subTitle}
          </div>
          <BookOpen className="text-orange-400 w-8 h-8 hidden md:block" />
        </div>

        {/* Intro Text */}
        <p className="text-gray-600 text-center mb-12 text-lg leading-relaxed max-w-lg">
          {data.intro}
        </p>

        {/* Structured Sections */}
        <div className="w-full space-y-10">
          {data.sections.map((section, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-8 rounded-full ${getBgClass(section.color).replace('50', '400')}`}></div>
                <h3 className={`text-2xl font-bold ${getColorClass(section.color)}`}>
                  {section.title}
                </h3>
              </div>
              <div className="pl-6 text-gray-700 leading-loose text-lg border-l-2 border-gray-100 ml-1">
                {section.content.split('\n').map((line, lidx) => (
                  <p key={lidx} className="mb-2">
                    {/* Simple highlight logic for bold text */}
                    {line.includes('**') ? (
                       line.split('**').map((part, pidx) => (
                         pidx % 2 === 1 ? <strong key={pidx} className="text-gray-900 font-bold">{part}</strong> : part
                       ))
                    ) : line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center w-full">
          <div className="inline-block relative">
            <span className="text-gray-400 italic text-sm relative z-10 bg-white px-4">
              {data.footerNote}
            </span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-10"></div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden h-24 pointer-events-none opacity-50">
           <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-yellow-200">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.53,115.48c41.11-6.73,78.14-23,109.86-59.04Z"></path>
           </svg>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute bottom-12 right-12 text-yellow-400 opacity-60 animate-bounce">
        <Sparkles size={32} />
      </div>
      <div className="absolute top-24 left-10 text-blue-300 opacity-40 animate-pulse">
        <Sparkles size={24} />
      </div>
    </div>
  );
};

export default PreviewCard;
