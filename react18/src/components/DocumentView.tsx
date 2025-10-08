import { useMemo } from "react";
import { useGetFilteredItems } from "../store/treeStore";
import { buildTree } from "../utils/treeUtils";
import { ItemNode } from "./ItemNode";

export function DocumentView() {
  const filteredItems = useGetFilteredItems();

  const tree = useMemo(() => {
    return buildTree(filteredItems);
  }, [filteredItems]);

  return (
    <div className="h-full overflow-y-auto bg-background">
      {tree.length > 0 ? (
        <div className="border-t border-border">
          {tree.map((node) => (
            <ItemNode key={node.id} node={node} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg font-semibold text-muted-foreground mb-2">
              No items found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
