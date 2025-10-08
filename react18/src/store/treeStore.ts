import { create } from "zustand";
import { TreeItem, Priority } from "../types/tree.types";
import { itemOrDescendantsMatch } from "../utils/treeUtils";
import { createSampleData, createLargeSampleData } from "./sampleData";

interface TreeState {
  items: TreeItem[];
  searchQuery: string;
  priorityFilter: "all" | Priority;

  // Actions
  toggleExpanded: (id: string) => void;
  setHovered: (id: string | null, isHovered: boolean) => void;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (filter: "all" | Priority) => void;

  // Computed
  getFilteredItems: () => TreeItem[];
  // getMatchCount: () => { matched: number; total: number };
}

export const useTreeStore = create<TreeState>((set, get) => ({
  // items: createSampleData(),
  items: createLargeSampleData(),
  searchQuery: "",
  priorityFilter: "all",

  toggleExpanded: (id: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
      ),
    }));
  },

  setHovered: (id: string | null, isHovered: boolean) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isHovered } : { ...item, isHovered: false }
      ),
    }));
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setPriorityFilter: (filter: "all" | Priority) => {
    set({ priorityFilter: filter });
  },

  getFilteredItems: () => {
    const { items, searchQuery, priorityFilter } = get();

    if (searchQuery === "" && priorityFilter === "all") {
      return items;
    }

    return items.filter((item) =>
      itemOrDescendantsMatch(item, items, searchQuery, priorityFilter)
    );
  },

  // getMatchCount: () => {
  //   const { items } = get();
  //   const filteredItems = get().getFilteredItems();

  //   return {
  //     matched: filteredItems.length,
  //     total: items.length,
  //   };
  // },
}));

export const useItems = () => {
  const items = useTreeStore((state) => state.items);
  return items;
};

export const useSearchQuery = () => {
  const searchQuery = useTreeStore((state) => state.searchQuery);
  return searchQuery;
};

export const usePriorityFilter = () => {
  const priorityFilter = useTreeStore((state) => state.priorityFilter);
  return priorityFilter;
};

export const useGetFilteredItems = () => {
  const getFilteredItems = useTreeStore((state) => state.getFilteredItems());
  return getFilteredItems;
};

// export const useGetMatchCount = () => {
//   const getMatchCount = useTreeStore((state) => state.getMatchCount());
//   return getMatchCount;
// };
