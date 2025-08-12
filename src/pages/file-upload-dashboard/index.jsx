import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UploadZone from './components/UploadZone';
import RecentFilesGrid from './components/RecentFilesGrid';
import UploadStatsSidebar from './components/UploadStatsSidebar';
import UploadProgressModal from './components/UploadProgressModal';
import { processExcelFile, validateExcelFile } from '../../utils/excelProcessor';

import Button from '../../components/ui/Button';

const FileUploadDashboard = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);

  // Load saved files from localStorage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('uploadedExcelFiles');
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        setRecentFiles(parsedFiles);
      } catch (error) {
        console.error('Error loading saved files:', error);
        setRecentFiles([]);
      }
    }
  }, []);

  // Save files to localStorage whenever recentFiles changes
  useEffect(() => {
    if (recentFiles?.length > 0) {
      localStorage.setItem('uploadedExcelFiles', JSON.stringify(recentFiles));
    }
  }, [recentFiles]);

  // Mock statistics - calculate from actual files
  const uploadStats = {
    totalFiles: recentFiles?.length || 0,
    totalRecords: recentFiles?.reduce((total, file) => total + (file?.records || 0), 0),
    storageUsed: recentFiles?.reduce((total, file) => total + (file?.size || 0), 0),
    monthlyUploads: recentFiles?.filter(file => {
      const fileDate = new Date(file?.uploadDate);
      const currentDate = new Date();
      return fileDate?.getMonth() === currentDate?.getMonth() && 
             fileDate?.getFullYear() === currentDate?.getFullYear();
    })?.length || 0
  };

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    setShowProgressModal(true);
    
    // Validate files first
    const validFiles = [];
    const invalidFiles = [];
    
    files?.forEach(file => {
      const validation = validateExcelFile(file);
      if (validation?.isValid) {
        validFiles?.push(file);
      } else {
        invalidFiles?.push({
          file,
          errors: validation?.errors
        });
      }
    });

    // Create upload progress tracking for valid files
    const uploadFiles = validFiles?.map((file, index) => ({
      name: file?.name,
      size: file?.size,
      status: 'processing',
      progress: 0,
      records: 0,
      file: file
    }));
    
    // Add invalid files with error status
    invalidFiles?.forEach(({ file, errors }) => {
      uploadFiles?.push({
        name: file?.name,
        size: file?.size,
        status: 'error',
        progress: 0,
        records: 0,
        error: errors?.join(', ')
      });
    });
    
    setUploadingFiles(uploadFiles);

    // Process valid files
    for (let i = 0; i < validFiles?.length; i++) {
      const fileIndex = uploadFiles?.findIndex(uf => uf?.name === validFiles?.[i]?.name);
      
      try {
        // Update progress to show processing
        setUploadingFiles(prev => prev?.map((file, index) => 
          index === fileIndex ? { ...file, progress: 25 } : file
        ));

        // Process the actual Excel file
        const processedData = await processExcelFile(validFiles?.[i]);
        
        // Update progress
        setUploadingFiles(prev => prev?.map((file, index) => 
          index === fileIndex ? { 
            ...file, 
            progress: 75,
            records: processedData?.totalRecords
          } : file
        ));

        // Simulate final processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Complete processing
        setUploadingFiles(prev => prev?.map((file, index) => 
          index === fileIndex ? {
            ...file,
            status: 'completed',
            progress: 100,
            records: processedData?.totalRecords
          } : file
        ));

        // Create new file entry with processed data
        const newFile = {
          id: Date.now() + i,
          name: validFiles?.[i]?.name,
          size: validFiles?.[i]?.size,
          uploadDate: new Date()?.toISOString(),
          status: "processed",
          sheets: processedData?.sheets?.length || 1,
          records: processedData?.totalRecords || 0,
          type: processedData?.type || validFiles?.[i]?.name?.split('.')?.pop()?.toLowerCase(),
          processedData: processedData // Store the actual processed data
        };
        
        // Add to recent files
        setRecentFiles(prev => [newFile, ...prev]);
        
      } catch (error) {
        console.error('Error processing file:', error);
        
        // Mark file as error
        setUploadingFiles(prev => prev?.map((file, index) => 
          index === fileIndex ? {
            ...file,
            status: 'error',
            progress: 100,
            error: error?.message || 'Failed to process file'
          } : file
        ));
      }
    }
    
    setIsUploading(false);
  };

  const handleViewFile = (file) => {
    // Pass the processed data to the Excel viewer
    navigate('/excel-data-viewer', { 
      state: { 
        fileId: file?.id, 
        fileName: file?.name,
        processedData: file?.processedData 
      } 
    });
  };

  const handleDownloadFile = (file) => {
    if (file?.processedData) {
      // Create a downloadable version of the processed file
      try {
        const dataStr = JSON.stringify(file?.processedData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${file?.name?.split('.')?.[0]}_processed.json`;
        document.body?.appendChild(link);
        link?.click();
        document.body?.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file. Please try again.');
      }
    } else {
      alert('No processed data available for download.');
    }
  };

  const handleDeleteFile = (file) => {
    if (window.confirm(`Are you sure you want to delete "${file?.name}"?`)) {
      const updatedFiles = recentFiles?.filter(f => f?.id !== file?.id);
      setRecentFiles(updatedFiles);
      
      // Update localStorage
      if (updatedFiles?.length === 0) {
        localStorage.removeItem('uploadedExcelFiles');
      } else {
        localStorage.setItem('uploadedExcelFiles', JSON.stringify(updatedFiles));
      }
    }
  };

  const handleRetryUpload = (failedFiles) => {
    const filesToRetry = Array.isArray(failedFiles) ? failedFiles : [failedFiles];
    
    // Get the original files to reprocess
    const originalFiles = filesToRetry?.map(f => f?.file)?.filter(Boolean);
    
    if (originalFiles?.length > 0) {
      // Reset failed files status and restart upload
      setUploadingFiles(prev => prev?.map(file => 
        filesToRetry?.some(f => f?.name === file?.name) 
          ? { ...file, status: 'processing', progress: 0, error: null }
          : file
      ));
      
      // Re-trigger upload for failed files
      handleFileUpload(originalFiles);
    }
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
    setUploadingFiles([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">File Upload Dashboard</h1>
                <p className="text-muted-foreground">
                  Upload and manage your Excel files with advanced data processing capabilities
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => navigate('/advanced-search-filter')}
                >
                  Advanced Search
                </Button>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => navigate('/data-export-manager')}
                >
                  Export Manager
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Upload Zone */}
              <section>
                <UploadZone 
                  onFileUpload={handleFileUpload}
                  isUploading={isUploading}
                />
              </section>

              {/* Recent Files */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">Recent Files</h2>
                    <p className="text-muted-foreground">
                      Manage and access your uploaded Excel files
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Filter"
                      iconPosition="left"
                    >
                      Filter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ArrowUpDown"
                      iconPosition="left"
                    >
                      Sort
                    </Button>
                  </div>
                </div>
                
                <RecentFilesGrid
                  files={recentFiles}
                  onViewFile={handleViewFile}
                  onDownloadFile={handleDownloadFile}
                  onDeleteFile={handleDeleteFile}
                />
              </section>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <UploadStatsSidebar stats={uploadStats} />
            </div>
          </div>
        </div>
      </main>

      {/* Upload Progress Modal */}
      <UploadProgressModal
        isOpen={showProgressModal}
        files={uploadingFiles}
        onClose={handleCloseProgressModal}
        onRetry={handleRetryUpload}
      />
    </div>
  );
};

export default FileUploadDashboard;