import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CollegeSearch from './pages/college-search';
import JobOpportunities from './pages/job-opportunities';
import Dashboard from './pages/dashboard';
import CommunityForum from './pages/community-forum';
import EducatorDirectory from './pages/educator-directory';
import ChatbotInterface from './pages/chatbot-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ChatbotInterface />} />
        <Route path="/college-search" element={<CollegeSearch />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/educator-directory" element={<EducatorDirectory />} />
        <Route path="/chatbot-interface" element={<ChatbotInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
