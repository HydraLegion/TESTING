import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportQueue = ({ exports, onRetry, onDownload, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const mockExports = [
    {
      id: 'exp_001',
      filename: 'employee_data_2025_01_03.json',
      format: 'JSON',
      status: 'completed',
      progress: 100,
      size: '2.4 MB',
      records: 1247,
      createdAt: new Date(Date.now() - 300000),
      completedAt: new Date(Date.now() - 240000),
      downloadUrl: '#'
    },
    {
      id: 'exp_002',
      filename: 'sales_report_filtered.csv',
      format: 'CSV',
      status: 'processing',
      progress: 65,
      size: '1.8 MB',
      records: 892,
      createdAt: new Date(Date.now() - 120000),
      completedAt: null,
      downloadUrl: null
    },
    {
      id: 'exp_003',
      filename: 'department_summary.xlsx',
      format: 'Excel',
      status: 'failed',
      progress: 0,
      size: '0 MB',
      records: 0,
      createdAt: new Date(Date.now() - 600000),
      completedAt: null,
      downloadUrl: null,
      error: 'Invalid data format in row 234'
    },
    {
      id: 'exp_004',
      filename: 'user_analytics_full.json',
      format: 'JSON',
      status: 'queued',
      progress: 0,
      size: '0 MB',
      records: 3456,
      createdAt: new Date(Date.now() - 60000),
      completedAt: null,
      downloadUrl: null
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'failed': return 'XCircle';
      case 'queued': return 'Timer';
      default: return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-primary';
      case 'failed': return 'text-error';
      case 'queued': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'processing': return 'bg-primary/10';
      case 'failed': return 'bg-error/10';
      case 'queued': return 'bg-warning/10';
      default: return 'bg-muted';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date?.toLocaleDateString();
  };

  const filteredExports = mockExports?.filter(exp => {
    if (filter === 'all') return true;
    return exp?.status === filter;
  });

  const statusCounts = {
    all: mockExports?.length,
    completed: mockExports?.filter(e => e?.status === 'completed')?.length,
    processing: mockExports?.filter(e => e?.status === 'processing')?.length,
    failed: mockExports?.filter(e => e?.status === 'failed')?.length,
    queued: mockExports?.filter(e => e?.status === 'queued')?.length
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Icon name="List" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Queue</h2>
              <p className="text-sm text-muted-foreground">Track your export progress</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Icon name="RotateCcw" size={16} />
            <span className="ml-2">Refresh</span>
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'completed', label: 'Completed' },
            { id: 'processing', label: 'Processing' },
            { id: 'queued', label: 'Queued' },
            { id: 'failed', label: 'Failed' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setFilter(tab?.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center
                ${filter === tab?.id
                  ? 'bg-surface text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <span>{tab?.label}</span>
              <span className="text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded">
                {statusCounts?.[tab?.id]}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Export List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredExports?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No exports found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredExports?.map((exportItem) => (
              <div key={exportItem?.id} className="p-6 hover:bg-muted/30 transition-smooth">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Status Icon */}
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-lg
                      ${getStatusBg(exportItem?.status)}
                    `}>
                      <Icon 
                        name={getStatusIcon(exportItem?.status)} 
                        size={20} 
                        className={getStatusColor(exportItem?.status)} 
                      />
                    </div>

                    {/* Export Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {exportItem?.filename}
                        </h3>
                        <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                          {exportItem?.format}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <span>{exportItem?.records?.toLocaleString()} records</span>
                        <span>{exportItem?.size}</span>
                        <span>{formatTimeAgo(exportItem?.createdAt)}</span>
                      </div>

                      {/* Progress Bar */}
                      {exportItem?.status === 'processing' && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Processing...</span>
                            <span>{exportItem?.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-smooth"
                              style={{ width: `${exportItem?.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Error Message */}
                      {exportItem?.status === 'failed' && exportItem?.error && (
                        <div className="flex items-center space-x-2 text-sm text-error bg-error/10 px-3 py-2 rounded-md">
                          <Icon name="AlertCircle" size={16} />
                          <span>{exportItem?.error}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {exportItem?.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload && onDownload(exportItem?.id)}
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                    )}
                    
                    {exportItem?.status === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRetry && onRetry(exportItem?.id)}
                      >
                        <Icon name="RotateCcw" size={16} />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete && onDelete(exportItem?.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportQueue;