import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  previewUrl: string | null;
  onClear: () => void;
}

export const ImageUpload = ({ onImageSelect, previewUrl, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        onImageSelect(file, preview);
      }
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      onImageSelect(file, preview);
    }
  }, [onImageSelect]);

  const handleZoomChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(e.target.value));
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {previewUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Square Preview with Circular Guide */}
            <div className="square-preview">
              <img
                src={previewUrl}
                alt="Preview"
                style={{ transform: `scale(${zoom})` }}
              />
              {/* White Circular Guide Overlay */}
              <div className="circle-guide" />
              {/* Clear Button */}
              <button
                onClick={onClear}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="zoom-controls">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">
                  Zoom
                </label>
                <span className="text-sm text-muted-foreground">
                  {zoom.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={zoom}
                onChange={handleZoomChange}
                className="zoom-slider"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Drag-Drop Upload Zone */}
            <label
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                flex flex-col items-center justify-center
                upload-zone-square
                rounded-2xl border-2 border-dashed
                cursor-pointer transition-all duration-300
                ${isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 bg-secondary/20 hover:bg-secondary/30'
                }
              `}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload-input"
              />

              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300
                  ${isDragging ? 'bg-primary/20' : 'bg-secondary'}
                `}>
                  {isDragging ? (
                    <ImageIcon className="w-8 h-8 text-primary" />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <div className="text-center">
                  <p className="text-foreground font-medium mb-1">
                    {isDragging ? 'Drop your image here' : 'Drag and drop your image'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse • JPG, PNG, WebP up to 10MB
                  </p>
                </div>
              </motion.div>
            </label>

            {/* Upload Button */}
            <button
              onClick={() => document.getElementById('file-upload-input')?.click()}
              className="w-full max-w-[320px] md:max-w-[320px] px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Upload Your Image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
