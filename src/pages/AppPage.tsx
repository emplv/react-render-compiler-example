import { TreeView } from '../components/TreeView';
import { DocumentView } from '../components/DocumentView';
import { Filters } from '../components/Filters';

export default function AppPage() {
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
      </main>
    </div>
  );
}
