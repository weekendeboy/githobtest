import React, { useState } from 'react';
import { GitBranch, Github, CheckCircle2, Copy, Check, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  commitCount: number;
  lastUpdated: string;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ commitCount, lastUpdated, onRefresh }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('git status && git log --oneline -n 5');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Left branding */}
          <div className="flex items-center space-x-3.5">
            <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 ring-1 ring-slate-900/5">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">GitHub 連動測試頁面</h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  已就緒 (Ready)
                </span>
              </div>
              <p className="text-xs text-slate-5 font-normal text-slate-500 mt-0.5">
                單頁式 React 測試站台 — 用於驗證 Google AI Studio 與 GitHub 倉庫匯出與同步
              </p>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200">
              <GitBranch className="w-3.5 h-3.5 text-slate-500" />
              <span>main</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">{commitCount} 個本地測試提交</span>
            </div>

            <button
              onClick={handleCopyCommand}
              id="copy-git-cmd-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">已複製命令</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>複製 Git 指令</span>
                </>
              )}
            </button>

            <button
              onClick={onRefresh}
              id="refresh-status-btn"
              title="重新整理狀態"
              className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
