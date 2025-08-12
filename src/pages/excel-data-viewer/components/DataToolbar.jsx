import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const DataToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  onClearData, 
  onDeleteSelected, 
  onExportData,
  selectedRowsCount,
  sortColumn,
  sortDirection,
  onSort,
  columns,
  onOpenAdvancedSearch
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: 'FileText' },
    { value: 'json', label: 'JSON', icon: 'Brackets' },
    { value: 'excel', label: 'Excel (XLSX)', icon: 'FileSpreadsheet' }
  ];

  const handleExport = (format) => {
    onExportData?.(format);
    setShowExportMenu(false);
  };

  const handleSort = (column, direction) => {
    onSort?.(column, direction);
    setShowSortMenu(false);
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="flex items-center justify-between p-4">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search in current sheet..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e?.target?.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange?.('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon name="X" size={16} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Search"
            onClick={onOpenAdvancedSearch}
          >
            Advanced Search
          </Button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Selection Info */}
          {selectedRowsCount > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mr-4">
              <span>{selectedRowsCount} selected</span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={onDeleteSelected}
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          )}

          {/* Sort Menu */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowUpDown"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort
            </Button>

            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-3 z-50">
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                    Sort by Column
                  </div>
                  {columns?.slice(0, 5)?.map((column) => (
                    <div key={column?.key} className="px-3 py-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{column?.label}</span>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleSort(column?.key, 'asc')}
                            className={sortColumn === column?.key && sortDirection === 'asc' ? 'text-primary' : ''}
                          >
                            <Icon name="ArrowUp" size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleSort(column?.key, 'desc')}
                            className={sortColumn === column?.key && sortDirection === 'desc' ? 'text-primary' : ''}
                          >
                            <Icon name="ArrowDown" size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export Menu */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              Export
            </Button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-3 z-50">
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                    Export Format
                  </div>
                  {exportFormats?.map((format) => (
                    <button
                      key={format?.value}
                      onClick={() => handleExport(format?.value)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-smooth"
                    >
                      <Icon name={format?.icon} size={16} />
                      <span>{format?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* More Actions */}
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
          />
        </div>
      </div>

      {/* Close menus when clicking outside */}
      {(showExportMenu || showSortMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowExportMenu(false);
            setShowSortMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default DataToolbar;