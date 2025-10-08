import { useMemo } from "react";
import { useItems } from "../store/treeStore";
import { buildTree } from "../utils/treeUtils";
import { TreeNode } from "./TreeNode";

export function TreeView() {
  const items = useItems();
  const tree = useMemo(() => {
    return buildTree(items);
  }, [items]);

  return (
    <div className="h-full overflow-y-auto p-2">
      <div className="mb-2 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
        Tree View
      </div>
      <div className="space-y-0.5">
        {tree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
      {tree.length === 0 && (
        <div className="px-2 py-4 text-sm text-muted-foreground text-center">
          No items available
        </div>
      )}
    </div>
  );
}
