import React, { useState } from 'react';
import { Type, ChevronDown } from 'lucide-react';

interface FormattingMenuProps {
  position: { top: number; left: number } | null;
  onFormat: (format: string, value?: any) => void;
  onClose: () => void;
}

const FormattingMenu: React.FC<FormattingMenuProps> = ({ position, onFormat, onClose }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  if (!position) return null;
  
  const handleFormat = (format: string, value?: any) => {
    onFormat(format, value);
    onClose();
  };
  
  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };
  
  return (
    <div 
      className="fixed bg-white rounded-md shadow-lg border border-gray-200 z-50"
      style={{ top: position.top, left: position.left }}
    >
      <div className="p-1 flex">
        {/* Basic formatting */}
        <button 
          className="p-1 rounded hover:bg-gray-100" 
          onClick={() => handleFormat('bold')}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-100" 
          onClick={() => handleFormat('italic')}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-100" 
          onClick={() => handleFormat('underline')}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>
        
        {/* Divider */}
        <div className="mx-1 w-px bg-gray-200"></div>
        
        {/* Heading dropdown */}
        <div className="relative">
          <button 
            className="p-1 rounded hover:bg-gray-100 flex items-center"
            onClick={() => toggleSubmenu('heading')}
          >
            <Type size={14} className="mr-1" />
            <span className="text-xs">Heading</span>
            <ChevronDown size={14} />
          </button>
          
          {activeSubmenu === 'heading' && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded shadow-lg border border-gray-200 w-40">
              <button 
                className="w-full text-left px-3 py-1 text-base hover:bg-gray-100"
                onClick={() => handleFormat('heading', 1)}
              >
                <span className="font-bold text-base">Heading 1</span>
              </button>
              <button 
                className="w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFormat('heading', 2)}
              >
                <span className="font-bold text-sm">Heading 2</span>
              </button>
              <button 
                className="w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFormat('heading', 3)}
              >
                <span className="font-bold italic text-xs">Heading 3</span>
              </button>
              <button 
                className="w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFormat('heading', 4)}
              >
                <span className="font-bold text-xs">Heading 4</span>
              </button>
              <button 
                className="w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFormat('paragraph')}
              >
                <span className="text-xs">Normal text</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormattingMenu;