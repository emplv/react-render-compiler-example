import { startTransition, useMemo } from "react";
import { Search } from "lucide-react";
import {
  useItems,
  usePriorityFilter,
  useSearchQuery,
  useTreeStore,
} from "../store/treeStore";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import RenderCounter from "./ui/renderCounter";
import { FilterCounter } from "./FilterCounter";

// export function Filters({ matched, total }: { matched: number; total: number }) {
export function Filters() {
  const searchQuery = useSearchQuery();
  const priorityFilter = usePriorityFilter();
  const setSearchQuery = useTreeStore((state) => state.setSearchQuery);
  const setPriorityFilter = useTreeStore((state) => state.setPriorityFilter);

  return (
    <div className="border-b border-border bg-background sticky top-0 z-10">
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          {/* Search Input */}
          <RenderCounter>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={(e) =>
                  startTransition(() => setSearchQuery(e.target.value))
                }
                className="!pl-9"
              />
            </div>
          </RenderCounter>

          {/* Priority Filter */}
          <div className="w-full sm:w-48">
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </div>
        </div>

        {/* Match Counter */}
        <div className="flex items-center justify-between">
          <FilterCounter />
          {/* <FilterCounter matched={matched} total={total} /> */}

          {(searchQuery || priorityFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setPriorityFilter("all");
              }}
              className="text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
