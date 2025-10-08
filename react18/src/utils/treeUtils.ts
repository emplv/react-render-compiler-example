import { TreeItem, TreeNode } from '../types/tree.types';

/**
 * Builds a hierarchical tree structure from a flat array of items based on their path property
 * @param items - Flat array of TreeItems with path property (e.g., "1", "1/2", "1/2/3")
 * @returns Array of root TreeNodes with nested children
 */
export function buildTree(items: TreeItem[]): TreeNode[] {
  // Create a map for quick lookup
  const itemMap = new Map<string, TreeNode>();
  
  // Initialize all items as TreeNodes
  items.forEach(item => {
    // increase the time to calculate
    for(let i = 0; i < 1e4; ) {
      i++;
    }
    itemMap.set(item.id, { ...item, children: [] });
  });
  
  const roots: TreeNode[] = [];
  
  // Build the tree structure
  items.forEach(item => {
    const pathSegments = item.path.split('/');
    const node = itemMap.get(item.id)!;
    
    if (pathSegments.length === 1) {
      // Root level item
      roots.push(node);
    } else {
      // Find parent and add as child
      const parentId = pathSegments[pathSegments.length - 2];
      const parent = itemMap.get(parentId);
      
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    }
  });
  
  // Remove empty children arrays from leaf nodes
  const cleanupChildren = (node: TreeNode) => {
    if (node.children && node.children.length === 0) {
      delete node.children;
    } else if (node.children) {
      node.children.forEach(cleanupChildren);
    }
  };
  
  roots.forEach(cleanupChildren);
  
  return roots;
}

/**
 * Gets all ancestor IDs from a path string
 * @param path - Path string like "1/2/3"
 * @returns Array of ancestor IDs ["1", "2"]
 */
export function getAncestorIds(path: string): string[] {
  const segments = path.split('/');
  return segments.slice(0, -1);
}

/**
 * Gets the depth level of an item based on its path
 * @param path - Path string like "1/2/3"
 * @returns Depth level (0 for root, 1 for first child, etc.)
 */
export function getDepth(path: string): number {
  return path.split('/').length - 1;
}

/**
 * Checks if an item or any of its descendants match the filter criteria
 * @param item - TreeItem to check
 * @param allItems - All items in the store
 * @param searchQuery - Search query string
 * @param priorityFilter - Priority filter
 * @returns true if item or descendants match
 */
export function itemOrDescendantsMatch(
  item: TreeItem,
  allItems: TreeItem[],
  searchQuery: string,
  priorityFilter: string
): boolean {
  // Check if current item matches
  const matchesSearch = searchQuery === '' || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase());
  
  const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
  
  if (matchesSearch && matchesPriority) {
    return true;
  }
  
  // Check if any descendant matches
  const descendants = allItems.filter(i => 
    i.path.startsWith(item.path + '/') && i.path !== item.path
  );
  
  return descendants.some(descendant => {
    const descMatchesSearch = searchQuery === '' ||
      descendant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descendant.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const descMatchesPriority = priorityFilter === 'all' || descendant.priority === priorityFilter;
    
    return descMatchesSearch && descMatchesPriority;
  });
}

