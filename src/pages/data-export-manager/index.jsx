import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ExportConfigPanel from './components/ExportConfigPanel';
import ExportPreviewPanel from './components/ExportPreviewPanel';
import ExportQueue from './components/ExportQueue';
import ExportTemplates from './components/ExportTemplates';
import ExportToolbar from './components/ExportToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataExportManager = () => {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [selectedFields, setSelectedFields] = useState(['id', 'name', 'email', 'department']);
  const [exportRange, setExportRange] = useState('all');
  const [customSettings, setCustomSettings] = useState({
    filename: '',
    includeTimestamp: true,
    includeHeaders: true,
    formatDates: false,
    stringifyNumbers: false,
    compress: false,
    emailLink: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [activeView, setActiveView] = useState('config'); // config, queue, templates
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle export process
  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // Show success notification or redirect to queue
      setActiveView('queue');
    }, 3000);
  };

  const handleBatchExport = () => {
    console.log('Batch export initiated');
  };

  const handleScheduleExport = () => {
    console.log('Schedule export dialog opened');
  };

  const handleApplyTemplate = (template) => {
    setSelectedFormat(template?.format);
    setSelectedFields(template?.fields);
    setExportRange(template?.range);
    setCustomSettings({ ...customSettings, ...template?.settings });
    setActiveView('config');
  };

  const handleSaveTemplate = (templateData) => {
    console.log('Saving template:', templateData);
  };

  const handleRetryExport = (exportId) => {
    console.log('Retrying export:', exportId);
  };

  const handleDownloadExport = (exportId) => {
    console.log('Downloading export:', exportId);
  };

  const handleDeleteExport = (exportId) => {
    console.log('Deleting export:', exportId);
  };

  const viewTabs = [
    { id: 'config', label: 'Configure', icon: 'Settings' },
    { id: 'queue', label: 'Queue', icon: 'List' },
    { id: 'templates', label: 'Templates', icon: 'Bookmark' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                  <Icon name="Download" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Data Export Manager</h1>
                  <p className="text-muted-foreground mt-1">
                    Configure, preview, and manage your data exports with enterprise-grade options
                  </p>
                </div>
              </div>
              
              {/* Mobile View Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Icon name="Menu" size={20} />
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-border">
                <div className="flex space-x-1 bg-muted rounded-lg p-1">
                  {viewTabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => {
                        setActiveView(tab?.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center
                        ${activeView === tab?.id
                          ? 'bg-surface text-foreground shadow-elevation-1'
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Export Toolbar */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <ExportToolbar
            selectedFormat={selectedFormat}
            selectedFields={selectedFields}
            exportRange={exportRange}
            onExport={handleExport}
            onBatchExport={handleBatchExport}
            onScheduleExport={handleScheduleExport}
            isExporting={isExporting}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Panel - Configuration */}
              <div className="col-span-5">
                <div className="space-y-6">
                  <ExportConfigPanel
                    selectedFormat={selectedFormat}
                    onFormatChange={setSelectedFormat}
                    selectedFields={selectedFields}
                    onFieldsChange={setSelectedFields}
                    exportRange={exportRange}
                    onRangeChange={setExportRange}
                    customSettings={customSettings}
                    onSettingsChange={setCustomSettings}
                  />
                  
                  <ExportTemplates
                    onApplyTemplate={handleApplyTemplate}
                    onSaveTemplate={handleSaveTemplate}
                  />
                </div>
              </div>

              {/* Right Panel - Preview and Queue */}
              <div className="col-span-7">
                <div className="space-y-6">
                  <ExportPreviewPanel
                    selectedFormat={selectedFormat}
                    selectedFields={selectedFields}
                    exportRange={exportRange}
                  />
                  
                  <ExportQueue
                    onRetry={handleRetryExport}
                    onDownload={handleDownloadExport}
                    onDelete={handleDeleteExport}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* View Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-muted rounded-lg p-1">
                {viewTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveView(tab?.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center
                      ${activeView === tab?.id
                        ? 'bg-surface text-foreground shadow-elevation-1'
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="space-y-6">
              {activeView === 'config' && (
                <>
                  <ExportConfigPanel
                    selectedFormat={selectedFormat}
                    onFormatChange={setSelectedFormat}
                    selectedFields={selectedFields}
                    onFieldsChange={setSelectedFields}
                    exportRange={exportRange}
                    onRangeChange={setExportRange}
                    customSettings={customSettings}
                    onSettingsChange={setCustomSettings}
                  />
                  
                  <ExportPreviewPanel
                    selectedFormat={selectedFormat}
                    selectedFields={selectedFields}
                    exportRange={exportRange}
                  />
                </>
              )}

              {activeView === 'queue' && (
                <ExportQueue
                  onRetry={handleRetryExport}
                  onDownload={handleDownloadExport}
                  onDelete={handleDeleteExport}
                />
              )}

              {activeView === 'templates' && (
                <ExportTemplates
                  onApplyTemplate={handleApplyTemplate}
                  onSaveTemplate={handleSaveTemplate}
                />
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button (Mobile) */}
        {activeView !== 'config' && (
          <div className="lg:hidden fixed bottom-6 right-6">
            <Button
              variant="default"
              size="lg"
              onClick={handleExport}
              disabled={!selectedFormat || selectedFields?.length === 0 || isExporting}
              className="rounded-full shadow-elevation-3"
            >
              <Icon name="Download" size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExportManager;