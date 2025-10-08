import { TreeView } from "../components/TreeView";
import { DocumentView } from "../components/DocumentView";
import { Filters } from "../components/Filters";
import { FilterCounter } from "../components/FilterCounter";
import {
  useItems,
  usePriorityFilter,
  useSearchQuery,
} from "../store/treeStore";

export default function AppPage() {
  // const items = useItems();
  // const searchQuery = useSearchQuery();
  // const priorityFilter = usePriorityFilter();
  // Compute match count with useMemo to avoid infinite loops
  // const { matched, total } = useMemo(() => {
  //   const filteredItems =
  //     searchQuery === "" && priorityFilter === "all"
  //       ? items
  //       : items.filter((item) =>
  //           itemOrDescendantsMatch(item, items, searchQuery, priorityFilter)
  //         );

  //   return {
  //     matched: filteredItems.length,
  //     total: items.length,
  //   };
  // }, [items, searchQuery, priorityFilter]);

  return (
    <div className="h-[calc(100vh-10.1rem)] flex overflow-hidden">
      {/* Left Sidebar - Tree View */}
      <aside className="w-80 border-r border-border bg-muted/30 flex-shrink-0 overflow-hidden">
        <TreeView />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Filters Section */}
        <Filters />

        {/* Document View */}
        <div className="flex-1 overflow-hidden">
          <DocumentView />
        </div>

        <FilterCounter />
        {/* <FilterCounter matched={matched} total={total} /> */}
      </main>
    </div>
  );
}
