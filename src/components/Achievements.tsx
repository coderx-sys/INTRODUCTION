import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Trophy, TrendingDown, Zap } from 'lucide-react';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Impact & Achievements</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center p-8 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="mr-6 p-4 bg-blue-500/10 rounded-xl">
                  {index === 0 ? <TrendingDown className="w-8 h-8 text-blue-400" /> : <Zap className="w-8 h-8 text-cyan-400" />}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white tracking-tighter">
                      {achievement.metric}
                    </span>
                    <span className="text-blue-400 font-medium uppercase tracking-wider text-sm">
                      Improvement
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 mt-2">{achievement.title}</h3>
                  <p className="text-slate-400 mt-1">{achievement.context}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-center"
        >
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Top Impact Summary</h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Proven track record of optimizing systems and improving user experiences through technical excellence in Python and Web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
