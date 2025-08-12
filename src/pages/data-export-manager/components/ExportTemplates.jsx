import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportTemplates = ({ onApplyTemplate, onSaveTemplate }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const mockTemplates = [
    {
      id: 'tpl_001',
      name: 'Employee Report',
      description: 'Standard employee data export with core fields',
      format: 'json',
      fields: ['id', 'name', 'email', 'department', 'hire_date', 'status'],
      range: 'all',
      settings: {
        includeHeaders: true,
        formatDates: true,
        filename: 'employee_report'
      },
      createdAt: new Date('2024-12-15'),
      usageCount: 23
    },
    {
      id: 'tpl_002',
      name: 'Payroll Export',
      description: 'Salary and compensation data for payroll processing',
      format: 'csv',
      fields: ['id', 'name', 'department', 'salary', 'hire_date'],
      range: 'filtered',
      settings: {
        includeHeaders: true,
        formatDates: false,
        filename: 'payroll_data'
      },
      createdAt: new Date('2024-12-10'),
      usageCount: 15
    },
    {
      id: 'tpl_003',
      name: 'Contact List',
      description: 'Basic contact information for directory',
      format: 'excel',
      fields: ['name', 'email', 'department', 'manager'],
      range: 'all',
      settings: {
        includeHeaders: true,
        formatDates: true,
        filename: 'contact_directory'
      },
      createdAt: new Date('2024-12-08'),
      usageCount: 8
    },
    {
      id: 'tpl_004',
      name: 'Department Summary',
      description: 'Aggregated data by department for reporting',
      format: 'json',
      fields: ['department', 'name', 'status', 'hire_date'],
      range: 'custom',
      settings: {
        includeHeaders: true,
        formatDates: true,
        filename: 'dept_summary'
      },
      createdAt: new Date('2024-12-05'),
      usageCount: 12
    }
  ];

  const getFormatIcon = (format) => {
    switch (format) {
      case 'json': return 'FileJson';
      case 'csv': return 'FileText';
      case 'excel': return 'FileSpreadsheet';
      default: return 'File';
    }
  };

  const getFormatColor = (format) => {
    switch (format) {
      case 'json': return 'text-blue-600';
      case 'csv': return 'text-green-600';
      case 'excel': return 'text-emerald-600';
      default: return 'text-muted-foreground';
    }
  };

  const handleSaveTemplate = () => {
    if (templateName?.trim()) {
      onSaveTemplate && onSaveTemplate({
        name: templateName,
        description: templateDescription
      });
      setTemplateName('');
      setTemplateDescription('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
              <Icon name="Bookmark" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Templates</h2>
              <p className="text-sm text-muted-foreground">Save and reuse export configurations</p>
            </div>
          </div>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowSaveDialog(true)}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2">Save Current</span>
          </Button>
        </div>
      </div>
      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="p-6 border-b border-border bg-muted/30">
          <h3 className="font-medium text-foreground mb-4">Save Export Template</h3>
          <div className="space-y-4">
            <Input
              label="Template Name"
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e?.target?.value)}
              required
            />
            <Input
              label="Description"
              placeholder="Brief description of this template"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e?.target?.value)}
            />
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                size="sm"
                onClick={handleSaveTemplate}
                disabled={!templateName?.trim()}
              >
                Save Template
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Templates List */}
      <div className="max-h-80 overflow-y-auto">
        {mockTemplates?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="BookmarkX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No templates saved yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {mockTemplates?.map((template) => (
              <div key={template?.id} className="p-6 hover:bg-muted/30 transition-smooth">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Format Icon */}
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                      <Icon 
                        name={getFormatIcon(template?.format)} 
                        size={20} 
                        className={getFormatColor(template?.format)} 
                      />
                    </div>

                    {/* Template Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">{template?.name}</h3>
                        <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                          {template?.format?.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {template?.description}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{template?.fields?.length} fields</span>
                        <span>{template?.range} range</span>
                        <span>Used {template?.usageCount} times</span>
                        <span>{template?.createdAt?.toLocaleDateString()}</span>
                      </div>

                      {/* Field Preview */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template?.fields?.slice(0, 4)?.map((field) => (
                          <span
                            key={field}
                            className="px-2 py-1 bg-primary/10 text-xs text-primary rounded"
                          >
                            {field}
                          </span>
                        ))}
                        {template?.fields?.length > 4 && (
                          <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                            +{template?.fields?.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onApplyTemplate && onApplyTemplate(template)}
                    >
                      <Icon name="Play" size={16} />
                      <span className="ml-2 hidden sm:inline">Apply</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{mockTemplates?.length} templates saved</span>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
            <span className="ml-2">Manage Templates</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportTemplates;