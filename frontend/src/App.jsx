import Navbar from './components/Navbar';
import NewsAnalyzer from './components/NewsAnalyzer';
import Creator from './components/Creator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative bg-[#020617] text-slate-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Global deep space background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-[#020617] to-transparent"></div>
      </div>
      
      <Navbar />

      <main className="pt-36 pb-16 flex flex-col items-center gap-32 relative z-10 w-full overflow-hidden">
        
        {/* Main Hero Header */}
        <section className="text-center space-y-8 max-w-5xl px-4 relative z-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]"></span>
            Veritas AI Architecture
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 py-2 drop-shadow-xl leading-[1.1]">
            Truth is Not <br className="hidden sm:block" /> an Illusion.
          </h1>
          <p className="text-slate-400 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Filter the noise. Use our advanced neural network framework to authenticate news articles with real-time semantic analysis and factual reasoning.
          </p>
        </section>

        <NewsAnalyzer />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <Creator />

      </main>

      <Footer />
    </div>
  );
}

export default App;
