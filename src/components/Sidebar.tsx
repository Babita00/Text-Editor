import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Image as ImageIcon, 
  Layout, 
  Search,
  PanelLeft
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const [activeTab, setActiveTab] = React.useState<'outline' | 'comments' | 'settings'>('outline');
  
  return (
    <div 
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        open ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      {/* Sidebar header */}
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700">
          {activeTab === 'outline' && 'Document Outline'}
          {activeTab === 'comments' && 'Comments'}
          {activeTab === 'settings' && 'Document Settings'}
        </h2>
        <button 
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded p-1"
        >
          <ChevronLeft size={16} />
        </button>
      </div>
      
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'outline' && (
          <div className="space-y-2">
            <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm font-medium">
              Document Title
            </div>
            <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm pl-4">
              Section Heading
            </div>
            <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm pl-6">
              Subsection Heading
            </div>
            <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm pl-4">
              Another Section
            </div>
          </div>
        )}
        
        {activeTab === 'comments' && (
          <div className="text-sm text-gray-500 italic p-4 text-center">
            No comments yet
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Page Setup</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Page size:</span>
                  <select className="border rounded px-2 py-1 text-sm">
                    <option>Letter (8.5" x 11")</option>
                    <option>A4 (8.27" x 11.69")</option>
                    <option>Legal (8.5" x 14")</option>
                  </select>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Orientation:</span>
                  <select className="border rounded px-2 py-1 text-sm">
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Margins</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Top</label>
                  <input type="text" value="1.0 in" className="border rounded px-2 py-1 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Bottom</label>
                  <input type="text" value="1.0 in" className="border rounded px-2 py-1 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Left</label>
                  <input type="text" value="1.5 in" className="border rounded px-2 py-1 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Right</label>
                  <input type="text" value="1.0 in" className="border rounded px-2 py-1 text-sm" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Sidebar tabs */}
      <div className="border-t border-gray-200 p-2 flex justify-around">
        <button 
          className={`p-2 rounded ${activeTab === 'outline' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('outline')}
          title="Document Outline"
        >
          <FileText size={16} />
        </button>
        <button 
          className={`p-2 rounded ${activeTab === 'comments' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('comments')}
          title="Comments"
        >
          <Search size={16} />
        </button>
        <button 
          className={`p-2 rounded ${activeTab === 'settings' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('settings')}
          title="Document Settings"
        >
          <Layout size={16} />
        </button>
      </div>
    </div>
  );
};

// Collapsed sidebar button when sidebar is hidden
export const SidebarToggle: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-r-md p-1 shadow-sm"
      title="Open Sidebar"
    >
      <ChevronRight size={16} className="text-gray-500" />
    </button>
  );
};

export default Sidebar;