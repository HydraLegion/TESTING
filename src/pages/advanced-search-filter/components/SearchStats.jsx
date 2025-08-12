import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchStats = ({ 
  searchStats, 
  recentQueries, 
  savedFilters, 
  onApplyRecentQuery, 
  onApplySavedFilter,
  onDeleteSavedFilter 
}) => {
  const StatCard = ({ icon, label, value, color = "text-foreground" }) => (
    <div className="bg-muted rounded-lg p-3">
      <div className="flex items-center space-x-2 mb-1">
        <Icon name={icon} size={16} className="text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className={`text-lg font-semibold ${color}`}>
        {typeof value === 'number' ? value?.toLocaleString() : value}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-surface border-l border-border overflow-y-auto">
      <div className="p-4">
        {/* Search Statistics */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Search Statistics
          </h3>
          <div className="space-y-3">
            <StatCard
              icon="Database"
              label="Total Records"
              value={searchStats?.totalRecords}
            />
            <StatCard
              icon="Filter"
              label="Filtered Results"
              value={searchStats?.filteredResults}
              color="text-primary"
            />
            <StatCard
              icon="Target"
              label="Match Rate"
              value={`${searchStats?.matchRate}%`}
              color="text-success"
            />
            <StatCard
              icon="Clock"
              label="Search Time"
              value={`${searchStats?.searchTime}ms`}
            />
          </div>
        </div>

        {/* Recent Queries */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Icon name="History" size={16} className="mr-2" />
            Recent Queries
          </h3>
          <div className="space-y-2">
            {recentQueries?.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No recent queries</p>
            ) : (
              recentQueries?.map((query, index) => (
                <div
                  key={index}
                  className="group bg-muted rounded-md p-2 hover:bg-muted/80 transition-smooth cursor-pointer"
                  onClick={() => onApplyRecentQuery(query)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {query?.query}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {query?.results} results
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {query?.timestamp}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-smooth ml-2"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onApplyRecentQuery(query);
                      }}
                    >
                      <Icon name="Play" size={12} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Saved Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Bookmark" size={16} className="mr-2" />
            Saved Filters
          </h3>
          <div className="space-y-2">
            {savedFilters?.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No saved filters</p>
            ) : (
              savedFilters?.map((filter) => (
                <div
                  key={filter?.id}
                  className="group bg-muted rounded-md p-2 hover:bg-muted/80 transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {filter?.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {filter?.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          Created: {filter?.created}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-smooth ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onApplySavedFilter(filter)}
                        title="Apply filter"
                      >
                        <Icon name="Play" size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteSavedFilter(filter?.id)}
                        title="Delete filter"
                      >
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2" />
            Search Tips
          </h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start space-x-2">
              <Icon name="Quote" size={12} className="mt-0.5 flex-shrink-0" />
              <span>Use quotes for exact phrases: "John Smith"</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Asterisk" size={12} className="mt-0.5 flex-shrink-0" />
              <span>Use * for wildcards: John*</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Plus" size={12} className="mt-0.5 flex-shrink-0" />
              <span>Use AND/OR: John AND Smith</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Minus" size={12} className="mt-0.5 flex-shrink-0" />
              <span>Use NOT to exclude: NOT inactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStats;