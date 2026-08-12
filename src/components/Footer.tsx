import React from 'react';
import { Github, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-slate-900 text-white flex items-center justify-center">
              <Github className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-slate-700">GitHub Integration Test App</span>
            <span>•</span>
            <span>Google AI Studio Powered</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px]">
              Port 3000 Ingress
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px]">
              Tailwind CSS v4
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px]">
              React 19
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
