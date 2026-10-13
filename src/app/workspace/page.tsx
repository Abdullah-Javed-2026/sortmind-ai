import type { Metadata } from 'next';
import { WorkspaceApp } from '@/components/workspace/WorkspaceApp';

export const metadata: Metadata = {
  title: 'Workspace — SortMind AI Local File Sorter & Packager',
  description:
    'SortMind AI Interactive Workspace: 100% in-memory file categorization, folder tree preview, duplicate detection, and instant ZIP packaging without cloud uploads.',
};

export default function WorkspacePage() {
  return <WorkspaceApp />;
}
