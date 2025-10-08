# React 18 Performance Demo: Standard vs React Compiler

A performance comparison demo showcasing **React 18** with and without the **React Compiler**. Built with Vite, TypeScript, Zustand, and Tailwind CSS, this application demonstrates how the React Compiler can automatically optimize React applications without manual memoization.

## 🎯 Overview

This demo application features a hierarchical tree view with filtering and search capabilities. It includes over 200 root items with nested children (depth up to 3 levels), totaling thousands of nodes. The app intentionally includes performance bottlenecks to demonstrate the impact of React Compiler optimizations.

### Key Features

- **Hierarchical Tree Navigation** - Multi-level tree structure with expand/collapse functionality
- **Real-time Search** - Filter items by title or description across the entire tree
- **Priority Filtering** - Filter by priority levels (low, medium, high)
- **Dual View System** - Tree view sidebar and document detail view
- **Performance Monitoring** - Render counters to visualize re-render behavior
- **Theme Support** - Light/dark theme toggle
- **State Management** - Zustand for efficient global state

## 🚀 Tech Stack

- **React** 18.3.1
- **TypeScript** 5.6.2
- **Vite** 5.4.0
- **Zustand** 5.0.8 (State Management)
- **React Router** 7.9.3
- **Tailwind CSS** 3.4.13
- **Lucide React** (Icons)
- **React Compiler** 1.0.0 (babel-plugin-react-compiler)

## 📦 Installation

```bash
npm install
```

## 🏃 Running the Application

### Standard React 18 (No Compiler)

```bash
npm run dev
# Open http://localhost:5173
```

### React 18 + React Compiler

```bash
npm run dev:compiler
# Open http://localhost:5183 (different port to avoid conflicts)
```

## 🔨 Build Scripts

This project provides two separate build configurations:

### 1. Standard Build (Original React 18)
```bash
npm run build
```
Uses the default Vite + React configuration without compiler optimizations.

### 2. Compiler-Enabled Build
```bash
npm run build:compiler
```
Uses `vite.compiler.config.ts` with the React Compiler plugin enabled:
```typescript
react({
  babel: {
    plugins: [["babel-plugin-react-compiler", { target: "18" }]]
  }
})
```

## 🎨 What to Try

1. **Search Filtering** - Type in the search box and observe render behavior with/without compiler
2. **Priority Filtering** - Switch between All/Low/Medium/High priorities
3. **Tree Expansion** - Expand/collapse nodes and notice the rendering patterns
4. **Hover Effects** - Hover over items to see state updates
5. **Performance Comparison** - Run both versions side-by-side and compare:
   - Component re-render counts (visible in footer)
   - Responsiveness during filtering
   - Overall application smoothness

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout components
│   ├── ui/              # Reusable UI primitives (Button, Card, Input, etc.)
│   ├── DocumentView.tsx # Main content area with filtered items
│   ├── TreeView.tsx     # Sidebar tree navigation
│   ├── TreeNode.tsx     # Recursive tree node component
│   ├── ItemNode.tsx     # Document detail node component
│   ├── Filters.tsx      # Search and filter controls
│   └── FilterCounter.tsx # Display filtered/total counts
├── store/
│   ├── treeStore.ts     # Zustand store for app state
│   └── sampleData.ts    # Generated sample data (200+ root items)
├── utils/
│   ├── treeUtils.ts     # Tree building and filtering utilities
│   └── itemOrDescendantsMatch.ts # Alternative filtering logic
├── types/
│   └── tree.types.ts    # TypeScript type definitions
├── context/
│   └── ThemeContext.tsx # Theme provider
└── pages/
    └── AppPage.tsx      # Main page layout
```

## ⚡ React Compiler Benefits

The React Compiler automatically optimizes your React code by:

1. **Auto-memoization** - Automatically memoizes components and values without manual `useMemo`/`useCallback`/`React.memo`
2. **Granular Updates** - Only re-renders components when their actual dependencies change
3. **Reduced Boilerplate** - No need to wrap everything in memoization hooks
4. **Better Performance** - Optimal rendering behavior out of the box

### Observable Differences

When comparing the two builds, you'll notice:
- **Fewer re-renders** in the compiler version
- **Better filter performance** during search/filtering operations
- **Smoother interactions** when expanding/collapsing tree nodes
- **Lower render counts** displayed in the footer

## 💡 Code Hints & Improvement Areas

Throughout the codebase, you'll find commented code sections that demonstrate alternative approaches and potential optimizations:

### 1. Alternative Filtering Strategies

**Location:** `src/utils/itemOrDescendantsMatch.ts` and `src/utils/treeUtils.ts`

Two filtering approaches are demonstrated:
- **Tree-based filtering** - Uses hierarchical structure for efficient descendant matching
- **Flat array filtering** - Iterates through all items (can be less efficient for deep trees)

```typescript
// Alternative filtering using tree structure rather than flat array
export function itemOrDescendantsMatch(items: TreeNode[], ...)
```

### 2. Store-based vs Component-based Computed Values

**Location:** `src/store/treeStore.ts`

Commented code shows an alternative approach to calculating match counts in the store rather than in components:

```typescript
// getMatchCount: () => {
//   const { items } = get();
//   const filteredItems = get().getFilteredItems();
//   return {
//     matched: filteredItems.length,
//     total: items.length,
//   };
// },
```

**Trade-offs:**
- Store computation: Centralized logic, but may cause unnecessary recalculations
- Component computation: Better with React Compiler's auto-memoization

### 3. startTransition for Non-Urgent Updates

**Location:** `src/components/Filters.tsx`

Demonstrates using `startTransition` to mark filter updates as non-urgent:

```typescript
// onChange={(e) =>
//   startTransition(() => setSearchQuery(e.target.value))
// }
```

This keeps the input responsive while deferring the expensive filtering operation.

### 4. Intentional Performance Bottleneck

**Location:** `src/utils/treeUtils.ts`

The `buildTree` function includes an intentional performance bottleneck to exaggerate re-render costs:

```typescript
// increase the time to calculate
for(let i = 0; i < 1e4; ) {
  i++;
}
```

This makes the performance difference between standard React 18 and React Compiler more visible for demonstration purposes.

### 5. Theme Context Alternative

**Location:** `src/components/ItemNode.tsx`

Shows commented theme hook usage:

```typescript
// const theme = useTheme();
```

Can be used to access theme values programmatically instead of relying solely on CSS classes.

### 6. Match Count Calculation Alternatives

**Location:** `src/components/Filters.tsx` and `src/components/FilterCounter.tsx`

Multiple approaches for calculating and displaying filtered item counts are demonstrated, showing the evolution from component-level calculation to leveraging the store's filtered items.

## 🔍 Development Notes

- **Port Configuration:** 
  - Standard build runs on port `5173`
  - Compiler build runs on port `5183` (configured in `vite.compiler.config.ts`)
- **Data Generation:** The app generates 200+ root items with nested children (see `src/store/sampleData.ts`)
- **State Management:** Uses Zustand with selector hooks for fine-grained subscriptions
- **UI Components:** Custom shadcn-style components (local, no generator needed)

## 🎓 Learning Resources

- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [React 18 Features](https://react.dev/blog/2022/03/29/react-v18)
- [Zustand State Management](https://docs.pmnd.rs/zustand)

## 📝 License

This is a demonstration project for educational purposes.

---

**Built for Frontmania 2025** 🚀
