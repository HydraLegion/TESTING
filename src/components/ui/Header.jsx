import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/file-upload-dashboard',
      icon: 'Upload',
      tooltip: 'Upload and manage Excel files'
    },
    {
      label: 'Data Viewer',
      path: '/excel-data-viewer',
      icon: 'Table',
      tooltip: 'View and edit spreadsheet data'
    },
    {
      label: 'Advanced Search',
      path: '/advanced-search-filter',
      icon: 'Search',
      tooltip: 'Complex queries and filtering'
    },
    {
      label: 'Export Manager',
      path: '/data-export-manager',
      icon: 'Download',
      tooltip: 'Format and export data'
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/settings-preferences',
      icon: 'Settings',
      tooltip: 'System preferences and configuration'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link 
          to="/file-upload-dashboard" 
          className="flex items-center space-x-3 hover:opacity-80 transition-smooth"
          onClick={closeMobileMenu}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="FileSpreadsheet" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground leading-none">
              BSP ExcelViewer Pro
            </span>
            <span className="text-xs text-muted-foreground leading-none mt-0.5">
              Data Management Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                ${isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </Button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-[1100]">
              <div className="py-1">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`
                      flex items-center space-x-3 px-3 py-2 text-sm transition-smooth
                      ${isActiveRoute(item?.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                      }
                    `}
                    title={item?.tooltip}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-elevation-2 z-[1200]">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth
                  ${isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <div className="flex flex-col">
                  <span>{item?.label}</span>
                  <span className="text-xs opacity-75">{item?.tooltip}</span>
                </div>
              </Link>
            ))}
            
            {/* Mobile Secondary Items */}
            <div className="pt-2 mt-2 border-t border-border">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth
                    ${isActiveRoute(item?.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <div className="flex flex-col">
                    <span>{item?.label}</span>
                    <span className="text-xs opacity-75">{item?.tooltip}</span>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;