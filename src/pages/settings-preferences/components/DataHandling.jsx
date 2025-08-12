import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DataHandling = ({ settings, onSettingChange, onResetSection }) => {
  const autoSaveIntervalOptions = [
    { value: '30', label: 'Every 30 seconds' },
    { value: '60', label: 'Every minute' },
    { value: '300', label: 'Every 5 minutes' },
    { value: '600', label: 'Every 10 minutes' },
    { value: '1800', label: 'Every 30 minutes' },
    { value: 'disabled', label: 'Disabled' }
  ];

  const validationLevelOptions = [
    { value: 'strict', label: 'Strict - Reject invalid data' },
    { value: 'warning', label: 'Warning - Show alerts but allow' },
    { value: 'permissive', label: 'Permissive - Accept all data' }
  ];

  const encodingOptions = [
    { value: 'utf8', label: 'UTF-8 (Recommended)' },
    { value: 'utf16', label: 'UTF-16' },
    { value: 'ascii', label: 'ASCII' },
    { value: 'iso88591', label: 'ISO-8859-1' },
    { value: 'windows1252', label: 'Windows-1252' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Handling</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure file processing, validation, and data management options
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onResetSection('dataHandling')}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset Section
        </Button>
      </div>
      {/* File Upload Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">File Upload Configuration</h4>
            <p className="text-sm text-muted-foreground">
              Set limits and behavior for Excel file uploads
            </p>
          </div>
          <Icon name="Upload" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Maximum File Size (MB)"
            type="number"
            description="Maximum allowed file size for uploads"
            value={settings?.maxFileSize}
            onChange={(e) => onSettingChange('maxFileSize', parseInt(e?.target?.value))}
            min="1"
            max="500"
          />

          <Input
            label="Maximum Rows"
            type="number"
            description="Maximum number of rows to process"
            value={settings?.maxRows}
            onChange={(e) => onSettingChange('maxRows', parseInt(e?.target?.value))}
            min="100"
            max="1000000"
          />

          <Input
            label="Maximum Columns"
            type="number"
            description="Maximum number of columns to process"
            value={settings?.maxColumns}
            onChange={(e) => onSettingChange('maxColumns', parseInt(e?.target?.value))}
            min="10"
            max="1000"
          />

          <Select
            label="File Encoding"
            description="Default character encoding for file processing"
            options={encodingOptions}
            value={settings?.fileEncoding}
            onChange={(value) => onSettingChange('fileEncoding', value)}
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Allow multiple file uploads"
            description="Enable uploading multiple Excel files simultaneously"
            checked={settings?.allowMultipleFiles}
            onChange={(e) => onSettingChange('allowMultipleFiles', e?.target?.checked)}
          />

          <Checkbox
            label="Validate file format"
            description="Check file extensions and MIME types before processing"
            checked={settings?.validateFileFormat}
            onChange={(e) => onSettingChange('validateFileFormat', e?.target?.checked)}
          />

          <Checkbox
            label="Scan for malicious content"
            description="Perform security checks on uploaded files"
            checked={settings?.scanForMalware}
            onChange={(e) => onSettingChange('scanForMalware', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Data Processing */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Data Processing Options</h4>
            <p className="text-sm text-muted-foreground">
              Control how Excel data is parsed and processed
            </p>
          </div>
          <Icon name="Cpu" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Process all worksheets"
            description="Import data from all sheets in the Excel file"
            checked={settings?.processAllSheets}
            onChange={(e) => onSettingChange('processAllSheets', e?.target?.checked)}
          />

          <Checkbox
            label="Preserve formulas"
            description="Keep Excel formulas instead of converting to values"
            checked={settings?.preserveFormulas}
            onChange={(e) => onSettingChange('preserveFormulas', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-detect data types"
            description="Automatically identify numbers, dates, and text columns"
            checked={settings?.autoDetectTypes}
            onChange={(e) => onSettingChange('autoDetectTypes', e?.target?.checked)}
          />

          <Checkbox
            label="Trim whitespace"
            description="Remove leading and trailing spaces from cell values"
            checked={settings?.trimWhitespace}
            onChange={(e) => onSettingChange('trimWhitespace', e?.target?.checked)}
          />

          <Checkbox
            label="Skip empty rows"
            description="Ignore completely empty rows during processing"
            checked={settings?.skipEmptyRows}
            onChange={(e) => onSettingChange('skipEmptyRows', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Auto-Save Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Auto-Save Configuration</h4>
            <p className="text-sm text-muted-foreground">
              Automatically save changes and manage data persistence
            </p>
          </div>
          <Icon name="Save" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Auto-Save Interval"
            description="How often to automatically save changes"
            options={autoSaveIntervalOptions}
            value={settings?.autoSaveInterval}
            onChange={(value) => onSettingChange('autoSaveInterval', value)}
          />

          <Input
            label="Backup Retention (days)"
            type="number"
            description="How long to keep backup copies"
            value={settings?.backupRetention}
            onChange={(e) => onSettingChange('backupRetention', parseInt(e?.target?.value))}
            min="1"
            max="365"
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Enable auto-save"
            description="Automatically save changes without manual intervention"
            checked={settings?.enableAutoSave}
            onChange={(e) => onSettingChange('enableAutoSave', e?.target?.checked)}
          />

          <Checkbox
            label="Create backup copies"
            description="Keep backup versions of modified files"
            checked={settings?.createBackups}
            onChange={(e) => onSettingChange('createBackups', e?.target?.checked)}
          />

          <Checkbox
            label="Save on window close"
            description="Automatically save when closing the application"
            checked={settings?.saveOnClose}
            onChange={(e) => onSettingChange('saveOnClose', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Data Validation */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Data Validation Rules</h4>
            <p className="text-sm text-muted-foreground">
              Configure validation and error handling for imported data
            </p>
          </div>
          <Icon name="Shield" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-6">
          <Select
            label="Validation Level"
            description="How strictly to validate imported data"
            options={validationLevelOptions}
            value={settings?.validationLevel}
            onChange={(value) => onSettingChange('validationLevel', value)}
          />

          <div className="space-y-4">
            <Checkbox
              label="Check for duplicate rows"
              description="Identify and flag duplicate data entries"
              checked={settings?.checkDuplicates}
              onChange={(e) => onSettingChange('checkDuplicates', e?.target?.checked)}
            />

            <Checkbox
              label="Validate date formats"
              description="Ensure date values match expected formats"
              checked={settings?.validateDates}
              onChange={(e) => onSettingChange('validateDates', e?.target?.checked)}
            />

            <Checkbox
              label="Validate numeric ranges"
              description="Check if numbers fall within reasonable ranges"
              checked={settings?.validateNumbers}
              onChange={(e) => onSettingChange('validateNumbers', e?.target?.checked)}
            />

            <Checkbox
              label="Check required fields"
              description="Ensure mandatory columns contain values"
              checked={settings?.checkRequiredFields}
              onChange={(e) => onSettingChange('checkRequiredFields', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataHandling;