import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onSearch, 
  searchMode, 
  onSearchModeChange,
  onExportResults,
  resultCount,
  isSearching,
  filename 
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const searchModes = [
    { value: 'contains', label: 'Contains' },
    { value: 'exact', label: 'Exact Match' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'regex', label: 'Regex' },
    { value: 'boolean', label: 'Boolean (AND/OR)' }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: 'FileText' },
    { value: 'json', label: 'JSON', icon: 'Brackets' },
    { value: 'excel', label: 'Excel (XLSX)', icon: 'FileSpreadsheet' }
  ];

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      onSearch?.();
    }
  };

  const handleExport = (format) => {
    onExportResults?.(format);
    setShowExportMenu(false);
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
              <Icon name="Search" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Advanced Search</h1>
              <p className="text-muted-foreground mt-1">
                {filename ? `Searching in ${filename}` : 'Complex queries and data filtering with real-time results'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground">
              {resultCount !== undefined && (
                <span className="font-medium">{resultCount} results</span>
              )}
            </div>
            
            {/* Export Menu */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={!resultCount}
              >
                Export
              </Button>

              {showExportMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-3 z-50">
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                      Export {resultCount} results
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
          </div>
        </div>

        {/* Search Controls */}
        <div className="space-y-4">
          {/* Main Search */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={18} className="text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Enter your search query... (supports regex, boolean operators)"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-11 pr-4 h-12 text-base"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Select
                value={searchMode}
                onValueChange={onSearchModeChange}
                className="w-40"
              >
                {searchModes?.map((mode) => (
                  <option key={mode?.value} value={mode?.value}>
                    {mode?.label}
                  </option>
                ))}
              </Select>

              <Button
                variant="default"
                size="lg"
                iconName="Search"
                onClick={onSearch}
                loading={isSearching}
                disabled={!searchQuery?.trim()}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Search Mode Info */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} />
              <span>Search mode: <strong>{searchModes?.find(m => m?.value === searchMode)?.label}</strong></span>
            </div>
            
            {searchMode === 'regex' && (
              <div className="flex items-center space-x-1">
                <Icon name="Code" size={14} />
                <span>Use regex patterns like: /^[A-Z].*ing$/</span>
              </div>
            )}
            
            {searchMode === 'boolean' && (
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={14} />
                <span>Use: AND, OR, NOT (e.g., "John AND Engineer")</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close export menu when clicking outside */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
};

export default SearchHeader;