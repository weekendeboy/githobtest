import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { CheckSquare, Square, Plus, Sparkles, Terminal, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface TestDashboardProps {
  checklist: ChecklistItem[];
  onToggleChecklist: (id: string) => void;
  onAddCommit: (msg: string, type: 'feat' | 'fix' | 'docs' | 'test' | 'chore') => void;
}

export const TestDashboard: React.FC<TestDashboardProps> = ({
  checklist,
  onToggleChecklist,
  onAddCommit,
}) => {
  const [customMsg, setCustomMsg] = useState('');
  const [commitType, setCommitType] = useState<'feat' | 'fix' | 'docs' | 'test' | 'chore'>('feat');
  const [counter, setCounter] = useState(1);
  const [accent, setAccent] = useState<'indigo' | 'emerald' | 'amber' | 'sky'>('indigo');

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const handleSubmitCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    onAddCommit(customMsg.trim(), commitType);
    setCustomMsg('');
  };

  const accentColors = {
    indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-200', ring: 'ring-indigo-500' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200', ring: 'ring-emerald-500' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-200', ring: 'ring-amber-500' },
    sky: { bg: 'bg-sky-600', text: 'text-sky-600', border: 'border-sky-200', ring: 'ring-sky-500' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Column 1 & 2: Checklist and Interactive Controls */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Checklist Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-slate-700" />
                GitHub 連動測試檢查清單 ({completedCount}/{checklist.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">點擊勾選項目，驗證單頁式網站互動狀態變化</p>
            </div>
            <span className="text-xs font-bold font-mono px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">
              {progressPercent}% 完成
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
            <motion.div
              className="h-full bg-slate-900 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleChecklist(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  item.completed
                    ? 'bg-slate-50/80 border-slate-200/60 opacity-90'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="mt-0.5 text-slate-700 shrink-0">
                  {item.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        item.completed ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Commit Simulator Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-700" />
                模擬 Git 提交變更 (Commit Generator)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">新增測試訊息，模擬程式碼變更與 GitHub Commit 紀錄</p>
            </div>
          </div>

          <form onSubmit={handleSubmitCommit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={commitType}
                onChange={(e) => setCommitType(e.target.value as any)}
                className="px-3 py-2 text-xs font-mono font-medium rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="feat">feat (新功能)</option>
                <option value="fix">fix (修復)</option>
                <option value="docs">docs (文件)</option>
                <option value="test">test (測試)</option>
                <option value="chore">chore (雜項)</option>
              </select>

              <input
                type="text"
                placeholder="輸入測試 Commit 訊息，例如：新增 GitHub 導出文件驗證..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />

              <button
                type="submit"
                id="add-commit-btn"
                disabled={!customMsg.trim()}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium transition-colors shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增 Commit 紀錄</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Column 3: Interactive Sandbox & Environment Specs */}
      <div className="space-y-6">
        
        {/* State Interactive Test Sandbox */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">即時狀態變更測試</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">測試 React State 響應性，確認畫面能正常被 GitHub 同步快照捕捉。</p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block font-mono">點擊測試計數器</span>
                <span className="text-lg font-bold text-slate-900 font-mono">Counter: {counter}</span>
              </div>
              <button
                onClick={() => setCounter((c) => c + 1)}
                id="counter-test-btn"
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                +1 測試
              </button>
            </div>

            {/* Theme / Accent test */}
            <div>
              <span className="text-[11px] text-slate-500 block mb-2 font-mono">主題點綴色切換測試</span>
              <div className="flex items-center gap-2">
                {(['indigo', 'emerald', 'amber', 'sky'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccent(color)}
                    className={`h-7 flex-1 rounded-lg text-xs font-medium capitalize border transition-all ${
                      accent === color
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs font-mono transition-colors ${accentColors[accent].border} bg-slate-50/50`}>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Sparkles className={`w-3.5 h-3.5 ${accentColors[accent].text}`} />
                <span>目前點綴樣式: <strong className={accentColors[accent].text}>{accent}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Runtime Environment Info Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">環境與技術棧規格</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Framework</span>
              <span className="font-mono font-medium text-slate-800">React 19 (SPA)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Bundler</span>
              <span className="font-mono font-medium text-slate-800">Vite 6</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Styling</span>
              <span className="font-mono font-medium text-slate-800">Tailwind CSS v4</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Port Ingress</span>
              <span className="font-mono font-medium text-slate-800">3000 (Cloud Run)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Git Sync Ready</span>
              <span className="font-mono font-medium text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
