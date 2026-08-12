import React, { useState } from 'react';
import { Header } from './components/Header';
import { GitHubGuide } from './components/GitHubGuide';
import { TestDashboard } from './components/TestDashboard';
import { CommitLog } from './components/CommitLog';
import { Footer } from './components/Footer';
import { ChecklistItem, CommitLogItem } from './types';

export default function App() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 'c1',
      title: 'Vite 6 + React 19 核心環境運作正常',
      description: '確認單頁式應用程式可以在 AI Studio 預覽環境中順暢執行。',
      completed: true,
      category: 'build',
    },
    {
      id: 'c2',
      title: 'Tailwind CSS v4 樣式與 Lucide 圖示綁定',
      description: '確保 UI 介面具備高品質視覺階層、細緻邊框與適應性排版。',
      completed: true,
      category: 'ui',
    },
    {
      id: 'c3',
      title: 'GitHub 連動指南與操作流程就緒',
      description: '已展示於 AI Studio 設定中匯出並連動 GitHub 儲存庫的完整步驟。',
      completed: true,
      category: 'git',
    },
    {
      id: 'c4',
      title: '測試互動元件狀態更新 (State Mutation Test)',
      description: '請使用左側面板新增測試 Commit 或點擊計數器，測試畫面響應。',
      completed: false,
      category: 'build',
    },
    {
      id: 'c5',
      title: '完成首次 GitHub 專案連動與匯出',
      description: '透過 AI Studio 右上角 Settings 連結您的 GitHub 帳號並推送專案。',
      completed: false,
      category: 'deploy',
    },
  ]);

  const [commits, setCommits] = useState<CommitLogItem[]>([
    {
      id: 'm3',
      hash: 'a1f89c2',
      author: 'AI Studio Developer',
      message: 'feat: 建立單頁式 GitHub 連動測試網頁',
      timestamp: '剛剛 (Just now)',
      branch: 'main',
      type: 'feat',
    },
    {
      id: 'm2',
      hash: 'b4d91e0',
      author: 'AI Studio Developer',
      message: 'style: 整合 Tailwind CSS v4 與現代化元件卡片設計',
      timestamp: '5 分鐘前',
      branch: 'main',
      type: 'chore',
    },
    {
      id: 'm1',
      hash: 'f7a32d1',
      author: 'AI Studio Developer',
      message: 'init: 初始化預設專案架構',
      timestamp: '10 分鐘前',
      branch: 'main',
      type: 'chore',
    },
  ]);

  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddCommit = (message: string, type: 'feat' | 'fix' | 'docs' | 'test' | 'chore') => {
    const randomHash = Math.random().toString(16).substring(2, 9);
    const newCommit: CommitLogItem = {
      id: `m_${Date.now()}`,
      hash: randomHash,
      author: 'Tester (You)',
      message: `${type}: ${message}`,
      timestamp: new Date().toLocaleTimeString(),
      branch: 'main',
      type,
    };

    setCommits((prev) => [newCommit, ...prev]);

    // Also mark item c4 completed if not yet
    setChecklist((prev) =>
      prev.map((i) => (i.id === 'c4' ? { ...i, completed: true } : i))
    );
  };

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleTimeString());
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Header */}
      <Header
        commitCount={commits.length}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Step-by-Step GitHub Connection Guide */}
        <GitHubGuide />

        {/* Test Control Dashboard & Checklist */}
        <TestDashboard
          checklist={checklist}
          onToggleChecklist={handleToggleChecklist}
          onAddCommit={handleAddCommit}
        />

        {/* Commit Log History Feed */}
        <CommitLog commits={commits} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
