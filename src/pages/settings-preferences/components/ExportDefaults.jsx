import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ExportDefaults = ({ settings, onSettingChange, onResetSection }) => {
  const exportFormatOptions = [
    { value: 'xlsx', label: 'Excel (.xlsx)' },
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'json', label: 'JSON (.json)' },
    { value: 'xml', label: 'XML (.xml)' },
    { value: 'pdf', label: 'PDF (.pdf)' },
    { value: 'html', label: 'HTML (.html)' }
  ];

  const csvDelimiterOptions = [
    { value: 'comma', label: 'Comma (,)' },
    { value: 'semicolon', label: 'Semicolon (;)' },
    { value: 'tab', label: 'Tab' },
    { value: 'pipe', label: 'Pipe (|)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY' }
  ];

  const compressionOptions = [
    { value: 'none', label: 'No compression' },
    { value: 'zip', label: 'ZIP compression' },
    { value: 'gzip', label: 'GZIP compression' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Export Defaults</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Set default formats and options for data export operations
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onResetSection('exportDefaults')}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset Section
        </Button>
      </div>
      {/* Default Export Format */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Default Export Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure the primary export format and basic options
            </p>
          </div>
          <Icon name="Download" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Export Format"
            description="Primary format for quick exports"
            options={exportFormatOptions}
            value={settings?.defaultExportFormat}
            onChange={(value) => onSettingChange('defaultExportFormat', value)}
          />

          <Select
            label="Compression"
            description="Compress exported files to reduce size"
            options={compressionOptions}
            value={settings?.compression}
            onChange={(value) => onSettingChange('compression', value)}
          />

          <Input
            label="Default Filename Prefix"
            type="text"
            description="Prefix for automatically generated filenames"
            value={settings?.filenamePrefix}
            onChange={(e) => onSettingChange('filenamePrefix', e?.target?.value)}
            placeholder="ExcelData"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Filename Format</label>
            <p className="text-xs text-muted-foreground mb-3">
              Choose how to format exported filenames
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="filename-prefix"
                  name="filenameFormat"
                  value="prefix"
                  checked={settings?.filenameFormat === 'prefix'}
                  onChange={(e) => onSettingChange('filenameFormat', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="filename-prefix" className="text-sm text-foreground">
                  Prefix + Timestamp
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="filename-original"
                  name="filenameFormat"
                  value="original"
                  checked={settings?.filenameFormat === 'original'}
                  onChange={(e) => onSettingChange('filenameFormat', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="filename-original" className="text-sm text-foreground">
                  Keep Original Name
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="filename-custom"
                  name="filenameFormat"
                  value="custom"
                  checked={settings?.filenameFormat === 'custom'}
                  onChange={(e) => onSettingChange('filenameFormat', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="filename-custom" className="text-sm text-foreground">
                  Always Ask
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CSV Export Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">CSV Export Configuration</h4>
            <p className="text-sm text-muted-foreground">
              Specific settings for CSV file exports
            </p>
          </div>
          <Icon name="FileText" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="CSV Delimiter"
            description="Character used to separate values"
            options={csvDelimiterOptions}
            value={settings?.csvDelimiter}
            onChange={(value) => onSettingChange('csvDelimiter', value)}
          />

          <Input
            label="Text Qualifier"
            type="text"
            description="Character to wrap text values (usually quotes)"
            value={settings?.textQualifier}
            onChange={(e) => onSettingChange('textQualifier', e?.target?.value)}
            placeholder='"'
            maxLength="1"
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Include column headers"
            description="Add column names as the first row in CSV exports"
            checked={settings?.includeHeaders}
            onChange={(e) => onSettingChange('includeHeaders', e?.target?.checked)}
          />

          <Checkbox
            label="Quote all text fields"
            description="Wrap all text values in quotes for better compatibility"
            checked={settings?.quoteAllText}
            onChange={(e) => onSettingChange('quoteAllText', e?.target?.checked)}
          />

          <Checkbox
            label="Use UTF-8 BOM"
            description="Add Byte Order Mark for better Excel compatibility"
            checked={settings?.useUtf8Bom}
            onChange={(e) => onSettingChange('useUtf8Bom', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Field Mapping */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Field Mapping & Formatting</h4>
            <p className="text-sm text-muted-foreground">
              Control how data fields are formatted in exports
            </p>
          </div>
          <Icon name="Map" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Date Format"
            description="How to format date values in exports"
            options={dateFormatOptions}
            value={settings?.exportDateFormat}
            onChange={(value) => onSettingChange('exportDateFormat', value)}
          />

          <Input
            label="Decimal Places"
            type="number"
            description="Number of decimal places for numeric values"
            value={settings?.decimalPlaces}
            onChange={(e) => onSettingChange('decimalPlaces', parseInt(e?.target?.value))}
            min="0"
            max="10"
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Export hidden columns"
            description="Include columns that are hidden in the current view"
            checked={settings?.exportHiddenColumns}
            onChange={(e) => onSettingChange('exportHiddenColumns', e?.target?.checked)}
          />

          <Checkbox
            label="Export filtered data only"
            description="Only export rows that match current filters"
            checked={settings?.exportFilteredOnly}
            onChange={(e) => onSettingChange('exportFilteredOnly', e?.target?.checked)}
          />

          <Checkbox
            label="Preserve cell formatting"
            description="Maintain colors, fonts, and styles in supported formats"
            checked={settings?.preserveCellFormatting}
            onChange={(e) => onSettingChange('preserveCellFormatting', e?.target?.checked)}
          />

          <Checkbox
            label="Include row numbers"
            description="Add a column with sequential row numbers"
            checked={settings?.includeRowNumbers}
            onChange={(e) => onSettingChange('includeRowNumbers', e?.target?.checked)}
          />
        </div>
      </div>
      {/* JSON Export Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">JSON Export Configuration</h4>
            <p className="text-sm text-muted-foreground">
              Settings specific to JSON format exports
            </p>
          </div>
          <Icon name="Braces" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">JSON Structure</label>
            <p className="text-xs text-muted-foreground mb-3">
              Choose how to structure the JSON output
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="json-array"
                  name="jsonStructure"
                  value="array"
                  checked={settings?.jsonStructure === 'array'}
                  onChange={(e) => onSettingChange('jsonStructure', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="json-array" className="text-sm text-foreground">
                  Array of objects (recommended)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="json-object"
                  name="jsonStructure"
                  value="object"
                  checked={settings?.jsonStructure === 'object'}
                  onChange={(e) => onSettingChange('jsonStructure', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="json-object" className="text-sm text-foreground">
                  Single object with arrays
                </label>
              </div>
            </div>
          </div>

          <Checkbox
            label="Pretty print JSON"
            description="Format JSON with indentation for readability"
            checked={settings?.prettyPrintJson}
            onChange={(e) => onSettingChange('prettyPrintJson', e?.target?.checked)}
          />

          <Checkbox
            label="Include metadata"
            description="Add export timestamp and source information"
            checked={settings?.includeMetadata}
            onChange={(e) => onSettingChange('includeMetadata', e?.target?.checked)}
          />

          <Checkbox
            label="Convert dates to ISO format"
            description="Format dates as ISO 8601 strings in JSON"
            checked={settings?.convertDatesToIso}
            onChange={(e) => onSettingChange('convertDatesToIso', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExportDefaults;