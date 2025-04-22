// Document-related interfaces

export interface DocumentSettings {
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  pageSize: "letter" | "a4" | "legal" | "custom";
  orientation: "portrait" | "landscape";
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

// Utility functions

/**
 * Calculate the number of pages in a document based on its content.
 */
export const calculatePageCount = (content: string): number => {
  if (!content) return 1;

  const charactersPerPage = 3000;
  const pageCount = Math.ceil(content.length / charactersPerPage);
  return Math.max(1, pageCount);
};

/**
 * Convert points (pt) to pixels (px).
 */
export const ptToPx = (pt: number): number => {
  return (pt * 96) / 72;
};

/**
 * Convert inches to pixels.
 */
export const inchesToPx = (inches: number): number => {
  return inches * 96;
};

/**
 * Format a date string into a readable format.
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

/**
 * Generate a unique document ID.
 */
export const generateId = (): string => {
  return `doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * Generate a document title from the first line of the content.
 */
export const generateTitleFromContent = (content: string): string => {
  if (!content) return "Untitled Document";

  const firstLine = content.split("\n")[0].trim();
  const cleanTitle = firstLine.replace(/<[^>]*>/g, "").replace(/[#*_]/g, "");
  return cleanTitle.substring(0, 50) || "Untitled Document";
};

/**
 * Extract headings from content (simplified version).
 */
export const extractHeadings = (): { level: number; text: string }[] => {
  return [
    { level: 1, text: "Document Title" },
    { level: 2, text: "Section 1" },
    { level: 3, text: "Subsection 1.1" },
    { level: 3, text: "Subsection 1.2" },
    { level: 2, text: "Section 2" },
  ];
};
