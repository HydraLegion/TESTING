import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import SearchResults from './components/SearchResults';
import SearchStats from './components/SearchStats';

const AdvancedSearchFilter = () => {
  const location = useLocation();
  
  // Get data from navigation state or use mock data
  const getInitialData = () => {
    if (location?.state?.data) {
      return location?.state?.data;
    }
    
    // Try to get data from localStorage
    const savedFiles = localStorage.getItem('uploadedExcelFiles');
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        if (parsedFiles?.length > 0) {
          // Get data from the most recent file
          const recentFile = parsedFiles?.[0];
          if (recentFile?.processedData?.sheets?.[0]?.data) {
            return recentFile?.processedData?.sheets?.[0]?.data;
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    
    // Fallback to mock data
    return [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@company.com",
        department: "Engineering",
        salary: 85000,
        hire_date: "2022-03-15",
        status: "Active",
        location: "New York",
        manager: "Sarah Johnson"
      },
      {
        id: 2,
        name: "Emily Davis",
        email: "emily.davis@company.com",
        department: "Marketing",
        salary: 72000,
        hire_date: "2021-08-22",
        status: "Active",
        location: "Los Angeles",
        manager: "Michael Brown"
      },
      {
        id: 3,
        name: "Michael Wilson",
        email: "michael.wilson@company.com",
        department: "Sales",
        salary: 68000,
        hire_date: "2023-01-10",
        status: "Active",
        location: "Chicago",
        manager: "Lisa Anderson"
      },
      {
        id: 4,
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        department: "Engineering",
        salary: 95000,
        hire_date: "2020-05-18",
        status: "Active",
        location: "New York",
        manager: "David Miller"
      },
      {
        id: 5,
        name: "David Miller",
        email: "david.miller@company.com",
        department: "Management",
        salary: 120000,
        hire_date: "2019-11-03",
        status: "Active",
        location: "New York",
        manager: null
      },
      {
        id: 6,
        name: "Lisa Anderson",
        email: "lisa.anderson@company.com",
        department: "Sales",
        salary: 78000,
        hire_date: "2022-07-12",
        status: "Inactive",
        location: "Miami",
        manager: "David Miller"
      },
      {
        id: 7,
        name: "Robert Taylor",
        email: "robert.taylor@company.com",
        department: "HR",
        salary: 65000,
        hire_date: "2021-12-05",
        status: "Active",
        location: "Seattle",
        manager: "Emily Davis"
      },
      {
        id: 8,
        name: "Jennifer White",
        email: "jennifer.white@company.com",
        department: "Finance",
        salary: 82000,
        hire_date: "2020-09-28",
        status: "Active",
        location: "Boston",
        manager: "David Miller"
      },
      {
        id: 9,
        name: "Christopher Lee",
        email: "christopher.lee@company.com",
        department: "Engineering",
        salary: 88000,
        hire_date: "2023-02-14",
        status: "Active",
        location: "San Francisco",
        manager: "Sarah Johnson"
      },
      {
        id: 10,
        name: "Amanda Garcia",
        email: "amanda.garcia@company.com",
        department: "Marketing",
        salary: 70000,
        hire_date: "2022-11-20",
        status: "Active",
        location: "Austin",
        manager: "Michael Brown"
      }
    ];
  };

  const initialData = getInitialData();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('contains');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    selectedColumns: [],
    columnValues: {},
    dataTypes: [],
    dateFrom: '',
    dateTo: '',
    minValue: '',
    maxValue: '',
    includeEmpty: false,
    caseSensitive: false,
    exactMatch: false
  });
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [savedFilters, setSavedFilters] = useState([]);

  // Initialize recent queries and saved filters
  useEffect(() => {
    const savedQueries = localStorage.getItem('recentSearchQueries');
    if (savedQueries) {
      try {
        setRecentQueries(JSON.parse(savedQueries));
      } catch (error) {
        console.error('Error loading recent queries:', error);
      }
    } else {
      setRecentQueries([
        {
          query: "Engineering AND Active",
          results: 3,
          timestamp: "2 hours ago"
        },
        {
          query: "salary > 80000",
          results: 5,
          timestamp: "1 day ago"
        },
        {
          query: "New York",
          results: 3,
          timestamp: "2 days ago"
        }
      ]);
    }

    const savedFiltersData = localStorage.getItem('savedSearchFilters');
    if (savedFiltersData) {
      try {
        setSavedFilters(JSON.parse(savedFiltersData));
      } catch (error) {
        console.error('Error loading saved filters:', error);
      }
    } else {
      setSavedFilters([
        {
          id: 1,
          name: "High Salary Engineers",
          description: "Engineering dept with salary > $80k",
          created: "Jan 15, 2025",
          filters: {
            selectedColumns: ['department', 'salary'],
            columnValues: { department: 'Engineering' },
            minValue: '80000'
          }
        },
        {
          id: 2,
          name: "Active Sales Team",
          description: "Active employees in Sales department",
          created: "Jan 10, 2025",
          filters: {
            selectedColumns: ['department', 'status'],
            columnValues: { department: 'Sales', status: 'Active' }
          }
        }
      ]);
    }
  }, []);

  // Filter and search logic
  const filteredResults = useMemo(() => {
    let results = [...initialData];

    // Apply search query
    if (searchQuery?.trim()) {
      const query = filters?.caseSensitive ? searchQuery : searchQuery?.toLowerCase();
      
      results = results?.filter(row => {
        const searchableText = Object.values(row)?.filter(value => value !== null && value !== undefined)?.join(' ');
        
        const text = filters?.caseSensitive ? searchableText : searchableText?.toLowerCase();
        
        switch (searchMode) {
          case 'exact':
            return text === query;
          case 'startsWith':
            return text?.startsWith(query);
          case 'endsWith':
            return text?.endsWith(query);
          case 'regex':
            try {
              const regex = new RegExp(query, filters.caseSensitive ? 'g' : 'gi');
              return regex?.test(text);
            } catch {
              return false;
            }
          case 'boolean':
            // Simple boolean logic implementation
            const terms = query?.split(/\s+(AND|OR|NOT)\s+/i);
            return terms?.some(term => text?.includes(term?.trim()));
          default:
            return text?.includes(query);
        }
      });
    }

    // Apply column filters
    if (filters?.selectedColumns?.length > 0) {
      results = results?.filter(row => {
        return filters?.selectedColumns?.every(column => {
          const filterValue = filters?.columnValues?.[column];
          if (!filterValue) return true;
          
          const cellValue = row?.[column];
          if (cellValue === null || cellValue === undefined) {
            return filters?.includeEmpty;
          }
          
          const searchText = filters?.caseSensitive ? cellValue?.toString() : cellValue?.toString()?.toLowerCase();
          const filterText = filters?.caseSensitive ? filterValue : filterValue?.toLowerCase();
          
          return filters?.exactMatch ? searchText === filterText : searchText?.includes(filterText);
        });
      });
    }

    // Apply date range filter (if hire_date field exists)
    if ((filters?.dateFrom || filters?.dateTo) && results?.[0]?.hire_date) {
      results = results?.filter(row => {
        const hireDate = new Date(row.hire_date);
        const fromDate = filters?.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters?.dateTo ? new Date(filters.dateTo) : null;
        
        if (fromDate && hireDate < fromDate) return false;
        if (toDate && hireDate > toDate) return false;
        return true;
      });
    }

    // Apply value range filter (for numeric fields like salary)
    if (filters?.minValue || filters?.maxValue) {
      results = results?.filter(row => {
        // Try to find a numeric field to filter by
        const numericField = Object.keys(row)?.find(key => 
          typeof row?.[key] === 'number' || !isNaN(Number(row?.[key]))
        );
        
        if (numericField) {
          const value = Number(row?.[numericField]);
          const min = filters?.minValue ? Number(filters?.minValue) : null;
          const max = filters?.maxValue ? Number(filters?.maxValue) : null;
          
          if (min && value < min) return false;
          if (max && value > max) return false;
        }
        
        return true;
      });
    }

    // Apply sorting
    if (sortConfig?.column) {
      results?.sort((a, b) => {
        const aVal = a?.[sortConfig?.column];
        const bVal = b?.[sortConfig?.column];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        let comparison = 0;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = aVal?.toString()?.localeCompare(bVal?.toString());
        }
        
        return sortConfig?.direction === 'desc' ? -comparison : comparison;
      });
    }

    return results;
  }, [initialData, searchQuery, searchMode, filters, sortConfig]);

  const searchStats = useMemo(() => ({
    totalRecords: initialData?.length,
    filteredResults: filteredResults?.length,
    matchRate: initialData?.length > 0 ? Math.round((filteredResults?.length / initialData?.length) * 100) : 0,
    searchTime: Math.floor(Math.random() * 50) + 10
  }), [initialData?.length, filteredResults?.length]);

  const handleSearch = () => {
    if (!searchQuery?.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      
      // Add to recent queries
      const newQuery = {
        query: searchQuery,
        results: filteredResults?.length,
        timestamp: "Just now"
      };
      
      const updatedQueries = [newQuery, ...recentQueries?.slice(0, 4)];
      setRecentQueries(updatedQueries);
      
      // Save to localStorage
      localStorage.setItem('recentSearchQueries', JSON.stringify(updatedQueries));
    }, 500);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      selectedColumns: [],
      columnValues: {},
      dataTypes: [],
      dateFrom: '',
      dateTo: '',
      minValue: '',
      maxValue: '',
      includeEmpty: false,
      caseSensitive: false,
      exactMatch: false
    });
    setSearchQuery('');
    setSelectedRows([]);
  };

  const handleSaveFilter = (name, filterData) => {
    const newFilter = {
      id: Date.now(),
      name,
      description: `Custom filter with ${Object.keys(filterData)?.filter(key => filterData?.[key] && filterData?.[key] !== '')?.length} criteria`,
      created: new Date()?.toLocaleDateString(),
      filters: filterData
    };
    
    const updatedFilters = [newFilter, ...savedFilters];
    setSavedFilters(updatedFilters);
    
    // Save to localStorage
    localStorage.setItem('savedSearchFilters', JSON.stringify(updatedFilters));
  };

  const handleSort = (column, direction) => {
    setSortConfig({ column, direction });
  };

  const handleRowSelect = (rowId, selected) => {
    setSelectedRows(prev => 
      selected 
        ? [...prev, rowId]
        : prev?.filter(id => id !== rowId)
    );
  };

  const handleSelectAll = (selected) => {
    setSelectedRows(selected ? filteredResults?.map(row => row?.id) : []);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on rows:`, selectedRows);
    // Implement bulk actions here
  };

  const handleExportResults = (format) => {
    console.log(`Exporting ${filteredResults?.length} results as ${format}`);
    // Implement export functionality here
    const dataToExport = filteredResults;
    const fileName = `search_results_${new Date()?.toISOString()?.split('T')?.[0]}`;
    
    switch (format) {
      case 'csv':
        const csvData = convertToCSV(dataToExport);
        downloadFile(csvData, `${fileName}.csv`, 'text/csv');
        break;
      case 'json':
        const jsonData = JSON.stringify(dataToExport, null, 2);
        downloadFile(jsonData, `${fileName}.json`, 'application/json');
        break;
      case 'excel': console.log('Excel export would be implemented with a library like xlsx');
        break;
    }
  };

  const convertToCSV = (data) => {
    if (!data?.length) return '';
    
    const headers = Object.keys(data?.[0])?.join(',');
    const rows = data?.map(row => 
      Object.values(row)?.map(val => `"${val || ''}"`)?.join(',')
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

  const handleApplyRecentQuery = (query) => {
    setSearchQuery(query?.query);
    handleSearch();
  };

  const handleApplySavedFilter = (filter) => {
    setFilters(filter?.filters);
  };

  const handleDeleteSavedFilter = (filterId) => {
    const updatedFilters = savedFilters?.filter(filter => filter?.id !== filterId);
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedSearchFilters', JSON.stringify(updatedFilters));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          searchMode={searchMode}
          onSearchModeChange={setSearchMode}
          onExportResults={handleExportResults}
          resultCount={filteredResults?.length}
          isSearching={isSearching}
          filename={location?.state?.filename}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Filter Sidebar - Desktop: 25%, Tablet: Hidden, Mobile: Drawer */}
          <div className="hidden lg:block w-1/4 min-w-[300px] max-w-[400px]">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onSaveFilter={handleSaveFilter}
              availableColumns={initialData?.length > 0 ? Object.keys(initialData?.[0]) : []}
            />
          </div>
          
          {/* Search Results - Desktop: 60%, Tablet: 75%, Mobile: 100% */}
          <div className="flex-1 lg:w-3/5">
            <SearchResults
              results={filteredResults}
              searchQuery={searchQuery}
              onSort={handleSort}
              sortConfig={sortConfig}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              onBulkAction={handleBulkAction}
            />
          </div>
          
          {/* Search Stats - Desktop: 15%, Tablet: 25%, Mobile: Hidden */}
          <div className="hidden md:block w-1/4 lg:w-1/5 min-w-[250px] max-w-[300px]">
            <SearchStats
              searchStats={searchStats}
              recentQueries={recentQueries}
              savedFilters={savedFilters}
              onApplyRecentQuery={handleApplyRecentQuery}
              onApplySavedFilter={handleApplySavedFilter}
              onDeleteSavedFilter={handleDeleteSavedFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchFilter;