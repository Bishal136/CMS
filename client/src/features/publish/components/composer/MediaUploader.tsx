import React from 'react';
import { FileUpload } from '@/components/ui/FileUpload';

export const MediaUploader: React.FC = () => {
  return (
    <div className="my-3">
      <FileUpload onFilesSelected={() => {}} />
    </div>
  );
};
