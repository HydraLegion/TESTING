import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResults = ({ 
  searchTerm, 
  totalResults, 
  currentResult, 
  onNavigateResult, 
  onClearSearch 
}) => {
  if (!searchTerm || totalResults === 0) return null;

  return (
    <div className="bg-accent/10 border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="Search" size={16} className="text-accent" />
          <span className="text-sm text-foreground">
            <strong>{totalResults}</strong> results found for "{searchTerm}"
          </span>
          {totalResults > 1 && (
            <span className="text-xs text-muted-foreground">
              ({currentResult + 1} of {totalResults})
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {totalResults > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateResult('prev')}
                disabled={currentResult === 0}
              >
                <Icon name="ChevronUp" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateResult('next')}
                disabled={currentResult === totalResults - 1}
              >
                <Icon name="ChevronDown" size={14} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSearch}
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;