import React, { useState } from 'react';

interface DownloadAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  fileName?: string;
}

export const DownloadAuthModal: React.FC<DownloadAuthModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  fileName = "your files"
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1f2937'
        }}>
          Download {fileName}
        </h2>
        
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '24px',
          lineHeight: '1.5'
        }}>
          Ready to download your converted files. All processing is done locally on your device.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <button
            onClick={onDownload}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            Download {fileName}
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Hook to use the download auth modal
export const useDownloadAuth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadCallback, setDownloadCallback] = useState<(() => void) | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const requireAuthForDownload = (downloadFn: () => void, file?: string) => {
    setDownloadCallback(() => downloadFn);
    setFileName(file || 'your files');
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    if (downloadCallback) {
      downloadCallback();
      setIsModalOpen(false);
      setDownloadCallback(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDownloadCallback(null);
  };

  return {
    isModalOpen,
    requireAuthForDownload,
    handleDownload,
    closeModal,
    fileName
  };
};