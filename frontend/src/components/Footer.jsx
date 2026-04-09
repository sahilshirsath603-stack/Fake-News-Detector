export default function Footer() {
  return (
    <footer className="w-full py-10 mt-10 border-t border-white/5 glass-panel relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-sm flex flex-col gap-1 text-center md:text-left">
          <p className="font-semibold text-slate-400">&copy; {new Date().getFullYear()} Sahil Shirsath.</p>
          <p>All rights reserved.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Built with React, Tailwind v4, FastAPI & Gemini AI
        </div>
      </div>
    </footer>
  );
}
