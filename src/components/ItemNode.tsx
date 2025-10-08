import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Priority, TreeNode as TreeNodeType } from "../types/tree.types";
import { useTreeStore } from "../store/treeStore";
import { getDepth } from "../utils/treeUtils";
import { cn } from "../lib-cn";
import { Badge } from "./ui/badge";
import RenderCounter from "./ui/renderCounter";
import { useTheme } from "../context/ThemeContext";

interface ItemNodeProps {
  node: TreeNodeType;
}

const priorityVariants = {
  low: "bg-accent/20 text-accent",
  medium: "bg-success/20 text-success",
  high: "bg-error/20 text-error",
};

export function ItemNode({ node }: ItemNodeProps) {
  const { toggleExpanded, setHovered } = useTreeStore();
  // const theme = useTheme();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const depth = getDepth(node.path);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (!node.isLeaf) {
      toggleExpanded(node.id);
    }
  };

  const handleDescriptionToggle = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleMouseEnter = () => {
    setHovered(node.id, true);
  };

  const handleMouseLeave = () => {
    setHovered(null, false);
  };

  return (
    <div className="transition-colors">
      <RenderCounter>
        {/* Item Content */}
        <div
          className={cn(
            "py-4 px-6 border-b border-border transition-colors",
            node.isHovered && "bg-success/30"
          )}
          style={{ paddingLeft: `${depth * 24 + 24}px` }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <RenderCounter>
            <div className="flex items-start gap-3">
              {/* Expand/Collapse Button */}
              {!node.isLeaf && (
                <button
                  onClick={handleToggle}
                  className="mt-1 w-5 h-5 flex items-center justify-center hover:bg-success rounded transition-colors flex-shrink-0"
                >
                  {node.isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              )}

              {/* Content */}
              <div
                className="flex-1 min-w-0 cursor-pointer"
                style={{ marginLeft: node.isLeaf ? "32px" : "0" }}
                onClick={handleDescriptionToggle}
              >
                <div className="flex items-center gap-2 mb-1">
                  <RenderCounter>
                    <h3 className="font-semibold text-base">{node.title}</h3>
                    {/* <RenderCounter className="inline-block">
                      <Badge
                        className={cn(
                          "text-xs",
                          priorityVariants[node.priority],
                          theme.theme === "dark" ? "text-white" : "text-black"
                        )}
                      >
                        {node.priority}
                      </Badge>
                    </RenderCounter> */}
                    <ItemNodeBadge priority={node.priority} />
                  </RenderCounter>
                </div>
                {isDescriptionExpanded && (
                  <p className="text-sm text-muted-foreground">
                    {node.description}
                  </p>
                )}
              </div>
            </div>
          </RenderCounter>
        </div>

        {/* Recursive Children */}
        {hasChildren && node.isExpanded && (
          <div>
            {node.children!.map((child) => (
              <ItemNode key={child.id} node={child} />
            ))}
          </div>
        )}
      </RenderCounter>
    </div>
  );
}

const ItemNodeBadge = ({ priority }: { priority: Priority }) => {
  const theme = useTheme();
  return (
    <RenderCounter className="inline-block">
      <Badge
        className={cn(
          "text-xs",
          priorityVariants[priority],
          theme.theme === "dark" ? "text-white" : "text-black"
        )}
      >
        {priority}
      </Badge>
    </RenderCounter>
  );
};
