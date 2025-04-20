import React, { useState } from 'react';
import { Image, Table, BarChart as ChartBar, FileSymlink, Sigma } from 'lucide-react';

interface InsertMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (type: string, data?: any) => void;
}

const InsertMenu: React.FC<InsertMenuProps> = ({ isOpen, onClose, onInsert }) => {
  const [tableData, setTableData] = useState({
    rows: 3,
    columns: 3,
    headers: true
  });
  
  const [showTableDialog, setShowTableDialog] = useState(false);
  
  const handleInsertTable = () => {
    setShowTableDialog(true);
  };
  
  const handleTableConfirm = () => {
    onInsert('table', tableData);
    setShowTableDialog(false);
    onClose();
  };
  
  const handleInsertImage = () => {
    // In a real implementation, this would open a file picker
    alert('Image insertion would open a file picker in a complete implementation');
    onClose();
  };
  
  const handleInsertEquation = () => {
    // In a real implementation, this would open an equation editor
    alert('Equation editor would open in a complete implementation');
    onClose();
  };
  
  if (!isOpen) return null;
  
  if (showTableDialog) {
    return (
      <div className="absolute top-12 left-4 bg-white rounded-md shadow-lg border border-gray-200 p-4 w-64 z-10">
        <h3 className="text-sm font-medium mb-3">Insert Table</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Rows</label>
            <input 
              type="number" 
              min="1" 
              max="20" 
              value={tableData.rows} 
              onChange={(e) => setTableData({...tableData, rows: parseInt(e.target.value)})}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Columns</label>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={tableData.columns} 
              onChange={(e) => setTableData({...tableData, columns: parseInt(e.target.value)})}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="headers"
              checked={tableData.headers} 
              onChange={(e) => setTableData({...tableData, headers: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="headers" className="text-xs">Include header row</label>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button 
            className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
            onClick={() => setShowTableDialog(false)}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleTableConfirm}
          >
            Insert
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="absolute top-12 left-4 bg-white rounded-md shadow-lg border border-gray-200 w-48 z-10">
      <div className="py-1">
        <button 
          className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100"
          onClick={handleInsertImage}
        >
          <Image size={16} className="mr-2" />
          Image
        </button>
        
        <button 
          className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100"
          onClick={handleInsertTable}
        >
          <Table size={16} className="mr-2" />
          Table
        </button>
        
        <button 
          className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100"
          onClick={handleInsertEquation}
        >
          <Sigma size={16} className="mr-2" />
          Equation
        </button>
        
        <button 
          className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100"
          onClick={() => {
            onInsert('pageBreak');
            onClose();
          }}
        >
          <FileSymlink size={16} className="mr-2" />
          Page break
        </button>
        
        <button 
          className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100"
          onClick={() => {
            onInsert('chart');
            onClose();
          }}
        >
          <ChartBar size={16} className="mr-2" />
          Chart
        </button>
      </div>
    </div>
  );
};

export default InsertMenu;