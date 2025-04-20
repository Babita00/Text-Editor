export interface DocumentSettings {
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  pageSize: 'letter' | 'a4' | 'legal' | 'custom';
  orientation: 'portrait' | 'landscape';
  lineSpacing: number;
  paragraphSpacing: number;
  font: {
    family: string;
    size: number;
  };
}

export interface Document {
  id: string;
  title: string;
  content: string;
  settings: DocumentSettings;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface DocumentHistory {
  id: string;
  documentId: string;
  content: string;
  timestamp: string;
  version: number;
}

export interface Comment {
  id: string;
  documentId: string;
  author: string;
  content: string;
  position: number;
  resolved: boolean;
  createdAt: string;
}

export interface TableElement {
  rows: number;
  columns: number;
  headers: boolean;
  caption?: string;
}

export interface ImageElement {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface EquationElement {
  latex: string;
  number?: number;
}