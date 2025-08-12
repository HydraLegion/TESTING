import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadProgressModal = ({ isOpen, files, onClose, onRetry }) => {
  if (!isOpen) return null;

  const completedFiles = files?.filter(f => f?.status === 'completed' || f?.status === 'error');
  const processingFiles = files?.filter(f => f?.status === 'processing');
  const errorFiles = files?.filter(f => f?.status === 'error');
  
  const allCompleted = completedFiles?.length === files?.length;
  const hasErrors = errorFiles?.length > 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'processing':
        return <Icon name="Loader2" size={20} className="text-primary animate-spin" />;
      default:
        return <Icon name="Clock" size={20} className="text-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-card border border-border rounded-xl shadow-elevation-4 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">File Upload Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedFiles?.length} of {files?.length} files processed
              </p>
            </div>
          </div>
          
          {allCompleted && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>

        {/* Progress Overview */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round((completedFiles?.length / files?.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedFiles?.length / files?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* File List */}
        <div className="max-h-96 overflow-y-auto">
          <div className="p-6 space-y-4">
            {files?.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(file?.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {file?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatFileSize(file?.size)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {file?.status === 'completed' && `${file?.records} records processed`}
                      {file?.status === 'processing' && 'Processing...'}
                      {file?.status === 'error' && file?.error}
                    </p>
                    
                    {file?.status === 'processing' && (
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${file?.progress || 0}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {file?.status === 'error' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => onRetry(file)}
                    className="text-primary hover:text-primary"
                  >
                    <span className="sr-only">Retry</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {allCompleted && (
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasErrors ? (
                  <>
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm text-warning">
                      {errorFiles?.length} file{errorFiles?.length !== 1 ? 's' : ''} failed to upload
                    </span>
                  </>
                ) : (
                  <>
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm text-success">All files uploaded successfully</span>
                  </>
                )}
              </div>
              
              <div className="flex space-x-3">
                {hasErrors && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => onRetry(errorFiles)}
                  >
                    Retry Failed
                  </Button>
                )}
                <Button
                  variant="default"
                  size="sm"
                  onClick={onClose}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProgressModal;