
import React, { useState } from 'react';
import { structureContent } from './geminiService';
import { StructuredEducationContent } from './types';
import PreviewCard from './components/PreviewCard';
// Fix: Added Sparkles to the imported components from lucide-react
import { Send, Layout, Loader2, Eraser, Info, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [structuredData, setStructuredData] = useState<StructuredEducationContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await structureContent(inputText);
      setStructuredData(result);
    } catch (err) {
      console.error(err);
      setError('排版生成失败，请稍后重试。可能是网络或API密钥问题。');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setStructuredData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-sky-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-sky-100 mb-4">
            <Layout className="text-sky-500" />
            <h1 className="text-2xl font-bold text-slate-800 font-happy tracking-wider">精品教育排版大师</h1>
          </div>
          <p className="text-slate-500 max-w-lg mx-auto">
            只需输入原始文字内容，我们将为您智能解析并转化为清新、专业的精品课件式排版。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Input Section */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-sky-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <Info size={18} className="text-sky-400" />
                输入教学内容
              </h2>
              <button 
                onClick={handleClear}
                className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 text-sm"
              >
                <Eraser size={16} />
                重置
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="请在这里粘贴您的教育培训内容、课程大纲或知识要点..."
              className="w-full h-96 p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all outline-none text-slate-600 leading-relaxed resize-none"
            />
            
            <button
              onClick={handleGenerate}
              disabled={loading || !inputText.trim()}
              className={`w-full mt-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                loading || !inputText.trim() 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  智能排版中...
                </>
              ) : (
                <>
                  <Send size={20} />
                  一键生成精美排版
                </>
              )}
            </button>
            
            {error && (
              <p className="mt-4 text-red-500 text-center text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </p>
            )}
          </div>

          {/* Preview Section */}
          <div className="flex flex-col gap-6">
            {!structuredData && !loading && (
              <div className="bg-sky-100/30 border-2 border-dashed border-sky-200 rounded-3xl h-[600px] flex flex-col items-center justify-center text-sky-400 p-8 text-center">
                <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                   <Layout size={64} className="opacity-40" />
                </div>
                <h3 className="text-xl font-bold mb-2">等待生成预览</h3>
                <p className="max-w-xs opacity-70">
                  左侧输入内容并点击生成后，这里将实时展示排版大师的设计作品。
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-3xl h-[600px] flex flex-col items-center justify-center text-slate-400 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-sky-50 opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <Sparkles size={32} className="text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2 font-happy">魔法师正在构思...</h3>
                  <div className="space-y-2 text-center opacity-60">
                    <p>✨ 正在提取核心知识点</p>
                    <p>🎨 正在匹配清新色彩体系</p>
                    <p>☁️ 正在构建云朵视觉容器</p>
                  </div>
                </div>
              </div>
            )}

            {structuredData && !loading && (
              <div className="animate-in fade-in zoom-in duration-500">
                <PreviewCard data={structuredData} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-slate-400 text-sm">
        <p>© 2024 精品教育排版大师 | 专业的图文排版解决方案</p>
      </footer>
    </div>
  );
};

export default App;
