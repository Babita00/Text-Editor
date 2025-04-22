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
  export default ToolbarButton;