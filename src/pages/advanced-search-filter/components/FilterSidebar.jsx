import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onSaveFilter,
  availableColumns = []
}) => {
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleColumnToggle = (column, checked) => {
    const updatedColumns = checked
      ? [...filters?.selectedColumns, column]
      : filters?.selectedColumns?.filter(col => col !== column);
    
    onFilterChange?.('selectedColumns', updatedColumns);
  };

  const handleColumnValueChange = (column, value) => {
    const updatedValues = {
      ...filters?.columnValues,
      [column]: value
    };
    onFilterChange?.('columnValues', updatedValues);
  };

  const handleSaveFilter = () => {
    if (saveFilterName?.trim()) {
      onSaveFilter?.(saveFilterName, filters);
      setSaveFilterName('');
      setShowSaveDialog(false);
    }
  };

  const getColumnType = (column) => {
    // Simple heuristic to determine column type
    if (column?.includes('date') || column?.includes('time')) return 'date';
    if (column?.includes('salary') || column?.includes('amount') || column?.includes('price')) return 'number';
    if (column?.includes('email')) return 'email';
    return 'text';
  };

  const formatColumnName = (column) => {
    return column?.charAt(0)?.toUpperCase() + column?.slice(1)?.replace(/([A-Z])/g, ' $1')?.trim();
  };

  return (
    <div className="h-full bg-muted border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Advanced Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onClearFilters}
          >
            Clear
          </Button>
        </div>

        {/* Column Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Column Filters</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availableColumns?.map((column) => (
              <div key={column} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.selectedColumns?.includes(column)}
                    onCheckedChange={(checked) => handleColumnToggle(column, checked)}
                  />
                  <span className="text-sm text-foreground">{formatColumnName(column)}</span>
                  <Icon name={getColumnType(column) === 'date' ? 'Calendar' : getColumnType(column) === 'number' ? 'Hash' : 'Type'} size={12} className="text-muted-foreground" />
                </div>
                
                {filters?.selectedColumns?.includes(column) && (
                  <div className="ml-6">
                    <Input
                      placeholder={`Filter ${formatColumnName(column)}...`}
                      value={filters?.columnValues?.[column] || ''}
                      onChange={(e) => handleColumnValueChange(column, e?.target?.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Date Range</h4>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground">From</label>
              <Input
                type="date"
                value={filters?.dateFrom}
                onChange={(e) => onFilterChange?.('dateFrom', e?.target?.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">To</label>
              <Input
                type="date"
                value={filters?.dateTo}
                onChange={(e) => onFilterChange?.('dateTo', e?.target?.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Value Range Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Value Range</h4>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground">Minimum</label>
              <Input
                type="number"
                placeholder="Min value"
                value={filters?.minValue}
                onChange={(e) => onFilterChange?.('minValue', e?.target?.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Maximum</label>
              <Input
                type="number"
                placeholder="Max value"
                value={filters?.maxValue}
                onChange={(e) => onFilterChange?.('maxValue', e?.target?.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Search Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Search Options</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters?.includeEmpty}
                onCheckedChange={(checked) => onFilterChange?.('includeEmpty', checked)}
              />
              <span className="text-sm text-foreground">Include empty cells</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters?.caseSensitive}
                onCheckedChange={(checked) => onFilterChange?.('caseSensitive', checked)}
              />
              <span className="text-sm text-foreground">Case sensitive</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters?.exactMatch}
                onCheckedChange={(checked) => onFilterChange?.('exactMatch', checked)}
              />
              <span className="text-sm text-foreground">Exact match only</span>
            </div>
          </div>
        </div>

        {/* Save Filter */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            iconName="Bookmark"
            onClick={() => setShowSaveDialog(true)}
          >
            Save Current Filter
          </Button>

          {showSaveDialog && (
            <div className="space-y-2">
              <Input
                placeholder="Filter name..."
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e?.target?.value)}
                className="h-8 text-sm"
              />
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveFilter}
                  disabled={!saveFilterName?.trim()}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setSaveFilterName('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;