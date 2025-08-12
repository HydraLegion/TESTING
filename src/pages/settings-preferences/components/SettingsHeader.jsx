import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsHeader = ({ onSaveAll, onResetAll, hasUnsavedChanges }) => {
  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Settings & Preferences</h1>
              <p className="text-sm text-muted-foreground">
                Customize application behavior and manage your preferences
              </p>
            </div>
          </div>
          
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-warning/10 border border-warning/20 rounded-md">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Unsaved changes</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onResetAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Reset All
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconPosition="left"
            onClick={onSaveAll}
            disabled={!hasUnsavedChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 mt-4 text-sm">
        <Icon name="Home" size={14} className="text-muted-foreground" />
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Application</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">Settings & Preferences</span>
      </div>
    </div>
  );
};

export default SettingsHeader;