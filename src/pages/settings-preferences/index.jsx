import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SettingsHeader from './components/SettingsHeader';
import SettingsSidebar from './components/SettingsSidebar';
import GeneralSettings from './components/GeneralSettings';
import DisplayOptions from './components/DisplayOptions';
import DataHandling from './components/DataHandling';
import ExportDefaults from './components/ExportDefaults';
import SecuritySettings from './components/SecuritySettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SettingsPreferences = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Default settings state
  const [settings, setSettings] = useState({
    // General Settings
    darkMode: false,
    autoTheme: true,
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'US',
    rememberFiles: true,
    showWelcome: true,
    autoUpdate: true,

    // Display Options
    gridTheme: 'default',
    fontSize: 'base',
    rowHeight: 'normal',
    rowsPerPage: 50,
    showGridLines: true,
    zebraStriping: true,
    stickyHeaders: true,
    preserveFormatting: true,
    showFormulaBar: false,
    autoResizeColumns: true,
    wrapText: false,
    emptyCellDisplay: 'blank',
    highlightEmptyCells: false,
    hideNaNValues: true,
    enableSorting: true,
    enableFiltering: true,
    resizableColumns: true,
    showColumnNumbers: false,

    // Data Handling
    maxFileSize: 50,
    maxRows: 100000,
    maxColumns: 100,
    fileEncoding: 'utf8',
    allowMultipleFiles: true,
    validateFileFormat: true,
    scanForMalware: true,
    processAllSheets: false,
    preserveFormulas: false,
    autoDetectTypes: true,
    trimWhitespace: true,
    skipEmptyRows: false,
    autoSaveInterval: '300',
    backupRetention: 30,
    enableAutoSave: true,
    createBackups: true,
    saveOnClose: true,
    validationLevel: 'warning',
    checkDuplicates: false,
    validateDates: true,
    validateNumbers: true,
    checkRequiredFields: false,

    // Export Defaults
    defaultExportFormat: 'xlsx',
    compression: 'none',
    filenamePrefix: 'ExcelData',
    filenameFormat: 'prefix',
    csvDelimiter: 'comma',
    textQualifier: '"',
    includeHeaders: true,
    quoteAllText: false,
    useUtf8Bom: true,
    exportDateFormat: 'MM/DD/YYYY',
    decimalPlaces: 2,
    exportHiddenColumns: false,
    exportFilteredOnly: true,
    preserveCellFormatting: true,
    includeRowNumbers: false,
    jsonStructure: 'array',
    prettyPrintJson: true,
    includeMetadata: false,
    convertDatesToIso: true,

    // Security Settings
    sessionTimeout: '60',
    maxConcurrentSessions: 3,
    rememberLogin: false,
    requireReauth: true,
    logSessionActivity: true,
    fileRetentionPolicy: '90',
    encryptionLevel: 'standard',
    anonymizeExports: false,
    secureFileDeletion: true,
    encryptFilesAtRest: true,
    enableDLP: false,
    enableTwoFactor: false,
    restrictUploadByIP: false,
    requireStrongPasswords: true,
    enableAccountLockout: true,
    lockoutThreshold: 5,
    lockoutDuration: 30,
    enableAuditLogging: true,
    logDataAccess: true,
    enableComplianceReporting: false,
    monitorFileIntegrity: true
  });

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('excelViewerSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem('excelViewerSettings', JSON.stringify(settings));
      setHasUnsavedChanges(false);
      
      // Show success notification (you could implement a toast system)
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
      localStorage.removeItem('excelViewerSettings');
      window.location?.reload();
    }
  };

  const handleResetSection = (section) => {
    if (window.confirm(`Are you sure you want to reset ${section} settings to their default values?`)) {
      // Reset specific section settings to defaults
      const defaultSettings = {
        general: {
          darkMode: false,
          autoTheme: true,
          language: 'en',
          timezone: 'UTC-5',
          dateFormat: 'MM/DD/YYYY',
          numberFormat: 'US',
          rememberFiles: true,
          showWelcome: true,
          autoUpdate: true
        },
        display: {
          gridTheme: 'default',
          fontSize: 'base',
          rowHeight: 'normal',
          rowsPerPage: 50,
          showGridLines: true,
          zebraStriping: true,
          stickyHeaders: true,
          preserveFormatting: true,
          showFormulaBar: false,
          autoResizeColumns: true,
          wrapText: false,
          emptyCellDisplay: 'blank',
          highlightEmptyCells: false,
          hideNaNValues: true,
          enableSorting: true,
          enableFiltering: true,
          resizableColumns: true,
          showColumnNumbers: false
        },
        dataHandling: {
          maxFileSize: 50,
          maxRows: 100000,
          maxColumns: 100,
          fileEncoding: 'utf8',
          allowMultipleFiles: true,
          validateFileFormat: true,
          scanForMalware: true,
          processAllSheets: false,
          preserveFormulas: false,
          autoDetectTypes: true,
          trimWhitespace: true,
          skipEmptyRows: false,
          autoSaveInterval: '300',
          backupRetention: 30,
          enableAutoSave: true,
          createBackups: true,
          saveOnClose: true,
          validationLevel: 'warning',
          checkDuplicates: false,
          validateDates: true,
          validateNumbers: true,
          checkRequiredFields: false
        },
        exportDefaults: {
          defaultExportFormat: 'xlsx',
          compression: 'none',
          filenamePrefix: 'ExcelData',
          filenameFormat: 'prefix',
          csvDelimiter: 'comma',
          textQualifier: '"',
          includeHeaders: true,
          quoteAllText: false,
          useUtf8Bom: true,
          exportDateFormat: 'MM/DD/YYYY',
          decimalPlaces: 2,
          exportHiddenColumns: false,
          exportFilteredOnly: true,
          preserveCellFormatting: true,
          includeRowNumbers: false,
          jsonStructure: 'array',
          prettyPrintJson: true,
          includeMetadata: false,
          convertDatesToIso: true
        },
        security: {
          sessionTimeout: '60',
          maxConcurrentSessions: 3,
          rememberLogin: false,
          requireReauth: true,
          logSessionActivity: true,
          fileRetentionPolicy: '90',
          encryptionLevel: 'standard',
          anonymizeExports: false,
          secureFileDeletion: true,
          encryptFilesAtRest: true,
          enableDLP: false,
          enableTwoFactor: false,
          restrictUploadByIP: false,
          requireStrongPasswords: true,
          enableAccountLockout: true,
          lockoutThreshold: 5,
          lockoutDuration: 30,
          enableAuditLogging: true,
          logDataAccess: true,
          enableComplianceReporting: false,
          monitorFileIntegrity: true
        }
      };

      setSettings(prev => ({
        ...prev,
        ...defaultSettings?.[section]
      }));
      setHasUnsavedChanges(true);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings}
            onSettingChange={handleSettingChange}
            onResetSection={handleResetSection}
          />
        );
      case 'display':
        return (
          <DisplayOptions
            settings={settings}
            onSettingChange={handleSettingChange}
            onResetSection={handleResetSection}
          />
        );
      case 'dataHandling':
        return (
          <DataHandling
            settings={settings}
            onSettingChange={handleSettingChange}
            onResetSection={handleResetSection}
          />
        );
      case 'exportDefaults':
        return (
          <ExportDefaults
            settings={settings}
            onSettingChange={handleSettingChange}
            onResetSection={handleResetSection}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            settings={settings}
            onSettingChange={handleSettingChange}
            onResetSection={handleResetSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 h-screen flex flex-col">
        <SettingsHeader
          onSaveAll={handleSaveAll}
          onResetAll={handleResetAll}
          hasUnsavedChanges={hasUnsavedChanges}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <SettingsSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isMobile={false}
            />
          )}

          {/* Mobile Sidebar Toggle */}
          {isMobile && (
            <div className="md:hidden">
              <SettingsSidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setShowMobileSidebar(false);
                }}
                isMobile={true}
              />
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              {renderActiveTab()}
            </div>
          </div>
        </div>

        {/* Save Changes Bar (Mobile) */}
        {isMobile && hasUnsavedChanges && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevation-3 z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Unsaved changes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetAll}
                >
                  Reset
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveAll}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPreferences;