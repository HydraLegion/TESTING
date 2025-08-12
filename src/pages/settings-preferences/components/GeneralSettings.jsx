import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const GeneralSettings = ({ settings, onSettingChange, onResetSection }) => {
  const languageOptions = [
    { value: 'en', label: 'English (US)' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' }
  ];

  const timezoneOptions = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
    { value: 'UTC-6', label: 'Central Time (UTC-6)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC+0', label: 'Greenwich Mean Time (UTC+0)' },
    { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
    { value: 'UTC+8', label: 'China Standard Time (UTC+8)' },
    { value: 'UTC+9', label: 'Japan Standard Time (UTC+9)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US Format)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (European Format)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO Format)' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY (e.g., 15 Jan 2024)' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">General Settings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure basic application preferences and regional settings
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onResetSection('general')}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset Section
        </Button>
      </div>
      {/* Theme Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Theme Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Customize the visual appearance of the application
            </p>
          </div>
          <Icon name="Palette" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon 
                  name={settings?.darkMode ? "Moon" : "Sun"} 
                  size={20} 
                  className="text-primary" 
                />
              </div>
              <div>
                <label className="font-medium text-foreground">Dark Mode</label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <Checkbox
              checked={settings?.darkMode}
              onChange={(e) => onSettingChange('darkMode', e?.target?.checked)}
              size="lg"
            />
          </div>

          {/* Auto Theme */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Monitor" size={20} className="text-accent" />
              </div>
              <div>
                <label className="font-medium text-foreground">Auto Theme</label>
                <p className="text-sm text-muted-foreground">
                  Follow system theme preferences
                </p>
              </div>
            </div>
            <Checkbox
              checked={settings?.autoTheme}
              onChange={(e) => onSettingChange('autoTheme', e?.target?.checked)}
              disabled={settings?.darkMode}
            />
          </div>
        </div>
      </div>
      {/* Language & Region */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Language & Region</h4>
            <p className="text-sm text-muted-foreground">
              Set your preferred language and regional formats
            </p>
          </div>
          <Icon name="Globe" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Display Language"
            description="Choose your preferred interface language"
            options={languageOptions}
            value={settings?.language}
            onChange={(value) => onSettingChange('language', value)}
            searchable
          />

          <Select
            label="Timezone"
            description="Select your local timezone"
            options={timezoneOptions}
            value={settings?.timezone}
            onChange={(value) => onSettingChange('timezone', value)}
            searchable
          />

          <Select
            label="Date Format"
            description="Choose how dates are displayed"
            options={dateFormatOptions}
            value={settings?.dateFormat}
            onChange={(value) => onSettingChange('dateFormat', value)}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Number Format</label>
            <p className="text-xs text-muted-foreground mb-3">
              Choose decimal and thousand separators
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="us-format"
                  name="numberFormat"
                  value="US"
                  checked={settings?.numberFormat === 'US'}
                  onChange={(e) => onSettingChange('numberFormat', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="us-format" className="text-sm text-foreground">
                  1,234.56 (US Format)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="eu-format"
                  name="numberFormat"
                  value="EU"
                  checked={settings?.numberFormat === 'EU'}
                  onChange={(e) => onSettingChange('numberFormat', e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="eu-format" className="text-sm text-foreground">
                  1.234,56 (European Format)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Startup Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Startup Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Configure application behavior when starting up
            </p>
          </div>
          <Icon name="Power" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Remember last opened files"
            description="Automatically restore previously opened Excel files on startup"
            checked={settings?.rememberFiles}
            onChange={(e) => onSettingChange('rememberFiles', e?.target?.checked)}
          />

          <Checkbox
            label="Show welcome screen"
            description="Display the welcome screen with quick actions on startup"
            checked={settings?.showWelcome}
            onChange={(e) => onSettingChange('showWelcome', e?.target?.checked)}
          />

          <Checkbox
            label="Check for updates automatically"
            description="Automatically check for application updates on startup"
            checked={settings?.autoUpdate}
            onChange={(e) => onSettingChange('autoUpdate', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;