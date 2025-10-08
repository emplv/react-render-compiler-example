import { TreeItem, TreeNode } from "../types/tree.types";

const matchesSearch = (item: TreeItem, searchQuery: string) =>
  searchQuery === "" ||
  item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.description.toLowerCase().includes(searchQuery.toLowerCase());

const matchesPriority = (item: TreeItem, priorityFilter: string) =>
  priorityFilter === "all" || item.priority === priorityFilter;

// filtering alternative using tree structure rather than flat array
export function itemOrDescendantsMatch(
  items: TreeNode[],
  searchQuery: string,
  priorityFilter: string
): TreeItem[] {
  return items.filter((node) => {
    const itemMatched =
      matchesSearch(node, searchQuery) && matchesPriority(node, priorityFilter);
    const matchedChildren = node.children
      ? itemOrDescendantsMatch(node.children, searchQuery, priorityFilter)
      : [];
    const anyChildrenMatched = matchedChildren.length > 0;

    return itemMatched || anyChildrenMatched;
  });
}
