import { useMemo } from "react";
import {
  useItems,
  usePriorityFilter,
  useSearchQuery,
} from "../store/treeStore";
import { itemOrDescendantsMatch } from "../utils/treeUtils";

// export function FilterCounter({ matched, total }: { matched: number; total: number }) {
export function FilterCounter() {
  const items = useItems();
  const searchQuery = useSearchQuery();
  const priorityFilter = usePriorityFilter();

  for (let i = 0; i < 5e6;) {
    i++;
  }

  // Compute match count with useMemo to avoid infinite loops
  const { matched, total } = useMemo(() => {
    const filteredItems =
      searchQuery === "" && priorityFilter === "all"
        ? items
        : items.filter((item) =>
            itemOrDescendantsMatch(item, items, searchQuery, priorityFilter)
          );

    return {
      matched: filteredItems.length,
      total: items.length,
    };
  }, [items, searchQuery, priorityFilter]);

  return (
    <p className="text-sm text-muted-foreground">
      Displaying{" "}
      <span className="font-semibold text-foreground">{matched}</span> of{" "}
      <span className="font-semibold text-foreground">{total}</span> items
    </p>
  );
}
