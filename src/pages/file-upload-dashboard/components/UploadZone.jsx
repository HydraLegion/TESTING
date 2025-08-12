import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { saveDataset } from "../../../services/firestoreService";

const handleFileUpload = async (file) => {
  const processedData = await processExcelFile(file);
  await saveDataset({
    fileName: file.name,
    timestamp: new Date().toISOString(),
    data: processedData
  });
};

const UploadZone = ({ onFileUpload, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = ['.xlsx', '.xls', '.csv'];
  const maxFileSize = '10MB';

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files) => {
    const validFiles = files?.filter(file => {
      const extension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
      return supportedFormats?.includes(extension) && file?.size <= 10 * 1024 * 1024;
    });

    if (validFiles?.length > 0) {
      onFileUpload(validFiles);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileSelection(files);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Upload Icon */}
        <div className="flex justify-center mb-6">
          <div className={`
            p-6 rounded-full transition-all duration-300
            ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
          `}>
            <Icon name="FileSpreadsheet" size={48} />
          </div>
        </div>

        {/* Upload Text */}
        <div className="space-y-3 mb-8">
          <h3 className="text-xl font-semibold text-foreground">
            {isDragOver ? 'Drop your Excel files here' : 'Upload Excel Files'}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Drag and drop your Excel files here, or click to browse and select files from your computer
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            variant="default"
            size="lg"
            iconName="Upload"
            iconPosition="left"
            loading={isUploading}
            disabled={isUploading}
            onClick={(e) => {
              e?.stopPropagation();
              openFileDialog();
            }}
          >
            {isUploading ? 'Processing...' : 'Choose Files'}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            or drag and drop files here
          </div>
        </div>

        {/* File Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Icon name="FileType" size={16} />
            <span>Formats: {supportedFormats?.join(', ')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Icon name="HardDrive" size={16} />
            <span>Max size: {maxFileSize}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>Secure upload</span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".xlsx,.xls,.csv"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-surface/80 rounded-xl flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Processing files...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
