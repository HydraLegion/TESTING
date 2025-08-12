import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SettingsPreferences from './pages/settings-preferences';
import FileUploadDashboard from './pages/file-upload-dashboard';
import DataExportManager from './pages/data-export-manager';
import ExcelDataViewer from './pages/excel-data-viewer';
import AdvancedSearchFilter from './pages/advanced-search-filter';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FileUploadDashboard />} />
        <Route path="/settings-preferences" element={<SettingsPreferences />} />
        <Route path="/file-upload-dashboard" element={<FileUploadDashboard />} />
        <Route path="/data-export-manager" element={<DataExportManager />} />
        <Route path="/excel-data-viewer" element={<ExcelDataViewer />} />
        <Route path="/advanced-search-filter" element={<AdvancedSearchFilter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;