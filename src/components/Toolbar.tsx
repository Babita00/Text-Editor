import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, List, ListOrdered, Image, Table, Undo, 
  Redo, Type, Search
} from 'lucide-react';

const FontSizeOptions = ['8', '10', '12', '14', '16', '18', '24', '30', '36', '48', '60', '72'];
const FontFamilyOptions = [
  'Times New Roman', 'Arial', 'Helvetica', 'Courier New', 
  'Georgia', 'Verdana', 'Tahoma', 'Trebuchet MS'
];

const Toolbar: React.FC = () => {
  const [fontSize, setFontSize] = useState('12');
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-1 flex flex-wrap items-center gap-1">
      {/* Font Controls */}
      <div className="flex items-center mr-2">
        <select 
          className="text-sm border border-gray-300 rounded px-2 py-1 mr-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {FontFamilyOptions.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        
        <select 
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          {FontSizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Text Formatting */}
      <ToolbarButton icon={<Bold size={16} />} tooltip="Bold (Ctrl+B)" />
      <ToolbarButton icon={<Italic size={16} />} tooltip="Italic (Ctrl+I)" />
      <ToolbarButton icon={<Underline size={16} />} tooltip="Underline (Ctrl+U)" />
      <ToolbarButton icon={<Type size={16} />} tooltip="Text Color" />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Alignment */}
      <ToolbarButton icon={<AlignLeft size={16} />} tooltip="Align Left" />
      <ToolbarButton icon={<AlignCenter size={16} />} tooltip="Align Center" />
      <ToolbarButton icon={<AlignRight size={16} />} tooltip="Align Right" />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Lists */}
      <ToolbarButton icon={<List size={16} />} tooltip="Bullet List" />
      <ToolbarButton icon={<ListOrdered size={16} />} tooltip="Numbered List" />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Insert */}
      <ToolbarButton icon={<Image size={16} />} tooltip="Insert Image" />
      <ToolbarButton icon={<Table size={16} />} tooltip="Insert Table" />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Undo/Redo */}
      <ToolbarButton icon={<Undo size={16} />} tooltip="Undo (Ctrl+Z)" />
      <ToolbarButton icon={<Redo size={16} />} tooltip="Redo (Ctrl+Y)" />
      
      {/* Search */}
      <div className="ml-auto">
        <ToolbarButton icon={<Search size={16} />} tooltip="Find and Replace (Ctrl+F)" />
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  active?: boolean;
  onClick?: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  tooltip, 
  active = false, 
  onClick 
}) => {
  return (
    <button 
      className={`p-1.5 rounded hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`} 
      title={tooltip}
      onClick={onClick}
    >
      <span className={`text-gray-700 ${active ? 'text-blue-600' : ''}`}>
        {icon}
      </span>
    </button>
  );
};

export default Toolbar;