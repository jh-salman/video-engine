import React from 'react';
import { motion } from 'framer-motion';

interface BrowserPreviewProps {
  content?: React.ReactNode;
}

export const BrowserPreview: React.FC<BrowserPreviewProps> = ({ content }) => {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Browser Chrome */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#28ca42',
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: 12,
            color: '#666',
            textAlign: 'center',
          }}
        >
          localhost:3000
        </div>
      </div>

      {/* Browser Content */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {content || (
          <div
            style={{
              textAlign: 'center',
              color: '#666',
              fontSize: 16,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <div>Your SaaS Application Preview</div>
            <div style={{ fontSize: 12, marginTop: 8, color: '#999' }}>
              Building in real-time...
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

