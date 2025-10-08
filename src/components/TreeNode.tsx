import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import { TreeNode as TreeNodeType } from "../types/tree.types";
import { useTreeStore } from "../store/treeStore";
import { cn } from "../lib-cn";
import RenderCounter from "./ui/renderCounter";

interface TreeNodeProps {
  node: TreeNodeType;
  depth?: number;
}

export function TreeNode({ node, depth = 0 }: TreeNodeProps) {
  const { toggleExpanded, setHovered } = useTreeStore();
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (!node.isLeaf) {
      toggleExpanded(node.id);
    }
  };

  const handleMouseEnter = () => {
    setHovered(node.id, true);
  };

  const handleMouseLeave = () => {
    setHovered(null, false);
  };

  const priorityColors = {
    low: "text-blue-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };

  return (
    <div className="select-none">
      <RenderCounter>
        <div
          className={cn(
            "flex items-center gap-1 py-1.5 px-2 rounded cursor-pointer transition-colors",
            node.isHovered && "bg-success/30"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Expand/Collapse Icon */}
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {!node.isLeaf ? (
              node.isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )
            ) : null}
          </div>

          {/* File/Folder Icon */}
          <div className="w-4 h-4 flex-shrink-0">
            {node.isLeaf ? (
              <File className={cn("w-4 h-4", priorityColors[node.priority])} />
            ) : node.isExpanded ? (
              <FolderOpen
                className={cn("w-4 h-4", priorityColors[node.priority])}
              />
            ) : (
              <Folder
                className={cn("w-4 h-4", priorityColors[node.priority])}
              />
            )}
          </div>

          {/* Title */}
          <RenderCounter>
            <span className="text-sm truncate">{node.title}</span>
          </RenderCounter>
        </div>

        {/* Children */}
        {hasChildren && node.isExpanded && (
          <div>
            {node.children!.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </RenderCounter>
    </div>
  );
}
