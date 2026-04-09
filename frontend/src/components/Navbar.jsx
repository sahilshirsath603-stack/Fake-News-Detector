import { ShieldCheck, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
              Veritas AI
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#analyzer" className="hidden sm:block text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors duration-200">ANALYZER</a>
            <a href="#creator" className="hidden sm:block text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors duration-200">CREATOR</a>
            <a href="https://github.com/sahilshirsath603-stack" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-all transform hover:scale-110 duration-200">
              <Github className="w-6 h-6 drop-shadow" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
