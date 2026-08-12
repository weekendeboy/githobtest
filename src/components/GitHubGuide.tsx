import React from 'react';
import { GitPullRequest, ArrowRight, Settings, Download, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';

export const GitHubGuide: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: '打開 Settings 設定選單',
      description: '點擊 AI Studio 介面右上角的「Settings」(設定) 圖示。',
      icon: Settings,
      tip: '可設定專案存取權限與連動目標',
    },
    {
      step: '02',
      title: '選擇 Export to GitHub',
      description: '選擇「Export / Sync to GitHub」選項，準備連結你的帳號。',
      icon: Download,
      tip: '支援導出至全新儲存庫或既有 GitHub Repo',
    },
    {
      step: '03',
      title: '授權與選擇 Repo 儲存庫',
      description: '確認 GitHub 帳號授權，設定專案名稱（例如 `my-github-test-app`）。',
      icon: ShieldCheck,
      tip: '可選擇 Public (公開) 或 Private (私人) 權限',
    },
    {
      step: '04',
      title: '完成連動與持續同步',
      description: '連動建立後，在此網頁上所做的修改可隨時同步 Commit 至 GitHub！',
      icon: GitPullRequest,
      tip: '搭配 GitHub Actions 可自動部署至 Cloud Run 或 Pages',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-xs font-bold">
              ?
            </span>
            如何將此專案與 GitHub 進行連動？
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            4 個步驟即可在 Google AI Studio 中將目前專案匯出並綁定 GitHub 儲存庫
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>準備完成 (Ready to Sync)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-50 hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
                  STEP {item.step}
                </span>
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                {item.title}
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="mt-auto pt-2 border-t border-slate-200/50 flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="truncate">{item.tip}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
