import { useState, useRef } from 'react';
import './UploadZone.css';

function UploadZone({ onFileUpload, isUploading }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (20MB max)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File is too large. Maximum size is 20MB.');
      return;
    }

    onFileUpload(file);
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div 
      className={`upload-zone ${isDragOver ? 'drag-over' : ''} ${isUploading ? 'uploading' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Upload receipt image"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileInput}
        style={{ display: 'none' }}
        disabled={isUploading}
      />

      <div className="upload-icon">
        {isUploading ? (
          <div className="spinner" role="status" aria-label="Loading"></div>
        ) : isDragOver ? (
          <span className="icon-large">⬇️</span>
        ) : (
          <span className="icon-large">📸</span>
        )}
      </div>

      <p className="upload-text-primary">
        {isUploading ? 'Processing your receipt...' : isDragOver ? 'Drop receipt here!' : 'Drag & Drop Receipt Image Here'}
      </p>

      {!isUploading && (
        <>
          <p className="upload-text-secondary">or click to browse</p>
          <p className="upload-text-hint">Supports JPG, PNG files</p>
        </>
      )}

      {isUploading && (
        <p className="upload-text-hint">This usually takes 5-10 seconds</p>
      )}
    </div>
  );
}

export default UploadZone;


