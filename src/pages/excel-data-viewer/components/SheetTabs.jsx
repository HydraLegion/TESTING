import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SheetTabs = ({ sheets, activeSheet, onSheetChange, onAddSheet, onDeleteSheet }) => {
  return (
    <div className="flex items-center bg-surface border-b border-border px-4 py-2 overflow-x-auto">
      <div className="flex items-center space-x-1 min-w-0 flex-1">
        {sheets?.map((sheet) => (
          <button
            key={sheet?.id}
            onClick={() => onSheetChange(sheet?.id)}
            className={`
              flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-smooth
              ${activeSheet === sheet?.id
                ? 'bg-primary text-primary-foreground shadow-elevation-1'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name="FileSpreadsheet" size={14} />
            <span>{sheet?.name}</span>
            {sheets?.length > 1 && (
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onDeleteSheet(sheet?.id);
                }}
                className="ml-1 p-0.5 rounded hover:bg-destructive hover:text-destructive-foreground transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            )}
          </button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onAddSheet}
        className="ml-2 flex-shrink-0"
      >
        <Icon name="Plus" size={16} />
        <span className="ml-1 hidden sm:inline">Add Sheet</span>
      </Button>
    </div>
  );
};

export default SheetTabs;