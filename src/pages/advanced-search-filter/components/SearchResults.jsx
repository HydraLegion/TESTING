import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchResults = ({ 
  results, 
  searchQuery, 
  onSort, 
  sortConfig, 
  selectedRows, 
  onRowSelect, 
  onSelectAll,
  onBulkAction 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return results?.slice(startIndex, startIndex + itemsPerPage);
  }, [results, currentPage]);

  const totalPages = Math.ceil(results?.length / itemsPerPage);

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text?.toString()?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-foreground px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const handleSort = (column) => {
    const direction = sortConfig?.column === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort(column, direction);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Name', width: '200px' },
    { key: 'email', label: 'Email', width: '250px' },
    { key: 'department', label: 'Department', width: '150px' },
    { key: 'salary', label: 'Salary', width: '120px' },
    { key: 'hire_date', label: 'Hire Date', width: '120px' },
    { key: 'status', label: 'Status', width: '100px' },
    { key: 'location', label: 'Location', width: '150px' },
    { key: 'manager', label: 'Manager', width: '180px' }
  ];

  const formatCellValue = (value, column) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-muted-foreground italic">—</span>;
    }
    
    switch (column) {
      case 'salary':
        return `$${Number(value)?.toLocaleString()}`;
      case 'hire_date':
        return new Date(value)?.toLocaleDateString();
      case 'status':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active' ? 'bg-success/10 text-success' :
            value === 'Inactive'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
          }`}>
            {value}
          </span>
        );
      default:
        return highlightText(value, searchQuery);
    }
  };

  if (results?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <div className="text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Results Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Use wildcards (*) for partial matches</p>
            <p>• Try boolean operators (AND, OR, NOT)</p>
            <p>• Check your spelling and try different terms</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-surface">
      {/* Bulk Actions Bar */}
      {selectedRows?.length > 0 && (
        <div className="bg-primary/5 border-b border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedRows?.length} row{selectedRows?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('export')}
                iconName="Download"
                iconPosition="left"
              >
                Export Selected
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('delete')}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Results Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border sticky top-0 z-10">
            <tr>
              <th className="w-12 p-3 text-left">
                <Checkbox
                  checked={selectedRows?.length === results?.length && results?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  indeterminate={selectedRows?.length > 0 && selectedRows?.length < results?.length}
                />
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/80 transition-smooth"
                  style={{ width: column?.width }}
                  onClick={() => handleSort(column?.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label}</span>
                    <Icon 
                      name={getSortIcon(column?.key)} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedResults?.map((row, index) => (
              <tr
                key={row?.id}
                className={`border-b border-border hover:bg-muted/30 transition-smooth ${
                  selectedRows?.includes(row?.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="p-3">
                  <Checkbox
                    checked={selectedRows?.includes(row?.id)}
                    onChange={(e) => onRowSelect(row?.id, e?.target?.checked)}
                  />
                </td>
                {columns?.map((column) => (
                  <td key={column?.key} className="p-3 text-sm">
                    {formatCellValue(row?.[column?.key], column?.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, results?.length)} of {results?.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-muted-foreground">...</span>
                    <Button
                      variant={currentPage === totalPages ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;