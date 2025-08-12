import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadStatsSidebar = ({ stats }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatStorageUsed = (totalBytes) => {
    return formatFileSize(totalBytes);
  };

  return (
    <div className="space-y-6">
      {/* Upload Statistics */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upload Statistics</h3>
            <p className="text-sm text-muted-foreground">Your file management overview</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Total Files */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Icon name="FileText" size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-xl font-bold text-foreground">{stats?.totalFiles || 0}</p>
              </div>
            </div>
          </div>

          {/* Total Records */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Icon name="Database" size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-xl font-bold text-foreground">
                  {stats?.totalRecords?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Storage Used */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Icon name="HardDrive" size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-xl font-bold text-foreground">
                  {formatStorageUsed(stats?.storageUsed)}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Uploads */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Icon name="Calendar" size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold text-foreground">{stats?.monthlyUploads || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="Zap" size={24} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Frequently used tools</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Advanced Search</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="Download" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Export Data</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="Settings" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Settings</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-info/10 rounded-lg">
            <Icon name="Lightbulb" size={20} className="text-info" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Tips</h3>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <p>Supported formats: Excel (.xlsx, .xls) and CSV files</p>
          </div>
          
          <div className="flex space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <p>Maximum file size is 10MB per file</p>
          </div>
          
          <div className="flex space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <p>Files are processed and stored locally in your browser</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStatsSidebar;