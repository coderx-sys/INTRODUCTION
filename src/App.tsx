import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { TextScramble } from './components/TextScramble';
import { MagneticButton } from './components/MagneticButton';
import { resumeData } from './data/resume';
import { ArrowRight, Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'achievements', 'skills'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/INTRODUCTION/ADI-resume.pdf';
    link.download = 'Adityaraj_Desai_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatedBackground />

          {/* Custom Cursor */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-blue-500/30 rounded-full pointer-events-none z-[100] blur-sm hidden md:block"
            animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[100] hidden md:block"
            animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
            transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
          />

          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
            style={{ scaleX }}
          />

          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-2xl font-bold text-white tracking-tighter"
              >
                AD<span className="text-blue-500">.</span>
              </motion.div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-lg border border-white/10 px-8 py-3 rounded-full">
                {['Experience', 'Achievements', 'Skills'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                      activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4">
                <a href={resumeData.basics.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${resumeData.basics.email}`} className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <button onClick={downloadResume} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all flex items-center gap-2">
                  Resume <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
              >
                {['Experience', 'Achievements', 'Skills'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-3xl font-bold text-white"
                  >
                    {item}
                  </button>
                ))}
                <button onClick={downloadResume} className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-full font-bold flex items-center gap-2">
                  Download Resume <Download className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section */}
          <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Available for Opportunities
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-none">
                  <TextScramble text={resumeData.basics.name.split(' ')[0]} /><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                    <TextScramble text={resumeData.basics.name.split(' ')[1]} />
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-300 font-medium mb-8 max-w-xl leading-relaxed">
                  {resumeData.basics.label}
                </p>
                
                <p className="text-slate-400 mb-10 max-w-lg">
                  {resumeData.basics.summary}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <MagneticButton>
                    <button 
                      onClick={() => scrollTo('experience')}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-50 hover:text-blue-600 text-white font-bold rounded-2xl transition-all flex items-center gap-2 group"
                    >
                      View Experience <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </MagneticButton>
                  <MagneticButton>
                    <button onClick={downloadResume} className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl border border-white/10 transition-all flex items-center gap-2">
                      Download CV <Download className="w-5 h-5" />
                    </button>
                  </MagneticButton>
                </div>

                {/* Top 3 Impact Strip */}
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-blue-400">65%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Processing Time Reduction</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-cyan-400">40%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">App Load Improvement</div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative hidden lg:block"
              >
                <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-2xl flex items-center justify-center">
                  <div className="text-9xl font-bold text-blue-500/20 select-none">AD</div>
                  {/* Abstract shapes for futuristic feel */}
                  <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full animate-pulse delay-700" />
                </div>
                {/* Decorative rings */}
                <div className="absolute -top-10 -right-10 w-full h-full border border-blue-500/10 rounded-3xl -z-10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute -bottom-10 -left-10 w-full h-full border border-cyan-500/10 rounded-3xl -z-10 animate-[spin_15s_linear_infinite_reverse]" />
              </motion.div>
            </div>
          </section>

          <Experience />
          <Achievements />
          <Skills />
          <Footer />

          {/* Scroll Progress Indicator */}
          <motion.div 
            className="fixed bottom-8 right-8 z-40 hidden md:flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {['hero', 'experience', 'achievements', 'skills'].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSection === section ? 'bg-blue-500 h-8' : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={section}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
