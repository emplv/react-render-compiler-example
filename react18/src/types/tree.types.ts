export type Priority = 'low' | 'medium' | 'high';

export interface TreeItem {
  id: string;
  title: string;
  description: string;
  isLeaf: boolean;
  priority: Priority;
  path: string; // e.g., "1" or "1/2" or "1/2/3"
  isExpanded: boolean;
  isHovered: boolean;
}

export interface TreeNode extends TreeItem {
  children?: TreeNode[];
}

