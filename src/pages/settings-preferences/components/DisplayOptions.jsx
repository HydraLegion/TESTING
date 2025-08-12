import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DisplayOptions = ({ settings, onSettingChange, onResetSection }) => {
  const gridThemeOptions = [
    { value: 'default', label: 'Default Grid' },
    { value: 'excel', label: 'Excel-like' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'modern', label: 'Modern' }
  ];

  const fontSizeOptions = [
    { value: 'xs', label: 'Extra Small (10px)' },
    { value: 'sm', label: 'Small (12px)' },
    { value: 'base', label: 'Medium (14px)' },
    { value: 'lg', label: 'Large (16px)' },
    { value: 'xl', label: 'Extra Large (18px)' }
  ];

  const rowHeightOptions = [
    { value: 'compact', label: 'Compact (24px)' },
    { value: 'normal', label: 'Normal (32px)' },
    { value: 'comfortable', label: 'Comfortable (40px)' },
    { value: 'spacious', label: 'Spacious (48px)' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Display Options</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Customize how data is displayed and formatted in the grid
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onResetSection('display')}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset Section
        </Button>
      </div>
      {/* Grid Appearance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Grid Appearance</h4>
            <p className="text-sm text-muted-foreground">
              Control the visual style and layout of data grids
            </p>
          </div>
          <Icon name="Grid3X3" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Grid Theme"
            description="Choose the visual style for data grids"
            options={gridThemeOptions}
            value={settings?.gridTheme}
            onChange={(value) => onSettingChange('gridTheme', value)}
          />

          <Select
            label="Font Size"
            description="Set the text size for grid content"
            options={fontSizeOptions}
            value={settings?.fontSize}
            onChange={(value) => onSettingChange('fontSize', value)}
          />

          <Select
            label="Row Height"
            description="Control the spacing between rows"
            options={rowHeightOptions}
            value={settings?.rowHeight}
            onChange={(value) => onSettingChange('rowHeight', value)}
          />

          <Input
            label="Rows Per Page"
            type="number"
            description="Number of rows to display per page"
            value={settings?.rowsPerPage}
            onChange={(e) => onSettingChange('rowsPerPage', parseInt(e?.target?.value))}
            min="10"
            max="1000"
            className="mt-0"
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Show grid lines"
            description="Display borders between cells and rows"
            checked={settings?.showGridLines}
            onChange={(e) => onSettingChange('showGridLines', e?.target?.checked)}
          />

          <Checkbox
            label="Zebra striping"
            description="Alternate row colors for better readability"
            checked={settings?.zebraStriping}
            onChange={(e) => onSettingChange('zebraStriping', e?.target?.checked)}
          />

          <Checkbox
            label="Sticky headers"
            description="Keep column headers visible when scrolling"
            checked={settings?.stickyHeaders}
            onChange={(e) => onSettingChange('stickyHeaders', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Cell Formatting */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Cell Formatting</h4>
            <p className="text-sm text-muted-foreground">
              Preserve and display Excel formatting accurately
            </p>
          </div>
          <Icon name="Type" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Preserve original formatting"
            description="Maintain Excel cell formatting (colors, fonts, borders)"
            checked={settings?.preserveFormatting}
            onChange={(e) => onSettingChange('preserveFormatting', e?.target?.checked)}
          />

          <Checkbox
            label="Show formula bar"
            description="Display formulas and cell content in a dedicated bar"
            checked={settings?.showFormulaBar}
            onChange={(e) => onSettingChange('showFormulaBar', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-resize columns"
            description="Automatically adjust column widths to fit content"
            checked={settings?.autoResizeColumns}
            onChange={(e) => onSettingChange('autoResizeColumns', e?.target?.checked)}
          />

          <Checkbox
            label="Wrap text in cells"
            description="Allow text to wrap within cells for better visibility"
            checked={settings?.wrapText}
            onChange={(e) => onSettingChange('wrapText', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Empty Cell Handling */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Empty Cell Visualization</h4>
            <p className="text-sm text-muted-foreground">
              Configure how empty and null values are displayed
            </p>
          </div>
          <Icon name="Square" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Empty Cell Display</label>
            <p className="text-xs text-muted-foreground mb-3">
              Choose how empty cells should appear in the grid
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="empty-blank"
                  name="emptyCellDisplay"
                  value="blank"
                  checked={settings?.emptyCellDisplay === 'blank'}
                  onChange={(e) => onSettingChange('emptyCellDisplay', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="empty-blank" className="text-sm text-foreground">
                  Blank space (recommended)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="empty-dash"
                  name="emptyCellDisplay"
                  value="dash"
                  checked={settings?.emptyCellDisplay === 'dash'}
                  onChange={(e) => onSettingChange('emptyCellDisplay', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="empty-dash" className="text-sm text-foreground">
                  Show dash (-)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="empty-na"
                  name="emptyCellDisplay"
                  value="na"
                  checked={settings?.emptyCellDisplay === 'na'}
                  onChange={(e) => onSettingChange('emptyCellDisplay', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="empty-na" className="text-sm text-foreground">
                  Show "N/A"
                </label>
              </div>
            </div>
          </div>

          <Checkbox
            label="Highlight empty cells"
            description="Add subtle background color to empty cells for visibility"
            checked={settings?.highlightEmptyCells}
            onChange={(e) => onSettingChange('highlightEmptyCells', e?.target?.checked)}
          />

          <Checkbox
            label="Hide NaN values"
            description="Never display 'NaN' text, show as empty instead"
            checked={settings?.hideNaNValues}
            onChange={(e) => onSettingChange('hideNaNValues', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Column Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Column Management</h4>
            <p className="text-sm text-muted-foreground">
              Control column behavior and interaction options
            </p>
          </div>
          <Icon name="Columns" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable column sorting"
            description="Allow users to sort data by clicking column headers"
            checked={settings?.enableSorting}
            onChange={(e) => onSettingChange('enableSorting', e?.target?.checked)}
          />

          <Checkbox
            label="Enable column filtering"
            description="Show filter controls in column headers"
            checked={settings?.enableFiltering}
            onChange={(e) => onSettingChange('enableFiltering', e?.target?.checked)}
          />

          <Checkbox
            label="Resizable columns"
            description="Allow users to drag column borders to resize"
            checked={settings?.resizableColumns}
            onChange={(e) => onSettingChange('resizableColumns', e?.target?.checked)}
          />

          <Checkbox
            label="Show column numbers"
            description="Display Excel-style column letters (A, B, C...)"
            checked={settings?.showColumnNumbers}
            onChange={(e) => onSettingChange('showColumnNumbers', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayOptions;