import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DataGrid = ({ 
  data, 
  columns, 
  searchTerm, 
  onCellEdit, 
  selectedRows, 
  onRowSelect, 
  onSelectAll,
  sortColumn,
  sortDirection 
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data;
    
    // Apply search filter
    if (searchTerm) {
      filtered = data?.filter(row =>
        Object.values(row)?.some(value =>
          value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    if (sortColumn && sortDirection) {
      filtered = [...filtered]?.sort((a, b) => {
        const aVal = a?.[sortColumn] || '';
        const bVal = b?.[sortColumn] || '';
        
        if (sortDirection === 'asc') {
          return aVal?.toString()?.localeCompare(bVal?.toString());
        } else {
          return bVal?.toString()?.localeCompare(aVal?.toString());
        }
      });
    }
    
    return filtered;
  }, [data, searchTerm, sortColumn, sortDirection]);

  const handleCellClick = (rowIndex, columnKey, currentValue) => {
    setEditingCell({ rowIndex, columnKey });
    setEditValue(currentValue || '');
  };

  const handleCellSave = () => {
    if (editingCell) {
      onCellEdit(editingCell?.rowIndex, editingCell?.columnKey, editValue);
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text?.toString()?.split(regex);
    
    return parts?.map((part, index) =>
      regex?.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-foreground rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const isAllSelected = selectedRows?.length === processedData?.length && processedData?.length > 0;
  const isIndeterminate = selectedRows?.length > 0 && selectedRows?.length < processedData?.length;

  return (
    <div className="flex-1 overflow-hidden bg-surface">
      {/* Desktop Data Grid */}
      <div className="hidden md:block h-full overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-muted border-b border-border z-10">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border focus:ring-2 focus:ring-primary"
                />
              </th>
              <th className="w-12 p-3 text-left text-sm font-medium text-muted-foreground">
                #
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="p-3 text-left text-sm font-medium text-muted-foreground border-r border-border last:border-r-0"
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label}</span>
                    {sortColumn === column?.key && (
                      <Icon 
                        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        size={14} 
                        className="text-primary"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData?.map((row, rowIndex) => (
              <tr
                key={row?.id || rowIndex}
                className={`
                  border-b border-border hover:bg-muted/50 transition-smooth
                  ${selectedRows?.includes(row?.id || rowIndex) ? 'bg-accent/10' : ''}
                `}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(row?.id || rowIndex)}
                    onChange={(e) => onRowSelect(row?.id || rowIndex, e?.target?.checked)}
                    className="rounded border-border focus:ring-2 focus:ring-primary"
                  />
                </td>
                <td className="p-3 text-sm text-muted-foreground font-mono">
                  {rowIndex + 1}
                </td>
                {columns?.map((column) => (
                  <td
                    key={column?.key}
                    className="p-3 border-r border-border last:border-r-0 cursor-pointer hover:bg-muted/30"
                    onClick={() => handleCellClick(rowIndex, column?.key, row?.[column?.key])}
                  >
                    {editingCell?.rowIndex === rowIndex && editingCell?.columnKey === column?.key ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e?.target?.value)}
                          className="h-8 text-sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e?.key === 'Enter') handleCellSave();
                            if (e?.key === 'Escape') handleCellCancel();
                          }}
                        />
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={handleCellSave}
                          >
                            <Icon name="Check" size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={handleCellCancel}
                          >
                            <Icon name="X" size={12} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm">
                        {row?.[column?.key] ? (
                          highlightSearchTerm(row?.[column?.key], searchTerm)
                        ) : (
                          <span className="text-muted-foreground italic">Empty</span>
                        )}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {processedData?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="FileX" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Data Found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'No results match your search criteria.' : 'No data available to display.'}
            </p>
          </div>
        )}
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden h-full overflow-auto p-4 space-y-4">
        {processedData?.map((row, rowIndex) => (
          <div
            key={row?.id || rowIndex}
            className={`
              bg-card border border-border rounded-lg p-4 shadow-elevation-1
              ${selectedRows?.includes(row?.id || rowIndex) ? 'ring-2 ring-primary' : ''}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedRows?.includes(row?.id || rowIndex)}
                  onChange={(e) => onRowSelect(row?.id || rowIndex, e?.target?.checked)}
                  className="rounded border-border focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  Row {rowIndex + 1}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {/* Handle mobile edit */}}
              >
                <Icon name="Edit2" size={16} />
              </Button>
            </div>
            
            <div className="space-y-2">
              {columns?.slice(0, 4)?.map((column) => (
                <div key={column?.key} className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {column?.label}:
                  </span>
                  <span className="text-sm text-foreground">
                    {row?.[column?.key] ? (
                      highlightSearchTerm(row?.[column?.key], searchTerm)
                    ) : (
                      <span className="text-muted-foreground italic">Empty</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {processedData?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="FileX" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Data Found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'No results match your search criteria.' : 'No data available to display.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataGrid;