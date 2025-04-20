import React, { useState } from 'react';
import { 
  Save, FileDown, Upload, 
  Plus, Copy, Trash, FilePlus, 
  RotateCcw, History 
} from 'lucide-react';
import { useContext } from 'react';
import { DocumentContext } from '../context/DocumentContext';

interface FileOperationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileOperations: React.FC<FileOperationsProps> = ({ isOpen, onClose }) => {
  const { documentState } = useContext(DocumentContext);
  
  const exportAsPDF = () => {
    alert('Exporting as PDF... (Not implemented in this demo)');
    onClose();
  };
  
  const exportAsDOCX = () => {
    alert('Exporting as DOCX... (Not implemented in this demo)');
    onClose();
  };
  
  const saveDocument = () => {
    console.log('Saving document:', documentState);
    alert('Document saved successfully!');
    onClose();
  };
  
  const createNewDocument = () => {
    if (confirm('Create a new document? Any unsaved changes will be lost.')) {
      // Implementation would reset document state
      onClose();
    }
  };
  
  const importDocument = () => {
    alert('Import feature not implemented in this demo');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-12 left-4 bg-white rounded-md shadow-lg border border-gray-200 w-64 z-10">
      <div className="py-1">
        <MenuItem icon={<FilePlus size={16} />} label="New document" onClick={createNewDocument} />
        <MenuItem icon={<Upload size={16} />} label="Import document" onClick={importDocument} />
        <MenuItem icon={<Save size={16} />} label="Save" onClick={saveDocument} />
        
        <div className="border-t border-gray-200 my-1"></div>
        
        <MenuItem icon={<FileDown size={16} />} label="Export as PDF" onClick={exportAsPDF} />
        <MenuItem icon={<FileDown size={16} />} label="Export as DOCX" onClick={exportAsDOCX} />
        
        <div className="border-t border-gray-200 my-1"></div>
        
        <MenuItem icon={<Copy size={16} />} label="Make a copy" onClick={() => {}} />
        <MenuItem icon={<History size={16} />} label="Version history" onClick={() => {}} />
        
        <div className="border-t border-gray-200 my-1"></div>
        
        <MenuItem icon={<Trash size={16} />} label="Delete" className="text-red-600" onClick={() => {}} />
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick, className = '' }) => {
  return (
    <button 
      className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100 ${className}`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default FileOperations;