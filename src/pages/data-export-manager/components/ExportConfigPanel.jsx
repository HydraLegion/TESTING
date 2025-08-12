import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportConfigPanel = ({ 
  selectedFormat, 
  onFormatChange, 
  selectedFields, 
  onFieldsChange,
  exportRange,
  onRangeChange,
  customSettings,
  onSettingsChange 
}) => {
  const [activeTab, setActiveTab] = useState('format');

  const exportFormats = [
    {
      id: 'json',
      name: 'JSON',
      description: 'JavaScript Object Notation - ideal for APIs',
      icon: 'FileJson',
      features: ['Nested structures', 'Type preservation', 'Compact size']
    },
    {
      id: 'csv',
      name: 'CSV',
      description: 'Comma Separated Values - universal compatibility',
      icon: 'FileText',
      features: ['Excel compatible', 'Lightweight', 'Easy parsing']
    },
    {
      id: 'excel',
      name: 'Excel',
      description: 'Native Excel format with formatting',
      icon: 'FileSpreadsheet',
      features: ['Preserve formatting', 'Multiple sheets', 'Formulas']
    }
  ];

  const availableFields = [
    { id: 'id', name: 'ID', type: 'number' },
    { id: 'name', name: 'Full Name', type: 'text' },
    { id: 'email', name: 'Email Address', type: 'email' },
    { id: 'department', name: 'Department', type: 'text' },
    { id: 'salary', name: 'Salary', type: 'currency' },
    { id: 'hire_date', name: 'Hire Date', type: 'date' },
    { id: 'status', name: 'Employment Status', type: 'text' },
    { id: 'manager', name: 'Manager', type: 'text' }
  ];

  const tabs = [
    { id: 'format', label: 'Format', icon: 'FileType' },
    { id: 'fields', label: 'Fields', icon: 'Columns' },
    { id: 'range', label: 'Range', icon: 'Target' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings' }
  ];

  const handleFieldToggle = (fieldId) => {
    const updatedFields = selectedFields?.includes(fieldId)
      ? selectedFields?.filter(id => id !== fieldId)
      : [...selectedFields, fieldId];
    onFieldsChange(updatedFields);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Export Configuration</h2>
            <p className="text-sm text-muted-foreground">Customize your data export settings</p>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center
                ${activeTab === tab?.id
                  ? 'bg-surface text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'format' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground mb-4">Select Export Format</h3>
            {exportFormats?.map((format) => (
              <div
                key={format?.id}
                onClick={() => onFormatChange(format?.id)}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-smooth
                  ${selectedFormat === format?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg
                    ${selectedFormat === format?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                  `}>
                    <Icon name={format?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{format?.name}</h4>
                      {selectedFormat === format?.id && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{format?.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {format?.features?.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'fields' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Select Fields to Export</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFieldsChange(availableFields?.map(f => f?.id))}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFieldsChange([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {availableFields?.map((field) => (
                <div
                  key={field?.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedFields?.includes(field?.id)}
                      onChange={() => handleFieldToggle(field?.id)}
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground">{field?.name}</span>
                      <span className="ml-2 px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                        {field?.type}
                      </span>
                    </div>
                  </div>
                  <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'range' && (
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-foreground">Data Range Selection</h3>
            
            <div className="space-y-4">
              <div
                onClick={() => onRangeChange('all')}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-smooth
                  ${exportRange === 'all' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${exportRange === 'all' ? 'border-primary' : 'border-border'}
                  `}>
                    {exportRange === 'all' && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">All Data</h4>
                    <p className="text-sm text-muted-foreground">Export complete dataset (1,247 records)</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => onRangeChange('filtered')}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-smooth
                  ${exportRange === 'filtered' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${exportRange === 'filtered' ? 'border-primary' : 'border-border'}
                  `}>
                    {exportRange === 'filtered' && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Current Filter</h4>
                    <p className="text-sm text-muted-foreground">Export filtered results (342 records)</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => onRangeChange('custom')}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-smooth
                  ${exportRange === 'custom' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${exportRange === 'custom' ? 'border-primary' : 'border-border'}
                  `}>
                    {exportRange === 'custom' && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Custom Range</h4>
                    <p className="text-sm text-muted-foreground">Specify row range manually</p>
                  </div>
                </div>
              </div>

              {exportRange === 'custom' && (
                <div className="ml-7 space-y-3 p-4 bg-muted/30 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Start Row"
                      type="number"
                      placeholder="1"
                      min="1"
                    />
                    <Input
                      label="End Row"
                      type="number"
                      placeholder="1247"
                      min="1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-foreground">Advanced Options</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-3">File Settings</h4>
                <div className="space-y-3">
                  <Input
                    label="Custom Filename"
                    placeholder="employee_data_export"
                    value={customSettings?.filename || ''}
                    onChange={(e) => onSettingsChange({ ...customSettings, filename: e?.target?.value })}
                  />
                  <Checkbox
                    label="Include timestamp in filename"
                    checked={customSettings?.includeTimestamp || false}
                    onChange={(e) => onSettingsChange({ ...customSettings, includeTimestamp: e?.target?.checked })}
                  />
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Data Formatting</h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Include column headers"
                    checked={customSettings?.includeHeaders !== false}
                    onChange={(e) => onSettingsChange({ ...customSettings, includeHeaders: e?.target?.checked })}
                  />
                  <Checkbox
                    label="Format dates as ISO strings"
                    checked={customSettings?.formatDates || false}
                    onChange={(e) => onSettingsChange({ ...customSettings, formatDates: e?.target?.checked })}
                  />
                  <Checkbox
                    label="Convert numbers to strings"
                    checked={customSettings?.stringifyNumbers || false}
                    onChange={(e) => onSettingsChange({ ...customSettings, stringifyNumbers: e?.target?.checked })}
                  />
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Export Options</h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Compress output file"
                    checked={customSettings?.compress || false}
                    onChange={(e) => onSettingsChange({ ...customSettings, compress: e?.target?.checked })}
                  />
                  <Checkbox
                    label="Email export link"
                    checked={customSettings?.emailLink || false}
                    onChange={(e) => onSettingsChange({ ...customSettings, emailLink: e?.target?.checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportConfigPanel;