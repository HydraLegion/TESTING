import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentFilesGrid = ({ files, onViewFile, onDownloadFile, onDeleteFile }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getFileIcon = (filename) => {
    const extension = filename?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'xlsx': case'xls':
        return 'FileSpreadsheet';
      case 'csv':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getFileTypeColor = (filename) => {
    const extension = filename?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'xlsx': case'xls':
        return 'text-emerald-600';
      case 'csv':
        return 'text-blue-600';
      default:
        return 'text-muted-foreground';
    }
  };

  if (files?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-muted rounded-full">
            <Icon name="FolderOpen" size={32} className="text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No files uploaded yet</h3>
        <p className="text-muted-foreground">
          Upload your first Excel file to get started with data management
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {files?.map((file) => (
        <div
          key={file?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200 group"
        >
          {/* File Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-muted rounded-lg ${getFileTypeColor(file?.name)}`}>
                <Icon name={getFileIcon(file?.name)} size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate" title={file?.name}>
                  {file?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {file?.sheets} {file?.sheets === 1 ? 'sheet' : 'sheets'}
                </p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${file?.status === 'processed' ?'bg-success/10 text-success' 
                : file?.status === 'processing' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
              }
            `}>
              {file?.status === 'processed' ? 'Ready' : 
               file?.status === 'processing' ? 'Processing' : 'Error'}
            </div>
          </div>

          {/* File Details */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Size:</span>
              <span className="text-foreground font-medium">{formatFileSize(file?.size)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Uploaded:</span>
              <span className="text-foreground font-medium">{formatDate(file?.uploadDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Records:</span>
              <span className="text-foreground font-medium">{file?.records?.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewFile(file)}
              disabled={file?.status !== 'processed'}
              className="flex-1"
            >
              View
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onDownloadFile(file)}
              disabled={file?.status !== 'processed'}
            >
              <span className="sr-only">Download</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={() => onDeleteFile(file)}
              className="text-error hover:text-error hover:bg-error/10"
            >
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentFilesGrid;