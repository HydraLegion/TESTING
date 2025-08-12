import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const processExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const extension = file?.name?.split('.')?.pop()?.toLowerCase();
        
        if (extension === 'csv') {
          // Process CSV file
          const csvText = new TextDecoder().decode(new Uint8Array(data));
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const processedData = {
                sheets: [{
                  name: 'Sheet1',
                  data: results?.data,
                  headers: results?.meta?.fields || []
                }],
                totalRecords: results?.data?.length || 0,
                fileName: file?.name,
                fileSize: file?.size,
                type: 'csv'
              };
              resolve(processedData);
            },
            error: (error) => {
              reject(new Error(`CSV parsing error: ${error?.message}`));
            }
          });
        } else if (extension === 'xlsx' || extension === 'xls') {
          // Process Excel file
          const workbook = XLSX.read(data, { type: 'array' });
          const sheets = [];
          let totalRecords = 0;
          
          workbook?.SheetNames?.forEach(sheetName => {
            const worksheet = workbook?.Sheets?.[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            if (jsonData?.length > 0) {
              const headers = jsonData?.[0] || [];
              const rows = jsonData?.slice(1)?.filter(row => row?.some(cell => cell !== null && cell !== undefined && cell !== ''));
              
              sheets.push({
                name: sheetName,
                data: rows?.map(row => {
                  const obj = {};
                  headers?.forEach((header, index) => {
                    obj[header] = row?.[index] || '';
                  });
                  return obj;
                }),
                headers: headers,
                rawData: rows
              });
              
              totalRecords += rows?.length;
            }
          });
          
          const processedData = {
            sheets: sheets,
            totalRecords: totalRecords,
            fileName: file?.name,
            fileSize: file?.size,
            type: extension
          };
          
          resolve(processedData);
        } else {
          reject(new Error('Unsupported file format'));
        }
      } catch (error) {
        reject(new Error(`File processing error: ${error?.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    if (file?.name?.split('.')?.pop()?.toLowerCase() === 'csv') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

export const validateExcelFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const supportedFormats = ['xlsx', 'xls', 'csv'];
  const extension = file?.name?.split('.')?.pop()?.toLowerCase();
  
  const errors = [];
  
  if (!supportedFormats?.includes(extension)) {
    errors?.push(`Unsupported file format. Supported formats: ${supportedFormats?.join(', ')}`);
  }
  
  if (file?.size > maxSize) {
    errors?.push('File size exceeds 10MB limit');
  }
  
  if (!file?.name || file?.name?.trim() === '') {
    errors?.push('Invalid file name');
  }
  
  return {
    isValid: errors?.length === 0,
    errors: errors
  };
};

export const getFileStats = (processedData) => {
  if (!processedData?.sheets) return null;
  
  return {
    sheetsCount: processedData?.sheets?.length,
    totalRecords: processedData?.totalRecords,
    fileName: processedData?.fileName,
    fileSize: processedData?.fileSize,
    type: processedData?.type,
    headers: processedData?.sheets?.[0]?.headers || []
  };
};