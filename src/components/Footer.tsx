import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { GraduationCap, Mail, Phone, Linkedin, MapPin, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Build Something Extraordinary</h2>
            <p className="text-slate-400 mb-8 max-w-md">
              Passionate Computer Science graduate ready to tackle complex challenges and build high-performance applications.
            </p>
            <div className="flex gap-4">
              <a href={`mailto:${resumeData.basics.email}`} className="p-3 bg-slate-900 rounded-xl hover:bg-blue-500 transition-colors text-white">
                <Mail className="w-5 h-5" />
              </a>
              <a href={resumeData.basics.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-xl hover:bg-blue-500 transition-colors text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`tel:${resumeData.basics.phone}`} className="p-3 bg-slate-900 rounded-xl hover:bg-blue-500 transition-colors text-white">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Education</h3>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="flex gap-4">
                <GraduationCap className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <p className="text-white font-medium">{edu.degree}</p>
                  <p className="text-slate-400 text-sm">{edu.institution}</p>
                  <p className="text-slate-500 text-xs mt-1">{edu.dates}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Location</h3>
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-blue-400 shrink-0" />
              <p className="text-slate-400">{resumeData.basics.location}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {resumeData.basics.name}. All rights reserved.</p>
          <div className="flex gap-8">
            {resumeData.extra.map((item, i) => (
              <span key={i} className="hidden lg:inline">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
