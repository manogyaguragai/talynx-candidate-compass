
import React, { useCallback, useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { Upload, File, X, CheckCircle } from 'lucide-react';

export const FileUploadZone: React.FC = () => {
  const { uploadedFiles, addUploadedFile, removeUploadedFile } = useDashboardStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.zip')) {
        // Simulate upload progress
        simulateUpload(file.name);
        addUploadedFile(file);
      }
    });
  };

  const simulateUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress(prev => {
            const updated = { ...prev };
            delete updated[fileName];
            return updated;
          });
        }, 500);
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: progress }));
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 h-[480px] flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <Upload className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold font-inter text-slate-900">Resume Upload</h2>
        <span className="text-sm text-slate-500 font-ibm">({uploadedFiles.length} files)</span>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors flex-shrink-0 ${
          isDragOver 
            ? 'border-primary bg-blue-50' 
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${
          isDragOver ? 'text-primary' : 'text-slate-400'
        }`} />
        <h3 className="text-base font-medium font-inter text-slate-900 mb-2">
          Drop resume files here
        </h3>
        <p className="text-sm text-slate-500 font-ibm mb-3">
          Support for PDF and ZIP files up to 10MB each
        </p>
        <label className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
          <Upload className="w-4 h-4 mr-2" />
          Browse Files
          <input
            type="file"
            multiple
            accept=".pdf,.zip"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-4 flex-1 flex flex-col min-h-0">
        <h3 className="text-sm font-medium font-inter text-slate-900 mb-3">
          Uploaded Files ({uploadedFiles.length})
        </h3>
        <div className="flex-1 overflow-y-auto">
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <File className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-ibm">No files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium font-inter text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-500 font-ibm">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadProgress[file.name] !== undefined ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${uploadProgress[file.name]}%` }}
                          />
                        </div>
                        <span className="text-xs font-fira text-slate-600">
                          {Math.round(uploadProgress[file.name])}%
                        </span>
                      </div>
                    ) : (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                    
                    <button
                      onClick={() => removeUploadedFile(file.name)}
                      className="p-1 text-slate-400 hover:text-danger transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
