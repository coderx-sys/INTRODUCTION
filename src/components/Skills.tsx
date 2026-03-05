import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Code2, Layout, Database, Smartphone } from 'lucide-react';

export const Skills: React.FC = () => {
  const categories = [
    { title: "Technical Stack", skills: resumeData.skills.technical, icon: <Code2 className="w-5 h-5" /> },
    { title: "Specializations", skills: resumeData.skills.specialized, icon: <Smartphone className="w-5 h-5" /> },
    { title: "Core Competencies", skills: resumeData.skills.core, icon: <Layout className="w-5 h-5" /> }
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl hover:bg-slate-900/60 transition-all"
            >
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                {cat.icon}
                <h3 className="text-xl font-bold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-xl text-sm border border-white/5 hover:border-blue-500/50 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
