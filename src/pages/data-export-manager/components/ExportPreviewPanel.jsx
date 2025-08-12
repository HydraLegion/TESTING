import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportPreviewPanel = ({ 
  selectedFormat, 
  selectedFields, 
  exportRange,
  previewData 
}) => {
  const [previewMode, setPreviewMode] = useState('formatted');

  const sampleData = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      salary: 95000,
      hire_date: "2022-03-15",
      status: "Active",
      manager: "David Chen"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@company.com",
      department: "Marketing",
      salary: 72000,
      hire_date: "2021-08-22",
      status: "Active",
      manager: "Lisa Wang"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "Sales",
      salary: 68000,
      hire_date: "2023-01-10",
      status: "Active",
      manager: "Robert Kim"
    }
  ];

  const filteredData = sampleData?.map(item => {
    const filtered = {};
    selectedFields?.forEach(field => {
      if (item?.[field] !== undefined) {
        filtered[field] = item?.[field];
      }
    });
    return filtered;
  });

  const generatePreview = () => {
    if (selectedFormat === 'json') {
      return JSON.stringify(filteredData, null, 2);
    } else if (selectedFormat === 'csv') {
      if (filteredData?.length === 0) return '';
      
      const headers = Object.keys(filteredData?.[0]);
      const csvHeaders = headers?.join(',');
      const csvRows = filteredData?.map(row => 
        headers?.map(header => {
          const value = row?.[header];
          return typeof value === 'string' && value?.includes(',') 
            ? `"${value}"` 
            : value;
        })?.join(',')
      );
      
      return [csvHeaders, ...csvRows]?.join('\n');
    } else if (selectedFormat === 'excel') {
      return `Excel format preview:\nWorksheet: Sheet1\nColumns: ${Object.keys(filteredData?.[0] || {})?.join(', ')}\nRows: ${filteredData?.length}\nFormatting: Preserved`;
    }
    
    return 'Select a format to see preview';
  };

  const getLanguageForFormat = () => {
    switch (selectedFormat) {
      case 'json': return 'json';
      case 'csv': return 'csv';
      case 'excel': return 'text';
      default: return 'text';
    }
  };

  const formatFileSize = (data) => {
    const size = new Blob([data])?.size;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024)?.toFixed(1)} KB`;
    return `${(size / (1024 * 1024))?.toFixed(1)} MB`;
  };

  const previewContent = generatePreview();

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Preview</h2>
              <p className="text-sm text-muted-foreground">
                {selectedFormat?.toUpperCase()} format • {filteredData?.length} records
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode === 'formatted' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('formatted')}
            >
              <Icon name="Code" size={16} />
              <span className="ml-2 hidden sm:inline">Formatted</span>
            </Button>
            <Button
              variant={previewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('table')}
            >
              <Icon name="Table" size={16} />
              <span className="ml-2 hidden sm:inline">Table</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Preview Stats */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{filteredData?.length}</div>
            <div className="text-xs text-muted-foreground">Records</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{selectedFields?.length}</div>
            <div className="text-xs text-muted-foreground">Fields</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{formatFileSize(previewContent)}</div>
            <div className="text-xs text-muted-foreground">Est. Size</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{selectedFormat?.toUpperCase()}</div>
            <div className="text-xs text-muted-foreground">Format</div>
          </div>
        </div>
      </div>
      {/* Preview Content */}
      <div className="flex-1 overflow-hidden">
        {previewMode === 'formatted' ? (
          <div className="h-full overflow-auto">
            <pre className="p-6 text-sm font-mono text-foreground whitespace-pre-wrap break-words">
              {previewContent}
            </pre>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            {filteredData?.length > 0 ? (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        {Object.keys(filteredData?.[0])?.map((header) => (
                          <th
                            key={header}
                            className="border border-border px-4 py-2 text-left text-sm font-medium text-foreground"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData?.map((row, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          {Object.values(row)?.map((value, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-border px-4 py-2 text-sm text-foreground"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Icon name="Table" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No fields selected for preview</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Preview shows first 3 records</span>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
              <span className="ml-2">Download Sample</span>
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} />
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPreviewPanel;