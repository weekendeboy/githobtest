export interface CommitLogItem {
  id: string;
  hash: string;
  author: string;
  message: string;
  timestamp: string;
  branch: string;
  type: 'feat' | 'fix' | 'docs' | 'test' | 'chore';
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'build' | 'git' | 'ui' | 'deploy';
}

export interface SystemMetric {
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'info';
  iconName: string;
}
