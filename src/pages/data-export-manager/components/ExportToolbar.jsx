import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportToolbar = ({ 
  selectedFormat, 
  selectedFields, 
  exportRange,
  onExport,
  onBatchExport,
  onScheduleExport,
  isExporting = false 
}) => {
  const canExport = selectedFormat && selectedFields?.length > 0;

  const getExportSummary = () => {
    const fieldCount = selectedFields?.length;
    const rangeText = exportRange === 'all' ? 'All records' : 
                     exportRange === 'filtered'? 'Filtered records' : 'Custom range';
    
    return `${fieldCount} fields • ${rangeText} • ${selectedFormat?.toUpperCase()}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1 p-4">
      <div className="flex items-center justify-between">
        {/* Export Summary */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <Icon name="Download" size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Ready to Export</div>
              <div className="text-xs text-muted-foreground">
                {canExport ? getExportSummary() : 'Configure export settings'}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {canExport && (
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Layers" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {selectedFields?.length} field{selectedFields?.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {exportRange === 'all' ? '1,247' : 
                   exportRange === 'filtered'? '342' : 'Custom'} records
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="FileType" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{selectedFormat?.toUpperCase()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Advanced Options */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onScheduleExport}
              disabled={!canExport || isExporting}
            >
              <Icon name="Calendar" size={16} />
              <span className="ml-2">Schedule</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onBatchExport}
              disabled={!canExport || isExporting}
            >
              <Icon name="Layers" size={16} />
              <span className="ml-2">Batch</span>
            </Button>
          </div>

          {/* Primary Export Button */}
          <Button
            variant="default"
            size="sm"
            onClick={onExport}
            disabled={!canExport || isExporting}
            loading={isExporting}
            className="min-w-[120px]"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span className="ml-2">Exporting...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span className="ml-2">Export Now</span>
              </>
            )}
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Button variant="outline" size="sm">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Progress Bar (shown during export) */}
      {isExporting && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Processing export...</span>
            <span>Preparing data</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
          </div>
        </div>
      )}
      {/* Validation Messages */}
      {!canExport && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <div className="text-sm">
              <span className="font-medium text-warning">Configuration Required</span>
              <div className="text-warning/80 mt-1">
                {!selectedFormat && "Select an export format. "}
                {selectedFields?.length === 0 && "Choose fields to export. "}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions (Mobile) */}
      <div className="lg:hidden mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onScheduleExport}
            disabled={!canExport || isExporting}
            className="flex-1"
          >
            <Icon name="Calendar" size={16} />
            <span className="ml-2">Schedule</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBatchExport}
            disabled={!canExport || isExporting}
            className="flex-1"
          >
            <Icon name="Layers" size={16} />
            <span className="ml-2">Batch Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportToolbar;