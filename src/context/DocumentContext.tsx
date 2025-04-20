import React, { createContext, useState, ReactNode } from 'react';
import { Document, DocumentSettings } from '../types/document';

// Default document settings
const defaultSettings: DocumentSettings = {
  margins: {
    top: 1,
    bottom: 1,
    left: 1.5, // Includes 0.5" gutter
    right: 1
  },
  pageSize: 'letter',
  orientation: 'portrait',
  lineSpacing: 1.5,
  paragraphSpacing: 6,
  font: {
    family: 'Times New Roman',
    size: 12
  }
};

// Empty document template
const emptyDocument: Document = {
  id: 'doc-1',
  title: 'Untitled Document',
  content: '',
  settings: defaultSettings,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

interface DocumentContextType {
  documentState: Document;
  updateDocument: (updates: Partial<Document>) => void;
  updateSettings: (settings: Partial<DocumentSettings>) => void;
}

export const DocumentContext = createContext<DocumentContextType>({
  documentState: emptyDocument,
  updateDocument: () => {},
  updateSettings: () => {}
});

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentState, setDocumentState] = useState<Document>(emptyDocument);

  const updateDocument = (updates: Partial<Document>) => {
    setDocumentState(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
      version: prev.version + 1
    }));
  };

  const updateSettings = (updates: Partial<DocumentSettings>) => {
    setDocumentState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updates
      },
      updatedAt: new Date().toISOString(),
      version: prev.version + 1
    }));
  };

  return (
    <DocumentContext.Provider value={{ documentState, updateDocument, updateSettings }}>
      {children}
    </DocumentContext.Provider>
  );
};