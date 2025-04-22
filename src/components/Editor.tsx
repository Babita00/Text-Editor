import React, { useEffect, useContext, useState } from 'react';
import { DocumentContext } from '../context/DocumentContext';
import { calculatePageCount } from '../utils/documentUtils';
interface EditorProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

const Editor: React.FC<EditorProps> = ({ editorRef }) => {
  
  const { documentState } = useContext(DocumentContext);
  const [pages, setPages] = useState<number[]>([1]);
  
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);


  useEffect(() => {
    const content = editorRef.current?.innerHTML || '';
    const totalPages = calculatePageCount(content);
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
  }, [documentState.content, editorRef]);

  const insertHorizontalLine = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    const hr = document.createElement('div');
    hr.className = 'horizontal-separator';
    hr.style.cssText = `
      width: 100%;
      height: 1pt;
      background-color: #000000;
      margin: 12pt 0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    `;
    
    range.deleteContents();
    range.insertNode(hr);
    
    // Move cursor after the line
    range.setStartAfter(hr);
    range.setEndAfter(hr);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-200 flex justify-center p-8">
      <div className="flex flex-col items-center gap-8">
        {pages.map((pageNum) => (
          <div
            key={pageNum}
            className="bg-white shadow-lg relative"
            style={{
              width: '210mm',
              height: '297mm',
              pageBreakAfter: 'always',
            }}
          >
            {/* Page content container */}
            <div
              className="absolute"
              style={{
                top: '25.4mm',    // 1 inch top margin
                left: '38.1mm',   // 1 inch left margin + 0.5 inch gutter
                right: '25.4mm',  // 1 inch right margin
                bottom: '25.4mm', // 1 inch bottom margin
                overflow: 'hidden',
              }}
            >
              {pageNum === 1 && (
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="outline-none min-h-full"
                  style={{
                    lineHeight: '1.5',
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: '12pt',
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) {
                      e.preventDefault();
                      insertHorizontalLine();
                    }
                  }}
                >
                  <h1 style={{ fontSize: '16pt', fontWeight: 'bold', marginBottom: '12pt' }}>
                    Document Title
                  </h1>
                  <p style={{ marginBottom: '6pt' }}>
                    This is a paragraph of text. Start typing to edit this document. Press Shift+Enter to insert a horizontal line.
                  </p>
                  <div className="horizontal-separator" style={{
                    width: '100%',
                    height: '1pt',
                    backgroundColor: '#000000',
                    margin: '12pt 0',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}></div>
                  <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10pt', marginTop: '16pt' }}>
                    Section Heading
                  </h2>
                  <p style={{ marginBottom: '6pt' }}>
                    Click anywhere and start typing to add content to your document. This editor supports various formatting options.
                  </p>
                </div>
              )}
            </div>

            {/* Page number footer */}
            <div 
              className="absolute w-full text-center"
              style={{ 
                bottom: '12.7mm', // 0.5 inch from bottom
                left: 0,
                right: 0,
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '12pt',
                lineHeight: '1.2',
                color: '#000000'
              }}
            >
              <span>
                Page {pageNum} of {pages.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;