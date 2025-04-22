import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, List, ListOrdered, Image, Table, Undo, 
  Redo, Type
} from 'lucide-react';

const FontSizeOptions = ['8', '10', '12', '14', '16', '18', '24', '30', '36', '48', '60', '72'];
const FontFamilyOptions = [
  'Times New Roman', 'Arial', 'Helvetica', 'Courier New', 
  'Georgia', 'Verdana', 'Tahoma', 'Trebuchet MS'
];

interface ToolbarProps {
  editorRef: React.RefObject<HTMLDivElement>;
}


const Toolbar: React.FC<ToolbarProps> = ({ editorRef }) => {

  const applyFormatting = (command: string, value?: string) => {
  const editor = editorRef.current;
  if (editor) {
    editor.focus();
    document.execCommand(command, false, value);
  }
};

 
  const [fontSize, setFontSize] = useState('12');
  const [fontFamily, setFontFamily] = useState('Times New Roman');

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    applyFormatting('fontName', font);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    // Convert pt to relative size for execCommand
    const sizeIndex = Math.min(7, Math.max(1, Math.floor(parseInt(size) / 6)));
    applyFormatting('fontSize', sizeIndex.toString());
  };

  const handleAlignment = (align: string) => {
    applyFormatting(`justify${align}`);
  };

  const handleUndo = () => {
    applyFormatting('undo');
  };

  const handleRedo = () => {
    applyFormatting('redo');
  };

  const handleList = (type: 'ordered' | 'unordered') => {
    applyFormatting(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
  };
  const insertHTML = (html: string) => {
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.deleteContents();
      const el = document.createElement('div');
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      while ((node = el.firstChild)) {
        frag.appendChild(node);
      }
      range.insertNode(frag);
    }
  };
  
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-1 flex flex-wrap items-center gap-1">
      {/* Font Controls */}
      <div className="flex items-center mr-2">
        <select 
          className="text-sm border border-gray-300 rounded px-2 py-1 mr-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
        >
          {FontFamilyOptions.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        
        <select 
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
        >
          {FontSizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Text Formatting */}
      <ToolbarButton 
        icon={<Bold size={16} />} 
        tooltip="Bold (Ctrl+B)" 
        onClick={() => applyFormatting('bold')}
      />
      <ToolbarButton 
        icon={<Italic size={16} />} 
        tooltip="Italic (Ctrl+I)" 
        onClick={() => applyFormatting('italic')}
      />
      <ToolbarButton 
        icon={<Underline size={16} />} 
        tooltip="Underline (Ctrl+U)" 
        onClick={() => applyFormatting('underline')}
      />
      <ToolbarButton 
        icon={<Type size={16} />} 
        tooltip="Text Color" 
        onClick={() => applyFormatting('foreColor', '#000000')}
      />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Alignment */}
      <ToolbarButton 
        icon={<AlignLeft size={16} />} 
        tooltip="Align Left" 
        onClick={() => handleAlignment('Left')}
      />
      <ToolbarButton 
        icon={<AlignCenter size={16} />} 
        tooltip="Align Center" 
        onClick={() => handleAlignment('Center')}
      />
      <ToolbarButton 
        icon={<AlignRight size={16} />} 
        tooltip="Align Right" 
        onClick={() => handleAlignment('Right')}
      />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Lists */}
      <ToolbarButton 
        icon={<List size={16} />} 
        tooltip="Bullet List" 
        onClick={() => handleList('unordered')}
      />
      <ToolbarButton 
        icon={<ListOrdered size={16} />} 
        tooltip="Numbered List" 
        onClick={() => handleList('ordered')}
      />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Insert */}
      <ToolbarButton 
        icon={<Image size={16} />} 
        tooltip="Insert Image" 
        onClick={() => {
          const url = prompt('Enter image URL');
          if (url) applyFormatting('insertImage', url);
        }}
              />
      <ToolbarButton 
        icon={<Table size={16} />} 
        tooltip="Insert Table" 
        onClick={() => insertHTML('<table><tr><td></td></tr></table>')
        }
      />
      
      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      {/* Undo/Redo */}
      <ToolbarButton 
        icon={<Undo size={16} />} 
        tooltip="Undo (Ctrl+Z)" 
        onClick={handleUndo}
      />
      <ToolbarButton 
        icon={<Redo size={16} />} 
        tooltip="Redo (Ctrl+Y)" 
        onClick={handleRedo}
      />
      
    
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