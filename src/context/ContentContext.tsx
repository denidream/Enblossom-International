import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContentState } from '../types';
import { INITIAL_SITE_CONTENT } from '../data/content';

const STORAGE_KEY = 'enblossom_cms_content_v1';
const AUTH_KEY = 'enblossom_admin_auth';

interface ContentContextType {
  content: SiteContentState;
  updateContent: (updater: (prev: SiteContentState) => SiteContentState) => void;
  resetToDefault: () => void;
  exportContentJson: () => void;
  importContentJson: (jsonData: string) => boolean;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize content from localStorage or default
  const [content, setContent] = useState<SiteContentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with INITIAL_SITE_CONTENT to guarantee all fields exist even if schema evolved
        return {
          ...INITIAL_SITE_CONTENT,
          ...parsed,
          branding: { ...INITIAL_SITE_CONTENT.branding, ...(parsed.branding || {}) },
          hero: { ...INITIAL_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          about: { ...INITIAL_SITE_CONTENT.about, ...(parsed.about || {}) },
          team: { ...INITIAL_SITE_CONTENT.team, ...(parsed.team || {}) },
          contact: { ...INITIAL_SITE_CONTENT.contact, ...(parsed.contact || {}) },
          services: parsed.services?.length ? parsed.services : INITIAL_SITE_CONTENT.services,
          news: parsed.news?.length ? parsed.news : INITIAL_SITE_CONTENT.news,
          galleryStrip: parsed.galleryStrip?.length ? parsed.galleryStrip : INITIAL_SITE_CONTENT.galleryStrip,
        };
      }
    } catch (e) {
      console.error('Failed to parse saved CMS content:', e);
    }
    return INITIAL_SITE_CONTENT;
  });

  // Admin authentication state (saved in sessionStorage so session lasts until tab close)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Save content to localStorage whenever it changes
  const updateContent = (updater: (prev: SiteContentState) => SiteContentState) => {
    setContent((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save content to localStorage:', e);
      }
      return next;
    });
  };

  // Reset to default original content
  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setContent(INITIAL_SITE_CONTENT);
  };

  // Export content to a downloadable JSON file
  const exportContentJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `enblossom-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import content from JSON
  const importContentJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed && typeof parsed === 'object') {
        const merged: SiteContentState = {
          ...INITIAL_SITE_CONTENT,
          ...parsed,
          branding: { ...INITIAL_SITE_CONTENT.branding, ...(parsed.branding || {}) },
          hero: { ...INITIAL_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          about: { ...INITIAL_SITE_CONTENT.about, ...(parsed.about || {}) },
          team: { ...INITIAL_SITE_CONTENT.team, ...(parsed.team || {}) },
          contact: { ...INITIAL_SITE_CONTENT.contact, ...(parsed.contact || {}) },
          services: parsed.services?.length ? parsed.services : INITIAL_SITE_CONTENT.services,
          news: parsed.news?.length ? parsed.news : INITIAL_SITE_CONTENT.news,
          galleryStrip: parsed.galleryStrip?.length ? parsed.galleryStrip : INITIAL_SITE_CONTENT.galleryStrip,
        };
        setContent(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON data:', e);
    }
    return false;
  };

  // Login handler with requested password: 12345
  const loginAdmin = (password: string): boolean => {
    if (password === '12345') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      return true;
    }
    return false;
  };

  // Logout handler
  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
    setIsAdminPanelOpen(false);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        resetToDefault,
        exportContentJson,
        importContentJson,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
