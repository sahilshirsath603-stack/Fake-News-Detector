import { motion } from 'framer-motion';
import { Github, Briefcase, Mail, Code2 } from 'lucide-react';

export default function Creator() {
  return (
    <section id="creator" className="w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10 block">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-panel p-8 sm:p-14 rounded-[40px] relative overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10 w-full">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-[6px] border-slate-900 shadow-[0_0_40px_rgba(168,85,247,0.3)] flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-600 flex items-center justify-center">
               <span className="text-7xl font-black text-white drop-shadow-xl text-center">SS</span>
            </div>
            {/* You can replace the above div with an actual img tag once you have a profile picture */}
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full mb-2">
              <Code2 size={16} className="text-purple-400" />
              <h2 className="text-xs font-bold tracking-widest text-purple-300 uppercase">Meet The Creator</h2>
            </div>
            
            <h3 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight pb-1">
              Sahil Shirsath
            </h3>
            
            <p className="text-xl text-indigo-300 font-semibold mb-6 flex items-center justify-center md:justify-start gap-3">
              Full Stack AI Developer
            </p>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl font-medium">
              I specialize in building intelligent, scalable, and highly aesthetic web applications. Combining modern frontend frameworks like React and Next.js with powerful backends in Node or Python, I create seamless user experiences empowered by cutting-edge AI models.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-8">
              <a href="https://github.com/sahilshirsath603-stack" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white text-slate-900 hover:bg-slate-200 px-6 py-3.5 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                <Github size={20} />
                GitHub Profile
              </a>
              <a href="mailto:sahil@example.com" className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] hover:-translate-y-1 border border-purple-500/50">
                <Mail size={20} />
                Contact Me
              </a>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center md:justify-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <span className="text-sm text-slate-400 font-semibold uppercase tracking-wider">Available for new opportunities</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
