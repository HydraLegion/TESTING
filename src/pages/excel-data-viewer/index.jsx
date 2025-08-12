import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SheetTabs from './components/SheetTabs';
import DataToolbar from './components/DataToolbar';
import DataGrid from './components/DataGrid';
import DataSidebar from './components/DataSidebar';
import SearchResults from './components/SearchResults';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExcelDataViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from navigation state or localStorage
  const getInitialData = () => {
    // First try to get from navigation state
    if (location?.state?.processedData) {
      return location?.state?.processedData;
    }
    
    // Fallback to localStorage
    const savedFiles = localStorage.getItem('uploadedExcelFiles');
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        const currentFile = location?.state?.fileId 
          ? parsedFiles?.find(f => f?.id === location?.state?.fileId)
          : parsedFiles?.[0]; // Get the most recent file
        
        return currentFile?.processedData || null;
      } catch (error) {
        console.error('Error loading file data:', error);
        return null;
      }
    }
    
    return null;
  };

  const initialData = getInitialData();
  const [sheets, setSheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchResult, setCurrentSearchResult] = useState(0);

  // Initialize sheets from actual data
  useEffect(() => {
    if (initialData?.sheets && initialData?.sheets?.length > 0) {
      const processedSheets = initialData?.sheets?.map((sheet, index) => ({
        id: `sheet-${index}`,
        name: sheet?.name || `Sheet ${index + 1}`,
        rowCount: sheet?.data?.length || 0,
        data: sheet?.data || [],
        headers: sheet?.headers || []
      }));
      
      setSheets(processedSheets);
      setActiveSheet(processedSheets?.[0]?.id);
    } else {
      // Fallback to mock data if no real data available
      const mockSheets = [
        {
          id: 'sheet1',
          name: 'Sample Data',
          rowCount: 6,
          data: [
            {
              id: 1,
              date: '2024-01-15',
              product: 'Laptop Pro X1',
              category: 'Electronics',
              quantity: 5,
              unitPrice: 1299.99,
              total: 6499.95,
              salesperson: 'John Smith',
              region: 'North America',
              status: 'Completed'
            },
            {
              id: 2,
              date: '2024-01-16',
              product: 'Wireless Mouse',
              category: 'Accessories',
              quantity: 25,
              unitPrice: 29.99,
              total: 749.75,
              salesperson: 'Sarah Johnson',
              region: 'Europe',
              status: 'Pending'
            },
            {
              id: 3,
              date: '2024-01-17',
              product: 'Gaming Keyboard',
              category: 'Accessories',
              quantity: 12,
              unitPrice: 89.99,
              total: 1079.88,
              salesperson: 'Mike Davis',
              region: 'Asia Pacific',
              status: 'Completed'
            },
            {
              id: 4,
              date: '2024-01-18',
              product: 'Monitor 4K',
              category: 'Electronics',
              quantity: 8,
              unitPrice: 399.99,
              total: 3199.92,
              salesperson: 'Emily Chen',
              region: 'North America',
              status: 'Shipped'
            },
            {
              id: 5,
              date: '2024-01-19',
              product: 'Tablet Pro',
              category: 'Electronics',
              quantity: 15,
              unitPrice: 699.99,
              total: 10499.85,
              salesperson: 'David Wilson',
              region: 'Europe',
              status: 'Completed'
            },
            {
              id: 6,
              date: '2024-01-20',
              product: 'Software License',
              category: 'Software',
              quantity: 100,
              unitPrice: 49.99,
              total: 4999.00,
              salesperson: 'Lisa Anderson',
              region: 'Asia Pacific',
              status: 'Processing'
            }
          ]
        }
      ];
      setSheets(mockSheets);
      setActiveSheet('sheet1');
    }
  }, [initialData]);

  // Get current sheet data
  const currentSheet = sheets?.find(sheet => sheet?.id === activeSheet);
  const currentData = currentSheet?.data || [];

  // Define columns based on current sheet
  const columns = useMemo(() => {
    if (!currentData?.length) return [];
    
    const sampleRow = currentData?.[0];
    return Object.keys(sampleRow)?.filter(key => key !== 'id')?.map(key => ({
        key,
        label: key?.charAt(0)?.toUpperCase() + key?.slice(1)?.replace(/([A-Z])/g, ' $1')?.trim()
      }));
  }, [currentData]);

  // Calculate data statistics
  const dataStats = useMemo(() => {
    const totalRows = currentData?.length;
    const totalColumns = columns?.length;
    let filledCells = 0;
    let emptyCells = 0;

    currentData?.forEach(row => {
      columns?.forEach(col => {
        if (row?.[col?.key] && row?.[col?.key]?.toString()?.trim() !== '') {
          filledCells++;
        } else {
          emptyCells++;
        }
      });
    });

    return {
      totalRows,
      totalColumns,
      filledCells,
      emptyCells
    };
  }, [currentData, columns]);

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const results = [];
      currentData?.forEach((row, rowIndex) => {
        columns?.forEach(col => {
          const cellValue = row?.[col?.key];
          if (cellValue && cellValue?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
            results?.push({ rowIndex, columnKey: col?.key, value: cellValue });
          }
        });
      });
      setSearchResults(results);
      setCurrentSearchResult(0);
    } else {
      setSearchResults([]);
      setCurrentSearchResult(0);
    }
  }, [searchTerm, currentData, columns]);

  const handleSheetChange = (sheetId) => {
    setActiveSheet(sheetId);
    setSelectedRows([]);
    setSearchTerm('');
  };

  const handleAddSheet = () => {
    const newSheetId = `sheet${sheets?.length + 1}`;
    const newSheet = {
      id: newSheetId,
      name: `Sheet ${sheets?.length + 1}`,
      rowCount: 0,
      data: [],
      headers: []
    };
    setSheets([...sheets, newSheet]);
    setActiveSheet(newSheetId);
  };

  const handleDeleteSheet = (sheetId) => {
    if (sheets?.length <= 1) return;
    
    const updatedSheets = sheets?.filter(sheet => sheet?.id !== sheetId);
    setSheets(updatedSheets);
    
    if (activeSheet === sheetId) {
      setActiveSheet(updatedSheets?.[0]?.id);
    }
  };

  const handleCellEdit = (rowIndex, columnKey, newValue) => {
    const updatedSheets = sheets?.map(sheet => {
      if (sheet?.id === activeSheet) {
        const updatedData = [...sheet?.data];
        updatedData[rowIndex] = {
          ...updatedData?.[rowIndex],
          [columnKey]: newValue
        };
        return { ...sheet, data: updatedData };
      }
      return sheet;
    });
    setSheets(updatedSheets);
  };

  const handleRowSelect = (rowId, isSelected) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows?.filter(id => id !== rowId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allRowIds = currentData?.map((row, index) => row?.id || index);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleClearData = () => {
    const updatedSheets = sheets?.map(sheet => {
      if (sheet?.id === activeSheet) {
        return { ...sheet, data: [], rowCount: 0 };
      }
      return sheet;
    });
    setSheets(updatedSheets);
    setSelectedRows([]);
  };

  const handleDeleteSelected = () => {
    const updatedSheets = sheets?.map(sheet => {
      if (sheet?.id === activeSheet) {
        const updatedData = sheet?.data?.filter((row, index) => 
          !selectedRows?.includes(row?.id || index)
        );
        return { 
          ...sheet, 
          data: updatedData, 
          rowCount: updatedData?.length 
        };
      }
      return sheet;
    });
    setSheets(updatedSheets);
    setSelectedRows([]);
  };

  const handleExportData = (format) => {
    const dataToExport = currentData;
    const fileName = `${currentSheet?.name}_export`;
    
    switch (format) {
      case 'json':
        const jsonData = JSON.stringify(dataToExport, null, 2);
        downloadFile(jsonData, `${fileName}.json`, 'application/json');
        break;
      case 'csv':
        const csvData = convertToCSV(dataToExport);
        downloadFile(csvData, `${fileName}.csv`, 'text/csv');
        break;
      case 'excel':
        // Navigate to export manager for advanced Excel export
        navigate('/data-export-manager', { 
          state: { 
            data: dataToExport,
            filename: fileName,
            selectedFormat: 'xlsx'
          } 
        });
        break;
    }
  };

  const convertToCSV = (data) => {
    if (!data?.length) return '';
    
    const headers = columns?.map(col => col?.label)?.join(',');
    const rows = data?.map(row => 
      columns?.map(col => `"${row?.[col?.key] || ''}"`)?.join(',')
    );
    
    return [headers, ...rows]?.join('\n');
  };

  const downloadFile = (content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNavigateSearchResult = (direction) => {
    if (direction === 'next' && currentSearchResult < searchResults?.length - 1) {
      setCurrentSearchResult(currentSearchResult + 1);
    } else if (direction === 'prev' && currentSearchResult > 0) {
      setCurrentSearchResult(currentSearchResult - 1);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setCurrentSearchResult(0);
  };

  const handleUploadFile = () => {
    navigate('/file-upload-dashboard');
  };

  const handleOpenAdvancedSearch = () => {
    // Pass current data to advanced search
    navigate('/advanced-search-filter', {
      state: {
        data: currentData,
        filename: location?.state?.fileName || currentSheet?.name
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        {/* Sheet Tabs */}
        <SheetTabs
          sheets={sheets}
          activeSheet={activeSheet}
          onSheetChange={handleSheetChange}
          onAddSheet={handleAddSheet}
          onDeleteSheet={handleDeleteSheet}
        />

        {/* Search Results Bar */}
        <SearchResults
          searchTerm={searchTerm}
          totalResults={searchResults?.length}
          currentResult={currentSearchResult}
          onNavigateResult={handleNavigateSearchResult}
          onClearSearch={handleClearSearch}
        />

        {/* Data Toolbar */}
        <DataToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearData={handleClearData}
          onDeleteSelected={handleDeleteSelected}
          onExportData={handleExportData}
          selectedRowsCount={selectedRows?.length}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          columns={columns}
          onOpenAdvancedSearch={handleOpenAdvancedSearch}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <DataSidebar
            sheets={sheets}
            activeSheet={activeSheet}
            onSheetChange={handleSheetChange}
            dataStats={dataStats}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            filename={location?.state?.fileName}
          />

          {/* Data Grid */}
          {currentData?.length > 0 ? (
            <DataGrid
              data={currentData}
              columns={columns}
              searchTerm={searchTerm}
              onCellEdit={handleCellEdit}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-surface">
              <Icon name="FileSpreadsheet" size={64} className="text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Data Available</h2>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                This sheet is empty. Upload an Excel file or add data manually to get started with data visualization and analysis.
              </p>
              <div className="flex space-x-3">
                <Button variant="default" onClick={handleUploadFile}>
                  <Icon name="Upload" size={16} />
                  <span className="ml-2">Upload Excel File</span>
                </Button>
                <Button variant="outline" onClick={handleAddSheet}>
                  <Icon name="Plus" size={16} />
                  <span className="ml-2">Add New Sheet</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelDataViewer;