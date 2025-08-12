import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsSidebar = ({ activeTab, onTabChange, isMobile = false }) => {
  const settingsTabs = [
    {
      id: 'general',
      label: 'General Settings',
      icon: 'Settings',
      description: 'Theme, language, and basic preferences'
    },
    {
      id: 'display',
      label: 'Display Options',
      icon: 'Monitor',
      description: 'Grid appearance and formatting'
    },
    {
      id: 'dataHandling',
      label: 'Data Handling',
      icon: 'Database',
      description: 'File processing and validation'
    },
    {
      id: 'exportDefaults',
      label: 'Export Defaults',
      icon: 'Download',
      description: 'Default formats and mappings'
    },
    {
      id: 'security',
      label: 'Security Settings',
      icon: 'Shield',
      description: 'Privacy and access controls'
    }
  ];

  if (isMobile) {
    return (
      <div className="bg-card border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide">
          {settingsTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`
                flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-smooth border-b-2
                ${activeTab === tab?.id
                  ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="whitespace-nowrap">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Customize your preferences
            </p>
          </div>
        </div>
      </div>
      <nav className="p-4">
        <div className="space-y-2">
          {settingsTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`
                w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-smooth
                ${activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0 mt-0.5
                ${activeTab === tab?.id
                  ? 'bg-primary-foreground/20'
                  : 'bg-muted'
                }
              `}>
                <Icon 
                  name={tab?.icon} 
                  size={16} 
                  className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`
                  font-medium text-sm
                  ${activeTab === tab?.id ? 'text-primary-foreground' : 'text-foreground'}
                `}>
                  {tab?.label}
                </div>
                <p className={`
                  text-xs mt-0.5 line-clamp-2
                  ${activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}
                `}>
                  {tab?.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </nav>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
            <Icon name="Download" size={16} />
            <span className="text-sm font-medium">Export Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
            <Icon name="Upload" size={16} />
            <span className="text-sm font-medium">Import Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-smooth">
            <Icon name="RotateCcw" size={16} />
            <span className="text-sm font-medium">Reset All Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;