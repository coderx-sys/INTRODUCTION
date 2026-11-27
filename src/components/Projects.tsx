import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Check, Database, LineChart, Sigma } from 'lucide-react';

const projects = [
  {
    title: 'Amazon Sales Performance Dashboard & Data Cleaning',
    subtitle: 'Microsoft Excel',
    description:
      'Transformed raw Amazon sales data into a clean, analysis-ready dataset and an interactive executive dashboard for exploring financial and operational performance.',
    highlights: [
      'Removed duplicate Order IDs, standardized date and text formats, and sorted records chronologically for reliable time-series reporting.',
      'Automated Gross Sales, Net Revenue, Average Order Value (AOV), and Delivered Order Rate calculations with SUMIFS, COUNTIFS, and AVERAGE.',
      'Built KPI cards, category-level sales breakdowns, FBA vs. FBM fulfillment tracking, and month-over-month revenue trends.',
      'Added conditional formatting, AutoFilters, and a documented data-cleaning audit log to support data integrity and stakeholder decisions.'
    ],
    tools: [
      'Microsoft Excel',
      'SUMIFS',
      'COUNTIFS',
      'AVERAGE',
      'Data Cleaning',
      'Dashboarding'
    ]
  }
];

export const Projects: React.FC = () => (
  <section id="projects" className="py-24 px-6 bg-slate-950/50">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400 mb-3">
          Selected work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Projects
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full" />
      </motion.div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden p-6 md:p-9 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl hover:border-blue-500/30 transition-colors"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-emerald-300 mb-3">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Data analytics
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-400">{project.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold shrink-0">
                  <LineChart className="w-4 h-4" />
                  Sales insights
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-7">
                {project.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex gap-3 text-sm text-slate-300 leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                <Database className="w-4 h-4" />
                Tools & methods
                <Sigma className="w-4 h-4 ml-1" />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 bg-slate-800/70 text-slate-300 rounded-lg text-xs border border-white/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
