import React from 'react';
import { CommitLogItem } from '../types';
import { GitCommit, Copy, Check, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommitLogProps {
  commits: CommitLogItem[];
  onRemoveCommit?: (id: string) => void;
}

export const CommitLog: React.FC<CommitLogProps> = ({ commits }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const typeStyles: Record<string, string> = {
    feat: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    fix: 'bg-rose-50 text-rose-700 border-rose-200',
    docs: 'bg-sky-50 text-sky-700 border-sky-200',
    test: 'bg-amber-50 text-amber-700 border-amber-200',
    chore: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-slate-700" />
            模擬 Git 提交歷史紀錄 (Git Commit History)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">顯示目前專案本地開發與測試之 Commit Log</p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 border border-slate-200/60 self-start sm:self-auto">
          共 {commits.length} 筆提交
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        <AnimatePresence>
          {commits.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              {/* Node Circle */}
              <div className="absolute -left-[1.85rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-900 shadow-2xs group-hover:bg-blue-600 transition-colors" />

              <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-3.5 hover:bg-slate-50 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                        typeStyles[item.type] || typeStyles.chore
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-sans">
                      {item.message}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyHash(item.hash, item.id)}
                      title="複製 Commit Hash"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 hover:text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>{item.hash}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50 mt-2 font-mono">
                  <span>Author: {item.author}</span>
                  <div className="flex items-center gap-3">
                    <span>Branch: <strong className="text-slate-700">{item.branch}</strong></span>
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
