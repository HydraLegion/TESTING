import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataSidebar = ({ 
  sheets, 
  activeSheet, 
  onSheetChange, 
  dataStats, 
  isCollapsed, 
  onToggleCollapse,
  filename 
}) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat()?.format(num || 0);
  };

  const formatPercentage = (value, total) => {
    if (!total) return "0%";
    return `${Math.round((value / total) * 100)}%`;
  };

  return (
    <div className={`bg-muted border-r border-border transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'}`}>
      {/* Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h3 className="font-medium text-foreground">Data Overview</h3>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6">
          {/* File Info */}
          {filename && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Current File</h4>
              <div className="flex items-center space-x-2 p-2 bg-surface rounded-lg">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground truncate">{filename}</span>
              </div>
            </div>
          )}

          {/* Sheet Navigation */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Sheets ({sheets?.length})</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {sheets?.map((sheet) => (
                <button
                  key={sheet?.id}
                  onClick={() => onSheetChange?.(sheet?.id)}
                  className={`
                    w-full flex items-center justify-between p-2 rounded-md text-sm transition-smooth
                    ${activeSheet === sheet?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-surface text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="FileSpreadsheet" size={14} />
                    <span className="truncate">{sheet?.name}</span>
                  </div>
                  <span className="text-xs opacity-75">{sheet?.rowCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Data Statistics */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Current Sheet Stats</h4>
            <div className="space-y-3">
              {/* Rows and Columns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Rows" size={14} className="text-primary" />
                    <span className="text-xs text-muted-foreground">Rows</span>
                  </div>
                  <div className="text-lg font-semibold text-foreground mt-1">
                    {formatNumber(dataStats?.totalRows)}
                  </div>
                </div>
                
                <div className="p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Columns" size={14} className="text-primary" />
                    <span className="text-xs text-muted-foreground">Columns</span>
                  </div>
                  <div className="text-lg font-semibold text-foreground mt-1">
                    {formatNumber(dataStats?.totalColumns)}
                  </div>
                </div>
              </div>

              {/* Data Quality */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Filled Cells</span>
                  <span className="text-xs font-medium text-foreground">
                    {formatPercentage(dataStats?.filledCells, dataStats?.filledCells + dataStats?.emptyCells)}
                  </span>
                </div>
                <div className="w-full bg-muted-foreground/20 rounded-full h-1.5">
                  <div
                    className="bg-success h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.round((dataStats?.filledCells / (dataStats?.filledCells + dataStats?.emptyCells)) * 100) || 0}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatNumber(dataStats?.filledCells)} filled</span>
                  <span>{formatNumber(dataStats?.emptyCells)} empty</span>
                </div>
              </div>

              {/* Total Cells */}
              <div className="p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Grid3x3" size={14} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Total Cells</span>
                </div>
                <div className="text-lg font-semibold text-foreground mt-1">
                  {formatNumber((dataStats?.totalRows || 0) * (dataStats?.totalColumns || 0))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                iconName="FileText"
                iconPosition="left"
              >
                Export to CSV
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                iconName="FileSpreadsheet"
                iconPosition="left"
              >
                Export to Excel
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                iconName="Copy"
                iconPosition="left"
              >
                Copy Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed state content */}
      {isCollapsed && (
        <div className="p-2 space-y-2">
          <div className="flex flex-col items-center text-center">
            <Icon name="BarChart3" size={20} className="text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{dataStats?.totalRows}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSidebar;