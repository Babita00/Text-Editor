import  { useState,useRef } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import { DocumentProvider } from './context/DocumentContext';
import { File, FileMinus as FileMenu, Save, Settings } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null); // ✅ define editorRef here

  
  return (
    <DocumentProvider>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-2 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <File className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="text-lg font-medium text-gray-800">DocEditor</h1>
            </div>
            <div className="flex space-x-3">
              <button className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full">
                <FileMenu size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full">
                <Save size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Editor Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar editorRef={editorRef} />
          <Editor editorRef={editorRef} />
          </div>
        </div>
      </div>
    </DocumentProvider>
  );
}

export default App;