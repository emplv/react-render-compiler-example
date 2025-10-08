import { TreeItem, Priority } from "../types/tree.types";

// Categories and templates for generating varied data
const categories = [
  {
    name: "Development",
    topics: ["Frontend", "Backend", "API", "Database", "Architecture", "Security"],
    subtopics: ["Implementation", "Testing", "Documentation", "Optimization", "Refactoring"]
  },
  {
    name: "Design",
    topics: ["UI Components", "UX Patterns", "Layouts", "Typography", "Colors", "Icons"],
    subtopics: ["Mockups", "Prototypes", "Style Guide", "Accessibility", "Responsive"]
  },
  {
    name: "Testing",
    topics: ["Unit Tests", "Integration Tests", "E2E Tests", "Performance", "Security"],
    subtopics: ["Test Cases", "Coverage", "Automation", "Manual Testing", "Reports"]
  },
  {
    name: "Documentation",
    topics: ["API Docs", "User Guides", "Technical Specs", "Tutorials", "Release Notes"],
    subtopics: ["Examples", "References", "FAQs", "Troubleshooting", "Best Practices"]
  },
  {
    name: "Infrastructure",
    topics: ["Deployment", "CI/CD", "Monitoring", "Logging", "Backup", "Scaling"],
    subtopics: ["Configuration", "Automation", "Alerts", "Recovery", "Optimization"]
  },
  {
    name: "Features",
    topics: ["Authentication", "Authorization", "Search", "Analytics", "Notifications"],
    subtopics: ["Requirements", "Implementation", "Testing", "Documentation", "Deployment"]
  },
  {
    name: "Performance",
    topics: ["Load Time", "Caching", "Optimization", "CDN", "Lazy Loading"],
    subtopics: ["Metrics", "Monitoring", "Improvements", "Benchmarks", "Reports"]
  },
  {
    name: "Quality",
    topics: ["Code Review", "Linting", "Formatting", "Standards", "Best Practices"],
    subtopics: ["Guidelines", "Checks", "Enforcement", "Documentation", "Training"]
  }
];

const priorities: Priority[] = ["low", "medium", "high"];

// Structure templates: defines the tree structure patterns
const structureTemplates = [
  { type: "leaf" as const },
  { type: "depth2" as const, childCount: 2 },
  { type: "depth2" as const, childCount: 3 },
  { type: "depth2" as const, childCount: 4 },
  { type: "depth3" as const, branchCount: 2, leafCount: 1 },
  { type: "depth3" as const, branchCount: 1, leafCount: 2 },
  { type: "depth3" as const, branchCount: 2, leafCount: 2 },
];

// Generate a single root item with its children based on structure template
function generateRootItem(rootId: number): TreeItem[] {
  const items: TreeItem[] = [];
  const categoryIndex = rootId % categories.length;
  const category = categories[categoryIndex];
  const topicIndex = Math.floor(rootId / categories.length) % category.topics.length;
  const topic = category.topics[topicIndex];
  const templateIndex = rootId % structureTemplates.length;
  const template = structureTemplates[templateIndex];
  const priorityIndex = rootId % 3;
  
  // Create root item
  const rootItem: TreeItem = {
    id: String(rootId),
    title: `${category.name}: ${topic}`,
    description: `${category.name} related to ${topic.toLowerCase()}`,
    isLeaf: template.type === "leaf",
    priority: priorities[priorityIndex],
    path: String(rootId),
    isExpanded: false,
    isHovered: false,
  };
  items.push(rootItem);

  // Generate children based on template
  if (template.type === "depth2") {
    for (let i = 1; i <= template.childCount; i++) {
      const childId = `${rootId}-${i}`;
      const subtopicIndex = (i - 1) % category.subtopics.length;
      const subtopic = category.subtopics[subtopicIndex];
      items.push({
        id: childId,
        title: `${topic} - ${subtopic}`,
        description: `${subtopic} for ${topic.toLowerCase()}`,
        isLeaf: true,
        priority: priorities[(priorityIndex + i) % 3],
        path: `${rootId}/${childId}`,
        isExpanded: false,
        isHovered: false,
      });
    }
  } else if (template.type === "depth3") {
    let childIndex = 1;
    
    // Add branch children (depth 2 -> depth 3)
    for (let i = 0; i < template.branchCount; i++) {
      const branchId = `${rootId}-${childIndex}`;
      const subtopicIndex = (childIndex - 1) % category.subtopics.length;
      const subtopic = category.subtopics[subtopicIndex];
      
      items.push({
        id: branchId,
        title: `${topic} - ${subtopic}`,
        description: `${subtopic} for ${topic.toLowerCase()}`,
        isLeaf: false,
        priority: priorities[(priorityIndex + childIndex) % 3],
        path: `${rootId}/${branchId}`,
        isExpanded: false,
        isHovered: false,
      });
      
      // Add grandchildren (depth 3)
      const grandchildCount = 2;
      for (let j = 1; j <= grandchildCount; j++) {
        const grandchildId = `${rootId}-${childIndex}-${j}`;
        const detailIndex = (j - 1) % category.subtopics.length;
        items.push({
          id: grandchildId,
          title: `${subtopic} - Part ${j}`,
          description: `Detailed ${subtopic.toLowerCase()} implementation`,
          isLeaf: true,
          priority: priorities[(priorityIndex + childIndex + j) % 3],
          path: `${rootId}/${branchId}/${grandchildId}`,
          isExpanded: false,
          isHovered: false,
        });
      }
      childIndex++;
    }
    
    // Add leaf children (depth 2)
    for (let i = 0; i < template.leafCount; i++) {
      const leafId = `${rootId}-${childIndex}`;
      const subtopicIndex = (childIndex - 1) % category.subtopics.length;
      const subtopic = category.subtopics[subtopicIndex];
      items.push({
        id: leafId,
        title: `${topic} - ${subtopic}`,
        description: `${subtopic} for ${topic.toLowerCase()}`,
        isLeaf: true,
        priority: priorities[(priorityIndex + childIndex) % 3],
        path: `${rootId}/${leafId}`,
        isExpanded: false,
        isHovered: false,
      });
      childIndex++;
    }
  }

  return items;
}

// Generate all 200 root items with their children
function generateAllData(): TreeItem[] {
  const allItems: TreeItem[] = [];
  
  for (let i = 1; i <= 200; i++) {
    const items = generateRootItem(i);
    allItems.push(...items);
  }
  
  return allItems;
}

// Cache the generated data
const allGeneratedData = generateAllData();

// Helper function to get root item ranges
function getRootItemRange(data: TreeItem[], rootCount: number): TreeItem[] {
  const result: TreeItem[] = [];
  let rootsFound = 0;
  
  for (const item of data) {
    if (!item.path.includes('/')) {
      // This is a root item
      if (rootsFound >= rootCount) {
        break;
      }
      rootsFound++;
    }
    if (rootsFound > 0 && rootsFound <= rootCount) {
      result.push(item);
    }
  }
  
  return result;
}

// Export the first 7 root items with their children
export const createSampleData = (): TreeItem[] => {
  return getRootItemRange(allGeneratedData, 7);
};

// Export all 200 root items with their children
export const createLargeSampleData = (): TreeItem[] => {
  return allGeneratedData;
};
