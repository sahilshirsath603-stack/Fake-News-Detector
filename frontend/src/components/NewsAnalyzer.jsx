import { useState } from 'react';
import axios from 'axios';
import { Loader2, ShieldAlert, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsAnalyzer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await axios.post(`${apiUrl}/analyze`, { text });
      setData(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Failed to connect to the backend API. Ensure it is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analyzer" className="w-full max-w-4xl mx-auto relative px-4 py-12 z-10 block">
      
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        className="glass-panel p-6 sm:p-10 md:p-12 rounded-[2rem] shadow-2xl shadow-indigo-900/20 border border-white/10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <Activity className="text-indigo-400 w-8 h-8" />
            <h2 className="text-3xl font-extrabold text-white tracking-tight">AI Content Verification</h2>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">
            Paste the news article below. Our hybrid AI pipeline (BERT + Gemini) will analyze semantic structures and fact-check the context instantly.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[1.5rem] blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <textarea
            className="relative w-full h-72 p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-[1.25rem] focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none resize-none transition-all text-slate-200 text-lg placeholder-slate-600 shadow-inner"
            placeholder="Paste news excerpt here to verify..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 active:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={26} />
              <span className="tracking-wide text-lg">Deep Context Analysis in Progress...</span>
            </>
          ) : (
            <>
              <Sparkles size={26} />
              <span className="tracking-wide text-lg">Verify Authenticity</span>
            </>
          )}
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-8 bg-red-900/40 text-red-200 p-6 rounded-2xl border border-red-500/30 text-center font-semibold shadow-lg backdrop-blur-md relative z-10"
          >
            {error}
          </motion.div>
        )}

        {data && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`mt-12 overflow-hidden rounded-[2rem] border shadow-2xl relative z-10 ${
              data.result === 'Real' 
                ? 'bg-gradient-to-br from-emerald-900/80 to-slate-900 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)]' 
                : 'bg-gradient-to-br from-rose-900/80 to-slate-900 border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.15)]'
            }`}
          >
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm pointer-events-none"></div>
            
            <div className="relative z-10 p-8 sm:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div className="flex items-center gap-6">
                  <div className={`p-5 rounded-2xl shadow-xl ${
                    data.result === 'Real' 
                      ? 'bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                      : 'bg-rose-500/10 border border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                  }`}>
                    {data.result === 'Real' ? (
                      <ShieldCheck className="text-emerald-400 w-14 h-14" />
                    ) : (
                      <ShieldAlert className="text-rose-400 w-14 h-14" />
                    )}
                  </div>
                  <div>
                    <h2 className={`text-6xl font-black tracking-tighter drop-shadow-md ${
                      data.result === 'Real' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {data.result}
                    </h2>
                    <p className="text-slate-300 text-sm mt-2 uppercase tracking-[0.2em] font-bold">AI Verdict</p>
                  </div>
                </div>
                
                <div className="md:text-right w-full max-w-[280px] bg-slate-900/50 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between md:justify-between gap-4 text-sm font-bold mb-3">
                    <span className="text-slate-300 uppercase tracking-wider text-xs">Confidence Score</span>
                    <span className={data.result === 'Real' ? 'text-emerald-400 text-lg' : 'text-rose-400 text-lg'}>
                      {data.confidence}%
                    </span>
                  </div>
                  <div className={`w-full h-4 rounded-full overflow-hidden ${
                    data.result === 'Real' ? 'bg-emerald-950/50' : 'bg-rose-950/50'
                  }`}>
                    <motion.div 
                      className={`h-full rounded-full shadow-[0_0_15px_currentColor] ${
                        data.result === 'Real' ? 'bg-emerald-400' : 'bg-rose-500'
                      }`} 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.confidence}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900/80 rounded-2xl p-8 border border-white/10 relative shadow-inner">
                <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-1.5 bg-slate-800 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-bold text-slate-200 tracking-widest uppercase">Gemini Explanation</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium mt-3 text-lg">
                  {data.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
